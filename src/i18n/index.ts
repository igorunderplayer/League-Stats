import AsyncStorage from '@react-native-async-storage/async-storage'
import { getLocales } from 'expo-localization'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { en_US, pt_BR } from '../resources/strings'
import { normalizeLocale } from '../functions/normalizeLocale'

export const resources = {
  pt_BR: { translation: pt_BR },
  en_US: { translation: en_US },
}

const getDeviceLocale = () => {
  const deviceLocale = getLocales()[0]
  const languageCode = deviceLocale.languageCode ?? 'en'
  const regionCode = deviceLocale.regionCode

  return normalizeLocale(
    regionCode ? `${languageCode}_${regionCode}` : languageCode,
  )
}

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem('preferences.language')

  if (!savedLanguage) {
    savedLanguage = getDeviceLocale()
  }

  savedLanguage = normalizeLocale(savedLanguage)

  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources,
    lng: savedLanguage,
    fallbackLng: 'en_US',
    interpolation: {
      escapeValue: false,
    },
  })
}

initI18n()

export default i18n
