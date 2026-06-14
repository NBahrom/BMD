<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import PlayIcon from '@/components/icons/PlayIcon.vue'
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon.vue'
import ArrowRightIcon from '@/components/icons/ArrowRightIcon.vue'
import VideoModal from '@/components/VideoModal.vue'
import type { Singer } from '../types'

type Project = Singer['projects'][number]

const props = defineProps<{
    projects: Project[]
}>()

const projects = computed(() => props.projects ?? [])

const isOpenVideoModal = ref(false)

/* ------------------------------------------------------------------ *
 * Custom slider
 * The centre slide and the side slides have fixed (and different)
 * sizes per breakpoint, matching the Figma. The active slide is kept
 * centred in the viewport: the track is translated so that the active
 * slide's centre lands on the viewport centre. Size + transform animate
 * together, so the motion stays smooth.
 * ------------------------------------------------------------------ */
const activeIndex = ref(0)
const viewportRef = ref<HTMLElement | null>(null)
const viewportWidth = ref(0)
const ready = ref(false)

interface SliderSizes {
    activeW: number; activeH: number;
    sideW: number; sideH: number;
    gap: number;
}

const sizes = reactive<SliderSizes>({
    activeW: 834, activeH: 487, sideW: 439, sideH: 353, gap: 20,
})

function computeSizes() {
    const w = window.innerWidth
    if (w >= 1024) {
        // Laptop / desktop — exact Figma values.
        sizes.activeW = 834; sizes.activeH = 487
        sizes.sideW = 439;  sizes.sideH = 353
        sizes.gap = 20
    } else if (w >= 768) {
        // Tablet — exact Figma values.
        sizes.activeW = 648; sizes.activeH = 379
        sizes.sideW = 302;  sizes.sideH = 244
        sizes.gap = 20
    } else {
        // Mobile — exact Figma values.
        sizes.activeW = 305; sizes.activeH = 219
        sizes.sideW = 192;  sizes.sideH = 154
        sizes.gap = 16
    }
}

function measure() {
    computeSizes()
    viewportWidth.value = viewportRef.value?.clientWidth ?? window.innerWidth
}

// Translate the track so the active slide is centred in the viewport.
// Every slide before the active one occupies the side width.
const translateX = computed(() => {
    const beforeActive = activeIndex.value * (sizes.sideW + sizes.gap)
    const activeCentre = beforeActive + sizes.activeW / 2
    return viewportWidth.value / 2 - activeCentre
})

function slideStyle(index: number) {
    const isActive = index === activeIndex.value
    return {
        width: `${isActive ? sizes.activeW : sizes.sideW}px`,
        height: `${isActive ? sizes.activeH : sizes.sideH}px`,
    }
}

const activeProject = computed(() => projects.value[activeIndex.value])

function goPrev() {
    if (activeIndex.value > 0) activeIndex.value--
}
function goNext() {
    if (activeIndex.value < projects.value.length - 1) activeIndex.value++
}
function onSlideClick(index: number) {
    if (index !== activeIndex.value) {
        activeIndex.value = index
        return
    }
    if (projects.value[index]?.video) isOpenVideoModal.value = true
}

// Basic touch swipe (used on tablet / mobile where the arrows are hidden).
let touchStartX = 0
function onTouchStart(e: TouchEvent) {
    touchStartX = e.touches[0]?.clientX ?? 0
}
function onTouchEnd(e: TouchEvent) {
    const endX = e.changedTouches[0]?.clientX ?? touchStartX
    const dx = endX - touchStartX
    if (Math.abs(dx) > 40) dx < 0 ? goNext() : goPrev()
}

onMounted(() => {
    measure()
    // Enable transitions only after the first correct layout, so the
    // slider doesn't animate in from an off-centre position on load.
    requestAnimationFrame(() => { ready.value = true })
    window.addEventListener('resize', measure)
})
onUnmounted(() => {
    window.removeEventListener('resize', measure)
})
</script>

<template>
    <div class="mb-17.5 overflow-hidden lg:mb-38.75">
        <div class="container">
            <div
                ref="viewportRef"
                class="projects-slider"
                :style="{ height: `${sizes.activeH}px` }"
                @touchstart.passive="onTouchStart"
                @touchend.passive="onTouchEnd"
            >
                <div
                    class="projects-track"
                    :class="{ 'is-ready': ready }"
                    :style="{ transform: `translateX(${translateX}px)`, gap: `${sizes.gap}px` }"
                >
                    <div
                        v-for="(prj, index) in projects"
                        :key="index"
                        class="projects-slide"
                        :class="{ active: index === activeIndex }"
                        :style="slideStyle(index)"
                        @click="onSlideClick(index)"
                    >
                        <img class="w-full h-full object-cover" :src="prj.coverPhoto.src" :alt="prj.coverPhoto.alt">

                        <div v-if="prj.video && index === activeIndex" class="play-icon cursor-pointer bg-white rounded-full absolute left-1/2 top-1/2 p-3.25 md:p-5.5">
                            <PlayIcon class="size-4.75" />
                        </div>
                    </div>
                </div>
            </div>

            <VideoModal
                v-if="activeProject && activeProject.video"
                v-model:open="isOpenVideoModal"
                :video-src="activeProject.video.src"
                :video-type="activeProject.video.type"
            />

            <div class="gap-10 hidden justify-center items-center mt-7.5 lg:flex">
                <ArrowLeftIcon class="cursor-pointer" @click="goPrev" />
                <ArrowRightIcon class="cursor-pointer" @click="goNext" />
            </div>
        </div>
    </div>
</template>

<style>
/* Viewport: full content-box width. Side slides bleed past it and are
   clipped only by the full-width overflow-hidden wrapper around it. */
.projects-slider {
    width: 100%;
    overflow: visible;
    display: flex;
    align-items: center;
}

.projects-track {
    display: flex;
    align-items: center;
    will-change: transform;
}

/* Transitions are enabled only after the first layout (is-ready), so the
   slider doesn't animate in from translateX(0) on page load. */
.projects-track.is-ready,
.projects-track.is-ready .projects-slide {
    transition: transform 0.5s ease, width 0.5s ease, height 0.5s ease, opacity 0.5s ease;
}

.projects-slide {
    position: relative;
    flex: 0 0 auto;
    opacity: 0.5;
    cursor: pointer;
}

.projects-slide.active {
    opacity: 1;
    cursor: default;
    z-index: 2;
}

/* Desktop: hovering a non-active slide brings it to full opacity. */
@media (min-width: 1024px) {
    .projects-slide:not(.active):hover {
        opacity: 1;
    }
}

.projects-slide .play-icon {
    transform: translate(-50%, -50%) scale(1);
    transition: transform 0.3s ease;
}

.projects-slide.active:hover .play-icon {
    transform: translate(-50%, -50%) scale(1.2);
}
</style>
