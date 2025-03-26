"use client"

import { useState } from "react"
import { Check, Flag, MessageSquare, MoreHorizontal, ThumbsUp, Trash2, X } from "lucide-react"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

type Comment = {
  id: string
  content: string
  author: {
    name: string
    email: string
    avatar: string
    initials: string
  }
  article: {
    title: string
    slug: string
  }
  date: string
  status: "pending" | "approved" | "spam"
  likes: number
  replies: number
}

const comments: Comment[] = [
  {
    id: "1",
    content:
      "Excellent article ! J'ai beaucoup appris sur les nouvelles tendances technologiques. J'aimerais en savoir plus sur l'impact de l'IA générative sur le développement web.",
    author: {
      name: "Marie Dupont",
      email: "marie.dupont@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MD",
    },
    article: {
      title: "Les tendances tech à surveiller en 2024",
      slug: "tendances-tech-2024",
    },
    date: "2024-03-25T14:32:00",
    status: "approved",
    likes: 12,
    replies: 3,
  },
  {
    id: "2",
    content:
      "Je ne suis pas d'accord avec votre analyse sur les frameworks JavaScript. React reste bien plus populaire que Vue selon les dernières statistiques.",
    author: {
      name: "Thomas Martin",
      email: "thomas.martin@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "TM",
    },
    article: {
      title: "Les meilleurs frameworks JavaScript en 2024",
      slug: "frameworks-javascript-2024",
    },
    date: "2024-03-24T09:15:00",
    status: "approved",
    likes: 5,
    replies: 2,
  },
  {
    id: "3",
    content:
      "Avez-vous testé la nouvelle puce M3 Pro ? J'hésite entre le modèle de base et le Pro pour mes besoins en développement.",
    author: {
      name: "Sophie Bernard",
      email: "sophie.bernard@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SB",
    },
    article: {
      title: "Revue du nouveau MacBook Pro M3",
      slug: "macbook-pro-m3-review",
    },
    date: "2024-03-23T16:45:00",
    status: "approved",
    likes: 8,
    replies: 1,
  },
  {
    id: "4",
    content: "Visitez mon site pour des offres incroyables sur les derniers gadgets tech ! www.fake-tech-deals.com",
    author: {
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JD",
    },
    article: {
      title: "Les tendances tech à surveiller en 2024",
      slug: "tendances-tech-2024",
    },
    date: "2024-03-22T11:20:00",
    status: "spam",
    likes: 0,
    replies: 0,
  },
  {
    id: "5",
    content:
      "J'aimerais savoir si vous prévoyez un article sur les implications éthiques de l'IA dans le journalisme ? C'est un sujet qui me passionne.",
    author: {
      name: "Pierre Leroy",
      email: "pierre.leroy@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "PL",
    },
    article: {
      title: "Comment l'IA transforme le développement web",
      slug: "ia-transforme-developpement-web",
    },
    date: "2024-03-21T15:10:00",
    status: "pending",
    likes: 3,
    replies: 0,
  },
]

export function CommentsList() {
  const [selectedComments, setSelectedComments] = useState<string[]>([])
  const [localComments, setLocalComments] = useState<Comment[]>(comments)

  const toggleSelectAll = () => {
    if (selectedComments.length === localComments.length) {
      setSelectedComments([])
    } else {
      setSelectedComments(localComments.map((comment) => comment.id))
    }
  }

  const toggleSelectComment = (id: string) => {
    if (selectedComments.includes(id)) {
      setSelectedComments(selectedComments.filter((commentId) => commentId !== id))
    } else {
      setSelectedComments([...selectedComments, id])
    }
  }

  const approveComment = (id: string) => {
    setLocalComments(
      localComments.map((comment) => (comment.id === id ? { ...comment, status: "approved" as const } : comment)),
    )
  }

  const rejectComment = (id: string) => {
    setLocalComments(localComments.filter((comment) => comment.id !== id))
  }

  const markAsSpam = (id: string) => {
    setLocalComments(
      localComments.map((comment) => (comment.id === id ? { ...comment, status: "spam" as const } : comment)),
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getStatusBadge = (status: Comment["status"]) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-emerald-500 hover:bg-emerald-600">Approuvé</Badge>
      case "pending":
        return <Badge className="bg-amber-500 hover:bg-amber-600">En attente</Badge>
      case "spam":
        return <Badge className="bg-red-500 hover:bg-red-600">Spam</Badge>
    }
  }

  return (
    <div className="space-y-4 p-4 md:p-0">
      <div className="flex items-center gap-2 pb-2">
        <Checkbox
          checked={selectedComments.length === localComments.length && localComments.length > 0}
          onCheckedChange={toggleSelectAll}
          aria-label="Sélectionner tous les commentaires"
        />
        <span className="text-sm text-muted-foreground">
          {selectedComments.length}{" "}
          {selectedComments.length === 1 ? "commentaire sélectionné" : "commentaires sélectionnés"}
        </span>
        {selectedComments.length > 0 && (
          <div className="flex items-center gap-2 ml-auto">
            <Button variant="outline" size="sm" onClick={() => {}}>
              <Check className="mr-2 h-4 w-4" />
              Approuver
            </Button>
            <Button variant="outline" size="sm" onClick={() => {}}>
              <Flag className="mr-2 h-4 w-4" />
              Spam
            </Button>
            <Button variant="outline" size="sm" className="text-destructive" onClick={() => {}}>
              <Trash2 className="mr-2 h-4 w-4" />
              Supprimer
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {localComments.map((comment) => (
          <Card key={comment.id} className="overflow-hidden hover-scale">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-start gap-4">
                <Checkbox
                  checked={selectedComments.includes(comment.id)}
                  onCheckedChange={() => toggleSelectComment(comment.id)}
                  aria-label={`Sélectionner le commentaire de ${comment.author.name}`}
                  className="mt-1"
                />
                <Avatar className="h-10 w-10">
                  <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                  <AvatarFallback>{comment.author.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <div className="font-medium">{comment.author.name}</div>
                      <div className="text-sm text-muted-foreground">{comment.author.email}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(comment.status)}
                      <span className="text-sm text-muted-foreground">{formatDate(comment.date)}</span>
                    </div>
                  </div>
                  <div className="text-sm">{comment.content}</div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>Article: {comment.article.title}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/50 px-6 py-3 flex justify-between">
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{comment.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{comment.replies}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {comment.status === "pending" && (
                  <>
                    <Button variant="ghost" size="sm" onClick={() => approveComment(comment.id)}>
                      <Check className="mr-2 h-4 w-4" />
                      Approuver
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => rejectComment(comment.id)}>
                      <X className="mr-2 h-4 w-4" />
                      Rejeter
                    </Button>
                  </>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => {}}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>Répondre</span>
                    </DropdownMenuItem>
                    {comment.status !== "approved" && (
                      <DropdownMenuItem onClick={() => approveComment(comment.id)}>
                        <Check className="mr-2 h-4 w-4" />
                        <span>Approuver</span>
                      </DropdownMenuItem>
                    )}
                    {comment.status !== "spam" && (
                      <DropdownMenuItem onClick={() => markAsSpam(comment.id)}>
                        <Flag className="mr-2 h-4 w-4" />
                        <span>Marquer comme spam</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => rejectComment(comment.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Supprimer</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

