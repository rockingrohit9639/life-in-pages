'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggler() {
  const [isMounted, setIsMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <button
      className="hover:bg-muted flex w-full items-center gap-2 rounded-md p-2 text-sm"
      onClick={() => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
      }}
    >
      {resolvedTheme === 'dark' ? <MoonIcon className="size-4" /> : <SunIcon className="size-4" />}
      <span>{resolvedTheme === 'dark' ? 'Dark' : 'Light'}</span>
    </button>
  );
}
