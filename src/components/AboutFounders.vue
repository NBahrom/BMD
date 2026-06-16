<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import { useI18n } from 'vue-i18n'
  import maratImg from '@/assets/images/marat.webp'
  import iskandarImg from '@/assets/images/iskandar.webp'
  import azizImg from '@/assets/images/azizbek.webp'
  import AboutFounderCard from '@/components/AboutFounderCard.vue'

  const { t } = useI18n()

  // Only one founder's bio can be open at a time; opening another closes it.
  const openKey = ref<string | null>(null)
  const openFounder = (key: string) => {
    openKey.value = key
  }
  const toggleFounder = (key: string) => {
    openKey.value = openKey.value === key ? null : key
  }
  const closeFounder = (key: string) => {
    if (openKey.value === key) openKey.value = null
  }

  const founders = [
    { key: 'about.founders.founder1', image: azizImg },
    { key: 'about.founders.founder2', image: iskandarImg },
    { key: 'about.founders.founder3', image: maratImg },
  ]

  // On desktop all three fit (slider has nothing to scroll); below lg it becomes swipeable.
  const breakpoints = {
    768: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 3, spaceBetween: 20 },
  }

  // Reveal the cards (staggered fade-in) once the section scrolls into view.
  const revealed = ref(false)
  const sectionRef = ref<HTMLElement | null>(null)
  let io: IntersectionObserver | null = null
  onMounted(() => {
    if (!sectionRef.value) return
    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            revealed.value = true
            io?.disconnect()
          }
        })
      },
      { threshold: 0.2 },
    )
    io.observe(sectionRef.value)
  })
  onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <section class="overflow-x-clip pb-15 md:pb-25 lg:pb-30">
    <div class="container">
      <div ref="sectionRef" class="mx-auto max-w-261.5">
        <swiper
          :slides-per-view="1"
          :space-between="16"
          :breakpoints="breakpoints"
          class="overflow-visible!"
        >
          <swiper-slide v-for="(f, index) in founders" :key="f.key" class="h-auto!">
            <div
              class="founder-in"
              :class="{ play: revealed }"
              :style="{ animationDelay: index * 0.15 + 's' }"
            >
              <AboutFounderCard
                :image="f.image"
                :name="t(`${f.key}.name`)"
                :role="t(`${f.key}.role`)"
                :bio="t(`${f.key}.bio`)"
                :revealed="openKey === f.key"
                @open="openFounder(f.key)"
                @toggle="toggleFounder(f.key)"
                @close="closeFounder(f.key)"
              />
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes founder-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.founder-in {
  opacity: 0;
}

.founder-in.play {
  animation: founder-in 0.5s ease-out both;
}

@media (prefers-reduced-motion: reduce) {
  .founder-in {
    opacity: 1;
  }
  .founder-in.play {
    animation: none;
  }
}
</style>
