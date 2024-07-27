import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales } from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { pt } from '../resources/strings';
import { en } from '../resources/strings/en';

const resources = {
  pt: { translation: pt},
  en: { translation: en }
}

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem("language");

  if (!savedLanguage) {
    savedLanguage = getLocales()[0].languageCode ?? 'en';
  }

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources,
    lng: 'en',
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();


export default i18n