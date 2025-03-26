

import { Cell, Pie, PieChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function EngagementChart() {
  return (
    <ChartContainer
      config={{
        views: {
          label: "Vues",
          color: "hsl(var(--chart-1))",
        },
        likes: {
          label: "J'aime",
          color: "hsl(var(--chart-2))",
        },
        comments: {
          label: "Commentaires",
          color: "hsl(var(--chart-3))",
        },
        shares: {
          label: "Partages",
          color: "hsl(var(--chart-4))",
        },
      }}
      className="h-[300px]"
    >
      <PieChart>
        <Pie
          data={[
            { name: "Vues", value: 65, dataKey: "views" },
            { name: "J'aime", value: 15, dataKey: "likes" },
            { name: "Commentaires", value: 12, dataKey: "comments" },
            { name: "Partages", value: 8, dataKey: "shares" },
          ]}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
        >
          <Cell fill="var(--color-views)" />
          <Cell fill="var(--color-likes)" />
          <Cell fill="var(--color-comments)" />
          <Cell fill="var(--color-shares)" />
        </Pie>
        <ChartTooltip content={<ChartTooltipContent />} />
      </PieChart>
    </ChartContainer>
  )
}

