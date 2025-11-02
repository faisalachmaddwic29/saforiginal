import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/id'

dayjs.extend(relativeTime)
dayjs.locale('id') // Bahasa Indonesia

export const timeAgo = (date: string | Date) => {
  return dayjs(date).fromNow()
}