import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import { getUserEntries, getUserTotalEntries } from '~/actions/entry'
import { Button } from '~/components/ui/button'
import { DATE_FORMAT } from '~/constants/common'
import { format } from 'date-fns'
import { When } from '~/components/when'

export default async function HomePage() {
  const [entries, totalEntries] = await Promise.all([getUserEntries(), getUserTotalEntries()])

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center p-4 md:p-0">
      <div className="flex w-full flex-col gap-4 md:max-w-lg">
        <Button asChild className="flex cursor-pointer items-center justify-between px-4 py-6 shadow-lg">
          <Link href="/entries/new">
            <span>Start writing</span>
            <ArrowRightIcon className="size-4" />
          </Link>
        </Button>

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
      </div>
    </div>
  )
}
