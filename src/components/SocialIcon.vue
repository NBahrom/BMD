<script setup lang="ts">
import { useAttrs, normalizeClass, computed } from 'vue';
import EmailIcon from './icons/EmailIcon.vue';
import FacebookIcon from './icons/FacebookIcon.vue';
import InstagramIcon from './icons/InstagramIcon.vue';
import TelegramIcon from './icons/TelegramIcon.vue';
import WhatsAppIcon from './icons/WhatsAppIcon.vue';
import TiktokIcon from './icons/TiktokIcon.vue';
import YoutubeIcon from './icons/YoutubeIcon.vue';
import LinkIcon from './icons/LinkIcon.vue';
import { cn } from '@/lib/cn';

const props = defineProps<{
    content?: string
    mode?: string
}>()

const attrs = useAttrs()

const icon = computed(() => {
  switch (props.content) {
    case 'telegram':
      return TelegramIcon
    case 'email':
      return EmailIcon
    case 'facebook':
      return FacebookIcon
    case 'instagram':
      return InstagramIcon
    case 'whatsapp':
      return WhatsAppIcon
    case 'tiktok':
      return TiktokIcon
    case 'youtube':
      return YoutubeIcon
    case 'link':
      return LinkIcon
    default:
      return null
  }
})

</script>

<template>
         
    <a 
        v-bind="attrs" 
        :class="cn(
            'border border-[#FFFFFF26] rounded-full flex justify-center items-center min-w-14 size-14 transition-colors duration-300 lg:hover:bg-[#ffffff4a]  lg:hover:border-transparent lg:size-16.5',
            mode == 'white' && '[&_path]:fill-[#181818] border-[#1818181A] lg:hover:bg-[#EFEFEF]', 
            normalizeClass(attrs['class'])
        )"
    >
        <component v-if="icon" :is="icon" />
        <slot v-else />
    </a>
</template>