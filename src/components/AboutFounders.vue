<script setup lang="ts">
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import { useI18n } from 'vue-i18n'
  import maratImg from '@/assets/images/marat.png'
  import dimaImg from '@/assets/images/dima.png'
  import azizImg from '@/assets/images/azizbek.png'
  import AboutFounderCard from '@/components/AboutFounderCard.vue'

  const { t } = useI18n()

  const founders = [
    { key: 'about.founders.founder1', image: azizImg },
    { key: 'about.founders.founder2', image: dimaImg },
    { key: 'about.founders.founder3', image: maratImg },
  ]

  // On desktop all three fit (slider has nothing to scroll); below lg it becomes swipeable.
  const breakpoints = {
    768: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 3, spaceBetween: 20 },
  }
</script>

<template>
  <section class="overflow-x-clip pb-15 md:pb-25 lg:pb-30">
    <div class="container">
      <div class="mx-auto max-w-261.5">
        <swiper
          :slides-per-view="1"
          :space-between="16"
          :breakpoints="breakpoints"
          class="overflow-visible!"
        >
          <swiper-slide v-for="f in founders" :key="f.key" class="h-auto!">
            <AboutFounderCard
              :image="f.image"
              :name="t(`${f.key}.name`)"
              :role="t(`${f.key}.role`)"
              :bio="t(`${f.key}.bio`)"
            />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>
