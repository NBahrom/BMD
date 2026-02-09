<script setup lang="ts">
import { cn } from '@/lib/cn';
import { useAttrs, normalizeClass } from 'vue';
defineProps<{
  link?: boolean
}>()
const attrs = useAttrs();

</script>

<template>
    <component 
        v-bind="attrs" 
        :is="link ? 'a' : 'button'" 
        :class="cn('p-5.5 flex justify-center items-center border border-[#181818] bg-transparent text-[14px]/[100%] font-medium uppercase cursor-pointer', normalizeClass(attrs['class']))"
    >
        <slot />
    </component>
</template>