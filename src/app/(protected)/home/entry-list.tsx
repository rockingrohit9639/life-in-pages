import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import { getUserEntries, getUserTotalEntries } from '~/actions/entry'
import { When } from '~/components/when'
import { DATE_FORMAT } from '~/constants/common'
import { format } from 'date-fns'
import { Skeleton } from '~/components/ui/skeleton'

export default async function EntryList() {
  const [entries, totalEntries] = await Promise.all([getUserEntries(), getUserTotalEntries()])

  return (
    <div className="flex flex-col gap-2 overflow-auto md:max-h-[400px]">
      {entries.map((entry) => (
        <div key={entry.id} className="bg-muted/10 border-muted rounded-md border p-4">
          <p className="mb-2">{entry.content.slice(0, 1000)}</p>
          <p className="text-muted-foreground text-xs">{format(entry.createdAt, DATE_FORMAT)}</p>
        </div>
      ))}

      <When condition={totalEntries > entries.length}>
        <div className="flex items-center justify-end">
          <Link className="text-muted-foreground flex items-center gap-2 text-sm" href="/entries">
            <span>View more</span>
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </When>
    </div>
  )
}

function EntryListSkeleton() {
  return (
    <div className="flex flex-col gap-2 overflow-auto md:max-h-[400px]">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="h-20 w-full rounded-md" />
      ))}
    </div>
  )
}

EntryList.Skeleton = EntryListSkeleton
