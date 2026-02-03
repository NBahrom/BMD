<script setup lang="ts">
import { ref, toRef, watch  } from 'vue'
import CloseIcon from './icons/CloseIcon.vue';
import { useI18n } from 'vue-i18n'
import BaseInput from './ui/BaseInput.vue';
import { useBodyScrollLock } from '@/composables/useBodyScrollLock';
import { cn } from '@/lib/cn';

const { t } = useI18n()
const error = ref(false)

const props = defineProps<{
  open: boolean
}>()

function onSubmit(e: Event) {
    e.preventDefault();

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const name = formData.get('name')
    const tel = formData.get('tel')
    const message = formData.get('message')
    
    if(!name || !tel || !message) {
        error.value = false
        requestAnimationFrame(() => {
            error.value = true 
        })
        return
    }
}



const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

useBodyScrollLock(toRef(props, 'open'))
</script>

<template>
    <Teleport to="body">
        <div 
            v-if="open" 
            @click.self="emit('update:open', false)"
            class="bg-[#3d3d3d67] fixed flex top-0 left-0 w-full h-full px-11.25 z-10 overflow-auto"
        >
            <div class="m-auto py-13 px-6.25 bg-white w-full relative md:w-125 md:p-13">
                <button @click="emit('update:open', false)" class="absolute cursor-pointer p-1.5 bg-[#181818] w-fit translate-x-1/2 -translate-y-1/2 top-0 right-1/2 md:translate-0 md:p-0 md:bg-transparent md:top-6.75 md:right-6.75"><CloseIcon class="[&_path]:fill-white md:[&_path]:fill-[#C8CDCF]"/></button>
            
                <div class="flex flex-col">
                    <h2 class="text-[32px]/[100%] mb-5 text-center md:text-[40px]/[100%]">{{t("bookModal.title")}}</h2>
                    <p class="text-sm/[130%] mb-7.5 text-center tracking-tighter">{{t("bookModal.desc")}}</p>
    
                    <form @submit="onSubmit" class="flex flex-col gap-2.5">
                        <BaseInput type="text" name="name" id="name" :placeholder="t('bookModal.nameInput')" />
                        <BaseInput type="tel" name="tel" id="tel" :placeholder="t('bookModal.telNumInput')" />
                        <BaseInput class="h-31.75 md:h-36.5" input-type="textarea" name="message" id="message" :placeholder="t('bookModal.messageInput')"></BaseInput>
                        <button :class="cn('px-13.75 py-5.5 bg-[#181818] text-sm/[100%] text-white uppercase mt-2.5', error && 'form-error' )" type="submit">{{ t("btns.submitBtn") }}</button>
                    </form>
                </div>
            </div>
        </div>
    </Teleport>
</template>