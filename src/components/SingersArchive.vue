<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useCategoryStore } from '@/store/category'
import singers from '@/data/singers.json'
import { useI18n } from 'vue-i18n'
import ArrowRightIcon from './icons/ArrowRightIcon.vue'
import { RouterLink } from 'vue-router'
import type { Singer } from '../types'
import Spinner from './icons/Spinner.vue'

const { t } = useI18n()
const categoryStore = useCategoryStore()

const ITEMS_PER_PAGE = 9
const visibleCount = ref(ITEMS_PER_PAGE)
const isLoading = ref(false)

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
  if (isLoading.value) return

  isLoading.value = true

  setTimeout(() => {
    visibleCount.value += ITEMS_PER_PAGE
    isLoading.value = false
  }, 1000)
}
</script>

<template>
    <div class="mb-16.25 md:mb-17.5 lg:mb-30">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-7.5 md:gap-y-10 lg:gap-y-15">
            <div  
                v-for="(singer, index) in visibleSingers"
                :key="categoryStore.currentCategory + '-' + singer.id"
                :style="{ animationDelay: (index % ITEMS_PER_PAGE) * 0.15 + 's' }"
                class="card-in w-full flex flex-col gap-3 relative  hover:[&_svg]:ml-2"
            >   
                <div class="flex gap-2 absolute z-10 top-6.5 left-6.5">
                    <span
                        v-for="catId in singer.categoryIds"
                        class="px-3 py-1.5 text-sm text-white border border-[#FFFFFF4D]"
                    >
                        {{ t(`categories.${catId}`) }}
                    </span>
                </div>
    
                <RouterLink :to="'/singers/' + singer.id" class="w-full h-92.5 transition-all duration-300  hover:opacity-80 md:h-101.5 lg:h-124.25">
                    <img class="w-full h-full object-cover" :src="singer.image" :alt="t(singer.nameKey)">
                </RouterLink>
                
                <RouterLink :to="'/singers/' + singer.id" class="flex gap-3 items-center ">
                    <h4 class="text-[18px] md:text-[22px] uppercase">{{ t(singer.nameKey) }}</h4>
                    <ArrowRightIcon class="transition-all duration-300" />
                </RouterLink>
            </div>
        </div>
    
        <button 
            v-if="canLoadMore"
            @click="loadMore"
            class="mx-auto px-7.25 py-5.5 relative bg-[#181818] block cursor-pointer  text-white uppercase text-sm/[100%] mt-11.25 sm:mt-12.5 lg:mt-15"
        >   
          <div v-if="isLoading" class="absolute left-0 top-0 w-full h-full bg-[#181818] flex justify-center items-center">
            <Spinner class="size-4" />
          </div>
          {{ t("btns.loadMore") }}
        </button>
    </div>
</template>

<style scoped>
@keyframes card-in {
  from {
    opacity: 0;
    /* transform: translateY(-15px); */
  }
  to {
    opacity: 1;
    /* transform: translateY(0); */
  }
}

.card-in {
  animation: card-in 0.5s ease-out both;
}

@media (prefers-reduced-motion: reduce) {
  .card-in {
    animation: none;
  }
}
</style>
