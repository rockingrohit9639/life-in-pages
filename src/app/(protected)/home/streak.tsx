'use client';

import { getDaysInMonth, isPast, isSameDay } from 'date-fns';
import { CheckIcon, XIcon } from 'lucide-react';
import { useEffect } from 'react';
import { cn } from '~/lib/utils';

type StreakProps = {
  className?: string;
  entryDates: Date[];
};

export default function Streak({ className, entryDates }: StreakProps) {
  useEffect(function scrollCurrentDateInView() {
    const currentDate = new Date().getDate();
    const currentDateElement = document.getElementById(`day-${currentDate}`);

    if (currentDateElement) {
      currentDateElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className={cn('flex w-full gap-2 overflow-x-auto', className)}>
      {Array.from({ length: getDaysInMonth(new Date()) }).map((_, index) => {
        const date = new Date(new Date().getFullYear(), new Date().getMonth(), index + 1);
        const hasEntry = entryDates.some((entryDate) => isSameDay(entryDate, date));
        const isToday = isSameDay(date, new Date());
        const isPastDate = isPast(date);

        return (
          <div
            id={`day-${date.getDate()}`}
            key={index}
            className={cn(
              'bg-muted flex h-full w-24 shrink-0 items-center justify-center rounded-md border text-4xl font-bold',
              {
                'bg-green-500 text-white': hasEntry,
                'bg-red-500 text-white': isPastDate && !hasEntry,
                'bg-blue-500 text-white': isToday && !hasEntry,
              },
            )}
          >
            {hasEntry ? (
              <CheckIcon className="size-6" />
            ) : isPastDate && !isToday ? (
              <XIcon className="size-6" />
            ) : (
              index + 1
            )}
          </div>
        );
      })}
    </div>
  );
}
