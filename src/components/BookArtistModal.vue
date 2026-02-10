<script setup lang="ts">
import { ref, toRef, watch } from 'vue'
import CloseIcon from './icons/CloseIcon.vue';
import { useI18n } from 'vue-i18n'
import BaseInput from './ui/BaseInput.vue';
import { useBodyScrollLock } from '@/composables/useBodyScrollLock';
import { cn } from '@/lib/cn';
import Spinner from './icons/Spinner.vue';
import TIckIcon from './icons/TIckIcon.vue';

const API_URL = import.meta.env.VITE_API_URL
const { t } = useI18n()
const error = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const isSuccess = ref<boolean | null>(null)


if (!API_URL) {
  console.error('VITE_API_URL is not defined')
}

const props = defineProps<{
  open: boolean
}>()

async function onSubmit(e: Event) {
    e.preventDefault();

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const name = formData.get('name')?.toString().trim()
    const tel = formData.get('tel')?.toString().trim()
    const message = formData.get('message')?.toString().trim()
    
    if(!name || !tel || !message) {
        error.value = false
        requestAnimationFrame(() => {
            error.value = true 
        })
        return
    }

    try{
        isLoading.value = true
        const res = await fetch(`${API_URL}/send-to-telegram`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                tel,
                message,
            }),
        })
        isSuccess.value = res.ok
    } catch (err) {
        isSuccess.value = false
    } finally {
        isLoading.value = false
    }

}





const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

useBodyScrollLock(toRef(props, 'open'))

watch(
  () => props.open,
  (open) => {
    if (open) {
      error.value = false
      isLoading.value = false
      isSuccess.value = null
    }
  }
)
</script>

<template>
    <Teleport to="body">
        <div 
            v-if="open" 
            @click.self="emit('update:open', false)"
            class="bg-[#3d3d3d67] fixed flex top-0 left-0 w-full h-full px-11.25 z-10 overflow-auto"
        >
            <div class="m-auto py-13 px-6.25 bg-white w-full relative min-h-141.25 md:w-125 md:p-13 lg:min-h-147.5">
                <button @click="emit('update:open', false)" class="absolute cursor-pointer p-1.5 bg-[#181818] w-fit translate-x-1/2 -translate-y-1/2 top-0 right-1/2 md:translate-0 md:p-0 md:bg-transparent md:top-6.75 md:right-6.75"><CloseIcon class="[&_path]:fill-white md:[&_path]:fill-[#C8CDCF]"/></button>
            
                <div class="flex flex-col">
                    <h2 class="text-[32px]/[100%] mb-5 text-center md:text-[40px]/[100%]">{{t("bookModal.title")}}</h2>
                    <p class="text-sm/[130%] mb-7.5 text-center tracking-tighter">{{t("bookModal.desc")}}</p>
    
                    <form v-if="isSuccess == null" @submit="onSubmit" class="flex flex-col gap-2.5">
                        <BaseInput type="text" name="name" id="name" :placeholder="t('bookModal.nameInput')" />
                        <BaseInput type="tel" name="tel" id="tel" :placeholder="t('bookModal.telNumInput')" />
                        <BaseInput class="h-31.75 md:h-36.5" input-type="textarea" name="message" id="message" :placeholder="t('bookModal.messageInput')"></BaseInput>
                        <button 
                            :class="cn('px-13.75 py-5.5 flex justify-center items-center bg-[#181818] text-sm/[100%] text-white uppercase mt-2.5 opacity-100!', error && 'form-error' )" 
                            type="submit"
                            :disabled="isLoading"
                        >
                            <Spinner v-if="isLoading" />
                            <span v-else>
                                {{ t("btns.submitBtn") }}
                            </span>
                        </button>
                    </form>
                    <div v-else class="flex flex-col justify-center items-center mt-15 lg:mt-22.5">
                        <TIckIcon v-if="isSuccess" />
                        <h5 class="text-center text-[24px]/[130%] mb-3.5 mt-6.75">
                            <span v-if="isSuccess" >{{t("bookModal.thankyouTitle")}}</span>
                            <span v-else >{{t("bookModal.errorTitle")}}</span>
                        </h5>
                        <p class="text-center text-[14px]/[130%] text-[#18181866] max-w-50 mx-auto">
                            <span v-if="isSuccess" >{{t("bookModal.thankyouDesc")}}</span>
                            <span v-else >{{t("bookModal.errorDesc")}}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>