// scripts/translateContent.js
// Script to help populate Indonesian translations

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY // Use service role for admin operations
);

// Sample translation mappings (you'll need to expand this)
const categoryTranslations = {
	Electronics: "Elektronik",
	Smartphones: "Ponsel Pintar",
	Laptops: "Laptop",
	Tablets: "Tablet",
	Accessories: "Aksesoris",
	Headphones: "Headphone",
	Cameras: "Kamera",
	Gaming: "Gaming",
};

const commonFeatureTranslations = {
	"High-quality camera": "Kamera berkualitas tinggi",
	"Long battery life": "Daya tahan baterai lama",
	"Fast processor": "Prosesor cepat",
	"Large storage": "Penyimpanan besar",
	"Water resistant": "Tahan air",
	"Wireless charging": "Pengisian daya nirkabel",
	"Face recognition": "Pengenalan wajah",
	"Fingerprint sensor": "Sensor sidik jari",
};

const tabNameTranslations = {
	Description: "Deskripsi",
	Specifications: "Spesifikasi",
	Features: "Fitur",
	Reviews: "Ulasan",
	Warranty: "Garansi",
};

// Migrate categories
export const migrateCategoryTranslations = async () => {
	console.log("Migrating category translations...");

	try {
		const { data: products, error } = await supabase
			.from("products")
			.select("id, category")
			.not("category", "is", null);

		if (error) throw error;

		for (const product of products) {
			const translatedCategory = categoryTranslations[product.category];

			if (translatedCategory) {
				const { error: updateError } = await supabase
					.from("products")
					.update({ category_id: translatedCategory })
					.eq("id", product.id);

				if (updateError) {
					console.error(`Failed to update product ${product.id}:`, updateError);
				} else {
					console.log(
						`Updated product ${product.id}: ${product.category} → ${translatedCategory}`
					);
				}
			}
		}

		console.log("Category migration completed");
	} catch (error) {
		console.error("Category migration failed:", error);
	}
};

// Migrate common features
export const migrateFeatureTranslations = async () => {
	console.log("Migrating feature translations...");

	try {
		const { data: features, error } = await supabase
			.from("product_features")
			.select("id, feature_text");

		if (error) throw error;

		for (const feature of features) {
			// Try to find exact match first
			let translation = commonFeatureTranslations[feature.feature_text];

			// If no exact match, try partial matching
			if (!translation) {
				for (const [english, indonesian] of Object.entries(
					commonFeatureTranslations
				)) {
					if (
						feature.feature_text.toLowerCase().includes(english.toLowerCase())
					) {
						translation = indonesian;
						break;
					}
				}
			}

			if (translation) {
				const { error: updateError } = await supabase
					.from("product_features")
					.update({ feature_text_id: translation })
					.eq("id", feature.id);

				if (updateError) {
					console.error(`Failed to update feature ${feature.id}:`, updateError);
				} else {
					console.log(
						`Updated feature ${feature.id}: ${feature.feature_text} → ${translation}`
					);
				}
			} else {
				console.log(`No translation found for: ${feature.feature_text}`);
			}
		}

		console.log("Feature migration completed");
	} catch (error) {
		console.error("Feature migration failed:", error);
	}
};

// Migrate tab names
export const migrateTabNameTranslations = async () => {
	console.log("Migrating tab name translations...");

	try {
		const { data: tabs, error } = await supabase
			.from("product_tabs")
			.select("id, tab_name");

		if (error) throw error;

		for (const tab of tabs) {
			const translation = tabNameTranslations[tab.tab_name];

			if (translation) {
				const { error: updateError } = await supabase
					.from("product_tabs")
					.update({ tab_name_id: translation })
					.eq("id", tab.id);

				if (updateError) {
					console.error(`Failed to update tab ${tab.id}:`, updateError);
				} else {
					console.log(
						`Updated tab ${tab.id}: ${tab.tab_name} → ${translation}`
					);
				}
			}
		}

		console.log("Tab name migration completed");
	} catch (error) {
		console.error("Tab name migration failed:", error);
	}
};

// Generate basic alt text for images
export const generateAltTextTranslations = async () => {
	console.log("Generating alt text translations...");

	try {
		// Get products with their images
		const { data: productsWithImages, error } = await supabase.from("products")
			.select(`
        id, name, name_id,
        product_images(id, alt_text)
      `);

		if (error) throw error;

		for (const product of productsWithImages) {
			const productNameId = product.name_id || product.name;

			for (const image of product.product_images) {
				if (!image.alt_text_id) {
					const altTextId = `Gambar produk ${productNameId}`;

					const { error: updateError } = await supabase
						.from("product_images")
						.update({ alt_text_id: altTextId })
						.eq("id", image.id);

					if (updateError) {
						console.error(`Failed to update image ${image.id}:`, updateError);
					} else {
						console.log(`Updated image alt text for product ${product.name}`);
					}
				}
			}
		}

		console.log("Alt text generation completed");
	} catch (error) {
		console.error("Alt text generation failed:", error);
	}
};

// Main migration function
export const runAllMigrations = async () => {
	console.log("Starting full translation migration...");

	await migrateCategoryTranslations();
	await migrateFeatureTranslations();
	await migrateTabNameTranslations();
	await generateAltTextTranslations();

	console.log("All migrations completed!");
};

// Utility to check translation coverage
export const checkTranslationCoverage = async () => {
	console.log("Checking translation coverage...");

	try {
		// Check products
		const { data: products, error: productsError } = await supabase
			.from("products")
			.select(
				"id, name, name_id, description, description_id, category, category_id"
			);

		if (productsError) throw productsError;

		const productStats = {
			total: products.length,
			name_translated: products.filter((p) => p.name_id).length,
			description_translated: products.filter((p) => p.description_id).length,
			category_translated: products.filter((p) => p.category_id).length,
		};

		console.log("Product Translation Coverage:", productStats);

		// Check features
		const { data: features, error: featuresError } = await supabase
			.from("product_features")
			.select("id, feature_text_id");

		if (featuresError) throw featuresError;

		const featureStats = {
			total: features.length,
			translated: features.filter((f) => f.feature_text_id).length,
		};

		console.log("Feature Translation Coverage:", featureStats);

		// Check variants
		const { data: variants, error: variantsError } = await supabase
			.from("product_variants")
			.select("id, name_id");

		if (variantsError) throw variantsError;

		const variantStats = {
			total: variants.length,
			translated: variants.filter((v) => v.name_id).length,
		};

		console.log("Variant Translation Coverage:", variantStats);
	} catch (error) {
		console.error("Coverage check failed:", error);
	}
};

// Usage example:
// node scripts/translateContent.js
if (typeof window === "undefined") {
	// Running in Node.js
	runAllMigrations().then(() => {
		checkTranslationCoverage();
	});
}
