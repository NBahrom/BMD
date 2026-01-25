<script setup lang="ts">
    import Logo from './Logo.vue';
    import { useI18n } from 'vue-i18n'
    import { loadLocale } from '@/i18n'
    import BurgerMenu from './icons/BurgerMenu.vue';

    const { locale, t } = useI18n()
</script>

<template>
    <header class="py-10 md:py-15">
        <div class="container">
            <div class="flex justify-between items-center">
                <Logo color="text-black" />

                <div class="max-w-144.25 w-full flex items-center justify-end lg:justify-between">
                    <nav class="hidden lg:block">
                        <ul class="flex gap-14.75">
                            <li class="text-sm uppercase">{{t('nav.artists')}}</li>
                            <li class="text-sm uppercase">{{t('nav.about')}}</li>
                        </ul>
                    </nav>

                    <div class="flex gap-5 md:gap-11.75 items-center lg:gap-15">
                        <button v-if="locale === 'en'" @click="loadLocale('ru')" class="px-2.25 cursor-pointer text-sm opacity-50 border-0 bg-transparent">РУС</button> 
                        <button v-else @click="loadLocale('en')" class="px-2.25 cursor-pointer text-sm opacity-50 border-0 bg-transparent">ENG</button>    
                        
                        <button class="px-8 py-5.5 cursor-pointer bg-[#181818] text-white uppercase hidden lg:block">{{t('nav.book')}}</button>
                        <button class="px-3.75 py-4.25 bg-[#181818] rounded-full lg:hidden" ><BurgerMenu/></button>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>