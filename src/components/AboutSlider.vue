<script setup lang="ts">
    import 'swiper/css';
    import { useI18n } from 'vue-i18n'
    import { Swiper, SwiperSlide } from 'swiper/vue';

    const { t } = useI18n()


</script>

<template>
    <section class="bg-[#F6F6F6] overflow-hidden pt-13.75 pb-16.25 md:py-17.5 lg:py-30">
        <div class="container">
            <h3 class="text-start w-full text-[32px]/[100%] mb-8 md:text-center md:mb-10 md:text-[35px] lg:text-[50px]">{{ t("about.slider.title") }}</h3>
        
            <swiper
                slides-per-view="auto"
                :space-between="12"
                class="overflow-visible!"
            >
                <swiper-slide class="min-h-55.25! w-62.5! flex! flex-col gap-18.5 p-5 bg-white" v-for="i in 6" :key="i" >
                    <span class="text-[14px]/[130%] text-[#18181866] md:text-[16px]/[130%]">{{ `0${i}` }}</span>
                    
                    <div class="flex flex-col gap-2">
                        <p class="text-[18px]/[110%]">{{t(`about.slider.slide${i}.title`)}}</p>
                        <span class="text-[#18181866] text-[13px]/[130%]">{{t(`about.slider.slide${i}.text`)}}</span>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </section>
</template>