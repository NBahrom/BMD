<script setup lang="ts">
import { cn } from '@/lib/cn';
import { useAttrs, normalizeClass } from 'vue';

const attrs = useAttrs()

</script>

<template>
        <div :class="cn('-mx-[35px] px-[35px] no-scrollbar overflow-auto md:mx-0 md:px-0 flex gap-1', normalizeClass(attrs['class']))">
            <slot />
        </div>
</template>

