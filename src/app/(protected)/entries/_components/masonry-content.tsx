import { Entry } from '@prisma/client';
import { Masonry } from 'masonic';
import { format } from 'date-fns';
import { DATE_FORMAT } from '~/constants/common';
import { When } from '~/components/when';
import DeleteEntryButton from './delete-entry-button';
import { Card, CardContent } from '~/components/ui/card';

type MasonryContentProps = {
  entries: Entry[];
};

export default function MasonryContent({ entries }: MasonryContentProps) {
  return (
    <Masonry
      items={entries}
      columnGutter={8}
      columnWidth={300}
      render={({ data: entry }) => (
        <Card key={entry.id}>
          <CardContent>
            <p>{entry.content.slice(0, 1000)}</p>

            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-xs">{format(entry.createdAt, DATE_FORMAT)}</p>

              <When condition={!entry.isUsed}>
                <DeleteEntryButton entryId={entry.id} />
              </When>
            </div>
          </CardContent>
        </Card>
      )}
    />
  );
}
