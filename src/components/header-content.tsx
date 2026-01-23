import { BookOpenTextIcon } from 'lucide-react';
import Link from 'next/link';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '~/components/ui/sidebar';

export function SidebarHeaderContent() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild tooltip="Life in Pages">
          <Link href="/home">
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <BookOpenTextIcon className="size-4" />
            </div>
            <span className="truncate font-semibold tracking-tight">Life in Pages</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
