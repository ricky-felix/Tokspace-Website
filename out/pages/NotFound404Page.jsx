import React from "react";
import { Navbar } from "../components/common/Navbar";
import { Footer } from "../components/common/Footer";

import { NotFound404 } from "../components/NotFound404";

export default function NotFound404Page() {
	return (
		<>
			<Navbar />
			<NotFound404 />
			<Footer />
		</>
	);
}
