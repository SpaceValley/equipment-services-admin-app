import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './en.json';
import translationUA from './ua.json';

const resources = {
  en: {
    translation: translationEN
  },
  ua: {
    translation: translationUA
  }
};

const DETECTION_OPTIONS = {
  order: ['localStorage', 'sessionStorage', 'navigator'],
  lookupLocalStorage: 'i18nextLng',
  lookupSessionStorage: 'i18nextLng',
  caches: ['localStorage']
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    detection: DETECTION_OPTIONS,
    fallbackLng: 'ua',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
