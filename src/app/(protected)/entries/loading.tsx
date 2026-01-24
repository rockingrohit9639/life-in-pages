import { Card, CardContent } from '~/components/ui/card';
import { Skeleton } from '~/components/ui/skeleton';

export default function EntriesLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <div className="border-b bg-linear-to-br from-primary/5 via-background to-primary/10 px-6 py-8 md:px-8 md:py-10">
        <div className="mx-auto max-w-6xl">
          <Skeleton className="mb-2 h-4 w-24" />
          <Skeleton className="mb-2 h-8 w-48" />
          <Skeleton className="mb-6 h-4 w-72" />
          <Skeleton className="h-11 w-40 rounded-lg" />
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-6 py-6 md:px-8">
        {/* Stats Row Skeleton */}
        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          {/* biome-ignore lint/suspicious/noArrayIndexKey: static skeleton items */}
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="flex items-center gap-3 py-4">
                <Skeleton className="size-10 rounded-lg" />
                <div>
                  <Skeleton className="mb-1 h-3 w-12" />
                  <Skeleton className="h-7 w-8" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Section Header Skeleton */}
        <div className="mb-4 flex items-center gap-2">
          <Skeleton className="size-4 rounded" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Masonry Skeleton */}
        <div className="columns-1 gap-3 sm:columns-2 lg:columns-3">
          {/* biome-ignore lint/suspicious/noArrayIndexKey: static skeleton items */}
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="mb-3 break-inside-avoid">
              <CardContent className="p-4">
                <Skeleton className="mb-2 h-4 w-full" />
                <Skeleton className="mb-2 h-4 w-5/6" />
                <Skeleton className="mb-2 h-4 w-4/5" />
                <Skeleton className="mb-4 h-4 w-2/3" />
                <div className="flex items-center justify-between border-t pt-3">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="size-8 rounded" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
