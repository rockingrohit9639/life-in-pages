import { getEntryDatesOfMonth } from '~/actions/entry';
import { Skeleton } from '~/components/ui/skeleton';
import { cn } from '~/lib/utils';
import Streak from './streak';
import { Card, CardContent } from '~/components/ui/card';

type StreakProps = {
  className?: string;
};

export default async function StreakWrapper({ className }: StreakProps) {
  const entryDates = await getEntryDatesOfMonth();
  return <Streak initialEntryDates={entryDates} className={className} />;
}

function StreakSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardContent>
        <div className="mb-2 flex items-center justify-between">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="mb-1 grid grid-cols-7 gap-0.5">
          {['s1', 's2', 's3', 's4', 's5', 's6', 's7'].map((id) => (
            <Skeleton key={id} className="h-3 w-full" />
          ))}
        </div>
        <div className="grid grid-cols-7 gap-0.5">
          {Array.from({ length: 35 }, (_, i) => `cell-${i}`).map((id) => (
            <Skeleton key={id} className="aspect-square w-full rounded-md" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

StreakWrapper.Skeleton = StreakSkeleton;
