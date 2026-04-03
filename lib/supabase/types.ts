// Types for database
export interface CalendarEvent {
  id: string
  title: string
  description: string | null
  category: 'meeting' | 'training' | 'townhall' | 'workshop' | 'holiday'
  event_date: string
  event_time: string | null
  created_at: string
  updated_at: string
}
