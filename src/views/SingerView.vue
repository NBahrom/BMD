<script setup lang="ts">
import NotFound from "@/components/NotFound.vue"
import SocialIcon from "@/components/SocialIcon.vue"
import SocialIconsWrapper from "@/components/SocialIconsWrapper.vue"
import BaseButton from "@/components/ui/BaseButton.vue"
import singers from "@/data/singers.json"    
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const props = defineProps({
    id: String,
})

const currentSinger = singers.find(singers => singers.id == props.id)
const textContent = currentSinger && tm(currentSinger.descKey)as Array<string>

</script>

<template>
    <section class=" mt-5 lg:mt-16.25">
        <div v-if="currentSinger" class="container">
            <div class="flex justify-between">
                <div class="max-w-none w-full flex flex-col lg:max-w-155.25">
                    <h1 class="mb-5 text-[32px] tracking-tighter md:text-[45px] lg:text-[70px]/[100%]">{{ t(currentSinger.nameKey) }}</h1>
                    <div class="flex flex-col gap-2.5">
                        <p v-for="text in textContent"
                           class="text-[14px]/[130%] tracking-tight font-normal"
                        >{{ text }}</p>
                    </div>
                    <div class="flex flex-col my-7.5 md:my-10 gap-2.5">
                        <BaseButton class="lg:max-w-75.25 lg:hidden bg-[#181818] text-white">book artist</BaseButton>
                        <BaseButton class="lg:max-w-75.25" :href="currentSinger.spotifyLink" :link="true">spotify</BaseButton>
                        <BaseButton class="lg:max-w-75.25" :href="currentSinger.yandexLink" :link="true">Yandex music</BaseButton>
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
            </div>
        </div>
        <NotFound v-else />
    </section>
</template>