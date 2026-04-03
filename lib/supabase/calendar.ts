import { createClient } from './client'
import type { CalendarEvent } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!

// Database functions for calendar events
export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  const supabase = createClient()
  console.log('[Supabase] Fetching events from table: calendar_events')
  console.log('[Supabase] URL:', supabaseUrl)

  try {
    const { data, error } = await supabase
      .from('calendar_events')
      .select('*')
      .order('event_date', { ascending: true })

    if (error) {
      console.error('[Supabase] Error fetching calendar events:', error)
      console.error('[Supabase] Error code:', error.code)
      console.error('[Supabase] Error message:', error.message)
      console.error('[Supabase] Error details:', error.details)
      return []
    }

    console.log('[Supabase] Raw data from DB:', data)
    console.log('[Supabase] Data length:', data?.length)
    return data || []
  } catch (err) {
    const error = err as Error
    console.error('[Supabase] Network error:', error.message)
    console.error('[Supabase] This usually means:')
    console.error('[Supabase] 1. Your Supabase project is PAUSED (check supabase.com/dashboard)')
    console.error('[Supabase] 2. Network/firewall is blocking the request')
    console.error('[Supabase] 3. The Supabase URL is incorrect')
    return []
  }
}

export async function getEventsForDate(date: Date): Promise<CalendarEvent[]> {
  const supabase = createClient()
  const dateStr = date.toISOString().split('T')[0]
  const { data, error } = await supabase
    .from('calendar_events')
    .select('*')
    .eq('event_date', dateStr)
    .order('event_time', { ascending: true })

  if (error) {
    console.error('Error fetching events for date:', error)
    return []
  }

  return data || []
}

export async function createCalendarEvent(event: Omit<CalendarEvent, 'id' | 'created_at' | 'updated_at'>): Promise<CalendarEvent | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('calendar_events')
    .insert(event)
    .select()
    .single()

  if (error) {
    console.error('Error creating calendar event:', error)
    return null
  }

  return data
}
