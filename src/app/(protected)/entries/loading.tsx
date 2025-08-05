import { Skeleton } from '~/components/ui/skeleton'

export default function EntriesLoading() {
  return (
    <div className="p-4">
      <Skeleton className="h-10 w-full" />

      <div className="mt-4 flex flex-col flex-wrap justify-center gap-2 md:flex-row">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-40 w-96" />
        ))}
      </div>
    </div>
  )
}
