import { getDaysInMonth } from 'date-fns'
import { getEntryDatesOfMonth } from '~/actions/entry'
import { Skeleton } from '~/components/ui/skeleton'
import { cn } from '~/lib/utils'
import Streak from './streak'

type StreakProps = {
  className?: string
}

export default async function StreakWrapper({ className }: StreakProps) {
  const entryDates = await getEntryDatesOfMonth()
  return <Streak entryDates={entryDates} className={className} />
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

StreakWrapper.Skeleton = StreakSkeleton
