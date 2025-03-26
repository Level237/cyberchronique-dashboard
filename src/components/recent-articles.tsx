import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface RecentArticlesProps {
  className?: string
}

export function RecentArticles({ className }: RecentArticlesProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Articles Récents</CardTitle>
        <CardDescription>Les derniers articles publiés sur votre blog</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentArticles.map((article) => (
            <div key={article.id} className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{article.title}</p>
                <div className="flex items-center pt-2">
                  <Badge variant={article.status === "published" ? "default" : "outline"}>
                    {article.status === "published" ? "Publié" : "Brouillon"}
                  </Badge>
                  <span className="text-xs text-muted-foreground ml-2">{article.date}</span>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Ouvrir menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>Voir l'article</DropdownMenuItem>
                  <DropdownMenuItem>Modifier</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Supprimer</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

const recentArticles = [
  {
    id: "1",
    title: "Les tendances tech à surveiller en 2024",
    status: "published",
    date: "Il y a 2 heures",
  },
  {
    id: "2",
    title: "Comment l'IA transforme le développement web",
    status: "published",
    date: "Il y a 1 jour",
  },
  {
    id: "3",
    title: "Revue du nouveau MacBook Pro M3",
    status: "published",
    date: "Il y a 3 jours",
  },
  {
    id: "4",
    title: "Le futur de la réalité virtuelle",
    status: "draft",
    date: "Brouillon",
  },
]

