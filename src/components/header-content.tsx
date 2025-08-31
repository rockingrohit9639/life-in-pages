import { BookOpenTextIcon } from 'lucide-react'
import { SidebarMenuButton } from '~/components/ui/sidebar'

export function SidebarHeaderContent() {
  return (
    <SidebarMenuButton
      size="lg"
      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground bg-sidebar-accent"
    >
      <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
        <BookOpenTextIcon className="size-4" />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">Life in Pages</span>
      </div>
    </SidebarMenuButton>
  )
}
