# 🐾 Pet Vaccination & Sterilization Tracker

A **frontend-only** React application for tracking dog vaccinations and sterilization records. All data is stored locally in the browser using localStorage - no backend required!

## ✨ Features

### 🐕 Dog Profile Management

- Add/edit/delete dog profiles
- Upload dog photos (stored as Base64)
- Track breed, age, gender, and more
- All data persists in localStorage

### 💉 Vaccination Tracking

- Add multiple vaccines per dog
- Track last vaccination date and next due date
- Add optional notes for each vaccine
- Choose from common vaccines (Rabies, DHPP, Leptospirosis, etc.)

### 💔 Sterilization Tracking

- Record sterilization status
- Track procedure date and veterinarian details
- Add post-care notes

### ⏰ Smart Reminder System

- **Real-time alerts** for vaccinations that are:
  - 🔴 **Overdue** (past due date)
  - 🟡 **Due Today**
  - 🟡 **Due Soon** (within 2 days)
- Color-coded badges (Green/Yellow/Red)
- Floating alert notifications

### 📊 Dashboard

- View all dogs in card layout
- Filter by status (All / Due Soon / Overdue)
- Quick statistics (total dogs, vaccinations, etc.)
- Expandable dog cards for detailed views
- Upcoming vaccinations section at the top

### 💾 LocalStorage Persistence

- All data stored locally in browser
- No internet connection needed
- No backend/API required
- Data survives page refreshes

## 🗂️ Project Structure

```
src/
├── pages/
│   └── VaccinationDashboard.jsx          # Main dashboard page
├── components/VaccinationTracker/
│   ├── DogForm.jsx                       # Form to add/edit dogs
│   ├── VaccinationForm.jsx               # Form to add/edit vaccines
│   ├── SterilizationTracker.jsx          # Sterilization management
│   ├── DogCard.jsx                       # Dog profile card
│   ├── VaccinationList.jsx               # List of vaccinations
│   ├── UpcomingVaccinations.jsx          # Upcoming alerts section
│   └── ReminderAlert.jsx                 # Floating alerts
├── hooks/
│   └── useLocalStorage.js                # Custom hook for localStorage
└── services/
    └── reminderService.js                # Reminder logic & utilities
```

## 🚀 Quick Start

### 1. Import the Dashboard in App.jsx

```jsx
import VaccinationDashboard from "./pages/VaccinationDashboard";

// In your App component:
<Route path="/vaccination-tracker" element={<VaccinationDashboard />} />;
```

### 2. Add Navigation Link

Add a link in your navbar to access the vaccination tracker:

```jsx
<Link to="/vaccination-tracker">Pet Health Tracker</Link>
```

### 3. No Additional Setup Needed!

- No backend installation
- No database configuration
- No API setup
- Just import and use!

## 📱 LocalStorage Data Structure

```javascript
// Dogs array stored as 'pet-care-dogs'
[
  {
    id: "1234567890",
    name: "Max",
    breed: "Golden Retriever",
    age: 3,
    gender: "male",
    image: "data:image/jpeg;base64,...", // Base64 encoded image
    vaccinations: [
      {
        id: "vaccine-1",
        name: "Rabies",
        lastDueDate: "2024-01-15",
        nextDueDate: "2025-01-15",
        notes: "Given at ABC Clinic",
      },
    ],
    sterilization: {
      isSterilized: true,
      date: "2023-06-20",
      veterinarian: "Dr. Smith",
      notes: "Recovery was smooth",
    },
  },
];
```

## 🎨 UI/UX Features

- **Modern Design**: Clean, gradient-based UI with Tailwind CSS
- **Smooth Animations**: Framer Motion animations for transitions
- **Responsive**: Works on mobile, tablet, and desktop
- **Color Coding**:
  - 🟢 Green = Safe (vaccination current)
  - 🟡 Yellow = Due Soon (within 2 days)
  - 🟠 Orange = Due Today
  - 🔴 Red = Overdue
- **Floating Alerts**: Top-right corner notifications for reminders

## 🔧 Key Functions (reminderService.js)

### `getReminderType(nextDueDate)`

Returns: 'overdue', 'due-today', 'due-soon', 'safe'

### `getReminderText(nextDueDate)`

Returns human-readable reminder text

### `getDaysUntilDue(nextDueDate)`

Returns number of days until vaccination is due

### `checkUpcomingVaccinations(dogs)`

Returns array of upcoming vaccines sorted by urgency

### `filterDogsByStatus(dogs, filterType)`

Filters dogs by: 'all', 'due-soon', 'overdue'

## 💡 Tips

1. **Upload Photos**: Photos are converted to Base64 for localStorage storage
2. **Backup Data**: Periodically export your dogs array as JSON
3. **Custom Vaccines**: Choose "Custom" to add vaccine types not in the list
4. **Offline First**: Works completely offline - no internet needed

## 🐛 Browser Support

- Chrome/Edge (Full support)
- Firefox (Full support)
- Safari (Full support)
- Any modern browser with localStorage support

## 📝 Example Usage

```jsx
// In your App.jsx
import VaccinationDashboard from "./pages/VaccinationDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Other routes... */}
        <Route path="/vaccination-tracker" element={<VaccinationDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## 🎯 Bonus Features Included

✅ Upcoming vaccinations section at top
✅ Filter by status (All/Due Soon/Overdue)
✅ Smooth animations with Framer Motion
✅ Real-time reminder alerts
✅ Statistics dashboard (total dogs, vaccines, etc.)
✅ Expandable dog cards for detailed views
✅ Delete confirmation dialogs
✅ Image upload & preview

## 🏆 Hackathon Ready

- No backend complexity
- Instant performance (localStorage)
- Modern, polished UI
- Fully responsive design
- Impressive animations
- Real-world use case

---

**No Backend. No Database. Just Pure React Magic! 🚀**
