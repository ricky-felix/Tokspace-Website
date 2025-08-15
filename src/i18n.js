import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
	// load translation using http -> see /public/locales
	.use(Backend)
	// detect user language
	.use(LanguageDetector)
	// pass the i18n instance to react-i18next
	.use(initReactI18next)
	// init i18next
	.init({
		debug: false, // change to true to show it on console.log()
		fallbackLng: "en",
		supportedLngs: ["en", "id"],
		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
		},
		backend: {
			// path where resources get loaded from
			loadPath: "/locales/{{lng}}/{{ns}}.json",
		},
		detection: {
			// order and from where user language should be detected
			order: [
				"querystring",
				"cookie",
				"localStorage",
				"sessionStorage",
				"navigator",
				"htmlTag",
			],
			// keys or params to lookup language from
			lookupQuerystring: "lng",
			lookupCookie: "i18next",
			lookupLocalStorage: "i18nextLng",
			lookupSessionStorage: "i18nextLng",
			// cache user language on
			caches: ["localStorage", "cookie"],
		},
	});

export default i18n;
