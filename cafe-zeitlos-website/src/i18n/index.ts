import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import de from './locales/de.json';
import en from './locales/en.json';

const resources = {
  de,
  en,
};

let savedLanguage = localStorage.getItem('i18nextLng');
if (!savedLanguage || !['de', 'en'].includes(savedLanguage)) {
  savedLanguage = 'de';
  localStorage.setItem('i18nextLng', 'de');
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'de',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

// Setup document direction based on language
i18n.on('languageChanged', (lng) => {
  if (!['de', 'en'].includes(lng)) {
    i18n.changeLanguage('de');
    return;
  }
  localStorage.setItem('i18nextLng', lng);
  document.documentElement.lang = lng;
  document.documentElement.dir = 'ltr';
});

// Set initial direction
document.documentElement.lang = i18n.language;
document.documentElement.dir = 'ltr';

export default i18n;
