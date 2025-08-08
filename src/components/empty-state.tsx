import { PackageOpenIcon } from 'lucide-react'
import { cn } from '~/lib/utils'

type EmptyStateProps = {
  className?: string
  title: string
  description?: string
  extraContent?: React.ReactNode
}

export default function EmptyState({
  className,
  title,
  description,
  extraContent,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-md border bg-gray-50 p-4 text-center',
        className,
      )}
    >
      <PackageOpenIcon className="text-muted-foreground mb-2 size-10" />

      <p className="mb-1 font-medium">{title}</p>
      <p
        className={cn(
          'text-muted-foreground text-sm',
          typeof extraContent !== 'undefined' && 'mb-4',
        )}
      >
        {description}
      </p>

      {extraContent && extraContent}
    </div>
  )
}
