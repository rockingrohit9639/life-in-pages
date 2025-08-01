import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '~/components/ui/button'
import EntryList from './entry-list'
import { Suspense } from 'react'
import Streak from './streak'

export default async function HomePage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center p-4 md:p-0">
      <div className="mx-auto flex w-full flex-col gap-4 md:max-w-lg">
        <Streak />

        <Button asChild className="flex cursor-pointer items-center justify-between px-4 py-6 shadow-lg">
          <Link href="/entries/new">
            <span>Start writing</span>
            <ArrowRightIcon className="size-4" />
          </Link>
        </Button>

        <Suspense fallback={<EntryList.Skeleton />}>
          <EntryList />
        </Suspense>
      </div>
    </div>
  )
}
