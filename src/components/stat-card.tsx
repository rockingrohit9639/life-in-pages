import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import { cn } from '~/lib/utils'

type StatCardProps = {
  className?: string
  title: string
  value: React.ReactNode
  link?: { label: string; href: string }
}

export default function StatCard({ className, title, value, link }: StatCardProps) {
  return (
    <div className={cn('rounded-md border bg-gray-100 p-4', className)}>
      <p className="text-sm">{title}</p>
      <p className="text-2xl font-bold md:text-4xl">{value}</p>

      {link ? (
        <div className="flex items-center justify-end gap-2">
          <Link
            className="text-muted-foreground hover:border-b-border flex items-center gap-2 border-b border-b-transparent text-sm"
            href={link.href}
          >
            {link.label}
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      ) : null}
    </div>
  )
}
