'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { getCalendarEvents, type CalendarEvent } from '@/lib/supabase'
import { SafeContentZone } from '@/components/templates/SafeContentZone'

const CATEGORY_COLORS = {
  meeting: '#00d4aa',
  training: '#6365b9',
  townhall: '#ffb700',
  workshop: '#ff6b35',
  holiday: '#ff4444',
} as const

// Define consistent design tokens
const designTokens = {
  primary: '#000000',
  secondary: '#6b6b80',
  background: '#ffffff',
  card: '#f9f9f7',
  shadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
  border: '#000000',
  hover: '#f5f5f5',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const DAY_NAMES = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const CATEGORY_LABELS: Record<string, string> = {
  meeting: 'MEETING',
  training: 'TRAINING',
  townhall: 'TOWN HALL',
  workshop: 'WORKSHOP',
  holiday: 'HOLIDAY',
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedDateEvents, setSelectedDateEvents] = useState<CalendarEvent[]>([])
  const [showEventModal, setShowEventModal] = useState(false)

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    const data = await getCalendarEvents()
    setEvents(data)
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    return { firstDay, daysInMonth }
  }

  const getEventsForDate = (day: number) => {
    return events.filter(event => {
      const eventDate = new Date(event.event_date)
      return eventDate.getDate() === day &&
             eventDate.getMonth() === currentDate.getMonth() &&
             eventDate.getFullYear() === currentDate.getFullYear()
    })
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const handleDateClick = (day: number, dayEvents: CalendarEvent[]) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    setSelectedDate(clickedDate)
    setSelectedDateEvents(dayEvents)
    if (dayEvents.length > 0) {
      setShowEventModal(true)
    }
  }

  const { firstDay, daysInMonth } = getDaysInMonth(currentDate)
  const today = new Date()
  const isCurrentMonth = today.getMonth() === currentDate.getMonth() && 
                         today.getFullYear() === currentDate.getFullYear()

  const upcomingEvents = [...events]
    .filter(event => new Date(event.event_date) >= new Date(today.setHours(0, 0, 0, 0)))
    .sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime())
    .slice(0, 5)

  return (
    <>
      <SafeContentZone disableMaxHeight>
        <div className="max-w-7xl mx-auto w-full overflow-visible px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">

          {/* Main Calendar */}
          <div className="lg:col-span-8 w-full">
            <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border-2 border-black overflow-visible">
              {/* Header */}
              <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-black">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">
                    {MONTH_NAMES[currentDate.getMonth()]}
                  </h2>
                  <p className="text-sm font-medium text-[var(--login-text-muted)]">
                    {currentDate.getFullYear()}
                  </p>
                </div>

                {/* Navigation */}
                <div className="flex items-center">
                  <motion.button
                    onClick={previousMonth}
                    whileHover={{ scale: 0.95 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 flex items-center justify-center border-2 border-black hover:bg-black hover:text-white transition-colors duration-200 rounded-l-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </motion.button>
                  <motion.button
                    onClick={goToToday}
                    whileHover={{ scale: 0.95 }}
                    whileTap={{ scale: 0.9 }}
                    className="h-12 px-5 flex items-center justify-center border-y-2 border-black text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors duration-200"
                  >
                    TODAY
                  </motion.button>
                  <motion.button
                    onClick={nextMonth}
                    whileHover={{ scale: 0.95 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 flex items-center justify-center border-2 border-black hover:bg-black hover:text-white transition-colors duration-200 rounded-r-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <polyline points="9 6 15 12 9 18" />
                    </svg>
                  </motion.button>
                </div>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 px-4 pt-4">
                {DAY_NAMES.map(day => (
                  <div
                    key={day}
                    className="text-center text-xs font-bold tracking-widest text-[var(--login-text-muted)] uppercase py-3"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="px-4 pb-4">
                <div className="grid grid-cols-7 gap-1">
                  {/* Empty cells */}
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="h-12" />
                  ))}

                  {/* Days */}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1
                    const isToday = isCurrentMonth && day === today.getDate()
                    const dayEvents = getEventsForDate(day)

                    return (
                      <motion.button
                        key={day}
                        onClick={() => handleDateClick(day, dayEvents)}
                        whileHover={{ backgroundColor: 'oklch(0.95 0.01 85)' }}
                        whileTap={{ scale: 0.9 }}
                        className={`
                          h-12 px-1 flex flex-col items-center justify-center relative rounded-lg
                          transition-all duration-200
                          ${isToday ? 'bg-black' : ''}
                        `}
                      >
                        <span className={`text-base font-bold ${isToday ? 'text-white' : 'text-black'}`}>
                          {day}
                        </span>
                        {dayEvents.length > 0 && (
                          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                            {dayEvents.slice(0, 3).map((event, idx) => (
                              <div
                                key={idx}
                                className="w-1.5 h-1.5 rounded-full"
                                style={{
                                  backgroundColor: isToday ? '#fff' : CATEGORY_COLORS[event.category]
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 px-5 pb-5 justify-center">
                {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                  <div key={key} className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: CATEGORY_COLORS[key as keyof typeof CATEGORY_COLORS] }}
                    />
                    <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--login-text-muted)]">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 w-full flex flex-col gap-5">
            {/* Upcoming Events Card */}
            <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border-2 border-black p-5">
              <h3 className="text-base font-bold tracking-tight mb-1">UPCOMING</h3>
              <p className="text-xs font-medium text-[var(--login-text-muted)] mb-4">
                {upcomingEvents.length} event{upcomingEvents.length !== 1 ? 's' : ''}
              </p>

              <div className="flex flex-col gap-3 max-h-[200px] overflow-y-auto">
                {upcomingEvents.length === 0 ? (
                  <p className="text-xs text-[var(--login-text-muted)]">No upcoming events</p>
                ) : (
                  upcomingEvents.slice(0, 5).map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center gap-3 p-3 rounded-lg border border-[rgba(0,0,0,0.05)] hover:border-[var(--login-accent-primary)] cursor-pointer transition-all"
                    >
                      <div className="flex flex-col items-center min-w-[28px]">
                        <span className="text-[10px] font-bold text-[var(--login-text-muted)]">
                          {new Date(event.event_date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                        </span>
                        <span className="text-base font-bold text-black">
                          {new Date(event.event_date).getDate()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-black text-xs leading-tight truncate">
                          {event.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className="text-[9px] font-bold uppercase px-2 py-0.5 rounded"
                            style={{
                              backgroundColor: CATEGORY_COLORS[event.category],
                              color: '#fff'
                            }}
                          >
                            {event.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Today's Date Card */}
            <div className="bg-black rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-5 text-white">
              <p className="text-xs font-bold tracking-widest text-gray-400 mb-2">TODAY</p>
              <p className="text-4xl font-black text-white">{today.getDate()}</p>
              <p className="text-base font-medium text-gray-300">{DAY_NAMES[today.getDay()]}</p>
              <p className="text-xs text-gray-500 mt-1">
                {MONTH_NAMES[today.getMonth()]} {today.getFullYear()}
              </p>
            </div>
          </div>
        </div>
        </div>
      </SafeContentZone>

    {/* Event Modal */}
    <AnimatePresence>
      {showEventModal && selectedDate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowEventModal(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 50 }}
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] w-full max-w-2xl overflow-hidden border-2 border-black"
          >
            {/* Modal Header */}
            <motion.div
              className="bg-black p-6 flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex-1">
                <p className="text-white text-lg font-bold uppercase tracking-wide mb-1">
                  {selectedDate!.toLocaleDateString('en-US', { weekday: 'long' })}
                </p>
                <p className="text-white text-sm opacity-80">
                  {selectedDate!.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <motion.button
                onClick={() => setShowEventModal(false)}
                className="text-white hover:text-gray-300 text-3xl leading-none transition-colors flex-shrink-0"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </motion.button>
            </motion.div>

            {/* Modal Content */}
            <motion.div
              className="p-6 max-h-[60vh] overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {selectedDateEvents.length === 0 ? (
                <motion.p
                  className="text-[var(--login-text-muted)] text-center py-12 text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  No events on this date
                </motion.p>
              ) : (
                <div className="space-y-4">
                  {selectedDateEvents.map((event, idx) => (
                    <motion.div
                      key={event.id}
                      className="p-6 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
                      style={{
                        backgroundColor: 'oklch(0.99 0.002 85)',
                        borderLeft: `4px solid ${CATEGORY_COLORS[event.category]}`
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + idx * 0.05 }}
                      whileHover={{
                        transform: 'translateX(8)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
                      }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-black">{event.title}</h3>
                        <span
                          className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                          style={{
                            backgroundColor: CATEGORY_COLORS[event.category],
                            color: '#fff'
                          }}
                        >
                          {event.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 mb-4 text-sm">
                        <span className="font-medium text-black">
                          {event.event_time || 'All day'}
                        </span>
                      </div>

                      {event.description && (
                        <motion.p
                          className="text-sm text-gray-600 leading-relaxed"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 + idx * 0.05 }}
                        >
                          {event.description}
                        </motion.p>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}
