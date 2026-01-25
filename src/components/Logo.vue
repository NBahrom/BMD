<script setup lang="ts">
    import { cn } from '@/lib/cn';
    import { RouterLink } from 'vue-router'

    defineProps<{
        color?: string,
    }>()
</script>

<template>
    <RouterLink to="/" :class="cn('min-w-max font-bold text-[20px]/[100%] md:text-[22px]/[100%]', color )">BMD TALENTS</RouterLink>
</template>