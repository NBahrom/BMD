import { createI18n } from 'vue-i18n'

export const SUPPORT_LOCALES = ['en', 'ru'] as const
type Locale = typeof SUPPORT_LOCALES[number]

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {},
})

export async function loadLocale(locale: Locale) {
  if (!SUPPORT_LOCALES.includes(locale)) return

  if (!i18n.global.availableLocales.includes(locale)) {
    const response = await fetch(`/locales/${locale}.json`)
    const messages = await response.json()

    i18n.global.setLocaleMessage(locale, messages)
  }

  i18n.global.locale.value = locale
}

export async function bootstrap() {
  await loadLocale('en')
}
