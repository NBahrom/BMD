<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useCategoryStore } from '@/store/category'
import singers from '@/data/singers.json'
import { useI18n } from 'vue-i18n'
import ArrowRightIcon from './icons/ArrowRightIcon.vue'
import { RouterLink } from 'vue-router'
import type { Singer } from '../types'

const { t } = useI18n()
const categoryStore = useCategoryStore()

const ITEMS_PER_PAGE = 9
const visibleCount = ref(ITEMS_PER_PAGE)

// Reset pagination when category changes
watch(
  () => categoryStore.currentCategory,
  () => {
    visibleCount.value = ITEMS_PER_PAGE
  }
)

//Filter singers by selected category
const filteredSingers = computed<Singer[]>(() => {
  if (categoryStore.currentCategory === 'viewAll') {
    return singers as Singer[]
  }

  return (singers as Singer[]).filter(singer =>
    singer.categoryIds.includes(categoryStore.currentCategory)
  )
})


// Limit visible singers (pagination)
const visibleSingers = computed(() => {
  return filteredSingers.value.slice(0, visibleCount.value)
})

// Load more availability
const canLoadMore = computed(() => {
  return visibleCount.value < filteredSingers.value.length
})

//Load more action
function loadMore() {
  visibleCount.value += ITEMS_PER_PAGE
}

</script>

<template>
    <div class="mb-16.25 md:mb-17.5 lg:mb-30">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-7.5 md:gap-y-10 lg:gap-y-15">
            <div  
                v-for="singer in visibleSingers"
                :key="singer.id"
                class="w-full flex flex-col gap-3 relative"
            >   
                <div class="flex gap-2 absolute top-6.5 left-6.5">
                    <span
                        v-for="catId in singer.categoryIds"
                        class="px-3 py-1.5 text-sm text-white border border-[#FFFFFF4D]"
                    >
                        {{ t(`categories.${catId}`) }}
                    </span>
                </div>
    
                <div class="w-full h-92.5 md:h-101.5 lg:h-124.25">
                    <img class="w-full h-full object-cover" :src="singer.image" :alt="t(singer.nameKey)">
                </div>
                
                <RouterLink :to="'/singers/' + singer.id" class="flex gap-3 items-center">
                    <h4 class="text-[18px] md:text-[22px] uppercase">{{ t(singer.nameKey) }}</h4>
                    <ArrowRightIcon />
                </RouterLink>
            </div>
        </div>
    
        <button 
            v-if="canLoadMore"
            @click="loadMore"
            class="mx-auto px-8 py-5.5 bg-[#181818] block  text-white uppercase text-sm mt-11.25 sm:mt-12.5 lg:mt-15"
        >
            {{ t("btns.loadMore") }}
        </button>
    </div>
</template>