import StatCard from '~/components/stat-card'
import Streak from './streak'
import { currentUser } from '@clerk/nextjs/server'
import { Button } from '~/components/ui/button'
import { ArrowRightIcon } from 'lucide-react'
import ChapterProgress from './chapter-progress'
import { Suspense } from 'react'
import EntriesByDateChart from './entries-by-date-chart'
import Link from 'next/link'
import { getHomePageData } from '~/actions/entry'
import EntryList from './entry-list'

export default async function HomePage() {
  const user = await currentUser()
  const { totalEntries, entriesPerDay } = await getHomePageData()

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="font-bold md:text-2xl">Welcome back, {user?.firstName}</p>

        <Button asChild>
          <Link href="/entries/new">
            <span>Start writing</span>
            <ArrowRightIcon className="size-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-8">
        <StatCard
          title="Total Entries"
          value={totalEntries}
          className="md:col-span-2"
          link={{
            label: 'View all entries',
            href: '/entries',
          }}
        />

        <Suspense fallback={<Streak.Skeleton className="md:col-span-6" />}>
          <Streak className="md:col-span-6" />
        </Suspense>

        <div className="md:col-span-2">
          <Suspense fallback={<ChapterProgress.Skeleton />}>
            <ChapterProgress className="mb-4" />
          </Suspense>

          <Suspense fallback={<EntryList.Skeleton />}>
            <EntryList />
          </Suspense>
        </div>

        <EntriesByDateChart data={entriesPerDay} className="md:col-span-6" />
      </div>
    </div>
  )
}
