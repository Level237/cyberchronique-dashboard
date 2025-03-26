"use client"

import { useState } from "react"
import { Edit, Eye, MoreHorizontal, Trash2, MessageSquare, ThumbsUp, Share2 } from "lucide-react"
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

type PublishedArticle = {
  id: string
  title: string
  excerpt: string
  category: string
  publishDate: string
  author: {
    name: string
    avatar: string
    initials: string
  }
  stats: {
    views: number
    likes: number
    comments: number
    shares: number
  }
}

const publishedArticles: PublishedArticle[] = [
  {
    id: "1",
    title: "Les tendances tech à surveiller en 2024",
    excerpt: "Découvrez les technologies qui vont façonner l'année 2024 et au-delà.",
    category: "Tendances",
    publishDate: "2024-03-15",
    author: {
      name: "Jean Dupont",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JD",
    },
    stats: {
      views: 1245,
      likes: 87,
      comments: 23,
      shares: 45,
    },
  },
  {
    id: "2",
    title: "Comment l'IA transforme le développement web",
    excerpt: "L'intelligence artificielle révolutionne la façon dont nous concevons et développons des sites web.",
    category: "Intelligence Artificielle",
    publishDate: "2024-03-10",
    author: {
      name: "Marie Martin",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MM",
    },
    stats: {
      views: 987,
      likes: 65,
      comments: 18,
      shares: 32,
    },
  },
  {
    id: "3",
    title: "Revue du nouveau MacBook Pro M3",
    excerpt: "Notre analyse détaillée du dernier MacBook Pro équipé de la puce M3 d'Apple.",
    category: "Matériel",
    publishDate: "2024-03-05",
    author: {
      name: "Thomas Bernard",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "TB",
    },
    stats: {
      views: 756,
      likes: 42,
      comments: 15,
      shares: 28,
    },
  },
  {
    id: "4",
    title: "Les meilleurs frameworks JavaScript en 2024",
    excerpt: "Comparaison des frameworks JavaScript les plus populaires pour vos projets web.",
    category: "Développement Web",
    publishDate: "2024-03-01",
    author: {
      name: "Jean Dupont",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JD",
    },
    stats: {
      views: 1532,
      likes: 98,
      comments: 34,
      shares: 67,
    },
  },
]

export function PublishedArticlesList() {
  const [selectedArticles, setSelectedArticles] = useState<string[]>([])

  const toggleSelectAll = () => {
    if (selectedArticles.length === publishedArticles.length) {
      setSelectedArticles([])
    } else {
      setSelectedArticles(publishedArticles.map((article) => article.id))
    }
  }

  const toggleSelectArticle = (id: string) => {
    if (selectedArticles.includes(id)) {
      setSelectedArticles(selectedArticles.filter((articleId) => articleId !== id))
    } else {
      setSelectedArticles([...selectedArticles, id])
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
                checked={selectedArticles.length === publishedArticles.length && publishedArticles.length > 0}
                onCheckedChange={toggleSelectAll}
                aria-label="Sélectionner tous les articles publiés"
              />
            </TableHead>
            <TableHead className="min-w-[300px]">Article</TableHead>
            <TableHead className="hidden md:table-cell">Catégorie</TableHead>
            <TableHead className="hidden md:table-cell">Date de publication</TableHead>
            <TableHead className="hidden md:table-cell">Auteur</TableHead>
            <TableHead className="hidden md:table-cell">Statistiques</TableHead>
            <TableHead className="w-[60px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {publishedArticles.map((article) => (
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
                  <span className="text-sm text-muted-foreground hidden md:block">{article.excerpt}</span>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge variant="secondary">{article.category}</Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">{formatDate(article.publishDate)}</TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={article.author.avatar} alt={article.author.name} />
                    <AvatarFallback>{article.author.initials}</AvatarFallback>
                  </Avatar>
                  <span>{article.author.name}</span>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1" title="Vues">
                    <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm">{article.stats.views}</span>
                  </div>
                  <div className="flex items-center gap-1" title="J'aime">
                    <ThumbsUp className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm">{article.stats.likes}</span>
                  </div>
                  <div className="flex items-center gap-1" title="Commentaires">
                    <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm">{article.stats.comments}</span>
                  </div>
                  <div className="flex items-center gap-1" title="Partages">
                    <Share2 className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm">{article.stats.shares}</span>
                  </div>
                </div>
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
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      <span>Voir</span>
                    </DropdownMenuItem>
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

