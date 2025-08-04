import { cn } from '~/lib/utils'
import { getProgressColor } from './utils'
import { getNextChapterProgress } from '~/actions/entry'
import { Skeleton } from '~/components/ui/skeleton'

type ChapterProgressProps = {
  className?: string
}

export default async function ChapterProgress({ className }: ChapterProgressProps) {
  const { progress } = await getNextChapterProgress()

  return (
    <div className={cn('h-max rounded-md border p-4', className)}>
      <p className="mb-4 text-sm">Your progress to generate next chapter</p>

      <div className="relative h-10 w-full overflow-hidden rounded-md bg-gray-200">
        <div
          className="absolute left-0 h-full"
          style={{
            width: `${progress}%`,
            backgroundColor: getProgressColor(progress),
          }}
        />

        <div
          className={cn(
            'absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-white',
            {
              'text-black': progress <= 50,
            },
          )}
        >
          {progress}%
        </div>
      </div>
    </div>
  )
}

function ChapterProgressSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-md border bg-gray-100 p-4', className)}>
      <p className="mb-4 text-sm">Your progress to generate next chapter</p>

      <Skeleton className="h-10 w-full rounded-md bg-gray-200" />
    </div>
  )
}

ChapterProgress.Skeleton = ChapterProgressSkeleton
