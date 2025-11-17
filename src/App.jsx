// Fixed App.jsx - Add dynamic product routes
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Homepage";
import ContactUs from "./pages/ContactUsPage";

import ProductDetailPage from "./pages/ProductDetailPage";
import ProductListingPage from "./pages/ProductListingPage";

import NotFound404 from "./pages/NotFound404Page";

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/contact-us" element={<ContactUs />} />

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
