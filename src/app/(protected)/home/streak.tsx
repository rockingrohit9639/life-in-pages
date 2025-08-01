import { getDaysInMonth, isBefore, isSameDay } from 'date-fns'
import { CheckIcon } from 'lucide-react'
import { getEntryDatesOfMonth } from '~/actions/entry'
import { cn } from '~/lib/utils'

export default async function Streak() {
  const entryDates = await getEntryDatesOfMonth()

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center gap-2">
        <div className="bg-border h-px flex-1" />
        <p className="text-sm font-medium">Streak</p>
        <div className="bg-border h-px flex-1" />
      </div>

      <div className="flex w-full gap-2 overflow-x-auto">
        {Array.from({ length: getDaysInMonth(new Date()) }).map((_, index) => {
          const date = new Date(new Date().getFullYear(), new Date().getMonth(), index + 1)
          const hasEntry = entryDates.some((entryDate) => isSameDay(entryDate, date))
          const isToday = isSameDay(date, new Date())
          const isPast = isBefore(date, new Date())

          return (
            <div
              key={index}
              className={cn(
                'bg-muted flex h-20 w-16 shrink-0 items-center justify-center rounded text-4xl font-bold',
                {
                  'bg-green-500 text-white': hasEntry,
                  'bg-red-500 text-white': isPast && !hasEntry,
                  'bg-blue-500 text-white': isToday && !hasEntry,
                },
              )}
            >
              {hasEntry ? <CheckIcon className="size-4" /> : index + 1}
            </div>
          )
        })}
      </div>
    </div>
  )
}
