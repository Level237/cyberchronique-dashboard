"use client"

import { useState } from "react"
import { Edit, Eye, FileText, MoreHorizontal, Trash2, ArrowUpDown } from "lucide-react"
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
import { Switch } from "@/components/ui/switch"

type Category = {
  id: string
  name: string
  slug: string
  description: string
  articleCount: number
  isActive: boolean
  color: string
}

const categories: Category[] = [
  {
    id: "1",
    name: "Intelligence Artificielle",
    slug: "intelligence-artificielle",
    description: "Tout sur l'IA, le machine learning et les technologies cognitives",
    articleCount: 42,
    isActive: true,
    color: "#3B82F6", // blue-500
  },
  {
    id: "2",
    name: "Développement Web",
    slug: "developpement-web",
    description: "Frameworks, langages et bonnes pratiques pour le développement web",
    articleCount: 38,
    isActive: true,
    color: "#10B981", // emerald-500
  },
  {
    id: "3",
    name: "Cybersécurité",
    slug: "cybersecurite",
    description: "Protection des données, menaces et solutions de sécurité",
    articleCount: 27,
    isActive: true,
    color: "#F59E0B", // amber-500
  },
  {
    id: "4",
    name: "Blockchain",
    slug: "blockchain",
    description: "Cryptomonnaies, NFT et applications décentralisées",
    articleCount: 19,
    isActive: true,
    color: "#8B5CF6", // violet-500
  },
  {
    id: "5",
    name: "Mobile",
    slug: "mobile",
    description: "Développement d'applications mobiles et tendances",
    articleCount: 23,
    isActive: true,
    color: "#EC4899", // pink-500
  },
  {
    id: "6",
    name: "Cloud Computing",
    slug: "cloud-computing",
    description: "Services cloud, architectures et déploiements",
    articleCount: 15,
    isActive: true,
    color: "#6366F1", // indigo-500
  },
  {
    id: "7",
    name: "IoT",
    slug: "iot",
    description: "Internet des objets, capteurs et applications connectées",
    articleCount: 12,
    isActive: false,
    color: "#F43F5E", // rose-500
  },
  {
    id: "8",
    name: "Design UX/UI",
    slug: "design-ux-ui",
    description: "Expérience utilisateur, interfaces et principes de design",
    articleCount: 18,
    isActive: true,
    color: "#0EA5E9", // sky-500
  },
]

export function CategoriesList() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [localCategories, setLocalCategories] = useState<Category[]>(categories)

  const toggleSelectAll = () => {
    if (selectedCategories.length === categories.length) {
      setSelectedCategories([])
    } else {
      setSelectedCategories(categories.map((category) => category.id))
    }
  }

  const toggleSelectCategory = (id: string) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter((categoryId) => categoryId !== id))
    } else {
      setSelectedCategories([...selectedCategories, id])
    }
  }

  const toggleCategoryStatus = (id: string) => {
    setLocalCategories(
      localCategories.map((category) =>
        category.id === id ? { ...category, isActive: !category.isActive } : category,
      ),
    )
  }

  return (
    <div className="relative w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[40px]">
              <Checkbox
                checked={selectedCategories.length === categories.length && categories.length > 0}
                onCheckedChange={toggleSelectAll}
                aria-label="Sélectionner toutes les catégories"
              />
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-1">
                Catégorie
                <Button variant="ghost" size="icon" className="h-5 w-5">
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </div>
            </TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
            <TableHead className="hidden md:table-cell text-center">Articles</TableHead>
            <TableHead className="hidden md:table-cell text-center">Statut</TableHead>
            <TableHead className="w-[60px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {localCategories.map((category) => (
            <TableRow key={category.id} className="group hover-scale">
              <TableCell>
                <Checkbox
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => toggleSelectCategory(category.id)}
                  aria-label={`Sélectionner ${category.name}`}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full" style={{ backgroundColor: category.color }} />
                  <div className="font-medium">{category.name}</div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">/{category.slug}</div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="text-sm text-muted-foreground">{category.description}</div>
              </TableCell>
              <TableCell className="hidden md:table-cell text-center">
                <Badge variant="secondary" className="font-mono">
                  <FileText className="mr-1 h-3 w-3" />
                  {category.articleCount}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell text-center">
                <Switch
                  checked={category.isActive}
                  onCheckedChange={() => toggleCategoryStatus(category.id)}
                  aria-label={`${category.isActive ? "Désactiver" : "Activer"} la catégorie ${category.name}`}
                />
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
                      <span>Voir les articles</span>
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

