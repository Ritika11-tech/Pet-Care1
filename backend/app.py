from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
from io import BytesIO
import json
import requests
from collections import OrderedDict
import os

app = Flask(__name__)
CORS(app)

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
MODEL_PATH = "model_88.pth"
CLASSES_PATH = "classes.json"
OLLAMA_URL = "http://localhost:11434/api/generate"
OLLAMA_MODEL = "llama3.2"

with open(CLASSES_PATH, "r", encoding="utf-8") as f:
    CLASS_NAMES = json.load(f)

NUM_CLASSES = len(CLASS_NAMES)

DISEASE_INFO = {
    "Bacterial_dermatosis": {"symptoms": ["Redness", "Pus", "Itching"], "precautions": ["Keep area clean", "Avoid scratching", "Visit vet"], "remedies": ["Antibiotic treatment", "Vet consultation"], "recovery_time": "1-3 weeks", "severity": "High"},
    "Dermatitis": {"symptoms": ["Inflammation", "Itching", "Red skin"], "precautions": ["Avoid allergens", "Use gentle shampoo", "Keep dog dry"], "remedies": ["Anti-inflammatory treatment", "Vet care"], "recovery_time": "2-4 weeks", "severity": "Medium"},
    "Fungal_infections": {"symptoms": ["Hair loss", "Scaly patches", "Itching"], "precautions": ["Isolate dog", "Avoid contact", "Disinfect bedding"], "remedies": ["Antifungal medicine", "Topical cream"], "recovery_time": "2-6 weeks", "severity": "High"},
    "Healthy": {"symptoms": ["No major symptoms"], "precautions": ["Maintain hygiene", "Regular grooming"], "remedies": ["No treatment needed"], "recovery_time": "N/A", "severity": "Low"},
    "Hypersensitivity": {"symptoms": ["Itching", "Skin irritation", "Redness"], "precautions": ["Avoid allergens", "Monitor diet"], "remedies": ["Antihistamines", "Vet consultation"], "recovery_time": "2-4 weeks", "severity": "Medium"},
    "Hypersensitivity_allergic_dermatosis": {"symptoms": ["Severe itching", "Red patches", "Hair loss"], "precautions": ["Identify triggers", "Avoid exposure"], "remedies": ["Allergy treatment", "Vet visit"], "recovery_time": "2-5 weeks", "severity": "High"},
    "demodicosis": {"symptoms": ["Hair loss", "Patchy skin", "Scabs"], "precautions": ["Keep immune system strong", "Vet supervision"], "remedies": ["Miticidal medication", "Vet treatment"], "recovery_time": "3-6 weeks", "severity": "High"},
    "flea_allergy": {"symptoms": ["Itching", "Bites", "Skin redness"], "precautions": ["Use flea control", "Clean bedding"], "remedies": ["Anti-flea treatment", "Vet care"], "recovery_time": "1-3 weeks", "severity": "Medium"},
    "hotspot": {"symptoms": ["Wet rash", "Red irritated patch", "Licking"], "precautions": ["Stop licking", "Keep area dry", "Avoid infection"], "remedies": ["Topical antiseptic", "Vet consultation"], "recovery_time": "1-2 weeks", "severity": "High"},
    "mange": {"symptoms": ["Severe itching", "Hair loss", "Skin thickening"], "precautions": ["Isolate dog", "Disinfect surroundings"], "remedies": ["Anti-mite treatment", "Vet supervision"], "recovery_time": "3-6 weeks", "severity": "High"},
    "ringworm": {"symptoms": ["Hair loss", "Circular lesions", "Scaling"], "precautions": ["Isolate dog", "Avoid contact", "Wash hands"], "remedies": ["Antifungal cream", "Vet consultation"], "recovery_time": "2-4 weeks", "severity": "High"}
}

# Dog-related keywords in ImageNet labels
DOG_KEYWORDS = [
    'dog', 'puppy', 'canine', 'terrier', 'retriever', 'spaniel',
    'poodle', 'bulldog', 'shepherd', 'husky', 'beagle', 'dachshund',
    'labrador', 'pug', 'chihuahua', 'rottweiler', 'boxer', 'collie',
    'pomeranian', 'maltese', 'greyhound', 'dalmatian', 'chow', 'pembroke',
    'samoyed', 'papillon', 'saluki', 'whippet', 'paw', 'foot', 'nose',
    'snout', 'muzzle', 'fur', 'coat', 'animal', 'mammal'
]

class DogDiseaseEfficientNet(nn.Module):
    def __init__(self, num_classes):
        super().__init__()
        self.backbone = models.efficientnet_b2(weights=None)
        in_features = self.backbone.classifier[1].in_features
        self.backbone.classifier = nn.Sequential(
            nn.Dropout(p=0.3),
            nn.Linear(in_features, 512),
            nn.ReLU(inplace=True),
            nn.Dropout(p=0.2),
            nn.Linear(512, num_classes)
        )

    def forward(self, x):
        return self.backbone(x)

def strip_prefix(state_dict, prefix):
    if any(k.startswith(prefix) for k in state_dict.keys()):
        return OrderedDict((k[len(prefix):], v) for k, v in state_dict.items())
    return state_dict

def filter_state_dict_for_model(model, state_dict):
    model_state = model.state_dict()
    filtered = OrderedDict()
    skipped = []
    for k, v in state_dict.items():
        if k in model_state and model_state[k].shape == v.shape:
            filtered[k] = v
        else:
            skipped.append(k)
    if skipped:
        print("Skipped mismatched/unexpected keys:", skipped[:5])
    return filtered

def extract_state_dict(checkpoint):
    if isinstance(checkpoint, dict):
        for key in ["model_state_dict", "state_dict", "model", "net", "backbone_state_dict"]:
            if key in checkpoint:
                return checkpoint[key]
    return checkpoint

def load_model(path):
    checkpoint = torch.load(path, map_location=DEVICE)

    if isinstance(checkpoint, nn.Module):
        model = checkpoint.to(DEVICE)
        model.eval()
        return model

    state_dict = extract_state_dict(checkpoint)
    if not isinstance(state_dict, dict):
        raise ValueError("Unsupported checkpoint format")

    state_dict = strip_prefix(state_dict, "module.")

    model = DogDiseaseEfficientNet(NUM_CLASSES).to(DEVICE)

    try:
        model.load_state_dict(state_dict, strict=True)
        print("✓ Loaded checkpoint with strict=True")
    except RuntimeError as e:
        print("⚠ Strict loading failed, using filtered mode...")
        filtered_state_dict = filter_state_dict_for_model(model, state_dict)
        missing, unexpected = model.load_state_dict(filtered_state_dict, strict=False)
        print("✓ Loaded checkpoint with filtered keys.")

    model.eval()
    return model

print("Loading model...")
model = load_model(MODEL_PATH)
print("✓ Model loaded successfully")

# Load dog detector - MobileNetV2
print("Loading dog detector...")
dog_detector = models.mobilenet_v2(weights=models.MobileNet_V2_Weights.DEFAULT).to(DEVICE)
dog_detector.eval()

# Load ImageNet weights to get labels
imagenet_weights = models.MobileNet_V2_Weights.DEFAULT
IMAGENET_LABELS = imagenet_weights.meta["categories"]

print("✓ Dog detector loaded")

def is_dog_image(image_bytes):
    """Check if image contains a dog using MobileNetV2"""
    try:
        image = Image.open(BytesIO(image_bytes)).convert("RGB")
        dog_transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])
        img_tensor = dog_transform(image).unsqueeze(0).to(DEVICE)
        
        with torch.no_grad():
            outputs = dog_detector(img_tensor)
            probabilities = torch.softmax(outputs / 1.5, dim=1)
        
        # Get top-5 predictions
        top5_prob, top5_idx = torch.topk(probabilities, 5, dim=1)
        top5_idx = top5_idx[0].cpu().numpy()
        
        # Check if any top-5 prediction contains dog keywords
        for idx in top5_idx:
            if idx < len(IMAGENET_LABELS):
                label = IMAGENET_LABELS[idx].lower()
                for keyword in DOG_KEYWORDS:
                    if keyword in label:
                        return True
        
        return False
    except Exception as e:
        print(f"Dog detection error: {e}")
        return False

transform = transforms.Compose([
    transforms.Resize((260, 260)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

def preprocess_image(image_bytes):
    image = Image.open(BytesIO(image_bytes)).convert("RGB")
    return transform(image).unsqueeze(0).to(DEVICE)

def ollama_generate(prompt):
    try:
        response = requests.post(
            OLLAMA_URL,
            json={"model": OLLAMA_MODEL, "prompt": prompt, "stream": False},
            timeout=120
        )
        response.raise_for_status()
        return response.json().get("response", "").strip()
    except Exception as e:
        return f"AI unavailable (start Ollama): {str(e)[:50]}"
    """Get symptoms, precautions, and remedies for disease"""
    disease_database = {
        "Bacterial_dermatosis": {
            "symptoms": ["Redness", "Pus discharge", "Skin lesions"],
            "precautions": ["Keep area clean", "Avoid scratching", "Isolate if contagious"],
            "remedies": ["Antibiotic ointment", "Oral antibiotics", "Vet consultation"],
            "recovery": "1-3 weeks"
        },
        "Dermatitis": {
            "symptoms": ["Itching", "Redness", "Dry skin"],
            "precautions": ["Avoid irritants", "Use gentle shampoo", "Keep dry"],
            "remedies": ["Hydrocortisone cream", "Moisturizer", "Vet medication"],
            "recovery": "2-4 weeks"
        },
        "Fungal_infections": {
            "symptoms": ["Hair loss", "Circular lesions", "Scaling"],
            "precautions": ["Isolate dog", "Avoid contact", "Clean bedding"],
            "remedies": ["Antifungal cream", "Oral antifungal", "Vet consultation"],
            "recovery": "4-8 weeks"
        },
        "Healthy": {
            "symptoms": ["None observed"],
            "precautions": ["Regular checkups", "Maintain hygiene"],
            "remedies": ["No treatment needed"],
            "recovery": "N/A"
        },
        "Hypersensitivity": {
            "symptoms": ["Itching", "Rash", "Hair loss"],
            "precautions": ["Identify allergen", "Avoid trigger", "Use hypoallergenic food"],
            "remedies": ["Antihistamines", "Cortisone", "Dietary changes"],
            "recovery": "Variable"
        },
        "Hypersensitivity_allergic_dermatosis": {
            "symptoms": ["Itching", "Redness", "Swelling"],
            "precautions": ["Avoid allergen", "Clean regularly", "Use hypoallergenic products"],
            "remedies": ["Antihistamine", "Cortisone", "Immunotherapy"],
            "recovery": "2-6 weeks"
        },
        "demodicosis": {
            "symptoms": ["Hair loss", "Red skin", "Scaling"],
            "precautions": ["Reduce stress", "Boost immunity", "Regular vet checkups"],
            "remedies": ["Miticide dips", "Oral medication", "Vet supervision"],
            "recovery": "4-12 weeks"
        },
        "flea_allergy": {
            "symptoms": ["Itching", "Hair loss", "Skin infection"],
            "precautions": ["Monthly flea treatment", "Clean environment", "Wash bedding"],
            "remedies": ["Flea treatment", "Antihistamine", "Anti-inflammatory"],
            "recovery": "1-4 weeks"
        },
        "hotspot": {
            "symptoms": ["Red patch", "Oozing", "Hair loss"],
            "precautions": ["Trim hair", "Keep dry", "Prevent licking"],
            "remedies": ["Topical antibiotic", "E-collar", "Vet care"],
            "recovery": "5-10 days"
        },
        "mange": {
            "symptoms": ["Hair loss", "Itching", "Skin thickening"],
            "precautions": ["Isolate", "Regular dips", "Clean environment"],
            "remedies": ["Miticide treatment", "Oral medication", "Vet supervision"],
            "recovery": "6-12 weeks"
        },
        "ringworm": {
            "symptoms": ["Hair loss", "Circular lesions", "Scaling"],
            "precautions": ["Isolate dog", "Avoid contact", "Clean bedding daily"],
            "remedies": ["Antifungal cream", "Oral antifungal", "Vet consultation"],
            "recovery": "2-4 weeks"
        }
    }
    
    return disease_database.get(disease_name, {
        "symptoms": ["Unknown"],
        "precautions": ["Consult vet"],
        "remedies": ["Professional treatment"],
        "recovery": "Unknown"
    })

def call_ollama(prompt):
    """Call Ollama for AI response"""
    try:
        result = subprocess.run(
            ['ollama', 'run', 'llama3.2:latest', prompt],
            capture_output=True,
            text=True,
            timeout=30
        )
        if result.returncode == 0:
            return result.stdout.strip()
        return "Unable to get response from AI"
    except Exception as e:
        return f"AI service unavailable: {str(e)}"

@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    try:
        image_bytes = request.files["image"].read()
        
        # Check if image is a dog
        if not is_dog_image(image_bytes):
            return jsonify({"error": "Dog not detected. Please upload an image of a dog."}), 400
        
        img = preprocess_image(image_bytes)

        with torch.no_grad():
            logits = model(img)
            probs = torch.softmax(logits, dim=1)
            conf, pred = torch.max(probs, 1)

        predicted_class = CLASS_NAMES[pred.item()]
        confidence = round(conf.item() * 100, 2)
        info = DISEASE_INFO.get(predicted_class, {
            "symptoms": ["Unknown"],
            "precautions": ["Consult a vet"],
            "remedies": ["Consult a vet"],
            "recovery_time": "Unknown",
            "severity": "Medium"
        })

        prompt = f"""You are a veterinary assistant.
Detected disease: {predicted_class}
Confidence: {confidence}%
Symptoms: {', '.join(info['symptoms'])}
Precautions: {', '.join(info['precautions'])}
Remedies: {', '.join(info['remedies'])}
Recovery time: {info['recovery_time']}

Explain this in simple dog-owner friendly language in 5-7 short lines. Mention that a vet should be consulted for treatment decisions."""

        return jsonify({
            "predicted_class": predicted_class,
            "confidence": confidence,
            "symptoms": info["symptoms"],
            "precautions": info["precautions"],
            "remedies": info["remedies"],
            "recovery_time": info["recovery_time"],
            "severity": info["severity"],
            "ollama_context": ollama_generate(prompt)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json(force=True)
        msg = data.get("message", "")
        disease = data.get("disease", "Unknown")
        context = data.get("context", "")

        # Check if message contains symptoms
        symptom_keywords = ["symptoms", "symptom", "hair loss", "red patch", "itching", "swelling", "rash", "pus", 
                           "lesion", "scaling", "scab", "thickening", "wet", "licking", "inflammation", "bald", "discharge"]
        has_symptoms = any(keyword.lower() in msg.lower() for keyword in symptom_keywords)

        if has_symptoms and "symptom" in msg.lower():
            # Parse selected symptoms from message
            selected_symptoms = []
            symptom_list = ["Hair Loss", "Red Patches", "Itching", "Swelling", "Scaling", "Pus", "Inflammation", "Bald Patches"]
            
            for symptom in symptom_list:
                if symptom.lower() in msg.lower():
                    selected_symptoms.append(symptom)
            
            if selected_symptoms:
                matching_diseases = []
                
                # Calculate match score for each disease
                for disease_name, disease_info in DISEASE_INFO.items():
                    disease_symptoms_lower = [s.lower() for s in disease_info["symptoms"]]
                    selected_lower = [s.lower() for s in selected_symptoms]
                    
                    # Count exact and partial matches
                    match_count = 0
                    for sel_sym in selected_lower:
                        for dis_sym in disease_symptoms_lower:
                            if sel_sym in dis_sym or dis_sym in sel_sym:
                                match_count += 1
                                break
                    
                    if match_count > 0:
                        matching_diseases.append({
                            "name": disease_name.replace("_", " "),
                            "matches": match_count,
                            "symptoms": disease_info["symptoms"],
                            "precautions": disease_info["precautions"],
                            "remedies": disease_info["remedies"],
                            "recovery": disease_info["recovery_time"],
                            "severity": disease_info["severity"]
                        })
                
                if matching_diseases:
                    # Sort by match count and get top match
                    matching_diseases.sort(key=lambda x: x["matches"], reverse=True)
                    top_disease = matching_diseases[0]
                    
                    response = f"""**Most Likely Condition: {top_disease['name']}**
Severity: {top_disease['severity']}

📋 Symptoms Associated:
{chr(10).join('• ' + s for s in top_disease['symptoms'])}

🛡️ Precautions:
{chr(10).join('• ' + p for p in top_disease['precautions'])}

💊 Remedies:
{chr(10).join('• ' + r for r in top_disease['remedies'])}

⏱️ Expected Recovery: {top_disease['recovery']}

⚠️ Please consult a veterinarian for proper diagnosis and treatment."""
                    
                    return jsonify({"reply": response})

        # For other questions, use Ollama
        prompt = f"""You are a helpful veterinary chatbot.
Detected disease: {disease}
Context: {context}
User: {msg}

IMPORTANT: Format your response with:
- Clear bullet points using • symbol
- Short, readable sentences
- Organized sections
- Recommend vet consultation

Do NOT write long paragraphs."""

        return jsonify({"reply": ollama_generate(prompt)})
    except Exception as e:
        return jsonify({"reply": f"Chat error: {str(e)[:100]}"}), 500

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "device": str(DEVICE), "model": "Ready"})

if __name__ == "__main__":
    print("\n" + "="*50)
    print("🐶 DogCare AI - Starting...")
    print("="*50)
    print(f"Device: {DEVICE}")
    print(f"Classes: {NUM_CLASSES}")
    print(f"API Base: http://127.0.0.1:5000")
    print("="*50 + "\n")
    app.run(host="127.0.0.1", port=5000, debug=False)
