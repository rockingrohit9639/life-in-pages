import { BookOpenIcon, CalendarIcon, PenLineIcon, SparklesIcon } from 'lucide-react';
import Link from 'next/link';
import { getUserEntries } from '~/actions/entry';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import EntriesMasonry from './_components/entries-masonry';

export default async function EntriesPage() {
  const entries = await getUserEntries({});

  // Calculate stats
  const totalEntries = entries.length;
  const usedEntries = entries.filter((e) => e.isUsed).length;
  const thisMonth = entries.filter((e) => {
    const now = new Date();
    const entryDate = new Date(e.createdAt);
    return entryDate.getMonth() === now.getMonth() && entryDate.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="border-b bg-linear-to-br from-primary/5 via-background to-primary/10 py-8 md:py-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-1 flex items-center gap-2">
            <BookOpenIcon className="size-4 text-primary" />
            <p className="text-sm font-medium text-primary">Your Journal</p>
          </div>
          <h1 className="mb-2 text-2xl font-bold tracking-tight md:text-3xl">All Entries</h1>
          <p className="text-muted-foreground mb-6 max-w-md text-sm">
            Every thought, every moment, every story — preserved in your personal collection.
          </p>

          <Button asChild size="lg" className="group shadow-lg shadow-primary/20">
            <Link href="/entries/new">
              <PenLineIcon className="size-4 transition-transform group-hover:-rotate-12" />
              <span>Write new entry</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl py-6 md:py-8">
        {/* Stats Row */}
        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          <Card className="border-primary/20 bg-linear-to-br from-primary/5 to-transparent">
            <CardContent className="flex items-center gap-3 py-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <BookOpenIcon className="size-4 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">Total</p>
                <p className="text-2xl font-bold tracking-tight">{totalEntries}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-3 py-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                <CalendarIcon className="text-muted-foreground size-4" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">This Month</p>
                <p className="text-2xl font-bold tracking-tight">{thisMonth}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-3 py-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                <SparklesIcon className="text-muted-foreground size-4" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">In Your Book</p>
                <p className="text-2xl font-bold tracking-tight">{usedEntries}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Entries Section */}
        <div className="mb-4 flex items-center gap-2">
          <PenLineIcon className="size-4 text-primary" />
          <h2 className="text-sm font-semibold">Your Writings</h2>
          <span className="text-muted-foreground text-xs">({totalEntries} entries)</span>
        </div>

        <EntriesMasonry entries={entries} />
      </div>
    </div>
  );
}
