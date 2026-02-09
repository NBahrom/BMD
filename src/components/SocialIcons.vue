<script setup lang="ts">
import { useAttrs, normalizeClass } from 'vue';
import EmailIcon from './icons/EmailIcon.vue';
import FacebookIcon from './icons/FacebookIcon.vue';
import InstagramIcon from './icons/InstagramIcon.vue';
import TelegramIcon from './icons/TelegramIcon.vue';
import WhatsAppIcon from './icons/WhatsAppIcon.vue';
import { cn } from '@/lib/cn';
import SocialIcon from './SocialIcon.vue';
import SocialIconsWrapper from './SocialIconsWrapper.vue';

const attrs = useAttrs()

</script>

<template>
         <SocialIconsWrapper v-bind="attrs">
            <SocialIcon href="#!">
                <InstagramIcon />
            </SocialIcon>
            <SocialIcon href="#!">
                <FacebookIcon />
            </SocialIcon>
            <SocialIcon  href="#!">
                <WhatsAppIcon />
            </SocialIcon>
            <SocialIcon  href="#!">
                <TelegramIcon />
            </SocialIcon>
            <SocialIcon  href="#!">
                <EmailIcon />
            </SocialIcon>
        </SocialIconsWrapper>
</template>