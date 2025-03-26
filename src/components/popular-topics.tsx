import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface PopularTopicsProps {
  className?: string
}

export function PopularTopics({ className }: PopularTopicsProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Sujets Populaires</CardTitle>
        <CardDescription>Les catégories les plus consultées ce mois-ci</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {popularTopics.map((topic) => (
            <div key={topic.id} className="flex items-center">
              <div className="w-full space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">{topic.name}</p>
                  <p className="text-sm text-muted-foreground">{topic.percentage}%</p>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div className="h-full bg-primary" style={{ width: `${topic.percentage}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

const popularTopics = [
  {
    id: "1",
    name: "Intelligence Artificielle",
    percentage: 68,
  },
  {
    id: "2",
    name: "Développement Web",
    percentage: 52,
  },
  {
    id: "3",
    name: "Cybersécurité",
    percentage: 45,
  },
  {
    id: "4",
    name: "Blockchain",
    percentage: 39,
  },
  {
    id: "5",
    name: "Mobile",
    percentage: 31,
  },
]

