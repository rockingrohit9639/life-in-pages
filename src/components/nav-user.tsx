'use client';

import { SignOutButton, useUser } from '@clerk/nextjs';
import { ChevronsUpDownIcon, LogOutIcon } from 'lucide-react';
import { Avatar, AvatarFallback } from '~/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '~/components/ui/sidebar';
import ThemeToggler from './theme-toggler';

export function NavUser() {
  const { user } = useUser();
  const { isMobile, state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              tooltip={user?.firstName ?? 'Account'}
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-7 w-7 rounded-full">
                <AvatarFallback className="rounded-full bg-sidebar-primary text-sidebar-primary-foreground text-xs font-medium">
                  {user?.firstName?.[0]}
                </AvatarFallback>
              </Avatar>
              <span className="truncate font-medium text-sm">{user?.firstName}</span>
              <ChevronsUpDownIcon className="ml-auto size-4 text-muted-foreground" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 rounded-lg"
            side={isMobile ? 'bottom' : isCollapsed ? 'right' : 'top'}
            align={isCollapsed ? 'start' : 'end'}
            sideOffset={8}
          >
            <div className="flex items-center gap-2 px-2 py-2 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarFallback className="rounded-full bg-sidebar-primary text-sidebar-primary-foreground text-xs font-medium">
                  {user?.firstName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left leading-tight">
                <span className="truncate font-medium">
                  {user?.firstName} {user?.lastName}
                </span>
                <span className="truncate text-xs text-muted-foreground">{user?.emailAddresses[0].emailAddress}</span>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <ThemeToggler />
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <SignOutButton>
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <LogOutIcon className="size-4" />
                Log out
              </DropdownMenuItem>
            </SignOutButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
