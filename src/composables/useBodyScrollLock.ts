import { watch, onUnmounted, type Ref } from 'vue'

export function useBodyScrollLock(isOpen: Ref<boolean>) {
  let previousOverflow = ''

  watch(
    isOpen,
    (open) => {
      if (open) {
        previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = previousOverflow
      }
    },
    { immediate: true }
  )

  onUnmounted(() => {
    document.body.style.overflow = previousOverflow
  })
}
