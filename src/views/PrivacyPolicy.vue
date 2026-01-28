<script setup lang="ts">
    import { useI18n } from 'vue-i18n'

    const { t, tm } = useI18n()
    const content = tm('PrivacyPolicy.content')as Array<{
        title: string
        text: string[]
    }>
</script>

<template>
    <section class=" mb-16.25 mt-5 md:mb-17.5 lg:mb-33.75 lg:mt-18.75">
        <div class="container">
            <div class="max-w-155.25">
                <h1 class="text-start w-full text-[32px]/[100%] mb-7.5 md:mb-10 md:text-[45px] lg:text-[70px]">{{ t('PrivacyPolicy.title') }}</h1>
                
                <div class="flex flex-col gap-7.5 md:gap-10">
                    <div
                        v-for="(block, index) in content"
                        :key="index"
                    >
                        <h3 class="text-[14px]/[130%] font-body uppercase font-semibold mb-3.75 md:mb-5">
                            {{ block.title }}
                        </h3>
                    
                        <div class="flex flex-col gap-3.75">
                            <p
                                v-for="(paragraph, pIndex) in block.text"
                                :key="pIndex"
                                class="text-[14px]/[130%] font-normal text-[#181818cc]"
                                v-html="paragraph"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>