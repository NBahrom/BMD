import { createI18n } from 'vue-i18n'

export const SUPPORT_LOCALES = ['en', 'ru']

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {}
})

export async function loadLocale(locale : string) {
  if (!SUPPORT_LOCALES.includes(locale)) return

  if (!i18n.global.availableLocales.includes(locale)) {
    const messages = await import(
      /* @vite-ignore */
      `../locales/${locale}.json`
    )

    i18n.global.setLocaleMessage(locale, messages.default)
  }

  i18n.global.locale.value = locale
}


export async function bootstrap() {
  await loadLocale('en') // default language
}