'use client'

import { PackageOpenIcon } from 'lucide-react'
import Link from 'next/link'
import { Line, LineChart, XAxis } from 'recharts'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '~/components/ui/chart'
import { When } from '~/components/when'

const chartConfig = {} satisfies ChartConfig

type EntriesByDateChartProps = {
  className?: string
  data: {
    date: string
    count: number
  }[]
}

export default function EntriesByDateChart({ data, className }: EntriesByDateChartProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Entries by date</CardTitle>
        <CardDescription>
          This chart displays the number of entries created in the last 30 days.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <When
          condition={data.length < 0}
          fallback={
            <div className="text-muted-foreground flex h-[600px] w-full flex-col items-center justify-center gap-2 rounded-md bg-gray-50">
              <PackageOpenIcon className="size-10" />
              <p className="text-sm">You have not created any entries yet.</p>
              <Button asChild>
                <Link href="/entries/new">Start writing now</Link>
              </Button>
            </div>
          }
        >
          <ChartContainer config={chartConfig}>
            <LineChart data={data} accessibilityLayer>
              <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />

              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

              <Line
                dataKey="count"
                type="natural"
                stroke="var(--primary)"
                strokeWidth={2}
                dot={{ fill: 'var(--primary)' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ChartContainer>
        </When>
      </CardContent>
    </Card>
  )
}
