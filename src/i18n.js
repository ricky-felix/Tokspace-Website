import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { createInstance } from 'i18next';

export const createI18n = async (language: string) => {
    const i18n = createInstance();

    await i18n
        .use(initReactI18next)
        .use(resourcesToBackend(async (language: string) => {
            return import(`../locales/${language}.ts`).then(module => module.default);
        }))
        .init({
            lng: language,
            fallbackLng: 'en',
            interpolation: {
                escapeValue: false
            }
        });

    return i18n;
};

i18n
    .use(initReactI18next)
    .use(resourcesToBackend(async (language: string) => {
        return import(`./locales/${language}.ts`).then(module => module.default);
    }))
    .init({
        lng: localStorage.getItem('preferredLanguage') || 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
