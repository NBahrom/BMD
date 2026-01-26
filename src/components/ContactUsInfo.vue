<script setup lang="ts">
    import { cn } from '@/lib/cn';
    import { useAttrs, normalizeClass  } from 'vue';
    import { useI18n } from 'vue-i18n'

    const { t } = useI18n()

    const props = defineProps<{
        mode?: 'dark' | 'light',
        innerClass?: string
    }>()

    const isLightMode = props.mode == 'light'

    const attrs = useAttrs()
</script>

<template>
    <div :class="cn('flex-col flex', normalizeClass(attrs.class))">
        <h6 :class="cn('text-sm/[100%] text-[#FFFFFF4D] mb-5 uppercase', isLightMode && 'text-[#1818184D]')">{{ t("contact.contactUs") }}</h6>
        <div :class="cn('flex-col gap-8.5 uppercase flex md:gap-16.25 md:flex-row', innerClass)">
            <div class="w-fit lg:w-51.25">
                <div class="flex flex-col gap-2.5">
                    <p :class="cn('text-white text-sm/[100%]', isLightMode && 'text-[#181818]')">{{ t("contact.contactName1") }}</p>
                    <a href="tel:+998903350106" :class="cn('text-white text-sm/[100%]', isLightMode && 'text-[#181818]')">+998 90 335 01 06</a>
                    <a href="mailto:marat@bmdtalents.com" :class="cn('text-white text-sm/[100%] opacity-50 normal-case', isLightMode && 'text-[#181818]')">marat@bmdtalents.com</a>
                </div>
            </div>

            <div class="w-fit lg:w-86.5">

                <div class="flex flex-col gap-2.5">
                    <p :class="cn('text-white text-sm/[100%]', isLightMode && 'text-[#181818]')">{{ t("contact.contactName2") }}</p>
                    <a href="tel:+380505486710" :class="cn('text-white text-sm/[100%]', isLightMode && 'text-[#181818]')">+380 505 48 67 10</a>
                    <a href="mailto:mitch@bmdtalents.com" :class="cn('text-white text-sm/[100%] opacity-50 normal-case', isLightMode && 'text-[#181818]')">mitch@bmdtalents.com</a>
                </div>
            </div>
        </div>
    </div>
</template>