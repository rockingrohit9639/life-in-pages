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
    <div className="bg-background fixed top-0 left-0 z-10 flex h-screen w-14 flex-col gap-1 border-r p-2">
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
