'use client';

import { SignOutButton, useUser } from '@clerk/nextjs';
import { BookCopyIcon, BookIcon, BookOpenTextIcon, HomeIcon, LogOutIcon, PenLineIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import ThemeToggler from './theme-toggler';
import { cn } from '~/lib/utils';

const NAV_ITEMS = [
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
];

export function Navbar() {
  const { user } = useUser();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/home" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BookOpenTextIcon className="size-4" />
          </div>
          <span className="hidden font-semibold tracking-tight sm:inline-block">Life in Pages</span>
        </Link>

        {/* Navigation - Center */}
        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                <item.icon className="size-4" />
                <span className="hidden sm:inline-block">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right side - Write button + User */}
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden shadow-sm sm:flex">
            <Link href="/entries/new">
              <PenLineIcon className="size-4" />
              <span>Write</span>
            </Link>
          </Button>

          {/* Mobile write button */}
          <Button asChild size="icon" variant="ghost" className="sm:hidden">
            <Link href="/entries/new">
              <PenLineIcon className="size-4" />
            </Link>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="size-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
                    {user?.firstName?.[0]}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 rounded-lg" align="end" sideOffset={8}>
              <div className="flex items-center gap-3 px-3 py-3">
                <Avatar className="size-10">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                    {user?.firstName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 leading-tight">
                  <span className="truncate font-medium">
                    {user?.firstName} {user?.lastName}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user?.emailAddresses[0].emailAddress}
                  </span>
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
        </div>
      </div>
    </header>
  );
}
