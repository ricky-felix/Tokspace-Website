// Fixed App.jsx - Add dynamic product routes
import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Homepage";
import ContactUs from "./pages/ContactUsPage";
import CustomPrintRequestPage from "./pages/CustomPrintRequestPage";

import ProductDetailPage from "./pages/ProductDetailPage";
import ProductListingPage from "./pages/ProductListingPage";

import NotFound404 from "./pages/NotFound404Page";
import GlobalBanner from "./components/common/GlobalBanner";

function App() {
	return (
		<div>
			<GlobalBanner />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/contact-us" element={<ContactUs />} />
				<Route path="/custom-print" element={<CustomPrintRequestPage />} />

				{/* Products routes */}
                <Route path="/shop" element={<ProductListingPage />} />
                <Route path="/shop/:productId" element={<ProductDetailPage />} />

				{/* 404 - Keep this last */}
				<Route path="*" element={<NotFound404 />} />
			</Routes>
		</div>
	);
}

export default App;
