'use client'

import { BookCopyIcon, BrainIcon, LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '~/components/ui/button'

type SidebarItem = {
  icon: LucideIcon
  href: string
}

const SIDEBAR_ITEMS = [
  {
    icon: BrainIcon,
    href: '/home',
  },
  {
    icon: BookCopyIcon,
    href: '/entries',
  },
] satisfies SidebarItem[]

export default function Sidebar() {
  return (
    <div className="bg-background/5 fixed bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded border p-2 backdrop-blur-lg md:top-0 md:left-0 md:h-screen md:translate-0 md:flex-col md:rounded-none md:border-y-0 md:border-l-0">
      {SIDEBAR_ITEMS.map((item) => (
        <NavItem key={item.href} {...item} />
      ))}
    </div>
  )
}

function NavItem({ href, icon: Icon }: SidebarItem) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Button key={href} variant={isActive ? 'default' : 'ghost'} size="icon" asChild>
      <Link href={href}>
        <Icon className="size-4" />
      </Link>
    </Button>
  )
}
