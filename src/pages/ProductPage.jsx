import React from "react";
import { useParams } from "react-router-dom";

import { Navbar } from "../components/common/Navbar";
import { Footer } from "../components/common/Footer";

import { BuyProduct } from "../components/BuyProduct";
import { FAQ } from "../components/FAQ";
import { ProductCTA } from "../components/ProductCTA";

export default function ProductPage() {
	const { productId } = useParams();

	// Debug logging
	console.log("ProductPage - productId from URL:", productId);
	console.log("ProductPage - URL params:", useParams());
	console.log("ProductPage - Current URL:", window.location.href);

	return (
		<>
			<Navbar />
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col items-center justify-center py-8 lg:py-12 w-full">
						{/* 🔥 FIX: Pass productId prop to BuyProduct */}
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
