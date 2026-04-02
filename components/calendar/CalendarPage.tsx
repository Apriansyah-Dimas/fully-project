'use client'

import { useEffect, useState, useCallback } from 'react'
import { getCalendarEvents, type CalendarEvent } from '@/lib/supabase'

const CATEGORY_COLORS = {
  meeting: '#22c55e',
  training: '#3b82f6',
  townhall: '#eab308',
  workshop: '#f97316',
  holiday: '#ef4444',
} as const

const CATEGORY_COLORS_LIGHT = {
  meeting: 'oklch(0.92 0.06 145)',
  training: 'oklch(0.94 0.05 250)',
  townhall: 'oklch(0.96 0.08 85)',
  workshop: 'oklch(0.95 0.08 45)',
  holiday: 'oklch(0.95 0.08 25)',
} as const

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const DAY_NAMES_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Helper function to parse YYYY-MM-DD as local date (avoiding timezone issues)
const parseEventDate = (dateStr: string): Date => {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day)
}

// Helper function to format date as YYYY-MM-DD (local timezone)
const formatDateKey = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [selectedDateEvents, setSelectedDateEvents] = useState<CalendarEvent[]>([])
  const [showModal, setShowModal] = useState(false)
  const [modalDate, setModalDate] = useState('')
  const [hoveredDay, setHoveredDay] = useState<{ day: number; events: CalendarEvent[] } | null>(null)
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    console.log('[Calendar] Loading events...')
    const data = await getCalendarEvents()
    console.log('[Calendar] Events loaded:', data.length, data)

    // Debug: Log each event's date parsing
    data.forEach(event => {
      const parsed = parseEventDate(event.event_date)
      console.log('[Calendar] Event:', event.title, 'DB date:', event.event_date, 'Parsed:', parsed.toDateString())
    })

    setEvents(data)
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    return { firstDay, daysInMonth }
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const getEventsForDateCallback = useCallback((date: Date) => {
    const dateKey = formatDateKey(date)
    console.log('[Calendar] Checking events for date:', date.toDateString(), 'key:', dateKey)

    const matchedEvents = events.filter(event => {
      // Direct string comparison avoids timezone issues
      const matches = event.event_date === dateKey
      if (matches) {
        console.log('[Calendar] ✓ Matched event:', event.title, 'event_date:', event.event_date)
      }
      return matches
    })

    console.log('[Calendar] Found', matchedEvents.length, 'events for', date.toDateString())
    return matchedEvents
  }, [events])

  const handleDateMouseEnter = (day: number, dayEvents: CalendarEvent[]) => {
    console.log('[Calendar] Hover day:', day, 'events:', dayEvents.length)
    if (dayEvents.length > 0) {
      setHoveredDay({ day, events: dayEvents })
    }
  }

  const handleDateMouseLeave = () => {
    setHoveredDay(null)
  }

  const handleMouseMove = (e: MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY })
  }

  // Track cursor position globally when hovering
  useEffect(() => {
    if (hoveredDay) {
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [hoveredDay])

  const handleDateClick = (date: Date, dayEvents: CalendarEvent[]) => {
    if (dayEvents.length > 0) {
      setModalDate(date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }))
      setSelectedDateEvents(dayEvents)
      setShowModal(true)
    }
  }

  const { firstDay, daysInMonth } = getDaysInMonth(currentDate)
  const today = new Date()
  const todayKey = formatDateKey(new Date())

  const upcomingEvents = [...events]
    .filter(event => event.event_date >= todayKey)
    .sort((a, b) => a.event_date.localeCompare(b.event_date))
    .slice(0, 5)

  console.log('[Calendar] Today key:', todayKey, 'Upcoming events:', upcomingEvents.length)

  return (
    <div className="calendar-wrapper">
      {/* Main Calendar Card */}
      <div className="calendar-card">
        <div className="calendar-header">
          <div className="date-display">
            <span className="current-date">
              {String(today.getDate()).padStart(2, '0')} {MONTH_NAMES[currentDate.getMonth()].toUpperCase()} {today.getFullYear()}
            </span>
          </div>
          <div className="nav-controls">
            <button className="nav-btn" onClick={previousMonth} aria-label="Previous month">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="14 6 8 12 14 18" />
              </svg>
            </button>
            <button className="today-btn" onClick={goToToday}>Today</button>
            <button className="nav-btn" onClick={nextMonth} aria-label="Next month">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="10 6 16 12 10 18" />
              </svg>
            </button>
          </div>
        </div>

        <div className="calendar-grid-wrapper">
          <div className="calendar-grid">
          {DAY_NAMES_SHORT.map((day, i) => (
            <div key={i} className="weekday-label">{day}</div>
          ))}

          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="day-cell empty" />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const currentDateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
            const isToday = day === today.getDate() &&
                           currentDate.getMonth() === today.getMonth() &&
                           currentDate.getFullYear() === today.getFullYear()
            const dayEvents = getEventsForDateCallback(currentDateObj)

            return (
              <div
                key={day}
                className={`day-cell ${isToday ? 'today' : ''} ${dayEvents.length > 0 ? 'has-events' : ''}`}
                onMouseEnter={() => dayEvents.length > 0 && handleDateMouseEnter(day, dayEvents)}
                onMouseLeave={handleDateMouseLeave}
                onClick={() => handleDateClick(currentDateObj, dayEvents)}
              >
                <span className="day-number">{day}</span>
                {dayEvents.length > 0 && (
                  <div className="event-indicators">
                    {dayEvents.slice(0, 3).map((event, idx) => (
                      <div
                        key={idx}
                        className="event-dot"
                        style={{ backgroundColor: CATEGORY_COLORS[event.category] }}
                      />
                    ))}
                    {dayEvents.length > 3 && (
                      <span className="more-indicator">+{dayEvents.length - 3}</span>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        </div>
      </div>

      {/* Upcoming Events Sidebar */}
      <div className="sidebar">
        <h3 className="sidebar-title">Upcoming</h3>
        <div className="events-list">
          {upcomingEvents.length === 0 ? (
            <div className="empty-state">No upcoming events</div>
          ) : (
            upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="event-item"
                onClick={() => {
                  const eventDate = new Date(event.event_date)
                  setModalDate(eventDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }))
                  setSelectedDateEvents([event])
                  setShowModal(true)
                }}
              >
                <div className="event-chip" style={{ backgroundColor: CATEGORY_COLORS[event.category] }}>
                  {event.category.charAt(0).toUpperCase()}
                </div>
                <div className="event-details">
                  <span className="event-name">{event.title}</span>
                  <span className="event-date-str">
                    {new Date(event.event_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    {event.event_time && ` · ${event.event_time}`}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Hover Preview Card - Follows Cursor */}
      {hoveredDay && hoveredDay.events.length > 0 && (
        <div
          className="hover-preview cursor-following"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y - 15}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="preview-header">
            <span className="preview-day">{hoveredDay.day}</span>
            <span className="preview-count">{hoveredDay.events.length} event{hoveredDay.events.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="preview-events">
            {hoveredDay.events.map((event) => (
              <div key={event.id} className="preview-event">
                <div
                  className="preview-event-line"
                  style={{ backgroundColor: CATEGORY_COLORS[event.category] }}
                />
                <div className="preview-event-content">
                  <span className="preview-event-title">{event.title}</span>
                  {event.event_time && (
                    <span className="preview-event-time">{event.event_time}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <>
          <div className="modal-backdrop" onClick={() => setShowModal(false)} />
          <div className="modal">
            <div className="modal-header">
              <span className="modal-date">{modalDate}</span>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="modal-events">
              {selectedDateEvents.map((event) => (
                <div key={event.id} className="modal-event">
                  <div className="modal-event-header">
                    <div
                      className="modal-category-badge"
                      style={{ backgroundColor: CATEGORY_COLORS[event.category] }}
                    >
                      {event.category}
                    </div>
                    {event.event_time && (
                      <span className="modal-event-time">{event.event_time}</span>
                    )}
                  </div>
                  <h4 className="modal-event-title">{event.title}</h4>
                  {event.description && (
                    <p className="modal-event-description">{event.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
