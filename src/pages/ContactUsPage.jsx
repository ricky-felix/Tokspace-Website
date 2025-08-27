import React from "react";
import { Navbar } from "../components/common/Navbar";
import { ContactUs } from "../components/ContactUs";
import { Footer } from "../components/common/Footer";

export default function ContactUsPage() {
	return (
		<>
			<Navbar />
			<div className="bg-[#ffefe9]">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col items-center justify-center py-8 lg:py-12 w-full">
						<ContactUs />
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
