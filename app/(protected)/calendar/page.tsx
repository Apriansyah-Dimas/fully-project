'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { getCalendarEvents, type CalendarEvent } from '@/lib/supabase'

const CATEGORY_COLORS = {
  meeting: '#262626',
  training: '#525252',
  townhall: '#737373',
  workshop: '#a3a3a3',
  holiday: '#d4d4d4',
} as const

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
      <main className="w-full h-full flex items-center justify-center scale-90">
        <div className="flex flex-col lg:flex-row gap-8 justify-center items-start w-full max-w-5xl">
          
          {/* Calendar Card */}
          <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-6 flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-black">
                  {MONTH_NAMES[currentDate.getMonth()].toUpperCase()}
                </h2>
                <p className="text-sm text-gray-500 font-medium">
                  {currentDate.getFullYear()}
                </p>
              </div>
              
              {/* Navigation */}
              <div className="flex items-center gap-0">
                <button 
                  onClick={previousMonth}
                  className="w-10 h-10 flex items-center justify-center border-2 border-black hover:bg-black hover:text-white transition-colors duration-200 rounded-l-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button 
                  onClick={goToToday}
                  className="h-10 px-4 flex items-center justify-center border-y-2 border-black text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors duration-200"
                >
                  TODAY
                </button>
                <button 
                  onClick={nextMonth}
                  className="w-10 h-10 flex items-center justify-center border-2 border-black hover:bg-black hover:text-white transition-colors duration-200 rounded-r-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <polyline points="9 6 15 12 9 18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
              {DAY_NAMES.map(day => (
                <div key={day} className="text-center text-xs font-bold tracking-widest text-gray-400 py-2 uppercase">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells */}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
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
                    whileHover={{ backgroundColor: '#f5f5f5' }}
                    whileTap={{ scale: 0.95 }}
                    className={`aspect-square p-1 flex flex-col items-center justify-start transition-colors relative rounded-lg ${
                      isToday ? 'bg-black' : ''
                    }`}
                  >
                    <span className={`text-sm font-bold ${isToday ? 'text-white' : 'text-black'}`}>
                      {day}
                    </span>
                    
                    {dayEvents.length > 0 && (
                      <div className="flex gap-0.5 mt-auto">
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

            {/* Legend */}
            <div className="flex flex-wrap gap-3 mt-4 justify-center">
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <div key={key} className="flex items-center gap-1.5">
                  <div 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: CATEGORY_COLORS[key as keyof typeof CATEGORY_COLORS] }}
                  />
                  <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Cards */}
          <div className="flex flex-col gap-6 w-full lg:w-80">
            {/* Upcoming Events Card */}
            <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-6">
              <h3 className="text-lg font-bold tracking-tight mb-1">UPCOMING</h3>
              <p className="text-xs text-gray-500 mb-4">
                {upcomingEvents.length} event{upcomingEvents.length !== 1 ? 's' : ''}
              </p>

              <div className="flex flex-col gap-3">
                {upcomingEvents.length === 0 ? (
                  <p className="text-gray-400 text-sm">No upcoming events</p>
                ) : (
                  upcomingEvents.map(event => (
                    <motion.div
                      key={event.id}
                      whileHover={{ x: 4 }}
                      className="group cursor-pointer pb-3 border-b border-gray-100 last:border-0 last:pb-0"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex flex-col items-center min-w-[36px]">
                          <span className="text-[10px] font-bold text-gray-400">
                            {new Date(event.event_date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                          </span>
                          <span className="text-xl font-bold text-black">
                            {new Date(event.event_date).getDate()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-black text-sm leading-tight truncate">
                            {event.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span 
                              className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5"
                              style={{ 
                                backgroundColor: CATEGORY_COLORS[event.category],
                                color: '#fff'
                              }}
                            >
                              {event.category}
                            </span>
                            {event.event_time && (
                              <span className="text-[10px] text-gray-400">
                                {event.event_time}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* Today's Date Card */}
            <div className="bg-black rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-6 text-white">
              <p className="text-xs font-bold tracking-widest text-gray-400 mb-1">TODAY</p>
              <p className="text-4xl font-bold">{today.getDate()}</p>
              <p className="text-base font-medium text-gray-300 mt-1">
                {DAY_NAMES[today.getDay()]}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {MONTH_NAMES[today.getMonth()]} {today.getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Event Modal */}
      <AnimatePresence>
        {showEventModal && selectedDate && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEventModal(false)}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] w-full max-w-sm overflow-hidden"
            >
              <div className="bg-black p-4 flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-bold uppercase tracking-wider">
                    {selectedDate!.toLocaleDateString('en-US', { weekday: 'long' })}
                  </p>
                  <p className="text-white text-xs text-gray-400">
                    {selectedDate!.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <button 
                  onClick={() => setShowEventModal(false)}
                  className="text-white hover:text-gray-300 text-2xl leading-none"
                >
                  ×
                </button>
              </div>
              
              <div className="p-5">
                {selectedDateEvents.length === 0 ? (
                  <p className="text-gray-400 text-center">No events</p>
                ) : (
                  <div className="space-y-3">
                    {selectedDateEvents.map(event => (
                      <div 
                        key={event.id}
                        className="border-l-4 pl-4 py-2"
                        style={{ borderColor: CATEGORY_COLORS[event.category] }}
                      >
                        <p className="font-bold text-black">{event.title}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-gray-500">{event.event_time || 'All day'}</span>
                          <span 
                            className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5"
                            style={{ 
                              backgroundColor: CATEGORY_COLORS[event.category],
                              color: '#fff'
                            }}
                          >
                            {event.category}
                          </span>
                        </div>
                        {event.description && (
                          <p className="text-xs text-gray-600 mt-2">{event.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
