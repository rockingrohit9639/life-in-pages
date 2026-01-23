'use client';

import { BookCopyIcon, BookIcon, HomeIcon, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '~/components/ui/sidebar';

type SidebarItem = {
  icon: LucideIcon;
  href: string;
  label: string;
};

const SIDEBAR_ITEMS = [
  {
    icon: HomeIcon,
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
] satisfies SidebarItem[];

export function NavMain() {
  const pathname = usePathname();

  return (
    <SidebarGroup className="px-2">
      <SidebarMenu className="gap-1">
        {SIDEBAR_ITEMS.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton tooltip={item.label} asChild isActive={pathname.startsWith(item.href)}>
              <Link href={item.href}>
                <item.icon className="size-4" />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
