import { format } from 'date-fns'
import { FilterIcon } from 'lucide-react'
import { getUserEntries } from '~/actions/entry'
import { Button } from '~/components/ui/button'
import { DATE_FORMAT } from '~/constants/common'
import DeleteEntryButton from './_components/delete-entry-button'
import { When } from '~/components/when'

export default async function EntriesPage() {
  const entries = await getUserEntries({})

  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-between">
        <div />

        <Button className="ml-auto" variant="outline">
          <FilterIcon />
        </Button>
      </div>

      <div className="mt-4 flex flex-col flex-wrap justify-center gap-2 md:flex-row">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="bg-muted/10 border-muted flex w-full max-w-sm flex-col justify-between rounded-md border p-4"
          >
            <p>{entry.content.slice(0, 1000)}</p>

            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-xs">{format(entry.createdAt, DATE_FORMAT)}</p>

              <When condition={!entry.isUsed}>
                <DeleteEntryButton entryId={entry.id} />
              </When>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
