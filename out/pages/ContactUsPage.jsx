import React from "react";
import { Navbar } from "../components/common/Navbar";
import { ContactUs } from "../components/ContactUs";
import { Footer } from "../components/common/Footer";

export default function Page() {
	return (
		<>
			<Navbar />
			<ContactUs />
			<Footer />
		</>
	);
}
