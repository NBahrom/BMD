import { defineStore } from 'pinia'
import categories from "@/data/categories.json"

interface Category {
  id: string
  label: string
}

const typedCategories = categories as Category[]
type CategoryId = (typeof typedCategories)[number]['id']

export const useCategoryStore = defineStore('category', {
  state: () => ({
    currentCategory: 'viewAll' as CategoryId,
  }),

  actions: {
    setCurrentCategory(category: string) {
      this.currentCategory = category
    },
  },
})
