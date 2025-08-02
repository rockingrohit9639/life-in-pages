import StatCard from '~/components/stat-card'
import Streak from './streak'
import { currentUser } from '@clerk/nextjs/server'
import { Button } from '~/components/ui/button'
import { ArrowRightIcon } from 'lucide-react'

export default async function HomePage() {
  const user = await currentUser()

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-2xl font-bold">Welcome back, {user?.firstName}</p>

        <Button>
          <span>Start writing</span>
          <ArrowRightIcon className="size-4" />
        </Button>
      </div>

      <div className="grid grid-cols-8 gap-4">
        <StatCard
          title="Total Entries"
          value="34"
          className="md:col-span-2"
          link={{
            label: 'View all entries',
            href: '/entries',
          }}
        />
        <Streak className="md:col-span-6" />
      </div>
    </div>
  )
}
