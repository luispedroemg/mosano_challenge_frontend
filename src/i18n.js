import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locale/en/translation.json';
import translationPT from './locale/pt/translation.json';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: translationEN,
  },
  pt: {
    translation: translationPT,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already saves from xss
    },
  });

export default i18n;
