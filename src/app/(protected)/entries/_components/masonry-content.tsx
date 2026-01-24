import type { Entry } from '@prisma/client';
import { Masonry } from 'masonic';
import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';
import { BookMarkedIcon, PenLineIcon } from 'lucide-react';
import Link from 'next/link';
import { When } from '~/components/when';
import DeleteEntryButton from './delete-entry-button';
import { Card, CardContent } from '~/components/ui/card';
import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';

type MasonryContentProps = {
  entries: Entry[];
};

function formatEntryDate(date: Date): string {
  if (isToday(date)) return 'Today';
  if (isYesterday(date)) return 'Yesterday';
  const distance = formatDistanceToNow(date, { addSuffix: false });
  if (distance.includes('day') || distance.includes('month') || distance.includes('year')) {
    return format(date, 'MMM d, yyyy');
  }
  return distance + ' ago';
}

function EmptyEntries() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-muted/30 py-16 text-center">
      <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
        <PenLineIcon className="size-7 text-primary" />
      </div>
      <h3 className="mb-2 text-lg font-semibold">No entries yet</h3>
      <p className="text-muted-foreground mb-6 max-w-sm text-sm">
        Your journal is waiting. Start capturing your thoughts, memories, and moments.
      </p>
      <Button asChild className="shadow-lg shadow-primary/20">
        <Link href="/entries/new">
          <PenLineIcon className="size-4" />
          Write your first entry
        </Link>
      </Button>
    </div>
  );
}

export default function MasonryContent({ entries }: MasonryContentProps) {
  if (entries.length === 0) {
    return <EmptyEntries />;
  }

  return (
    <Masonry
      items={entries}
      columnGutter={12}
      columnWidth={320}
      render={({ data: entry }) => (
        <Card
          key={entry.id}
          className={cn(
            'group overflow-hidden transition-all duration-200 hover:shadow-md',
            entry.isUsed && 'border-primary/30 bg-linear-to-br from-primary/5 to-transparent',
          )}
        >
          <CardContent className="p-0">
            {/* Used badge */}
            <When condition={entry.isUsed}>
              <div className="flex items-center gap-1.5 border-b border-primary/20 bg-primary/5 px-4 py-2">
                <BookMarkedIcon className="size-3 text-primary" />
                <span className="text-xs font-medium text-primary">Added to your book</span>
              </div>
            </When>

            {/* Content */}
            <div className="p-4">
              <p className="text-foreground/90 mb-4 line-clamp-6 text-sm leading-relaxed">
                {entry.content.slice(0, 400)}
                {entry.content.length > 400 && '...'}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-border/50 pt-3">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      'size-2 rounded-full',
                      entry.isUsed ? 'bg-primary' : 'bg-muted-foreground/30',
                    )}
                  />
                  <p className="text-muted-foreground text-xs font-medium">
                    {formatEntryDate(entry.createdAt)}
                  </p>
                </div>

                <When condition={!entry.isUsed}>
                  <DeleteEntryButton entryId={entry.id} />
                </When>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    />
  );
}
