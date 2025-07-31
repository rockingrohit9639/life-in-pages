import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '~/components/ui/button'

export default function HomePage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center p-4 md:p-0">
      <div className="flex w-full flex-col gap-4 md:max-w-lg">
        <Button asChild className="flex cursor-pointer items-center justify-between px-4 py-6 shadow-lg">
          <Link href="/entries/new">
            <span>Start writing</span>
            <ArrowRightIcon className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
