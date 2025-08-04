'use client'

import { Line, LineChart, XAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '~/components/ui/chart'

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
      </CardContent>
    </Card>
  )
}
