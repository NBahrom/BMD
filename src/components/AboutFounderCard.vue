<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
  image: string
  name: string
  role: string
  bio: string
  revealed: boolean
}>()

const emit = defineEmits<{ open: []; toggle: []; close: [] }>()

const rootRef = ref<HTMLElement | null>(null)

// Image click only opens; the inner button toggles (so it can also close).
const openCard = () => emit('open')
const toggleCard = () => emit('toggle')

// While open, a click anywhere outside this card closes it. (The opening
// click is inside the card, so contains() is true and it stays open.)
function onDocClick(e: MouseEvent) {
  if (!props.revealed) return
  if (rootRef.value && !rootRef.value.contains(e.target as Node)) emit('close')
}
onMounted(() => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))
</script>

<template>
  <div ref="rootRef" class="flex flex-col gap-7.5">
    <!-- Image / reveal area -->
    <div  @click="openCard" class="relative group h-105.5 w-full overflow-hidden bg-[#f3f4f1]">
      <img
        class="absolute inset-0 h-full w-full object-cover cursor-pointer" 
        :src="image"
        :alt="`photo of ${name}`"
      />

      <!-- Dark bio overlay -->
      <div
        class="absolute inset-0 flex flex-col bg-[#181818] p-11"
        :class="revealed ? 'opacity-100' : 'pointer-events-none opacity-0'"
      >
        <p class="text-[14px]/[1.3] font-medium tracking-[-0.42px] text-white/80">
          {{ bio }}
        </p>
      </div>

      <!-- Toggle button -->
      <button
        type="button"
        @click.stop="toggleCard"
        :aria-pressed="revealed"
        aria-label="Toggle bio"
        class="absolute bottom-11.25 right-11 z-10 flex size-14.5 cursor-pointer items-center justify-center rounded-full"
        :class="revealed
          ? 'border-white/20 bg-white'
          : 'border-white/15 bg-[#181818]/80 backdrop-blur-sm'"
      >
        <!-- plus icon -->
         
        <span
          class="relative block transition-transform duration-300 ease-out group-hover:rotate-45"
          :class="revealed && 'rotate-45'"
        >
          <svg :class="revealed ? '[&_path]:fill-[#181818]' : '[&_path]:fill-white'" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.92188 14L5.92188 0L8.07572 0V14H5.92188Z" fill="white"/>
            <path d="M0 5.92188L14 5.92187V8.07572H0L0 5.92188Z" fill="white"/>
          </svg>
        </span>
      </button>
    </div>

    <!-- Name + role -->
    <div class="flex flex-col gap-3 px-5">
      <h3 class="font-body text-[22px]/[100%] font-medium uppercase tracking-[-1.32px]">
        {{ name }}
      </h3>
      <p class="text-[16px]/[100%] font-medium tracking-[-0.96px] text-[#18181880]">
        {{ role }}
      </p>
    </div>
  </div>
</template>
