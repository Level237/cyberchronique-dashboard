

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function VisitorsChart() {
  return (
    <ChartContainer
      config={{
        visitors: {
          label: "Visiteurs",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <AreaChart
        data={[
          { date: "Jan", visitors: 2500 },
          { date: "Fév", visitors: 3000 },
          { date: "Mar", visitors: 2800 },
          { date: "Avr", visitors: 3200 },
          { date: "Mai", visitors: 4000 },
          { date: "Juin", visitors: 3800 },
          { date: "Juil", visitors: 4200 },
          { date: "Août", visitors: 4500 },
          { date: "Sep", visitors: 4800 },
          { date: "Oct", visitors: 5000 },
          { date: "Nov", visitors: 4700 },
          { date: "Déc", visitors: 5200 },
        ]}
        margin={{
          top: 16,
          right: 16,
          bottom: 0,
          left: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value}
          padding={{ left: 16, right: 16 }}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `${value}`} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          type="monotone"
          dataKey="visitors"
          stroke="hsl(var(--chart-1))"
          fill="hsl(var(--chart-1))"
          strokeWidth={2}
          activeDot={{ r: 6 }}
          fillOpacity={0.2}
        />
      </AreaChart>
    </ChartContainer>
  )
}

