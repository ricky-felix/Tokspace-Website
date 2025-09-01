import { useState, useEffect } from "react";
import { supabase, handleSupabaseError } from "../utils/supabase";

export function useProduct(productId) {
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let isMounted = true;

		const fetchProduct = async () => {
			try {
				setLoading(true);
				const { data, error: supabaseError } = await supabase
					.from("products")
					.select("*")
					.eq("id", productId)
					.single();

				if (supabaseError) throw supabaseError;

				if (isMounted) {
					setProduct(data);
					setError(null);
				}
			} catch (err) {
				if (isMounted) {
					setError(handleSupabaseError(err));
				}
			} finally {
				if (isMounted) {
					setLoading(false);
				}
			}
		};

		if (productId) {
			fetchProduct();
		}

		return () => {
			isMounted = false;
		};
	}, [productId]);

	return { product, loading, error };
}
