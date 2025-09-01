import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

import { Navbar } from "../components/common/Navbar";
import { Footer } from "../components/common/Footer";
import { BuyProduct } from "../components/BuyProduct";
import { FAQ } from "../components/FAQ";
import { ProductCTA } from "../components/ProductCTA";

// Initialize Supabase client (make sure to use your actual credentials)
const supabaseUrl = "https://rermenrzzotatkuhajnd.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function ProductPage() {
	const { productId } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				setLoading(true);
				const { data, error } = await supabase
					.from("products")
					.select("*")
					.eq("id", productId)
					.single();

				if (error) throw error;
				setProduct(data);
			} catch (err) {
				console.error("Error fetching product:", err);
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		if (productId) {
			fetchProduct();
		}
	}, [productId]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;
	if (!product) return <div>Product not found</div>;

	return (
		<>
			<Navbar />
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col items-center justify-center py-8 lg:py-12 w-full">
					<BuyProduct productId={productId} />
				</div>
			</div>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col items-center justify-center py-8 lg:py-12 w-full">
					<FAQ />
					<ProductCTA />
				</div>
			</div>
			<Footer />
		</>
	);
}
