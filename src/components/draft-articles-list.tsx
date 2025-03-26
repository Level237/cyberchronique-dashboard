"use client"

import { useState } from "react"
import { Edit, MoreHorizontal, Trash2, Send } from "lucide-react"
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
import { Progress } from "@/components/ui/progress"

type DraftArticle = {
  id: string
  title: string
  excerpt: string
  category: string
  lastModified: string
  author: {
    name: string
    avatar: string
    initials: string
  }
  progress: number
}

const draftArticles: DraftArticle[] = [
  {
    id: "1",
    title: "Le futur de la réalité virtuelle",
    excerpt: "Comment la VR va transformer notre façon de travailler et de nous divertir.",
    category: "Réalité Virtuelle",
    lastModified: "2024-03-20",
    author: {
      name: "Sophie Dubois",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SD",
    },
    progress: 85,
  },
  {
    id: "2",
    title: "Introduction à Web3 et aux technologies blockchain",
    excerpt: "Tout ce que vous devez savoir sur Web3, les NFT et la blockchain.",
    category: "Blockchain",
    lastModified: "2024-03-18",
    author: {
      name: "Marie Martin",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MM",
    },
    progress: 65,
  },
  {
    id: "3",
    title: "Les bases de la programmation quantique",
    excerpt: "Comprendre les principes fondamentaux de l'informatique quantique.",
    category: "Informatique Quantique",
    lastModified: "2024-03-15",
    author: {
      name: "Thomas Bernard",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "TB",
    },
    progress: 40,
  },
  {
    id: "4",
    title: "Optimisation des performances React",
    excerpt: "Techniques avancées pour améliorer les performances de vos applications React.",
    category: "Développement Web",
    lastModified: "2024-03-12",
    author: {
      name: "Jean Dupont",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JD",
    },
    progress: 25,
  },
  {
    id: "5",
    title: "L'impact de l'IA sur le journalisme",
    excerpt: "Comment l'intelligence artificielle transforme le métier de journaliste.",
    category: "Intelligence Artificielle",
    lastModified: "2024-03-10",
    author: {
      name: "Pierre Leroy",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "PL",
    },
    progress: 50,
  },
]

export function DraftArticlesList() {
  const [selectedArticles, setSelectedArticles] = useState<string[]>([])

  const toggleSelectAll = () => {
    if (selectedArticles.length === draftArticles.length) {
      setSelectedArticles([])
    } else {
      setSelectedArticles(draftArticles.map((article) => article.id))
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
                checked={selectedArticles.length === draftArticles.length && draftArticles.length > 0}
                onCheckedChange={toggleSelectAll}
                aria-label="Sélectionner tous les brouillons"
              />
            </TableHead>
            <TableHead className="min-w-[300px]">Article</TableHead>
            <TableHead className="hidden md:table-cell">Catégorie</TableHead>
            <TableHead className="hidden md:table-cell">Dernière modification</TableHead>
            <TableHead className="hidden md:table-cell">Auteur</TableHead>
            <TableHead className="hidden md:table-cell">Progression</TableHead>
            <TableHead className="w-[60px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {draftArticles.map((article) => (
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
              <TableCell className="hidden md:table-cell">{formatDate(article.lastModified)}</TableCell>
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
                <div className="flex items-center gap-2">
                  <Progress value={article.progress} className="h-2 w-[100px]" />
                  <span className="text-sm text-muted-foreground">{article.progress}%</span>
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
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Modifier</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Send className="mr-2 h-4 w-4" />
                      <span>Publier</span>
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

