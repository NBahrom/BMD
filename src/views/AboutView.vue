<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import maratImg from "@/assets/images/marat.png"
  import dimaImg from "@/assets/images/dima.png"
  import AboutSlider from '@/components/AboutSlider.vue';
  const { t } = useI18n()
</script>

<template>
  <main>
    <section class=" mb-13.75 mt-5 md:mb-17.5 lg:mb-43.75 lg:mt-18.75">
      <div class="container">
          <div class="flex flex-col justify-center items-center mb-12.5 md:mb-15">
              <h1 class="text-start w-full text-[32px]/[100%] mb-5 md:text-center md:mb-10 md:text-[45px] lg:text-[70px]">{{ t("about.title") }}</h1>
              <p v-html="t('about.desc')" class="[&_b]:text-[#181818] [&_b]:font-normal text-start italic font-heading text-[#18181880] max-w-212 text-[20px]/[140%] md:text-[24px]/[140%] md:text-center" />
          </div>

          <div class="flex flex-col md:justify-center md:flex-row gap-10 md:gap-5.5">
            <div class="flex flex-col gap-5 w-full max-w-101.75 md:gap-8">
              <img class="w-full object-cover h-95 md:h-110 lg:h-124.25" :src="maratImg" alt="image of marat">

              <div class="flex flex-col">
                <h2 class="uppercase font-medium font-body text-[22px]/[100%] mb-4">{{t('contact.contactName1')}}</h2>
                <a class="text-[14px]/[100%] mb-2.5" href="tel:+998 90 335 01 06">+998 90 335 01 06</a>
                <a class="text-[14px]/[100%] opacity-50" href="mailto:marat@bmdtalents.com">marat@bmdtalents.com</a>
              </div>
            </div>

            <div class="flex flex-col gap-5 w-full max-w-101.75 md:gap-8">
              <img class="w-full object-cover h-95 md:h-110 lg:h-124.25" :src="dimaImg" alt="image of marat">

              <div class="flex flex-col">
                <h2 class="uppercase font-medium font-body text-[22px]/[100%] mb-4">{{t('contact.contactName2')}}</h2>
                <a class="text-[14px]/[100%] mb-2.5" href="tel:+380 505 48 67 10">+380 505 48 67 10</a>
                <a class="text-[14px]/[100%] opacity-50" href="mailto:mitch@bmdtalents.com">mitch@bmdtalents.com</a>
              </div>
            </div>
          </div>
      </div>
    </section>

    <AboutSlider />
    

  </main>
</template>

