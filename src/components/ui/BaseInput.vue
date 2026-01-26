<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn } from '@/lib/cn';

const props = defineProps<{
  inputType?: 'input' | 'textarea',
  className?: string
}>()

const attrs = useAttrs()

const isTextarea = computed(() => props.inputType === 'textarea')
</script>

<template>
  <component
    :is="isTextarea ? 'textarea' : 'input'"
    v-bind="attrs"
    :class="cn(
      'py-4 px-5 bg-[#F3F3F3] tracking-tighter border-0 text-[#18181866] text-[14px]/[130%] md:py-5 md:px-7.5',
      attrs.class as string
    )"
  />
</template>
