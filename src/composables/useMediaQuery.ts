import { ref, onMounted, onBeforeUnmount } from 'vue'

/**
 * Reactive CSS media-query match. SSR-safe; initializes synchronously on the
 * client so there is no layout flash on first render.
 */
export function useMediaQuery(query: string) {
  const matches = ref(
    typeof window !== 'undefined' && window.matchMedia(query).matches,
  )

  let mql: MediaQueryList | null = null
  const update = (e: MediaQueryListEvent) => {
    matches.value = e.matches
  }

  onMounted(() => {
    mql = window.matchMedia(query)
    matches.value = mql.matches
    mql.addEventListener('change', update)
  })

  onBeforeUnmount(() => {
    mql?.removeEventListener('change', update)
  })

  return matches
}
