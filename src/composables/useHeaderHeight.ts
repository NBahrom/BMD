import { onMounted, onUnmounted, nextTick, type Ref } from 'vue'

export function useHeaderHeight(headerRef: Ref<HTMLElement | null>) {
   let observer: ResizeObserver

  const updateHeaderHeight = () => {
    if (!headerRef.value) return
    document.documentElement.style.setProperty(
      '--header-height',
      `${headerRef.value.offsetHeight}px`
    )
    console.log(document.documentElement.style.getPropertyValue('--header-height'))
  }

  onMounted(async () => {
    await nextTick()
    observer = new ResizeObserver(updateHeaderHeight)
    observer.observe(headerRef.value!)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return {
    updateHeaderHeight,
  }
}
