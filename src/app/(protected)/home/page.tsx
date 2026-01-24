import StreakWrapper from './streak-wrapper';
import { Button } from '~/components/ui/button';
import { BookOpenIcon, PenLineIcon, SparklesIcon } from 'lucide-react';
import ChapterProgress from './chapter-progress';
import { Suspense } from 'react';
import EntriesByDateChart from './entries-by-date-chart';
import Link from 'next/link';
import { getHomePageData } from '~/actions/entry';
import EntryList from './entry-list';
import { getCurrentUser } from '~/actions/user';
import { Card, CardContent } from '~/components/ui/card';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export default async function HomePage() {
  const user = await getCurrentUser();
  const { totalEntries, entriesPerDay } = await getHomePageData();
  const greeting = getGreeting();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="border-b bg-linear-to-br from-primary/5 via-background to-primary/10 py-8 md:py-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-muted-foreground mb-1 text-sm font-medium">{greeting}</p>
          <h1 className="mb-3 text-2xl font-bold tracking-tight md:text-3xl">{user?.name?.split(' ')[0]}</h1>
          <p className="text-muted-foreground mb-6 max-w-md text-sm">
            Every page tells your story. What will you write today?
          </p>

          <Button asChild size="lg" className="group shadow-lg shadow-primary/20">
            <Link href="/entries/new">
              <PenLineIcon className="size-4 transition-transform group-hover:-rotate-12" />
              <span>Start writing</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl py-6 md:py-8">
        {/* Stats Row */}
        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <Card className="border-primary/20 bg-linear-to-br from-primary/5 to-transparent">
            <CardContent className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                <BookOpenIcon className="size-5 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">Total Entries</p>
                <p className="text-3xl font-bold tracking-tight">{totalEntries}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardContent>
              <Suspense fallback={<ChapterProgress.Skeleton />}>
                <ChapterProgress />
              </Suspense>
            </CardContent>
          </Card>
        </div>

        {/* Streak Calendar */}
        <div className="mb-6">
          <div className="mb-3 flex items-center gap-2">
            <SparklesIcon className="size-4 text-primary" />
            <h2 className="text-sm font-semibold">Your Writing Streak</h2>
          </div>
          <Suspense fallback={<StreakWrapper.Skeleton />}>
            <StreakWrapper />
          </Suspense>
        </div>

        {/* Two Column Layout */}
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Chart - Takes more space */}
          <div className="lg:col-span-3">
            <EntriesByDateChart data={entriesPerDay} />
          </div>

          {/* Recent Entries */}
          <div className="lg:col-span-2">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Recent Entries</h2>
              <Link href="/entries" className="text-muted-foreground hover:text-foreground text-xs transition-colors">
                View all
              </Link>
            </div>
            <Suspense fallback={<EntryList.Skeleton />}>
              <EntryList />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
