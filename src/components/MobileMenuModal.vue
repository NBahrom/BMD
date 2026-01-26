<script setup lang="ts">
import { toRef  } from 'vue'
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import ContactUsInfo from './ContactUsInfo.vue';
import SocialIcons from './SocialIcons.vue';
import { useBodyScrollLock } from '@/composables/useBodyScrollLock';


const { t } = useI18n()

const props = defineProps<{
  open: boolean
}>()

useBodyScrollLock(toRef(props, 'open'))

const emit = defineEmits<{
    (e: 'update:open', value: boolean): void
}>()

</script>

<template>
    <div v-if="open" class="w-full bg-white fixed top-header left-0 z-10 min-h-[calc(100vh-var(--header-height))]">
        <div class="container">
            <div class="pt-5">
                <ul  class="flex flex-col gap-5 mb-35.75">
                    <li class="text-[22px]/[100%] uppercase">
                        <RouterLink to="/">{{ t('nav.artists') }}</RouterLink>
                    </li>
                    <li class="text-[22px]/[100%] uppercase">
                        <RouterLink to="/">{{ t('nav.about') }}</RouterLink>
                    </li>
                    <li @click="emit('update:open', true)" class="text-[22px]/[100%] uppercase">
                        {{ t('nav.book') }}
                    </li>
                </ul>

                <ContactUsInfo class="mb-12.5" inner-class="md:flex-col gap-8.5 md:gap-8.5" mode="light" />

                <SocialIcons class="[&_a]:border-[#18181826] [&_path]:fill-[#181818]" />
            </div>
        </div>
    </div>
</template>