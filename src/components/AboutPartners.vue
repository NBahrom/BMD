<script setup lang="ts">
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import { useI18n } from 'vue-i18n'
  import { useMediaQuery } from '@/composables/useMediaQuery'

  const { t } = useI18n()

  const partners = [
    { name: 'GONG', src: '/images/partners/gong.svg' },
    { name: 'Ghost', src: '/images/partners/ghost.svg' },
    { name: 'GitHub', src: '/images/partners/github.svg' },
    { name: 'InVision', src: '/images/partners/invision.svg' },
    { name: 'Miro', src: '/images/partners/miro.svg' },
  ]

  const isTabletUp = useMediaQuery('(min-width: 768px)')
  const middleIndex = Math.floor(partners.length / 2)
</script>

<template>
  <div class="flex flex-col items-center gap-5 md:gap-10">
    <!-- Tablet / desktop: static row -->
    <div
      v-if="isTabletUp"
      class="mx-auto flex w-full max-w-261 flex-wrap items-center lg:justify-between"
    >
      <img
        v-for="p in partners"
        :key="p.name"
        :src="p.src"
        :alt="p.name"
        class="w-auto object-contain md:w-31.5 lg:w-auto"
      />
    </div>

    <!-- Mobile: centered slider starting from the middle logo -->
    <swiper
      v-else
      :slides-per-view="2.4"
      :centered-slides="true"
      :initial-slide="middleIndex"
      :space-between="0"
      class="w-full overflow-visible!"
    >
      <swiper-slide
        v-for="p in partners"
        :key="p.name"
        class="flex! w-auto! items-center justify-center "
      >
        <img :src="p.src" :alt="p.name" class="w-31.5 object-contain" />
      </swiper-slide>
    </swiper>

    <p class="text-center font-heading text-[17px]/[1.4] italic text-[#18181866]">
      {{ t('about.partnersCaption') }}
    </p>
  </div>
</template>
