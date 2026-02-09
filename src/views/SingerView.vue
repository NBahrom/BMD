<script setup lang="ts">
import 'swiper/css';
import 'swiper/css/navigation';
import NotFound from "@/components/NotFound.vue"
import SocialIcon from "@/components/SocialIcon.vue"
import SocialIconsWrapper from "@/components/SocialIconsWrapper.vue"
import BaseButton from "@/components/ui/BaseButton.vue"
import singers from "@/data/singers.json"    
import { useI18n } from 'vue-i18n'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon.vue';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon.vue';

const { t, tm } = useI18n()

const props = defineProps({
    id: String,
})

const currentSinger = singers.find(singers => singers.id == props.id)
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

    <div class="mb-17.5 lg:mb-38.75">
        <swiper
            slides-per-view="auto"
            :space-between="95"
            :centeredSlides="true"
            :modules="[Navigation]"
            :navigation="{
                prevEl: '.project-swiper-prev',
                nextEl: '.project-swiper-next'
            }"
            :breakpoints="{
                0: {
                    spaceBetween: 10
                },
                768: {
                    spaceBetween: 20
                },
                1024: {
                    spaceBetween: 95
                }
            }"            
            class="projects-swiper"
        >
            <swiper-slide v-for="(prj, index) in currentSinger?.projects" :key="index" >
                <img v-if="prj.type === 'image'" class="w-full h-full object-cover" :src="prj.src" :alt="prj.type">
                <video v-else controls class="w-full h-full object-cover" :src="prj.src">
                    <source :src="prj.src" :type="`video/${prj.type}`">
                </video>
            </swiper-slide>
        </swiper>
    
        <div class="gap-10 hidden justify-center items-center mt-7.5 lg:flex">
            <ArrowLeftIcon class="project-swiper-prev cursor-pointer" />
            <ArrowRightIcon class="project-swiper-next cursor-pointer" />
        </div>
    </div>

</template>


<style>
.projects-swiper .swiper-slide.swiper-slide-active {
    transition: all 0.3s ease;
    transform: scale(1.18,1.38);
    opacity: 1;
}

.projects-swiper .swiper-slide {
    transition: all 0.3s ease;
    height: 354px;
    width: 834px;
    margin-top: 66px;
    margin-bottom: 66px;
    opacity: 0.5;
}

@media (max-width: 1024px) {
    .projects-swiper .swiper-slide.swiper-slide-active {
        transform: scale(1,1.55);
    }

    .projects-swiper .swiper-slide {
        height: 244px;
        margin-top: 67.2px;
        margin-bottom: 67.2px;
        width: 648px;
    }
}

@media (max-width: 767px) {
    .projects-swiper .swiper-slide.swiper-slide-active {
        transform: scale(1, 1.423);
    }

    .projects-swiper .swiper-slide {
        height: 154px;
        margin-top: 32.5px;
        margin-bottom: 32.5px;
        width: 305px;
    }
}
</style>