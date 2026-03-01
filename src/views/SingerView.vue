<script setup lang="ts">
import 'swiper/css';
import 'swiper/css/navigation';
import { ref} from 'vue'
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
import PlayIcon from '@/components/icons/PlayIcon.vue';
import VideoModal from '@/components/VideoModal.vue';
import type { Singer } from '../types'

const { t, tm } = useI18n()

const props = defineProps({
    id: String,
})

const currentSinger : Singer | undefined = singers.find(singers => singers.id == props.id) 
const textContent = currentSinger && tm(currentSinger.descKey)as Array<string>

const isOpenVideoModal = ref(false)


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

    <div class="mb-17.5 lg:mb-38.75">
        <swiper
            slides-per-view="auto"
            :space-between="20"
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
                    spaceBetween: 10
                },
                1024: {
                    spaceBetween: 20
                }
            }"            
            class="projects-swiper"
        >
            <swiper-slide v-for="(prj, index) in currentSinger?.projects" :key="index" >
                <img class="w-full h-full object-cover" :src="prj.coverPhoto.src" :alt="prj.coverPhoto.alt">

                <div v-if="prj.video" @click="isOpenVideoModal = true" class="play-icon -translate-x-1/2 -translate-y-1/2 cursor-pointer bg-white rounded-full absolute left-1/2 top-1/2 p-3.25 md:p-5.5">
                    <PlayIcon class="size-4.75" />
                </div>
                <VideoModal v-if="prj.video != null" v-model:open="isOpenVideoModal" :video-src="prj.video.src" :video-type="prj.video.type"  />
            </swiper-slide>
        </swiper>
    
        <div class="gap-10 hidden justify-center items-center mt-7.5 lg:flex">
            <ArrowLeftIcon class="project-swiper-prev cursor-pointer" />
            <ArrowRightIcon class="project-swiper-next cursor-pointer" />
        </div>
    </div>

</template>


<style>

.projects-swiper{
    width: 100%;
}
.projects-swiper .swiper-slide.swiper-slide-active {
    transition: all 0.3s ease;
    width: 834px;
    height: 487px;
    opacity: 1;
}


.projects-swiper .swiper-wrapper{
    min-height: 487px;
    align-items: center;
    left: -195px;
}


.projects-swiper .swiper-slide {
    transition: all 0.3s ease;
    height: 354px;
    width: 439px;
    opacity: 0.5;
}

.projects-swiper .swiper-slide.swiper-slide-active:hover .play-icon{
    transform: scale(1.2);
}

.projects-swiper .play-icon{
    transform: scale(0.8);
    transition: all 0.3s ease;
}

.projects-swiper .swiper-slide.swiper-slide-active .play-icon{
    transform: scale(1);
    transition: all 0.3s ease;
}

@media (max-width: 1024px) {
    .projects-swiper .swiper-slide.swiper-slide-active {
        width: 648px;
        height: 378px;
    }

    .projects-swiper .swiper-slide {
        height: 302px;
        width: 244px;
    }
}

@media (max-width: 767px) {
    .projects-swiper .swiper-slide.swiper-slide-active {
        width: 305px;
        height: 219px;
    }

    .projects-swiper .swiper-wrapper{
        min-height: 219px;
        margin-left: -60px;
    }

    .projects-swiper .swiper-slide {
        width: 191px;
        height: 154px;
    }
}
</style>