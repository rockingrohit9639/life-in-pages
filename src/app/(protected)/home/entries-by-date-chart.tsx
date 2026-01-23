'use client';

import { BarChart3Icon, PenLineIcon } from 'lucide-react';
import Link from 'next/link';
import { Area, AreaChart, XAxis, YAxis } from 'recharts';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '~/components/ui/chart';
import { When } from '~/components/when';
import { cn } from '~/lib/utils';

const chartConfig = {
  count: {
    label: 'Entries',
    color: 'var(--primary)',
  },
} satisfies ChartConfig;

type EntriesByDateChartProps = {
  className?: string;
  data: {
    date: string;
    count: number;
  }[];
};

export default function EntriesByDateChart({ data, className }: EntriesByDateChartProps) {
  const totalThisMonth = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <Card className={cn('', className)}>
      <CardContent className="p-4">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3Icon className="size-4 text-primary" />
              <h3 className="text-sm font-semibold">Writing Activity</h3>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">Last 30 days</p>
          </div>
          {data.length > 0 && (
            <div className="text-right">
              <p className="text-2xl font-bold">{totalThisMonth}</p>
              <p className="text-xs text-muted-foreground">entries</p>
            </div>
          )}
        </div>

        <When
          condition={data.length > 0}
          fallback={
            <div className="flex h-[280px] flex-col items-center justify-center rounded-lg bg-muted/30">
              <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-muted">
                <PenLineIcon className="size-5 text-muted-foreground" />
              </div>
              <p className="mb-1 text-sm font-medium">No activity yet</p>
              <p className="mb-4 text-xs text-muted-foreground">Your writing journey starts here</p>
              <Button asChild size="sm" variant="outline">
                <Link href="/entries/new">Write your first entry</Link>
              </Button>
            </div>
          }
        >
          <ChartContainer config={chartConfig} className="h-[280px] w-full">
            <AreaChart data={data} accessibilityLayer margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="fillCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
                interval="preserveStartEnd"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
                allowDecimals={false}
              />
              <ChartTooltip
                cursor={{ stroke: 'var(--primary)', strokeWidth: 1, strokeDasharray: '4 4' }}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="count"
                type="monotone"
                stroke="var(--primary)"
                strokeWidth={2}
                fill="url(#fillCount)"
                dot={false}
                activeDot={{ r: 4, fill: 'var(--primary)', stroke: 'var(--background)', strokeWidth: 2 }}
              />
            </AreaChart>
          </ChartContainer>
        </When>
      </CardContent>
    </Card>
  );
}
