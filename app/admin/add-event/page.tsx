'use client'

import { useState } from 'react'
import { supabase, createCalendarEvent } from '@/lib/supabase'

type EventCategory = 'meeting' | 'training' | 'townhall' | 'workshop' | 'holiday'

interface CalendarEvent {
  title: string
  description: string
  category: EventCategory
  event_date: string
  event_time: string
}

const CATEGORIES: EventCategory[] = ['meeting', 'training', 'townhall', 'workshop', 'holiday']

function getTomorrowDate(): string {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const year = tomorrow.getFullYear()
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0')
  const day = String(tomorrow.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export default function CalendarAdminPage() {
  const [title, setTitle] = useState('Team Meeting')
  const [description, setDescription] = useState('Weekly team sync')
  const [category, setCategory] = useState<EventCategory>('meeting')
  const [eventDate, setEventDate] = useState(getTomorrowDate())
  const [eventTime, setEventTime] = useState('10:00')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    console.log('Submitting event:', { title, description, category, event_date: eventDate, event_time: eventTime })

    const event = {
      title,
      description,
      category,
      event_date: eventDate,
      event_time: eventTime || null,
    }

    console.log('Event to insert:', JSON.stringify(event))

    const result = await createCalendarEvent(event)

    setLoading(false)

    if (!result) {
      setError('Failed to create event. Check console for details.')
    } else {
      setMessage(`Success! Event "${result.title}" added for ${result.event_date}`)
      setTitle('')
      setDescription('')
      setCategory('meeting')
      setEventTime('')
    }
  }

  const handleTestInsert = async () => {
    setLoading(true)
    setMessage('')
    setError('')

    const testEvent = {
      title: 'Test Meeting',
      description: 'Test description',
      category: 'meeting' as const,
      event_date: '2026-04-03',
      event_time: '14:00',
    }

    console.log('Testing insert with:', testEvent)

    try {
      const result = await supabase
        .from('calendar_events')
        .insert(testEvent)
        .select()

      console.log('Direct insert result:', result)
      console.log('Error details:', JSON.stringify(result.error))

      setLoading(false)

      if (result.error) {
        setError(`Direct insert error: ${result.error.message || JSON.stringify(result.error)}`)
        console.error('Direct insert error:', result.error)
      } else {
        setMessage(`Direct insert success! Data: ${JSON.stringify(result.data)}`)
      }
    } catch (err: any) {
      setLoading(false)
      setError(`Exception: ${err.message || err}`)
      console.error('Exception:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Add Calendar Event</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded"
              placeholder="Event title"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded"
              placeholder="Optional description"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as EventCategory)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Date (Tomorrow: {getTomorrowDate()})</label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Time (optional)</label>
            <input
              type="time"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded font-medium disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Event'}
          </button>

          <button
            type="button"
            onClick={handleTestInsert}
            disabled={loading}
            className="w-full py-2 bg-green-600 hover:bg-green-700 rounded font-medium disabled:opacity-50 mt-2"
          >
            {loading ? 'Testing...' : 'Test Direct Insert'}
          </button>

          {message && (
            <div className="p-3 bg-green-900 text-green-300 rounded">{message}</div>
          )}
          {error && (
            <div className="p-3 bg-red-900 text-red-300 rounded">{error}</div>
          )}
        </form>
      </div>
    </div>
  )
}