import emailjs from '@emailjs/browser'

/**
 * Email Service for sending vaccination reminders
 * Uses EmailJS for frontend-only email sending (no backend required)
 * 
 * Setup required:
 * 1. Go to https://www.emailjs.com/
 * 2. Create free account
 * 3. Create email service (Gmail recommended)
 * 4. Create email template
 * 5. Get your Service ID, Template ID, and Public Key
 */

// Initialize EmailJS (replace with your actual public key)
const EMAILJS_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY'
const EMAILJS_SERVICE_ID = 'gmail' // or your service ID
const EMAILJS_TEMPLATE_ID = 'template_pet_vaccination' // your template ID

// Check if EmailJS is initialized
const isEmailJSConfigured = () => {
  return EMAILJS_PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY'
}

/**
 * Initialize EmailJS service
 */
export const initializeEmailJS = () => {
  if (isEmailJSConfigured()) {
    try {
      emailjs.init(EMAILJS_PUBLIC_KEY)
      console.log('✅ EmailJS initialized')
      return true
    } catch (error) {
      console.error('❌ EmailJS init failed:', error)
      return false
    }
  }
  console.warn('⚠️ EmailJS not configured - using mock email service')
  return false
}

/**
 * Send vaccination reminder email
 */
export const sendVaccinationReminderEmail = async (emailData) => {
  const {
    userEmail,
    userName,
    dogName,
    vaccineName,
    nextDueDate,
    breed
  } = emailData

  // If EmailJS not configured, use mock service
  if (!isEmailJSConfigured()) {
    return sendMockEmail(emailData)
  }

  try {
    const templateParams = {
      to_email: userEmail,
      user_name: userName || 'Pet Owner',
      dog_name: dogName,
      vaccine_name: vaccineName,
      dog_breed: breed || 'Unknown',
      due_date: new Date(nextDueDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      message: `Your pet ${dogName} needs ${vaccineName} vaccination!`
    }

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    )

    if (response.status === 200) {
      console.log('✅ Email sent successfully:', response)
      return {
        success: true,
        message: `Email notification sent to ${userEmail}`,
        email: userEmail
      }
    }
  } catch (error) {
    console.error('❌ Email send failed:', error)
    return {
      success: false,
      message: 'Failed to send email, but reminder is set locally',
      error: error.message
    }
  }
}

/**
 * Mock email service for demo/testing
 * Shows realistic email in browser while actual sending is in progress
 */
const sendMockEmail = async (emailData) => {
  const { userEmail, dogName, vaccineName, nextDueDate } = emailData

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('📧 [MOCK EMAIL SENT]')
      console.log(`To: ${userEmail}`)
      console.log(`Subject: 🐾 Vaccination Reminder: ${dogName} needs ${vaccineName}!`)
      console.log(`---`)
      console.log(`Dear Pet Owner,`)
      console.log(``)
      console.log(`This is a reminder that your dog ${dogName} needs ${vaccineName} vaccination!`)
      console.log(``)
      console.log(`Due Date: ${new Date(nextDueDate).toLocaleDateString()}`)
      console.log(``)
      console.log(`Please contact your veterinarian to schedule the appointment.`)
      console.log(`---`)

      resolve({
        success: true,
        message: `✅ Notification sent to ${userEmail} (using mock service)`,
        email: userEmail,
        isMocked: true
      })
    }, 800)
  })
}

/**
 * Send test email to verify configuration
 */
export const sendTestEmail = async (testEmail) => {
  return sendVaccinationReminderEmail({
    userEmail: testEmail,
    userName: 'Test User',
    dogName: 'Test Dog',
    vaccineName: 'Rabies',
    nextDueDate: new Date().toISOString().split('T')[0],
    breed: 'Test Breed'
  })
}
