// import { useState } from "react";
import { Routes, Route } from "react-router-dom";

// import { createClient } from "@supabase/supabase-js";
// const supabase = createClient(
// 	import.meta.env.VITE_SUPABASE_URL,
// 	import.meta.env.VITE_SUPABASE_ANON_KEY
// );

import Home from "./pages/Homepage";
import ContactUs from "./pages/ContactUsPage";
// import ProductPage from "./pages/ProductPage";

import NotFound404 from "./pages/NotFound404Page";

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/contact-us" element={<ContactUs />} />
				{/* <Route path="/shop" element={<ProductPage />} /> */}
				<Route path="*" element={<NotFound404 />} />
			</Routes>
		</div>
	);
}

export default App;
