import { NavMain } from '~/components/nav-main';
import { NavUser } from '~/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from '~/components/ui/sidebar';
import { SidebarHeaderContent } from './header-content';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="pb-0">
        <SidebarHeaderContent />
      </SidebarHeader>
      <SidebarContent className="pt-2">
        <NavMain />
      </SidebarContent>
      <SidebarSeparator className="opacity-50" />
      <SidebarFooter className="py-2">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
