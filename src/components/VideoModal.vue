<script setup lang="ts">
import { ref, toRef, watch, nextTick } from 'vue'
import { useBodyScrollLock } from '@/composables/useBodyScrollLock';

const props = defineProps<{
  open: boolean,
  videoSrc: string,
  videoType: string
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean | null): void
}>()

useBodyScrollLock(toRef(props, 'open'))

const videoRef = ref<HTMLVideoElement | null>(null)

watch(() => props.open, async (newVal) => {
  if (newVal) {
    await nextTick()
    videoRef.value?.play().catch(() => {})
  } else {
    videoRef.value?.pause()
    if (videoRef.value) {
      videoRef.value.currentTime = 0
    }
  }
})

</script>

<template>
    <Teleport to="body">
        <div 
            v-if="open" 
            @click.self="emit('update:open', null)"
            class="bg-[#3d3d3d67] fixed flex top-0 left-0 w-full h-full px-11.25 z-10 overflow-auto"
        >
            <div class="m-auto h-full rounded-2xl overflow-hidden bg-white w-full relative max-h-141.25 md:w-125 lg:max-h-147">
                <button @click="emit('update:open', null)" class="absolute cursor-pointer p-1.5 bg-[#181818] w-fit translate-x-1/2 -translate-y-1/2 top-0 right-1/2 md:translate-0 md:p-0 md:bg-transparent md:top-6.75 md:right-6.75"><CloseIcon class="[&_path]:fill-white md:[&_path]:fill-[#C8CDCF]"/></button>

                <video 
                    ref="videoRef"
                    controls 
                    class="w-full h-full object-cover" 
                >
                    <source :src="videoSrc" :type="`video/${videoType}`">
                </video>
            </div>
        </div>
    </Teleport>
</template>