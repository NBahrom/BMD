<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import AboutFounders from '@/components/AboutFounders.vue'
  import AboutAdvantages from '@/components/AboutAdvantages.vue'
  import AboutPartners from '@/components/AboutPartners.vue'
  import AboutEvents from '@/components/AboutEvents.vue'

  const { t } = useI18n()
</script>

<template>
  <main class="bg-[#f8f8f5]">
    <!-- Hero -->
    <section class="pb-12.5 pt-5 md:py-15 lg:py-30">
      <div class="container">
        <div class="mx-auto flex max-w-242.5 flex-col items-start gap-6 text-left md:items-center md:text-center lg:gap-10">
          <h1 class="text-[40px]/[100%] tracking-tight md:text-[45px]/[100%] lg:text-[70px]/[100%] lg:tracking-[-4.2px]">
            {{ t('about.title') }}
          </h1>
          <p
            v-html="t('about.desc')"
            class="font-heading font-normal text-[20px]/[1.4] italic text-[#18181880] [&_b]:font-bold [&_b]:text-[#181818] md:text-[24px]/[1.4]"
          />
        </div>
      </div>
    </section>

    <!-- Founders (swipeable slider on tablet / mobile) -->
    <AboutFounders />

    <!-- Advantages + partners (white block) -->
    <section class="bg-white py-15 overflow-hidden md:py-20 lg:py-30">
      <div class="container">
        <AboutAdvantages />
        <div class="mt-7.5 md:mt-17.5 lg:mt-25">
          <AboutPartners />
        </div>
      </div>
    </section>

    <!-- Featured Events -->
    <AboutEvents />
  </main>
</template>
