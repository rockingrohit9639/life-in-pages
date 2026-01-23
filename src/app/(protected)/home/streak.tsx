'use client';

import {
  getDaysInMonth,
  isPast,
  isSameDay,
  isSameMonth,
  format,
  getDay,
  startOfMonth,
  addMonths,
  subMonths,
} from 'date-fns';
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useState, useTransition } from 'react';
import { cn } from '~/lib/utils';
import { Card, CardContent } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { getEntryDatesOfMonth } from '~/actions/entry';

type StreakProps = {
  className?: string;
  initialEntryDates: Date[];
};

export default function Streak({ className, initialEntryDates }: StreakProps) {
  const today = new Date();
  const [viewingDate, setViewingDate] = useState(today);
  const [entryDates, setEntryDates] = useState<Date[]>(initialEntryDates);
  const [isPending, startTransition] = useTransition();

  const isCurrentMonth = isSameMonth(viewingDate, today);
  const daysInMonth = getDaysInMonth(viewingDate);
  const firstDayOfMonth = getDay(startOfMonth(viewingDate));

  // Calculate exact rows needed (no extra empty rows)
  const totalCells = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;

  // Calculate current streak (only relevant for current month)
  let currentStreak = 0;
  if (isCurrentMonth) {
    for (let i = today.getDate(); i >= 1; i--) {
      const date = new Date(today.getFullYear(), today.getMonth(), i);
      const hasEntry = entryDates.some((entryDate) => isSameDay(entryDate, date));
      if (hasEntry || isSameDay(date, today)) {
        if (hasEntry) currentStreak++;
        else if (isSameDay(date, today)) continue;
      } else {
        break;
      }
    }
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = direction === 'prev' ? subMonths(viewingDate, 1) : addMonths(viewingDate, 1);

    startTransition(async () => {
      const dates = await getEntryDatesOfMonth({
        year: newDate.getFullYear(),
        month: newDate.getMonth(),
      });
      setEntryDates(dates);
      setViewingDate(newDate);
    });
  };

  const goToToday = () => {
    startTransition(async () => {
      const dates = await getEntryDatesOfMonth({
        year: today.getFullYear(),
        month: today.getMonth(),
      });
      setEntryDates(dates);
      setViewingDate(today);
    });
  };

  // Count entries this month
  const entriesThisMonth = entryDates.length;

  // Build grid with only needed cells
  const cells = Array.from({ length: totalCells }).map((_, index) => {
    const dayNum = index - firstDayOfMonth + 1;
    const isValidDay = dayNum >= 1 && dayNum <= daysInMonth;

    if (!isValidDay) {
      return { type: 'empty' as const, key: `empty-${index}` };
    }

    const date = new Date(viewingDate.getFullYear(), viewingDate.getMonth(), dayNum);
    const hasEntry = entryDates.some((entryDate) => isSameDay(entryDate, date));
    const isToday = isSameDay(date, today);
    const isPastDate = isPast(date) && !isToday;
    const isFutureDate = !isPastDate && !isToday;

    return {
      type: 'day' as const,
      key: `day-${dayNum}`,
      dayNum,
      hasEntry,
      isToday,
      isPastDate,
      isFutureDate,
    };
  });

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardContent>
        {/* Header with navigation */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="size-7"
              onClick={() => navigateMonth('prev')}
              disabled={isPending}
            >
              <ChevronLeftIcon className="size-3.5" />
            </Button>
            <h3 className="min-w-[110px] text-center text-sm font-semibold">{format(viewingDate, 'MMM yyyy')}</h3>
            <Button
              variant="ghost"
              size="icon"
              className="size-7"
              onClick={() => navigateMonth('next')}
              disabled={isPending || isCurrentMonth}
            >
              <ChevronRightIcon className="size-3.5" />
            </Button>
            {!isCurrentMonth && (
              <Button
                variant="ghost"
                size="sm"
                className="ml-1 h-6 px-2 text-xs"
                onClick={goToToday}
                disabled={isPending}
              >
                Today
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{entriesThisMonth} entries</span>
            {isCurrentMonth && currentStreak > 0 && (
              <div className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                {currentStreak}d streak
              </div>
            )}
          </div>
        </div>

        {/* Weekday headers */}
        <div className="mb-1 grid grid-cols-7 gap-0.5">
          {['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map((day) => (
            <div key={day} className="py-0.5 text-center text-[10px] font-medium uppercase text-muted-foreground">
              {day.charAt(0)}
            </div>
          ))}
        </div>

        {/* Calendar grid - fixed 6 rows */}
        <div
          className={cn('grid grid-cols-7 gap-0.5', {
            'pointer-events-none opacity-60': isPending,
          })}
        >
          {cells.map((cell) => {
            if (cell.type === 'empty') {
              return <div key={cell.key} className="aspect-square" />;
            }

            return (
              <div
                key={cell.key}
                className={cn('relative flex aspect-square items-center justify-center rounded-md text-xs', {
                  'bg-primary text-primary-foreground font-medium': cell.hasEntry,
                  'bg-muted/40 text-muted-foreground': cell.isPastDate && !cell.hasEntry,
                  'ring-1.5 ring-primary ring-offset-1 ring-offset-background': cell.isToday,
                  'bg-primary/10': cell.isToday && !cell.hasEntry,
                  'text-muted-foreground/40': cell.isFutureDate && !cell.hasEntry,
                })}
              >
                {cell.hasEntry ? (
                  <CheckIcon className="size-3" />
                ) : (
                  <span className={cn({ 'font-medium': cell.isToday })}>{cell.dayNum}</span>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
