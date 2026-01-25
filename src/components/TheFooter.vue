<script setup lang="ts">
import EmailIcon from './icons/EmailIcon.vue';
import FacebookIcon from './icons/FacebookIcon.vue';
import InstagramIcon from './icons/InstagramIcon.vue';
import TelegramIcon from './icons/TelegramIcon.vue';
import WhatsAppIcon from './icons/WhatsAppIcon.vue';
import Logo from './Logo.vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
    <footer class="pt-18.75 bg-[#181818] pb-17.5 md:pt-16.25 lg:pb-12 lg:pt-13.75">
        <div class="container">
            <div class="flex-col border-b border-[#FFFFFF1A] pb-11 md:pb-15 lg:pb-12.5">
                <div class="flex justify-between">
                    <div class="flex flex-col">
                        <div class="mb-6 flex flex-col gap-6.5 max-w-65.5  md:mb-8 lg:max-w-99.5 lg:mb-19.75">
                            <Logo color="text-white" />
                            <p class="text-sm/[120%] text-white opacity-30">{{ t("footer.aboutText") }}</p>
                        </div>
    
                        <div class="flex gap-1">
                            <a class="border border-[#FFFFFF26] rounded-full flex justify-center items-center size-14 lg:size-16.5" href="#!">
                                <InstagramIcon />
                            </a>
                            <a class="border border-[#FFFFFF26] rounded-full flex justify-center items-center size-14 lg:size-16.5" href="#!">
                                <FacebookIcon />
                            </a>
                            <a class="border border-[#FFFFFF26] rounded-full flex justify-center items-center size-14 lg:size-16.5" href="#!">
                                <WhatsAppIcon />
                            </a>
                            <a class="border border-[#FFFFFF26] rounded-full flex justify-center items-center size-14 lg:size-16.5" href="#!">
                                <TelegramIcon />
                            </a>
                            <a class="border border-[#FFFFFF26] rounded-full flex justify-center items-center size-14 lg:size-16.5" href="#!">
                                <EmailIcon />
                            </a>
                        </div>
                    </div>
    
                    <div class="hidden flex-col gap-16.25 md:flex">
                        <div class="flex mr-13.5 uppercase flex-col gap-10 lg:mr-0 lg:gap-16.25 lg:flex-row">
                            <div class="w-fit lg:w-51.25">
                                <h6 class="text-sm/[100%] text-[#FFFFFF4D] mb-5">{{ t("nav.nav") }}</h6>
        
                                <ul class="flex flex-col gap-2.5">
                                    <li class="text-white text-sm/[100%]">{{ t("nav.artists") }}</li>
                                    <li class="text-white text-sm/[100%]">{{ t("nav.about") }}</li>
                                    <li class="text-white text-sm/[100%]">{{ t("nav.booking") }}</li>
                                </ul>
                            </div>
        
                            <div class="w-fit lg:w-86.5">
                                <h6 class="text-sm/[100%] text-[#FFFFFF4D] mb-5">{{ t("contact.adress") }}</h6>
        
                                <p class="text-white text-sm max-w-54.25">{{ t("contact.adressText") }}</p>
        
                            </div>
                        </div>
    
                        <div class="flex-col hidden lg:flex">
                            <h6 class="text-sm/[100%] uppercase text-[#FFFFFF4D] mb-5">{{ t("contact.contactUs") }}</h6>
                            <div class="flex gap-16.25 uppercase">
                                <div class="w-fit lg:w-51.25">
                                    <div class="flex flex-col gap-2.5">
                                        <p class="text-white text-sm/[100%]">{{ t("contact.contactName1") }}</p>
                                        <a href="tel:+998903350106" class="text-white text-sm/[100%]">+998 90 335 01 06</a>
                                        <a href="mailto:marat@bmdtalents.com" class="text-white text-sm/[100%] normal-case opacity-50">marat@bmdtalents.com</a>
                                    </div>
                                </div>
            
                                <div class="w-fit lg:w-86.5">
            
                                    <div class="flex flex-col gap-2.5">
                                        <p class="text-white text-sm/[100%]">{{ t("contact.contactName2") }}</p>
                                        <a href="tel:+380505486710" class="text-white text-sm/[100%]">+380 505 48 67 10</a>
                                        <a href="mailto:mitch@bmdtalents.com" class="text-white text-sm/[100%] opacity-50 normal-case">mitch@bmdtalents.com</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                
                <div class="flex-col flex pt-13.5 mt-11 border-t border-[#FFFFFF0D] md:border-0 md:py-0 md:mt-13.25  lg:hidden">
                    <h6 class="text-sm/[100%] text-[#FFFFFF4D] mb-5 uppercase">{{ t("contact.contactUs") }}</h6>
                    <div class="flex-col gap-8.5 uppercase flex md:gap-16.25 md:flex-row">
                        <div class="w-fit lg:w-51.25">
                            <div class="flex flex-col gap-2.5">
                                <p class="text-white text-sm/[100%]">{{ t("contact.contactName1") }}</p>
                                <a href="tel:+998903350106" class="text-white text-sm/[100%]">+998 90 335 01 06</a>
                                <a href="mailto:marat@bmdtalents.com" class="text-white text-sm/[100%] normal-case opacity-50">marat@bmdtalents.com</a>
                            </div>
                        </div>
    
                        <div class="w-fit lg:w-86.5">
    
                            <div class="flex flex-col gap-2.5">
                                <p class="text-white text-sm/[100%]">{{ t("contact.contactName2") }}</p>
                                <a href="tel:+380505486710" class="text-white text-sm/[100%]">+380 505 48 67 10</a>
                                <a href="mailto:mitch@bmdtalents.com" class="text-white text-sm/[100%] opacity-50 normal-case">mitch@bmdtalents.com</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-10 flex flex-col gap-5 md:mt-7.5 md:flex-row md:justify-between lg:justify-start lg:gap-14.5  lg:mt-10">
                <p class="text-[#FFFFFF66] text-sm/[100%]">2026, BMD TALENTS. {{t("footer.rights")}}.</p>

                <div class="flex gap-2.5 flex-col md:flex-row md:gap-6.25">
                    <RouterLink class="text-[#ffffff3f] underline text-sm/[100%]" to="/Privacy"> Privacy Policy </RouterLink>
                    <RouterLink class="text-[#ffffff3f] underline text-sm/[100%]" to="/Terms"> Terms and Conditions </RouterLink>
                </div>
            </div>
        </div>
    </footer>
</template>