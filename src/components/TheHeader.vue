<script setup lang="ts">
    import Logo from './Logo.vue';
    import { useI18n } from 'vue-i18n'
    import { loadLocale } from '@/i18n'
    import BurgerMenu from './icons/BurgerMenu.vue';
    import BookArtistModal from './BookArtistModal.vue';
    import { ref } from 'vue';
    import MobileMenuModal from './MobileMenuModal.vue';
    import { useHeaderHeight } from '@/composables/useHeaderHeight';
    import CloseIcon from './icons/CloseIcon.vue';
    import { RouterLink } from 'vue-router';

    const headerRef = ref<HTMLElement | null>(null)

    useHeaderHeight(headerRef)

    const isOpenBookModal = ref(false)
    const isOpenMobileModal = ref(false)
    const { locale, t } = useI18n()
</script>

<template>
    <div :style="{ height: 'var(--header-height)' }">
        <header ref="headerRef" class="py-10 fixed left-0 top-0 z-10 bg-white w-full md:py-15 lg:relative">
            <div class="container">
                <div class="flex justify-between items-center">
                    <Logo color="text-black" />
    
                    <div class="max-w-144.25 w-full flex items-center justify-end lg:justify-between">
                        <nav class="hidden lg:block">
                            <ul class="flex gap-14.75">
                                <RouterLink to="/" class="text-sm uppercase">{{t('nav.artists')}}</RouterLink>
                                <RouterLink to="/about" class="text-sm uppercase">{{t('nav.about')}}</RouterLink>
                            </ul>
                        </nav>
    
                        <div class="flex gap-5 md:gap-11.75 items-center lg:gap-15">
                            <button v-if="locale === 'en'" @click="loadLocale('ru')" class="px-2.25 cursor-pointer text-sm opacity-50 border-0 bg-transparent">РУС</button> 
                            <button v-else @click="loadLocale('en')" class="px-2.25 cursor-pointer text-sm opacity-50 border-0 bg-transparent">ENG</button>    
                            
                            <button @click="isOpenBookModal = true" class="px-8 py-5.5 cursor-pointer bg-[#181818] text-white uppercase hidden lg:block">{{t('nav.book')}}</button>
                            
                            <button @click="isOpenMobileModal = !isOpenMobileModal" class="size-14.5 flex justify-center items-center bg-[#181818] rounded-full lg:hidden" >
                                <BurgerMenu v-if="isOpenMobileModal == false" />
                                <CloseIcon class="[&_path]:fill-white" v-else />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </div>

    <BookArtistModal v-model:open="isOpenBookModal" />
    <MobileMenuModal v-on:update:open="isOpenBookModal = $event" v-on:update:close="isOpenMobileModal = $event" :open="isOpenMobileModal" />
</template>