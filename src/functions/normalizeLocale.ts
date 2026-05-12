const legacyLocaleMap: Record<string, string> = {
  pt: 'pt_BR',
  'pt-br': 'pt_BR',
  en: 'en_US',
  'en-us': 'en_US',
}

export function normalizeLocale(locale: string): string {
  const normalizedLocale = locale.toLowerCase().replace('-', '_')

  return legacyLocaleMap[normalizedLocale] ?? locale.replace('-', '_')
}
