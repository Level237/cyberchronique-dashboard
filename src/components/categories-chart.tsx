"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  {
    name: "Jan",
    "Intelligence Artificielle": 32,
    "Développement Web": 28,
    Cybersécurité: 19,
    Blockchain: 12,
    Mobile: 15,
  },
  {
    name: "Fév",
    "Intelligence Artificielle": 35,
    "Développement Web": 30,
    Cybersécurité: 22,
    Blockchain: 14,
    Mobile: 18,
  },
  {
    name: "Mar",
    "Intelligence Artificielle": 42,
    "Développement Web": 38,
    Cybersécurité: 27,
    Blockchain: 19,
    Mobile: 23,
  },
  {
    name: "Avr",
    "Intelligence Artificielle": 48,
    "Développement Web": 42,
    Cybersécurité: 30,
    Blockchain: 22,
    Mobile: 25,
  },
  {
    name: "Mai",
    "Intelligence Artificielle": 55,
    "Développement Web": 45,
    Cybersécurité: 35,
    Blockchain: 25,
    Mobile: 28,
  },
  {
    name: "Juin",
    "Intelligence Artificielle": 62,
    "Développement Web": 48,
    Cybersécurité: 38,
    Blockchain: 28,
    Mobile: 30,
  },
]

export function CategoriesChart() {
  return (
    <ChartContainer
      config={{
        "Intelligence Artificielle": {
          label: "Intelligence Artificielle",
          color: "hsl(217, 91%, 60%)", // blue-500
        },
        "Développement Web": {
          label: "Développement Web",
          color: "hsl(152, 82%, 39%)", // emerald-500
        },
        Cybersécurité: {
          label: "Cybersécurité",
          color: "hsl(38, 92%, 50%)", // amber-500
        },
        Blockchain: {
          label: "Blockchain",
          color: "hsl(258, 90%, 66%)", // violet-500
        },
        Mobile: {
          label: "Mobile",
          color: "hsl(330, 81%, 60%)", // pink-500
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey="Intelligence Artificielle" stackId="a" fill="var(--color-Intelligence Artificielle)" />
          <Bar dataKey="Développement Web" stackId="a" fill="var(--color-Développement Web)" />
          <Bar dataKey="Cybersécurité" stackId="a" fill="var(--color-Cybersécurité)" />
          <Bar dataKey="Blockchain" stackId="a" fill="var(--color-Blockchain)" />
          <Bar dataKey="Mobile" stackId="a" fill="var(--color-Mobile)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

