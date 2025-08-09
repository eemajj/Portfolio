import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import th from './locales/th.json';
import en from './locales/en.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'th',
    interpolation: {
      escapeValue: false
    },
    resources: {
      th: {
        translation: th
      },
      en: {
        translation: en
      }
    }
  });

export default i18n;