import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase.js";

// Hook to fetch a single product with all related data
export const useProduct = (productId) => {
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!productId) {
			console.log("❌ No productId provided to useProduct hook");
			setLoading(false);
			return;
		}

		console.log("🔍 Fetching product with ID:", productId);

		const fetchProduct = async () => {
			try {
				setLoading(true);

				// First, let's test if we can connect to products table at all
				console.log("🧪 Testing basic connection...");
				const { data: testData, error: testError } = await supabase
					.from("products")
					.select("id, name")
					.limit(5);

				if (testError) {
					console.error("❌ Basic connection test failed:", testError);
					throw testError;
				}

				console.log(
					"✅ Basic connection successful. Available products:",
					testData
				);

				// Now try to fetch the specific product
				console.log("🎯 Fetching specific product...");
				const { data: productData, error: productError } = await supabase
					.from("products")
					.select(
						`
            *,
            product_images (*),
            product_variants (*),
            product_features (*),
            product_tabs (*)
          `
					)
					.eq("id", productId)
					.eq("is_available", true)
					.single();

				if (productError) {
					console.error("❌ Product fetch error:", productError);

					// If not found, try without is_available filter
					console.log("🔍 Trying without availability filter...");
					const { data: anyProduct, error: anyError } = await supabase
						.from("products")
						.select("*")
						.eq("id", productId)
						.single();

					if (anyError) {
						console.error("❌ Product doesn't exist at all:", anyError);
					} else {
						console.log(
							"⚠️ Product exists but is_available =",
							anyProduct.is_available
						);
					}

					throw productError;
				}

				console.log("✅ Product fetched successfully:", productData.name);

				// Sort related data by display_order
				if (productData) {
					productData.product_images =
						productData.product_images?.sort(
							(a, b) => a.display_order - b.display_order
						) || [];
					productData.product_variants =
						productData.product_variants?.sort(
							(a, b) => a.display_order - b.display_order
						) || [];
					productData.product_features =
						productData.product_features?.sort(
							(a, b) => a.display_order - b.display_order
						) || [];
					productData.product_tabs =
						productData.product_tabs?.sort(
							(a, b) => a.display_order - b.display_order
						) || [];

					console.log("📊 Product data structure:", {
						name: productData.name,
						images: productData.product_images?.length || 0,
						variants: productData.product_variants?.length || 0,
						features: productData.product_features?.length || 0,
						tabs: productData.product_tabs?.length || 0,
					});
				}

				setProduct(productData);
			} catch (err) {
				console.error("❌ Error in useProduct hook:", err);
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [productId]);

	return { product, loading, error };
};

// Hook to fetch all available products (for testing)
export const useProducts = (category = null, featured = false) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true);

				console.log("🔍 Fetching all products...");

				let query = supabase
					.from("products")
					.select(
						`
            *,
            product_images (image_url, alt_text, display_order),
            product_variants (*)
          `
					)
					.eq("is_available", true)
					.order("created_at", { ascending: false });

				if (category) {
					query = query.eq("category", category);
				}

				if (featured) {
					query = query.eq("is_featured", true);
				}

				const { data, error } = await query;

				if (error) {
					console.error("❌ Error fetching products:", error);
					throw error;
				}

				console.log("✅ Fetched products:", data?.length || 0);
				console.log(
					"📝 Product IDs:",
					data?.map((p) => ({ id: p.id, name: p.name }))
				);

				// Sort images by display_order and take first image as primary
				const productsWithSortedImages =
					data?.map((product) => ({
						...product,
						product_images:
							product.product_images?.sort(
								(a, b) => a.display_order - b.display_order
							) || [],
						product_variants:
							product.product_variants?.sort(
								(a, b) => a.display_order - b.display_order
							) || [],
					})) || [];

				setProducts(productsWithSortedImages);
			} catch (err) {
				setError(err.message);
				console.error("Error fetching products:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [category, featured]);

	return { products, loading, error };
};

// Keep other hooks the same...
export const useProductSearch = (searchTerm) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!searchTerm || searchTerm.length < 2) {
			setProducts([]);
			return;
		}

		const searchProducts = async () => {
			try {
				setLoading(true);

				const { data, error } = await supabase
					.from("products")
					.select(
						`
            *,
            product_images (image_url, alt_text, display_order),
            product_variants (*)
          `
					)
					.eq("is_available", true)
					.or(
						`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`
					);

				if (error) throw error;

				const productsWithSortedImages =
					data?.map((product) => ({
						...product,
						product_images:
							product.product_images?.sort(
								(a, b) => a.display_order - b.display_order
							) || [],
						product_variants:
							product.product_variants?.sort(
								(a, b) => a.display_order - b.display_order
							) || [],
					})) || [];

				setProducts(productsWithSortedImages);
			} catch (err) {
				setError(err.message);
				console.error("Error searching products:", err);
			} finally {
				setLoading(false);
			}
		};

		// Debounce search
		const timeoutId = setTimeout(searchProducts, 300);
		return () => clearTimeout(timeoutId);
	}, [searchTerm]);

	return { products, loading, error };
};

export const useProductCategories = () => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				setLoading(true);

				const { data, error } = await supabase
					.from("products")
					.select("category")
					.eq("is_available", true)
					.not("category", "is", null);

				if (error) throw error;

				// Get unique categories
				const uniqueCategories = [
					...new Set(data?.map((item) => item.category).filter(Boolean)),
				];
				setCategories(uniqueCategories);
			} catch (err) {
				setError(err.message);
				console.error("Error fetching categories:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchCategories();
	}, []);

	return { categories, loading, error };
};
