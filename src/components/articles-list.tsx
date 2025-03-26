"use client"

import { useState } from "react"
import { Clock, Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Article = {
  id: string
  title: string
  excerpt: string
  category: string
  status: "published" | "draft" | "scheduled"
  date: string
  author: {
    name: string
    avatar: string
    initials: string
  }
  views: number
}

const articles: Article[] = [
  {
    id: "1",
    title: "Les tendances tech à surveiller en 2024",
    excerpt: "Découvrez les technologies qui vont façonner l'année 2024 et au-delà.",
    category: "Tendances",
    status: "published",
    date: "2024-03-15",
    author: {
      name: "Jean Dupont",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JD",
    },
    views: 1245,
  },
  {
    id: "2",
    title: "Comment l'IA transforme le développement web",
    excerpt: "L'intelligence artificielle révolutionne la façon dont nous concevons et développons des sites web.",
    category: "Intelligence Artificielle",
    status: "published",
    date: "2024-03-10",
    author: {
      name: "Marie Martin",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MM",
    },
    views: 987,
  },
  {
    id: "3",
    title: "Revue du nouveau MacBook Pro M3",
    excerpt: "Notre analyse détaillée du dernier MacBook Pro équipé de la puce M3 d'Apple.",
    category: "Matériel",
    status: "published",
    date: "2024-03-05",
    author: {
      name: "Thomas Bernard",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "TB",
    },
    views: 756,
  },
  {
    id: "4",
    title: "Le futur de la réalité virtuelle",
    excerpt: "Comment la VR va transformer notre façon de travailler et de nous divertir.",
    category: "Réalité Virtuelle",
    status: "draft",
    date: "2024-03-20",
    author: {
      name: "Sophie Dubois",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SD",
    },
    views: 0,
  },
  {
    id: "5",
    title: "Guide complet de la cybersécurité en 2024",
    excerpt: "Protégez-vous contre les menaces numériques avec notre guide complet.",
    category: "Cybersécurité",
    status: "scheduled",
    date: "2024-03-25",
    author: {
      name: "Pierre Leroy",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "PL",
    },
    views: 0,
  },
  {
    id: "6",
    title: "Les meilleurs frameworks JavaScript en 2024",
    excerpt: "Comparaison des frameworks JavaScript les plus populaires pour vos projets web.",
    category: "Développement Web",
    status: "published",
    date: "2024-03-01",
    author: {
      name: "Jean Dupont",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JD",
    },
    views: 1532,
  },
  {
    id: "7",
    title: "Introduction à Web3 et aux technologies blockchain",
    excerpt: "Tout ce que vous devez savoir sur Web3, les NFT et la blockchain.",
    category: "Blockchain",
    status: "draft",
    date: "2024-03-18",
    author: {
      name: "Marie Martin",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MM",
    },
    views: 0,
  },
]

export function ArticlesList() {
  const [selectedArticles, setSelectedArticles] = useState<string[]>([])

  const toggleSelectAll = () => {
    if (selectedArticles.length === articles.length) {
      setSelectedArticles([])
    } else {
      setSelectedArticles(articles.map((article) => article.id))
    }
  }

  const toggleSelectArticle = (id: string) => {
    if (selectedArticles.includes(id)) {
      setSelectedArticles(selectedArticles.filter((articleId) => articleId !== id))
    } else {
      setSelectedArticles([...selectedArticles, id])
    }
  }

  const getStatusBadge = (status: Article["status"]) => {
    switch (status) {
      case "published":
        return <Badge className="bg-emerald-500 hover:bg-emerald-600">Publié</Badge>
      case "draft":
        return <Badge variant="outline">Brouillon</Badge>
      case "scheduled":
        return <Badge className="bg-amber-500 hover:bg-amber-600">Programmé</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date)
  }

  return (
    <div className="relative w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[40px]">
              <Checkbox
                checked={selectedArticles.length === articles.length && articles.length > 0}
                onCheckedChange={toggleSelectAll}
                aria-label="Sélectionner tous les articles"
              />
            </TableHead>
            <TableHead className="min-w-[300px]">Article</TableHead>
            <TableHead className="hidden md:table-cell">Catégorie</TableHead>
            <TableHead className="hidden md:table-cell">Statut</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead className="hidden md:table-cell">Auteur</TableHead>
            <TableHead className="hidden md:table-cell text-right">Vues</TableHead>
            <TableHead className="w-[60px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.map((article) => (
            <TableRow key={article.id} className="group">
              <TableCell>
                <Checkbox
                  checked={selectedArticles.includes(article.id)}
                  onCheckedChange={() => toggleSelectArticle(article.id)}
                  aria-label={`Sélectionner ${article.title}`}
                />
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{article.title}</span>
                  <span className="text-sm text-muted-foreground line-clamp-1 md:hidden">
                    {getStatusBadge(article.status)}
                  </span>
                  <span className="text-sm text-muted-foreground hidden md:block">{article.excerpt}</span>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge variant="secondary">{article.category}</Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">{getStatusBadge(article.status)}</TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex items-center">
                  {article.status === "scheduled" && <Clock className="mr-1 h-3 w-3 text-amber-500" />}
                  {formatDate(article.date)}
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={article.author.avatar} alt={article.author.name} />
                    <AvatarFallback>{article.author.initials}</AvatarFallback>
                  </Avatar>
                  <span>{article.author.name}</span>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell text-right">
                {article.status === "published" ? article.views.toLocaleString() : "-"}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {article.status === "published" && (
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>Voir</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Modifier</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Supprimer</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

