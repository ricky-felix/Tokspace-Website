import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en/translation.json";
import idTranslation from "./locales/id/translation.json";

// Initialize with English and Indonesian translations
const initializeTranslations = async () => {
	await i18n.use(initReactI18next).init({
		resources: {
			en: { translation: enTranslation },
			id: { translation: idTranslation }
		},
		lng: "en",
		fallbackLng: "en",
		interpolation: {
			escapeValue: false,
		},
	});
};

// Load translations for a specific language
export const loadLanguageAsync = async (language) => {
	if (language === "en" || language === "id") return; // Both English and Indonesian are preloaded
	
	try {
		// For other languages, we would need to load them dynamically
		// This could be implemented in the future if needed
		console.log(`No translation available for ${language}, using fallback language`);
	} catch (error) {
		console.error(`Failed to load ${language} translations:`, error);
	}
};

initializeTranslations();

export default i18n;
