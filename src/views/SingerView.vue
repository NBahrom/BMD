<script setup lang="ts">
import NotFound from "@/components/NotFound.vue"
import SocialIcon from "@/components/SocialIcon.vue"
import SocialIconsWrapper from "@/components/SocialIconsWrapper.vue"
import BaseButton from "@/components/ui/BaseButton.vue"
import ProjectsSlider from "@/components/ProjectsSlider.vue"
import singers from "@/data/singers.json"
import { useI18n } from 'vue-i18n'
import type { Singer } from '../types'

const { t, tm } = useI18n()

const props = defineProps({
    id: String,
})

const currentSinger : Singer | undefined = singers.find(singers => singers.id == props.id)
const textContent = currentSinger && tm(currentSinger.descKey)as Array<string>
</script>

<template>
    <section v-if="currentSinger" class=" mt-5 mb-13.75 md:mb-25 lg:mb-38.75 lg:mt-16.25">
        <div class="container">
            <div class="flex justify-between flex-col-reverse gap-10 lg:flex-row">
                <div class="max-w-none w-full flex flex-col lg:max-w-155.25">
                    <h1 class="mb-5 text-[32px] tracking-tighter md:text-[45px] lg:text-[70px]/[100%]">{{ t(currentSinger.nameKey) }}</h1>
                    <div class="flex flex-col gap-2.5">
                        <p v-for="text in textContent"
                           class="text-[14px]/[130%] tracking-tight font-normal"
                        >{{ text }}</p>
                    </div>
                    <div class="flex flex-col my-7.5 md:my-10 gap-2.5">
                        <BaseButton class="lg:max-w-75.25 lg:hidden bg-[#181818] text-white">book artist</BaseButton>
                        <BaseButton class="lg:max-w-75.25 lg:hover:bg-[#181818] lg:hover:text-white transition-colors duration-300" :href="currentSinger.spotifyLink" :link="true">spotify</BaseButton>
                        <BaseButton class="lg:max-w-75.25 lg:hover:bg-[#181818] lg:hover:text-white transition-colors duration-300" :href="currentSinger.yandexLink" :link="true">Yandex music</BaseButton>
                    </div>

                    <SocialIconsWrapper>
                        <SocialIcon 
                            v-for="social in currentSinger.socials" 
                            :key="social.id" 
                            :content="social.id" 
                            :href="social.link" 
                            mode="white"
                        />
                    </SocialIconsWrapper>
                </div>
                <div class="relative">
                    <img class="w-full object-cover h-100 md:h-168 lg:h-142.75 lg:w-128.5 lg:mb-5" :src="currentSinger.image" :alt="t(currentSinger.nameKey)">
                    <div class="flex gap-2 lg:gap-1.5 absolute left-6.5 top-6.5 lg:relative lg:left-0 lg:top-0 ">
                        <span 
                            v-for="catId in currentSinger.categoryIds"
                            class="border border-white text-[14px]/[100%] py-1.5 px-3 text-white lg:text-[#181818] lg:border-[#00000033] lg:py-2.5 lg:px-4"
                        >
                            {{ t(`categories.${catId}`) }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <NotFound v-if="!currentSinger" />

    <ProjectsSlider v-if="currentSinger" :projects="currentSinger.projects" />

</template>