import { FilterIcon } from 'lucide-react'
import { getUserEntries } from '~/actions/entry'
import { Button } from '~/components/ui/button'
import EntriesMasonry from './_components/entries-masonry'

export default async function EntriesPage() {
  const entries = await getUserEntries({})

  return (
    <div className="w-full p-4">
      <div className="mb-4 flex items-center justify-between">
        <div />

        <Button className="ml-auto" variant="outline" size="icon">
          <FilterIcon className="size-4" />
        </Button>
      </div>

      <EntriesMasonry entries={entries} />
    </div>
  )
}
