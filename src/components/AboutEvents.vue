<script setup lang="ts">
  import { ref, reactive, computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import eventsData from '@/data/events.json'
  import Spinner from './icons/Spinner.vue'

  const { t } = useI18n()

  const INITIAL_COUNT = 5
  const openId = ref<string | null>(null)
  const showAll = ref(false)
  const isLoading = ref(false)

  // Active gallery thumbnail index per event (defaults to the first / main image)
  const activeThumb = reactive<Record<string, number>>({})
  const selectedIndex = (id: string) => activeThumb[id] ?? 0
  const mainImage = (ev: (typeof eventsData)[number]) =>
    ev.thumbnails?.[selectedIndex(ev.id)] ?? ev.image

  const visibleEvents = computed(() =>
    showAll.value ? eventsData : eventsData.slice(0, INITIAL_COUNT),
  )

  const toggle = (id: string) => {
    openId.value = openId.value === id ? null : id
  }

  // Show all events with a brief loading spinner, then hide the button.
  function loadAll() {
    if (isLoading.value) return
    isLoading.value = true
    setTimeout(() => {
      showAll.value = true
      isLoading.value = false
    }, 1000)
  }

  const paragraphs = (id: string) =>
    t(`about.events.${id}.description`).split('\n\n')
  // Reveal-on-scroll: track which rows are visible (reactive so it survives re-renders)
  const revealed = reactive<Record<string, boolean>>({})
  const vReveal = {
    mounted(el: HTMLElement, binding: { value: string }) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              revealed[binding.value] = true
              io.unobserve(el)
            }
          })
        },
        { threshold: 0.15 },
      )
      io.observe(el)
    },
  }
</script>

<template>
  <section id="events" class="scroll-mt-[var(--header-height)] overflow-x-clip py-20 lg:scroll-mt-0 lg:py-30">
    <div class="container">
      <div class="mx-auto flex max-w-261 flex-col items-center gap-12 lg:gap-15">
        <h2 class="w-full text-left text-[34px]/[100%] tracking-tight md:text-center md:text-[45px]/[100%] lg:text-[50px]/[100%] lg:tracking-[-3px]">
          {{ t('about.eventsTitle') }}
        </h2>

        <div class="w-[calc(100%+70px)] md:w-full">
          <div
            v-for="(ev, index) in visibleEvents"
            :key="ev.id"
            v-reveal="ev.id"
            :style="{ transitionDelay: index * 0.10 + 's' }"
            class="event-row group transition-colors duration-300  px-8.75 first:[&_button]:border-t"
            :class="[openId === ev.id ? 'bg-[#181818]' : 'hover:bg-[#181818]', { 'is-visible': revealed[ev.id] }]"
          >
            <!-- Row header -->
            <button
              type="button"
              @click="toggle(ev.id)"
              :aria-expanded="openId === ev.id"
              class="flex w-full cursor-pointer items-center gap-5 px-5 py-8 text-left border-b border-[#18181826] md:px-10 lg:px-20"
            >
              <div class="flex flex-1 flex-col gap-2 md:flex-row md:items-center md:gap-0">
                <span
                  class="text-[16px]/[100%] font-medium tracking-[-0.48px] transition-colors md:w-20 md:shrink-0"
                  :class="openId === ev.id ? 'text-white' : 'text-[#181818] group-hover:text-white'"
                >
                  {{ ev.date }}
                </span>
                <span
                  class="font-heading text-[22px]/[100%] tracking-[-1.56px] transition-colors md:ms-10 lg:ms-20 lg:text-[26px]/[100%]"
                  :class="openId === ev.id ? 'text-white' : 'text-[#181818] group-hover:text-white'"
                >
                  {{ t(`about.events.${ev.id}.title`) }}
                </span>
                <span
                  class="hidden text-[16px]/[1.3] font-medium uppercase tracking-[-0.48px] transition-colors lg:block lg:ms-auto"
                  :class="openId === ev.id ? 'text-white/50' : 'text-[#18181880] group-hover:text-white/50'"
                >
                  {{ t(`about.events.${ev.id}.location`) }}
                </span>
              </div>
              <span
                class="shrink-0 self-center transition-all duration-300"
                :class="openId === ev.id ? 'rotate-180 text-white' : 'text-[#181818] group-hover:text-white'"
              >
                <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 1V16M1 10L7 16L13 10" stroke="currentColor" stroke-width="2" />
                </svg>
              </span>
            </button>

            <!-- Expandable panel -->
            <div
              class="grid transition-all duration-500 ease-out"
              :class="openId === ev.id ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
            >
              <div class="overflow-hidden">
                <div class="px-5 pb-10 md:px-10 lg:px-20">
                  <div class="flex flex-col gap-10 border-t border-white/15 pt-10 lg:flex-row lg:justify-between lg:gap-5">
                    <!-- Description + tags -->
                    <div class="flex flex-col gap-10 lg:w-106">
                      <div class="flex flex-col gap-4">
                        <p
                          v-for="(para, pi) in paragraphs(ev.id)"
                          :key="pi"
                          class="text-[14px]/[1.3] font-normal tracking-[-0.42px] text-white/90"
                        >
                          {{ para }}
                        </p>
                      </div>
                      <div v-if="ev.tags?.length" class="flex flex-wrap items-center gap-2.5">
                        <span
                          v-for="tag in ev.tags"
                          :key="tag"
                          class="bg-white/10 px-4 py-2.5 text-[14px]/[100%] font-medium tracking-[-0.42px] text-white"
                        >
                          {{ t(`about.eventTags.${tag}`) }}
                        </span>
                      </div>
                    </div>

                    <!-- Gallery -->
                    <div class="flex flex-col gap-2.5">
                      <img
                        :src="mainImage(ev)"
                        :alt="t(`about.events.${ev.id}.title`)"
                        class="h-64.5 w-full object-cover transition-opacity duration-300 lg:w-97.5"
                      />
                      <div class="flex gap-2.5">
                        <button
                          v-for="(th, ti) in ev.thumbnails"
                          :key="ti"
                          type="button"
                          @click="activeThumb[ev.id] = ti"
                          :aria-label="`Show image ${ti + 1}`"
                          :aria-pressed="selectedIndex(ev.id) === ti"
                          class="aspect-square flex-1 cursor-pointer overflow-hidden transition-opacity duration-300 hover:opacity-100 md:size-17.5 md:flex-none"
                          :class="selectedIndex(ev.id) === ti ? 'opacity-100' : 'opacity-60'"
                        >
                          <img :src="th" alt="" class="size-full object-cover" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          v-if="!showAll && eventsData.length > INITIAL_COUNT"
          type="button"
          @click="loadAll"
          :disabled="isLoading"
          class="relative flex h-14.5 cursor-pointer items-center justify-center bg-[#181818] px-8 text-[14px]/[100%] font-semibold uppercase tracking-[-0.42px] text-white"
        >
          <span
            v-if="isLoading"
            class="absolute inset-0 flex items-center justify-center bg-[#181818]"
          >
            <Spinner class="size-4" />
          </span>
          {{ t('about.eventsBtn') }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.event-row {
  opacity: 0;
  transform: translateX(-30px);
  transition:
    opacity 0.5s ease-out,
    transform 0.5s ease-out;
}

.event-row.is-visible {
  opacity: 1;
  transform: translateX(0);
}

@media (prefers-reduced-motion: reduce) {
  .event-row {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
