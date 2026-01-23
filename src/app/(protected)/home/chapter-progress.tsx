import { cn } from '~/lib/utils';
import { getNextChapterProgress } from '~/actions/entry';
import { Skeleton } from '~/components/ui/skeleton';
import { BookMarkedIcon } from 'lucide-react';

type ChapterProgressProps = {
  className?: string;
};

export default async function ChapterProgress({ className }: ChapterProgressProps) {
  const { progress } = await getNextChapterProgress();

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
        <BookMarkedIcon className="size-5 text-primary" />
      </div>
      <div className="flex-1">
        <div className="mb-1.5 flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Next Chapter</p>
          <span className="text-sm font-semibold">{progress}%</span>
        </div>
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="absolute left-0 h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground">
          {progress < 100 ? `Write ${Math.ceil((100 - progress) / 10)} more entries to unlock` : 'Ready to generate!'}
        </p>
      </div>
    </div>
  );
}

function ChapterProgressSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <Skeleton className="size-12 shrink-0 rounded-xl" />
      <div className="flex-1">
        <div className="mb-1.5 flex items-center justify-between">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-4 w-10" />
        </div>
        <Skeleton className="h-2 w-full rounded-full" />
        <Skeleton className="mt-1.5 h-3 w-48" />
      </div>
    </div>
  );
}

ChapterProgress.Skeleton = ChapterProgressSkeleton;
