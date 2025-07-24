// import { useState } from "react";
import { Routes, Route } from "react-router";

import Home from "./pages/Homepage";
import ContactUs from "./pages/ContactUsPage";
import NotFound404 from "./pages/NotFound404Page";

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/contact-us" element={<ContactUs />} />
				<Route path="*" element={<NotFound404 />} />
			</Routes>
		</div>
	);
}

export default App;
