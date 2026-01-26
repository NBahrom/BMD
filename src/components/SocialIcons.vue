<script setup lang="ts">
import { useAttrs, normalizeClass } from 'vue';
import EmailIcon from './icons/EmailIcon.vue';
import FacebookIcon from './icons/FacebookIcon.vue';
import InstagramIcon from './icons/InstagramIcon.vue';
import TelegramIcon from './icons/TelegramIcon.vue';
import WhatsAppIcon from './icons/WhatsAppIcon.vue';
import { cn } from '@/lib/cn';

const attrs = useAttrs()

</script>

<template>
         <div :class="cn('flex gap-1', normalizeClass(attrs))">
            <a class="border border-[#FFFFFF26] rounded-full flex justify-center items-center size-14 lg:size-16.5" href="#!">
                <InstagramIcon />
            </a>
            <a class="border border-[#FFFFFF26] rounded-full flex justify-center items-center size-14 lg:size-16.5" href="#!">
                <FacebookIcon />
            </a>
            <a class="border border-[#FFFFFF26] rounded-full flex justify-center items-center size-14 lg:size-16.5" href="#!">
                <WhatsAppIcon />
            </a>
            <a class="border border-[#FFFFFF26] rounded-full flex justify-center items-center size-14 lg:size-16.5" href="#!">
                <TelegramIcon />
            </a>
            <a class="border border-[#FFFFFF26] rounded-full flex justify-center items-center size-14 lg:size-16.5" href="#!">
                <EmailIcon />
            </a>
        </div>
</template>