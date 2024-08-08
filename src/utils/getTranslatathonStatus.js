import { formatDistanceToNow } from 'date-fns'

export const getEventStatus = () => {
  const currentDate = new Date()
  const eventEndDate = new Date('2024-08-19')

  if (currentDate > eventEndDate) {
    return 'The Translatathon has finished 🎉'
  } else {
    const timeRemaining = formatDistanceToNow(eventEndDate, {
      addSuffix: true,
    })
    return `Translatathon ends in ${timeRemaining} 🏆`
  }
}
