"use client"

import { useState } from "react"
import { Calendar, Clock, Edit, Eye, MoreHorizontal, Trash2, AlertTriangle, CheckCircle2 } from "lucide-react"
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type ScheduledArticle = {
  id: string
  title: string
  excerpt: string
  category: string
  scheduledDate: string
  scheduledTime: string
  author: {
    name: string
    avatar: string
    initials: string
  }
  status: "ready" | "review" | "incomplete"
}

const scheduledArticles: ScheduledArticle[] = [
  {
    id: "1",
    title: "Guide complet de la cybersécurité en 2024",
    excerpt: "Protégez-vous contre les menaces numériques avec notre guide complet.",
    category: "Cybersécurité",
    scheduledDate: "2024-04-05",
    scheduledTime: "09:00",
    author: {
      name: "Pierre Leroy",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "PL",
    },
    status: "ready",
  },
  {
    id: "2",
    title: "L'avenir du travail à distance après la pandémie",
    excerpt: "Comment les entreprises s'adaptent au travail hybride et à distance.",
    category: "Entreprise",
    scheduledDate: "2024-04-08",
    scheduledTime: "14:30",
    author: {
      name: "Sophie Dubois",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SD",
    },
    status: "review",
  },
  {
    id: "3",
    title: "Les 10 langages de programmation les plus demandés en 2024",
    excerpt: "Découvrez quels langages de programmation sont les plus recherchés par les recruteurs.",
    category: "Développement",
    scheduledDate: "2024-04-12",
    scheduledTime: "10:15",
    author: {
      name: "Thomas Bernard",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "TB",
    },
    status: "ready",
  },
  {
    id: "4",
    title: "Comment créer une stratégie de contenu efficace",
    excerpt: "Les étapes clés pour développer une stratégie de contenu qui convertit.",
    category: "Marketing",
    scheduledDate: "2024-04-15",
    scheduledTime: "08:00",
    author: {
      name: "Marie Martin",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MM",
    },
    status: "incomplete",
  },
  {
    id: "5",
    title: "Revue des meilleurs outils de productivité pour développeurs",
    excerpt: "Les outils qui vous aideront à coder plus efficacement et à mieux gérer vos projets.",
    category: "Outils",
    scheduledDate: "2024-04-18",
    scheduledTime: "16:45",
    author: {
      name: "Jean Dupont",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JD",
    },
    status: "review",
  },
]

export function ScheduledArticlesList() {
  const [selectedArticles, setSelectedArticles] = useState<string[]>([])

  const toggleSelectAll = () => {
    if (selectedArticles.length === scheduledArticles.length) {
      setSelectedArticles([])
    } else {
      setSelectedArticles(scheduledArticles.map((article) => article.id))
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
      month: "long",
      year: "numeric",
    }).format(date)
  }

  const getStatusIcon = (status: ScheduledArticle["status"]) => {
    switch (status) {
      case "ready":
        return <CheckCircle2 className="h-4 w-4 text-emerald-500" />
      case "review":
        return <Clock className="h-4 w-4 text-amber-500" />
      case "incomplete":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusText = (status: ScheduledArticle["status"]) => {
    switch (status) {
      case "ready":
        return "Prêt à publier"
      case "review":
        return "En attente de révision"
      case "incomplete":
        return "Contenu incomplet"
    }
  }

  return (
    <div className="relative w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[40px]">
              <Checkbox
                checked={selectedArticles.length === scheduledArticles.length && scheduledArticles.length > 0}
                onCheckedChange={toggleSelectAll}
                aria-label="Sélectionner tous les articles programmés"
              />
            </TableHead>
            <TableHead className="min-w-[300px]">Article</TableHead>
            <TableHead className="hidden md:table-cell">Catégorie</TableHead>
            <TableHead className="hidden md:table-cell">Date de publication</TableHead>
            <TableHead className="hidden md:table-cell">Auteur</TableHead>
            <TableHead className="hidden md:table-cell">Statut</TableHead>
            <TableHead className="w-[60px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scheduledArticles.map((article) => (
            <TableRow key={article.id} className="group hover-scale">
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
              <TableCell className="hidden md:table-cell">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                    <span>{formatDate(article.scheduledDate)}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <Clock className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{article.scheduledTime}</span>
                  </div>
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
              <TableCell className="hidden md:table-cell">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(article.status)}
                        <span>{getStatusText(article.status)}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      {article.status === "ready" && "Cet article est prêt à être publié à la date programmée."}
                      {article.status === "review" && "Cet article nécessite une révision avant publication."}
                      {article.status === "incomplete" &&
                        "Cet article est incomplet. Veuillez le compléter avant la date de publication."}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
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
                      <span>Aperçu</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Modifier</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Reprogrammer</span>
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

