// Fixed App.jsx - Add dynamic product routes
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Homepage";
import ContactUs from "./pages/ContactUsPage";

import ProductPage from "./pages/ProductPage";
import ProductsListPage from "./pages/ProductListPage";

import NotFound404 from "./pages/NotFound404Page";

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/contact-us" element={<ContactUs />} />

				{/* Products routes */}
				<Route path="/shop" element={<ProductsListPage />} />
				<Route path="/shop/:productId" element={<ProductPage />} />

				{/* 404 - Keep this last */}
				<Route path="*" element={<NotFound404 />} />
			</Routes>
		</div>
	);
}

export default App;
