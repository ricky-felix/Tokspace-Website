import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase.js";

// Hook to fetch a single product with all related data
export const useProduct = (productId) => {
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!productId) return;

		const fetchProduct = async () => {
			try {
				setLoading(true);

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

				if (productError) throw productError;

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
				}

				setProduct(productData);
			} catch (err) {
				setError(err.message);
				console.error("Error fetching product:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [productId]);

	return { product, loading, error };
};

// Hook to fetch all available products
export const useProducts = (category = null, featured = false) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true);

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

				if (error) throw error;

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

// Hook to search products
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

// Hook to get product categories
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
