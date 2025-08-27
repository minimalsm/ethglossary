import { END_DATE } from '@/lib/constants'
import { formatDistanceToNow } from 'date-fns'

export const getEventStatus = () => {
  const currentDate = new Date()
  const eventEndDate = new Date(END_DATE)
  eventEndDate.setDate(eventEndDate.getDate() + 1)

  if (currentDate > eventEndDate) {
    return 'The Translatathon has finished 🎉'
  } else {
    const timeRemaining = formatDistanceToNow(eventEndDate, {
      addSuffix: true,
    })
    return `Translatathon ends in ${timeRemaining} 🏆`
  }
}
