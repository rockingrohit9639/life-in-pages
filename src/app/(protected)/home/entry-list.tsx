import { PenLineIcon } from 'lucide-react';
import Link from 'next/link';
import { getUserEntries } from '~/actions/entry';
import { When } from '~/components/when';
import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';
import { Skeleton } from '~/components/ui/skeleton';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { Card, CardContent } from '~/components/ui/card';

function formatEntryDate(date: Date): string {
  if (isToday(date)) return 'Today';
  if (isYesterday(date)) return 'Yesterday';
  const distance = formatDistanceToNow(date, { addSuffix: false });
  if (distance.includes('day')) return format(date, 'MMM d');
  return distance + ' ago';
}

export default async function EntryList({ className }: { className?: string }) {
  const entries = await getUserEntries({ limit: 4 });

  return (
    <Card className={cn('', className)}>
      <CardContent className="p-0">
        <When
          condition={entries.length > 0}
          fallback={
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-muted">
                <PenLineIcon className="size-5 text-muted-foreground" />
              </div>
              <p className="mb-1 text-sm font-medium">No entries yet</p>
              <p className="mb-4 text-xs text-muted-foreground">Start your journey by writing</p>
              <Button asChild size="sm" variant="outline">
                <Link href="/entries/new">Write your first entry</Link>
              </Button>
            </div>
          }
        >
          <div className="divide-y">
            {entries.map((entry) => (
              <Link
                key={entry.id}
                href={`/entries?highlight=${entry.id}`}
                className="group block px-4 py-3 transition-colors hover:bg-muted/50"
              >
                <p className="mb-1 line-clamp-2 text-sm leading-relaxed text-foreground/90 group-hover:text-foreground">
                  {entry.content.slice(0, 150)}
                </p>
                <p className="text-xs text-muted-foreground">{formatEntryDate(entry.createdAt)}</p>
              </Link>
            ))}
          </div>
        </When>
      </CardContent>
    </Card>
  );
}

function EntryListSkeleton() {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="divide-y">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="px-4 py-3">
              <Skeleton className="mb-2 h-4 w-full" />
              <Skeleton className="mb-1 h-4 w-3/4" />
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

EntryList.Skeleton = EntryListSkeleton;
