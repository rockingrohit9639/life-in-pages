import { getDaysInMonth, isSameDay, isPast } from 'date-fns'
import { CheckIcon, XIcon } from 'lucide-react'
import { getEntryDatesOfMonth } from '~/actions/entry'
import { Skeleton } from '~/components/ui/skeleton'
import { cn } from '~/lib/utils'

type StreakProps = {
  className?: string
}

export default async function Streak({ className }: StreakProps) {
  const entryDates = await getEntryDatesOfMonth()

  return (
    <div className={cn('flex w-full gap-2 overflow-x-auto', className)}>
      {Array.from({ length: getDaysInMonth(new Date()) }).map((_, index) => {
        const date = new Date(new Date().getFullYear(), new Date().getMonth(), index + 1)
        const hasEntry = entryDates.some((entryDate) => isSameDay(entryDate, date))
        const isToday = isSameDay(date, new Date())
        const isPastDate = isPast(date)

        return (
          <div
            key={index}
            className={cn(
              'bg-muted flex h-full w-24 shrink-0 items-center justify-center rounded-md border text-4xl font-bold',
              {
                'bg-green-500 text-white': hasEntry,
                'bg-red-500 text-white': isPastDate && !hasEntry,
                'bg-blue-500 text-white': isToday && !hasEntry,
              },
            )}
          >
            {hasEntry ? (
              <CheckIcon className="size-6" />
            ) : isPastDate && !isToday ? (
              <XIcon className="size-6" />
            ) : (
              index + 1
            )}
          </div>
        )
      })}
    </div>
  )
}

function StreakSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('flex w-full gap-2 overflow-x-auto', className)}>
      {Array.from({ length: getDaysInMonth(new Date()) }).map((_, index) => (
        <Skeleton key={index} className="h-full w-24 shrink-0" />
      ))}
    </div>
  )
}

Streak.Skeleton = StreakSkeleton
