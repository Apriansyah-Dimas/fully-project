'use client'

import { CalendarPage } from '@/components/calendar/CalendarPage'

export function CalendarView() {
  return (
    <main className="absolute inset-x-0 top-[120px] bottom-16 flex items-center justify-center px-4 z-10">
      <div className="w-full max-w-[900px]">
        <CalendarPage />
      </div>
    </main>
  )
}
