import { useTranslation } from "react-i18next";
import { loadLanguageAsync } from "../i18n.js";

export const useLocalizedData = () => {
	const { t, i18n } = useTranslation();

	const changeLanguage = async (language) => {
		if (i18n.language !== language) {
			await loadLanguageAsync(language);
			await i18n.changeLanguage(language);
		}
	};

	return {
		t,
		currentLanguage: i18n.language,
		changeLanguage,
	};
};
