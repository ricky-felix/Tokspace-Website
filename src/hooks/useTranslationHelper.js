// hooks/useTranslationHelper.js
import { useState, useCallback } from "react";

/**
 * Hook to manage translations from Supabase with fallback to i18next
 * Usage: const { getTranslation, prefetchTranslations } = useTranslationHelper(supabase, i18n);
 *
 * @param {object} supabaseClient - Your Supabase client instance
 * @param {object} i18nInstance - Your i18next instance
 */
export const useTranslationHelper = (supabaseClient, i18nInstance) => {
	const [translationCache, setTranslationCache] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	// Get current language from i18n - recalculated on every render
	const currentLang = (i18nInstance?.language || "en").split("-")[0];

	/**
	 * Fetch translations from Supabase for given tables and cache them
	 * @param {string[]} tableNames - Array of table names ('products', 'categories', etc)
	 */
	const prefetchTranslations = useCallback(
		async (tableNames = []) => {
			if (!tableNames.length || !supabaseClient) return;

			const lang = (i18nInstance?.language || "en").split("-")[0];
			setIsLoading(true);
			try {
				const { data, error } = await supabaseClient
					.from("translations")
					.select("table_name,record_id,field_name,translated_text")
					.in("table_name", tableNames)
					.eq("language_code", lang);

				if (error) throw error;

				// Build cache: "products:uuid:name" -> "translated value"
				const cache = {};
				(data || []).forEach((row) => {
					const key = `${row.table_name}:${row.record_id}:${row.field_name}`;
					cache[key] = row.translated_text;
				});
				setTranslationCache(cache);
			} catch (e) {
				console.error("Translation fetch error:", e);
			} finally {
				setIsLoading(false);
			}
		},
		[supabaseClient, i18nInstance]
	);

	/**
	 * Get translation with fallback chain
	 * @param {string} recordId - Database record ID (product ID, category ID, etc)
	 * @param {string} fieldName - Field name from translations table (name, description, etc)
	 * @param {string} tableName - Table name (products, categories, etc)
	 * @param {string|null} i18nKey - i18next key for static fallback
	 * @param {string} defaultFallback - Default text if nothing else found
	 */
	const getTranslation = useCallback(
		(recordId, fieldName, tableName, i18nKey = null, defaultFallback = "") => {
			// Try database translation first
			const cacheKey = `${tableName}:${recordId}:${fieldName}`;
			if (translationCache[cacheKey]) {
				return translationCache[cacheKey];
			}

			// Try i18next static translation
			if (i18nKey && i18nInstance) {
				try {
					const staticTrans = i18nInstance.t(i18nKey, { defaultValue: null });
					if (staticTrans && staticTrans !== i18nKey) {
						return staticTrans;
					}
				} catch (e) {
					console.warn(`i18next translation failed for key: ${i18nKey}`);
				}
			}

			// Return default fallback
			return defaultFallback;
		},
		[translationCache, i18nInstance]
	);

	return {
		getTranslation,
		prefetchTranslations,
		isLoading,
		currentLang,
		translationCache,
	};
};
