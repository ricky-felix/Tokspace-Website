// utils/translationHelpers.js
import { useTranslation } from "react-i18next";

// Main translation helper function
export const getLocalizedField = (item, field, locale = "en") => {
	if (!item) return "";

	// If Indonesian locale and Indonesian field exists, use it
	if (locale === "id" && item[`${field}_id`]) {
		return item[`${field}_id`];
	}

	// Fallback to English field
	return item[field] || "";
};

// Helper to localize a single item
const localizeItem = (item, locale) => {
	if (!item || typeof item !== "object") return item;

	const localized = { ...item };

	// Define translatable fields for each table type
	const translatableFields = {
		// Products table fields
		name: true,
		description: true,
		category: true,

		// Product features table fields
		feature_text: true,

		// Product variants table fields
		// name: true, (already covered above)

		// Product tabs table fields
		tab_name: true,
		tab_content: true,

		// Product images table fields
		alt_text: true,
	};

	// Apply translations for all translatable fields
	Object.keys(translatableFields).forEach((field) => {
		if (item.hasOwnProperty(field)) {
			localized[field] = getLocalizedField(item, field, locale);
		}
	});

	return localized;
};

// Core translation function
export const translateObject = async (obj, targetLang) => {
	try {
		const translated = {};
		for (const [key, value] of Object.entries(obj)) {
			if (typeof value === "object") {
				translated[key] = await translateObject(value, targetLang);
			} else if (typeof value === "string") {
				// Replace with your actual LibreTranslate API call
				translated[key] = value; // Placeholder for actual translation
			} else {
				translated[key] = value;
			}
		}
		return translated;
	} catch (error) {
		console.error("Translation error:", error);
		return obj; // Return original object on error
	}
};

// Table-specific hooks
export const useLocalizedProducts = (products) => {
	const { i18n } = useTranslation();
	return useLocalizedData(products, i18n.language);
};

// Utility hooks
export const useLocalizedData = (data, locale) => {
	if (!data) return data;

	if (Array.isArray(data)) {
		return data.map((item) => localizeItem(item, locale));
	}

	return localizeItem(data, locale);
};

// Price formatting utility
export const formatPrice = (price, locale = "id") => {
	if (locale === "id") {
		return new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
		}).format(price);
	}

	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(price);
};

// This function is already defined above, so we're removing the duplicate
