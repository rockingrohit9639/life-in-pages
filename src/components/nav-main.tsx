import { BookCopyIcon, BookIcon, BrainIcon, type LucideIcon } from 'lucide-react'
import Link from 'next/link'

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '~/components/ui/sidebar'

type SidebarItem = {
  icon: LucideIcon
  href: string
  label: string
}

const SIDEBAR_ITEMS = [
  {
    icon: BrainIcon,
    href: '/home',
    label: 'Home',
  },
  {
    icon: BookCopyIcon,
    href: '/entries',
    label: 'Entries',
  },
  {
    icon: BookIcon,
    href: '/book',
    label: 'Book',
  },
] satisfies SidebarItem[]

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          {SIDEBAR_ITEMS.map((item) => (
            <SidebarMenuButton key={item.href} tooltip={item.label} asChild>
              <Link href={item.href}>
                {item.icon && <item.icon />}
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          ))}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
