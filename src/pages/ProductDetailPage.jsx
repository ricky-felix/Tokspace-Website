import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { Navbar } from "../components/common/Navbar";
import { Footer } from "../components/common/Footer";
import { BuyProduct } from "../components/BuyProduct";
import { FAQ } from "../components/FAQ";
import { ProductCTADetailPage } from "../components/ProductCTADetailPage";

export default function ProductDetailPage() {
	const { productId } = useParams();

	if (!productId) {
		return <Navigate to="/404" replace />;
	}

	return (
		<>
			<Navbar />
			<main className="min-h-screen pt-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col items-center justify-center py-8 lg:py-12 w-full">
						<BuyProduct productId={productId} />
					</div>
				</div>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<FAQ />
					<ProductCTADetailPage />
				</div>
			</main>
			<Footer />
		</>
	);
}
