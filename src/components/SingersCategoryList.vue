<script setup lang="ts">
    import categories from "@/data/categories.json"
    import { cn } from '@/lib/cn';
    import { useI18n } from 'vue-i18n'
    import { useCategoryStore } from '@/store/category';
    import { storeToRefs } from 'pinia';

    const { t } = useI18n()

    const categoryStore = useCategoryStore()
    const {currentCategory} = storeToRefs(categoryStore)
</script>

<template>
    <div class="-mx-8.75  px-8.75 overflow-auto no-scrollbar flex flex-nowrap gap-1.5 mb-5 md:mb-7.5 md:mx-0 md:px-0">
        <button 
          :key="cat.id" v-for="cat in categories"
          @click="categoryStore.setCurrentCategory(cat.id)"
          :class="cn(
            'px-4 py-2.5 min-w-max border border-[#00000033] text-sm',
             currentCategory == cat.id && 'bg-[#181818] text-white'
          )" 
        >
          {{ t(`categories.${cat.id}`) }}
        </button>
    </div>
</template>