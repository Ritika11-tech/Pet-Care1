/**
 * Reminder Service - Checks vaccination status and returns appropriate alerts
 */

const REMINDER_TYPES = {
  OVERDUE: 'overdue',
  DUE_TODAY: 'due-today',
  DUE_SOON: 'due-soon',
  SAFE: 'safe'
}

const STATUS_COLORS = {
  overdue: 'red',
  'due-today': 'amber',
  'due-soon': 'yellow',
  safe: 'green'
}

/**
 * Calculate days until vaccination is due
 */
export const getDaysUntilDue = (nextDueDate) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const dueDate = new Date(nextDueDate)
  dueDate.setHours(0, 0, 0, 0)
  
  const diffTime = dueDate - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  return diffDays
}

/**
 * Get reminder type based on next due date
 */
export const getReminderType = (nextDueDate) => {
  const daysUntil = getDaysUntilDue(nextDueDate)
  
  if (daysUntil < 0) return REMINDER_TYPES.OVERDUE
  if (daysUntil === 0) return REMINDER_TYPES.DUE_TODAY
  if (daysUntil <= 2) return REMINDER_TYPES.DUE_SOON
  return REMINDER_TYPES.SAFE
}

/**
 * Get reminder text for display
 */
export const getReminderText = (nextDueDate) => {
  const daysUntil = getDaysUntilDue(nextDueDate)
  
  if (daysUntil < 0) {
    return `Overdue by ${Math.abs(daysUntil)} day${Math.abs(daysUntil) > 1 ? 's' : ''}`
  }
  if (daysUntil === 0) return 'Due Today'
  if (daysUntil === 1) return 'Due Tomorrow'
  if (daysUntil <= 2) return `Due in ${daysUntil} days`
  return `Due on ${new Date(nextDueDate).toLocaleDateString()}`
}

/**
 * Get color class for Tailwind based on reminder type
 */
export const getColorClass = (reminderType) => {
  const colors = {
    overdue: 'bg-red-100 text-red-800 border-red-300',
    'due-today': 'bg-amber-100 text-amber-800 border-amber-300',
    'due-soon': 'bg-yellow-100 text-yellow-800 border-yellow-300',
    safe: 'bg-green-100 text-green-800 border-green-300'
  }
  return colors[reminderType] || colors.safe
}

/**
 * Get badge background color
 */
export const getBadgeColor = (reminderType) => {
  const colors = {
    overdue: 'bg-red-500',
    'due-today': 'bg-amber-500',
    'due-soon': 'bg-yellow-500',
    safe: 'bg-green-500'
  }
  return colors[reminderType] || colors.safe
}

/**
 * Check all dogs and return ones needing attention
 */
export const checkUpcomingVaccinations = (dogs) => {
  const upcoming = []

  dogs.forEach(dog => {
    if (!dog.vaccinations || dog.vaccinations.length === 0) return

    dog.vaccinations.forEach(vaccine => {
      const reminderType = getReminderType(vaccine.nextDueDate)
      
      // Include overdue, due today, and due soon
      if ([REMINDER_TYPES.OVERDUE, REMINDER_TYPES.DUE_TODAY, REMINDER_TYPES.DUE_SOON].includes(reminderType)) {
        upcoming.push({
          dogId: dog.id,
          dogName: dog.name,
          vaccineName: vaccine.name,
          nextDueDate: vaccine.nextDueDate,
          reminderType,
          reminderText: getReminderText(vaccine.nextDueDate)
        })
      }
    })
  })

  return upcoming.sort((a, b) => getDaysUntilDue(a.nextDueDate) - getDaysUntilDue(b.nextDueDate))
}

/**
 * Filter dogs based on vaccine status
 */
export const filterDogsByStatus = (dogs, filterType) => {
  if (filterType === 'all') return dogs

  return dogs.filter(dog => {
    if (!dog.vaccinations || dog.vaccinations.length === 0) {
      return filterType === 'all'
    }

    const hasStatus = dog.vaccinations.some(vaccine => {
      const reminderType = getReminderType(vaccine.nextDueDate)
      
      if (filterType === 'due-soon') {
        return [REMINDER_TYPES.OVERDUE, REMINDER_TYPES.DUE_TODAY, REMINDER_TYPES.DUE_SOON].includes(reminderType)
      }
      if (filterType === 'overdue') {
        return reminderType === REMINDER_TYPES.OVERDUE
      }
      return true
    })

    return hasStatus
  })
}
