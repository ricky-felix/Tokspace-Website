import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

export function LanguageSwitcher() {
	const { i18n } = useTranslation();
	const [currentLang, setCurrentLang] = useState(i18n.language);

	const toggleLanguage = async () => {
		const newLang = currentLang === "en" ? "id" : "en";
		await i18n.changeLanguage(newLang);
		setCurrentLang(newLang);
		localStorage.setItem("preferredLanguage", newLang);
	};

	return (
		<button
			onClick={toggleLanguage}
			className="px-3 py-1 rounded-md hover:bg-gray-100 transition-colors"
		>
			{currentLang.toUpperCase()}
		</button>
	);
}
