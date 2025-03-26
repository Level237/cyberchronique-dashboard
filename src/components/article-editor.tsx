"use client"

import type * as React from "react"
import { useState } from "react"
import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  Eye,
  FileImage,
  Heading1,
  Heading2,
  ImageIcon,
  List,
  ListOrdered,
  Minus,
  Plus,
  Quote,
  Save,
  Send,
  Settings,
  Video,
  X,
  Trash2,
} from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"

export function ArticleEditor() {
  const [title, setTitle] = useState("")
  const [featuredImage, setFeaturedImage] = useState<string | null>(null)
  const [publishDate, setPublishDate] = useState<Date | undefined>(new Date())
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Développement Web"])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isScheduled, setIsScheduled] = useState(false)
  const [allowComments, setAllowComments] = useState(true)
  const [editorContent, setEditorContent] = useState<any[]>([{ type: "paragraph", content: "" }])
  const [activeTab, setActiveTab] = useState("editor")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  // Simuler le chargement d'une image mise en avant
  const handleFeaturedImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Dans un cas réel, vous téléchargeriez le fichier sur un serveur
      // Ici, nous simulons simplement avec une URL de placeholder
      setFeaturedImage(`/placeholder.svg?height=600&width=1200&text=${encodeURIComponent(file.name)}`)
    }
  }

  // Catégories disponibles
  const categories = [
    "Intelligence Artificielle",
    "Développement Web",
    "Cybersécurité",
    "Blockchain",
    "Mobile",
    "Cloud Computing",
    "IoT",
    "Design UX/UI",
  ]

  // Tags populaires
  const popularTags = [
    "JavaScript",
    "React",
    "Next.js",
    "TypeScript",
    "AI",
    "Machine Learning",
    "CSS",
    "Tailwind",
    "API",
    "Frontend",
    "Backend",
    "DevOps",
    "Cloud",
  ]

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const addNewTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value) {
      const newTag = e.currentTarget.value.trim()
      if (newTag && !selectedTags.includes(newTag)) {
        setSelectedTags([...selectedTags, newTag])
        e.currentTarget.value = ""
      }
      e.preventDefault()
    }
  }

  // Simuler l'ajout d'un bloc de contenu
  const addContentBlock = (type: string) => {
    let newBlock

    switch (type) {
      case "heading1":
        newBlock = { type: "heading1", content: "Titre principal" }
        break
      case "heading2":
        newBlock = { type: "heading2", content: "Sous-titre" }
        break
      case "paragraph":
        newBlock = { type: "paragraph", content: "Ajoutez votre texte ici..." }
        break
      case "image":
        newBlock = {
          type: "image",
          url: "/placeholder.svg?height=400&width=800&text=Image",
          caption: "Légende de l'image",
        }
        break
      case "video":
        newBlock = {
          type: "video",
          url: "https://example.com/video.mp4",
          caption: "Légende de la vidéo",
        }
        break
      case "quote":
        newBlock = {
          type: "quote",
          content: "Ceci est une citation importante.",
          source: "Auteur de la citation",
        }
        break
      case "list":
        newBlock = {
          type: "list",
          items: ["Premier élément", "Deuxième élément", "Troisième élément"],
        }
        break
      case "orderedList":
        newBlock = {
          type: "orderedList",
          items: ["Premier élément", "Deuxième élément", "Troisième élément"],
        }
        break
      case "separator":
        newBlock = { type: "separator" }
        break
      default:
        newBlock = { type: "paragraph", content: "" }
    }

    setEditorContent([...editorContent, newBlock])
  }

  // Rendu des blocs de contenu
  const renderContentBlock = (block: any, index: number) => {
    switch (block.type) {
      case "heading1":
        return (
          <div key={index} className="relative group py-2">
            <input
              type="text"
              defaultValue={block.content}
              className="w-full text-3xl font-bold border-0 bg-transparent focus:outline-none focus:ring-0 p-2"
              placeholder="Titre principal"
            />
            <BlockActions />
          </div>
        )
      case "heading2":
        return (
          <div key={index} className="relative group py-2">
            <input
              type="text"
              defaultValue={block.content}
              className="w-full text-2xl font-semibold border-0 bg-transparent focus:outline-none focus:ring-0 p-2"
              placeholder="Sous-titre"
            />
            <BlockActions />
          </div>
        )
      case "paragraph":
        return (
          <div key={index} className="relative group py-2">
            <Textarea
              defaultValue={block.content}
              className="w-full min-h-[100px] border-0 bg-transparent focus:outline-none focus:ring-0 p-2 resize-none"
              placeholder="Commencez à écrire ou insérez un média..."
            />
            <BlockActions />
          </div>
        )
      case "image":
        return (
          <div key={index} className="relative group py-4">
            <div className="rounded-lg overflow-hidden border border-border">
              <img
                src={block.url || "/placeholder.svg"}
                alt={block.caption || "Image"}
                className="w-full h-auto object-cover"
              />
              <input
                type="text"
                defaultValue={block.caption}
                className="w-full text-sm text-center border-0 bg-muted/50 p-2 focus:outline-none focus:ring-0"
                placeholder="Ajouter une légende..."
              />
            </div>
            <BlockActions />
          </div>
        )
      case "video":
        return (
          <div key={index} className="relative group py-4">
            <div className="rounded-lg overflow-hidden border border-border">
              <div className="aspect-video bg-muted flex items-center justify-center">
                <Video className="h-16 w-16 text-muted-foreground/50" />
              </div>
              <input
                type="text"
                defaultValue={block.caption}
                className="w-full text-sm text-center border-0 bg-muted/50 p-2 focus:outline-none focus:ring-0"
                placeholder="Ajouter une légende..."
              />
            </div>
            <BlockActions />
          </div>
        )
      case "quote":
        return (
          <div key={index} className="relative group py-4">
            <blockquote className="border-l-4 border-primary pl-4 py-2">
              <Textarea
                defaultValue={block.content}
                className="w-full border-0 bg-transparent focus:outline-none focus:ring-0 p-0 resize-none text-lg italic"
                placeholder="Saisissez une citation..."
              />
              <input
                type="text"
                defaultValue={block.source}
                className="w-full text-sm border-0 bg-transparent focus:outline-none focus:ring-0 p-0 text-muted-foreground"
                placeholder="Source de la citation"
              />
            </blockquote>
            <BlockActions />
          </div>
        )
      case "list":
        return (
          <div key={index} className="relative group py-4">
            <ul className="list-disc pl-6 space-y-2">
              {block.items.map((item: string, i: number) => (
                <li key={i} className="relative group/item">
                  <input
                    type="text"
                    defaultValue={item}
                    className="w-full border-0 bg-transparent focus:outline-none focus:ring-0 p-1"
                    placeholder="Élément de liste"
                  />
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover/item:opacity-100 transition-opacity"
                    onClick={() => {
                      const newItems = [...block.items]
                      newItems.splice(i, 1)
                      const newContent = [...editorContent]
                      newContent[index].items = newItems
                      setEditorContent(newContent)
                    }}
                  >
                    <Minus className="h-4 w-4 text-muted-foreground" />
                  </button>
                </li>
              ))}
              <li>
                <button
                  className="text-sm text-primary flex items-center gap-1"
                  onClick={() => {
                    const newContent = [...editorContent]
                    newContent[index].items.push("Nouvel élément")
                    setEditorContent(newContent)
                  }}
                >
                  <Plus className="h-4 w-4" /> Ajouter un élément
                </button>
              </li>
            </ul>
            <BlockActions />
          </div>
        )
      case "orderedList":
        return (
          <div key={index} className="relative group py-4">
            <ol className="list-decimal pl-6 space-y-2">
              {block.items.map((item: string, i: number) => (
                <li key={i} className="relative group/item">
                  <input
                    type="text"
                    defaultValue={item}
                    className="w-full border-0 bg-transparent focus:outline-none focus:ring-0 p-1"
                    placeholder="Élément de liste"
                  />
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover/item:opacity-100 transition-opacity"
                    onClick={() => {
                      const newItems = [...block.items]
                      newItems.splice(i, 1)
                      const newContent = [...editorContent]
                      newContent[index].items = newItems
                      setEditorContent(newContent)
                    }}
                  >
                    <Minus className="h-4 w-4 text-muted-foreground" />
                  </button>
                </li>
              ))}
              <li>
                <button
                  className="text-sm text-primary flex items-center gap-1"
                  onClick={() => {
                    const newContent = [...editorContent]
                    newContent[index].items.push("Nouvel élément")
                    setEditorContent(newContent)
                  }}
                >
                  <Plus className="h-4 w-4" /> Ajouter un élément
                </button>
              </li>
            </ol>
            <BlockActions />
          </div>
        )
      case "separator":
        return (
          <div key={index} className="relative group py-6">
            <Separator className="my-4" />
            <BlockActions />
          </div>
        )
      default:
        return null
    }
  }

  // Actions pour chaque bloc
  const BlockActions = () => (
    <div className="absolute -left-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <Plus className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuItem onClick={() => addContentBlock("paragraph")}>
            <span className="mr-2">📝</span> Paragraphe
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => addContentBlock("heading1")}>
            <Heading1 className="mr-2 h-4 w-4" /> Titre principal
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => addContentBlock("heading2")}>
            <Heading2 className="mr-2 h-4 w-4" /> Sous-titre
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => addContentBlock("image")}>
            <ImageIcon className="mr-2 h-4 w-4" /> Image
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => addContentBlock("video")}>
            <Video className="mr-2 h-4 w-4" /> Vidéo
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => addContentBlock("quote")}>
            <Quote className="mr-2 h-4 w-4" /> Citation
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => addContentBlock("list")}>
            <List className="mr-2 h-4 w-4" /> Liste à puces
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => addContentBlock("orderedList")}>
            <ListOrdered className="mr-2 h-4 w-4" /> Liste numérotée
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => addContentBlock("separator")}>
            <Minus className="mr-2 h-4 w-4" /> Séparateur
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Barre d'outils principale */}
      <div className="border-b bg-card">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <a href="/dashboard/articles">
                <ArrowLeft className="h-4 w-4" />
              </a>
            </Button>
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold">{title ? title : "Nouvel article"}</h1>
              <p className="text-sm text-muted-foreground">Brouillon</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              Aperçu
            </Button>
            <Button variant="outline" size="sm">
              <Save className="mr-2 h-4 w-4" />
              Enregistrer
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm">
                  Publier <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => setIsScheduled(false)}>
                  <Send className="mr-2 h-4 w-4" />
                  <span>Publier maintenant</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsScheduled(true)}>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Programmer</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Save className="mr-2 h-4 w-4" />
                  <span>Enregistrer comme brouillon</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 overflow-hidden">
        <div className="flex h-full">
          {/* Éditeur principal */}
          <div className={cn("flex-1 overflow-auto transition-all duration-300", isSidebarOpen ? "mr-[350px]" : "")}>
            <div className="container py-8 px-4 max-w-4xl mx-auto">
              {/* Titre de l'article */}
              <div className="mb-8">
                <Input
                  type="text"
                  placeholder="Titre de l'article"
                  className="text-4xl font-bold border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Image mise en avant */}
              {featuredImage ? (
                <div className="mb-8 relative group">
                  <img
                    src={featuredImage || "/placeholder.svg"}
                    alt="Image mise en avant"
                    className="w-full h-auto rounded-lg object-cover aspect-video"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 rounded-lg">
                    <Button variant="secondary" size="sm">
                      <FileImage className="mr-2 h-4 w-4" />
                      Changer
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => setFeaturedImage(null)}>
                      Supprimer
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="mb-8">
                  <label
                    htmlFor="featured-image-upload"
                    className="block w-full aspect-video rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors cursor-pointer bg-muted/50"
                  >
                    <div className="flex flex-col items-center justify-center h-full gap-2">
                      <FileImage className="h-8 w-8 text-muted-foreground/50" />
                      <span className="text-muted-foreground">Ajouter une image mise en avant</span>
                      <span className="text-xs text-muted-foreground/70">Cliquez ou déposez une image</span>
                    </div>
                  </label>
                  <input
                    id="featured-image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFeaturedImageUpload}
                  />
                </div>
              )}

              {/* Contenu de l'article */}
              <div className="space-y-2">{editorContent.map(renderContentBlock)}</div>

              {/* Bouton pour ajouter un nouveau bloc */}
              <div className="flex justify-center my-8">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="rounded-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Ajouter un bloc
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuItem onClick={() => addContentBlock("paragraph")}>
                      <span className="mr-2">📝</span> Paragraphe
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => addContentBlock("heading1")}>
                      <Heading1 className="mr-2 h-4 w-4" /> Titre principal
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => addContentBlock("heading2")}>
                      <Heading2 className="mr-2 h-4 w-4" /> Sous-titre
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => addContentBlock("image")}>
                      <ImageIcon className="mr-2 h-4 w-4" /> Image
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => addContentBlock("video")}>
                      <Video className="mr-2 h-4 w-4" /> Vidéo
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => addContentBlock("quote")}>
                      <Quote className="mr-2 h-4 w-4" /> Citation
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => addContentBlock("list")}>
                      <List className="mr-2 h-4 w-4" /> Liste à puces
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => addContentBlock("orderedList")}>
                      <ListOrdered className="mr-2 h-4 w-4" /> Liste numérotée
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => addContentBlock("separator")}>
                      <Minus className="mr-2 h-4 w-4" /> Séparateur
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          {/* Panneau latéral */}
          <div
            className={cn(
              "fixed top-[4rem] right-0 w-[350px] h-[calc(100vh-4rem)] border-l bg-card transition-transform duration-300 z-10",
              isSidebarOpen ? "translate-x-0" : "translate-x-full",
            )}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-semibold">Paramètres de l'article</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="h-[calc(100%-57px)] p-4">
              <Tabs defaultValue="metadata" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="metadata">Métadonnées</TabsTrigger>
                  <TabsTrigger value="seo">SEO</TabsTrigger>
                  <TabsTrigger value="settings">Paramètres</TabsTrigger>
                </TabsList>
                <TabsContent value="metadata" className="space-y-6 pt-4">
                  {/* Catégories */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Catégories</Label>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={`category-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => toggleCategory(category)}
                          />
                          <label
                            htmlFor={`category-${category}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Tags</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {selectedTags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="gap-1">
                          {tag}
                          <button
                            onClick={() => setSelectedTags(selectedTags.filter((t) => t !== tag))}
                            className="ml-1 rounded-full hover:bg-muted-foreground/20"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <Input placeholder="Ajouter un tag..." onKeyDown={addNewTag} />
                    <div className="mt-2">
                      <p className="text-xs text-muted-foreground mb-1">Tags populaires :</p>
                      <div className="flex flex-wrap gap-1">
                        {popularTags
                          .filter((tag) => !selectedTags.includes(tag))
                          .slice(0, 8)
                          .map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="cursor-pointer hover:bg-muted"
                              onClick={() => toggleTag(tag)}
                            >
                              {tag}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Auteur */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Auteur</Label>
                    <div className="flex items-center gap-2 p-2 border rounded-md">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                        <AvatarFallback>AD</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Admin</p>
                        <p className="text-xs text-muted-foreground">admin@techblog.com</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        Changer
                      </Button>
                    </div>
                  </div>

                  {/* Date de publication */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Programmer la publication</Label>
                      <Switch checked={isScheduled} onCheckedChange={setIsScheduled} />
                    </div>
                    {isScheduled && (
                      <div className="space-y-2 p-2 border rounded-md">
                        <div className="grid gap-2">
                          <Label className="text-xs">Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="justify-start text-left">
                                {publishDate ? (
                                  format(publishDate, "PPP", { locale: fr })
                                ) : (
                                  <span>Choisir une date</span>
                                )}
                                <Calendar className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={publishDate}
                                onSelect={setPublishDate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="grid gap-2">
                          <Label className="text-xs">Heure</Label>
                          <Select defaultValue="09:00">
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner l'heure" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="09:00">09:00</SelectItem>
                              <SelectItem value="12:00">12:00</SelectItem>
                              <SelectItem value="15:00">15:00</SelectItem>
                              <SelectItem value="18:00">18:00</SelectItem>
                              <SelectItem value="21:00">21:00</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="seo" className="space-y-6 pt-4">
                  {/* Méta titre */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Méta titre</Label>
                    <Input placeholder="Titre SEO (laissez vide pour utiliser le titre de l'article)" />
                    <p className="text-xs text-muted-foreground">
                      Le titre qui apparaîtra dans les résultats de recherche. Idéalement entre 50 et 60 caractères.
                    </p>
                  </div>

                  {/* Méta description */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Méta description</Label>
                    <Textarea placeholder="Description SEO" className="resize-none h-20" />
                    <p className="text-xs text-muted-foreground">
                      La description qui apparaîtra dans les résultats de recherche. Idéalement entre 150 et 160
                      caractères.
                    </p>
                  </div>

                  {/* URL slug */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Slug URL</Label>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">techblog.com/articles/</span>
                      <Input
                        placeholder="slug-url"
                        value={
                          title
                            ? title
                                .toLowerCase()
                                .replace(/\s+/g, "-")
                                .replace(/[^\w-]+/g, "")
                            : ""
                        }
                        className="flex-1"
                      />
                    </div>
                  </div>

                  {/* Canonical URL */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">URL canonique</Label>
                    <Input placeholder="https://..." />
                    <p className="text-xs text-muted-foreground">
                      Utilisez cette option si ce contenu existe déjà ailleurs et que vous souhaitez éviter le contenu
                      dupliqué.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="settings" className="space-y-6 pt-4">
                  {/* Commentaires */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Autoriser les commentaires</Label>
                      <p className="text-xs text-muted-foreground">Permettre aux lecteurs de commenter cet article</p>
                    </div>
                    <Switch checked={allowComments} onCheckedChange={setAllowComments} />
                  </div>

                  {/* Épingler l'article */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Épingler en haut</Label>
                      <p className="text-xs text-muted-foreground">Garder cet article en haut de la liste</p>
                    </div>
                    <Switch />
                  </div>

                  {/* Visibilité */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Visibilité</Label>
                    <Select defaultValue="public">
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner la visibilité" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="private">Privé</SelectItem>
                        <SelectItem value="password">Protégé par mot de passe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Options avancées */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Options avancées</Label>
                    <Card>
                      <CardContent className="p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-xs" htmlFor="featured">
                            Article à la une
                          </Label>
                          <Switch id="featured" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label className="text-xs" htmlFor="hide-title">
                            Masquer le titre
                          </Label>
                          <Switch id="hide-title" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label className="text-xs" htmlFor="disable-indexing">
                            Désactiver l'indexation
                          </Label>
                          <Switch id="disable-indexing" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Supprimer l'article */}
                  <div className="pt-4">
                    <Button variant="destructive" className="w-full">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Supprimer l'article
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </ScrollArea>
          </div>

          {/* Bouton pour ouvrir/fermer le panneau latéral */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "fixed top-1/2 -translate-y-1/2 transition-all duration-300 z-20 bg-card shadow-md border",
              isSidebarOpen ? "right-[350px]" : "right-0",
            )}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

