const i18next = require('i18next');
const i18nextMiddleware = require('i18next-http-middleware');
const Backend = require('i18next-fs-backend');
const path = require('path');

// Configure i18next
i18next.use(i18nextMiddleware.LanguageDetector).use(Backend).init({
  backend: {
    loadPath: path.join(__dirname, 'locales/{{lng}}/{{ns}}.json'),
  },
  fallbackLng: 'en', 
  preload: ['en', 'fr'], // Preload supported languages
});

module.exports = i18next;
