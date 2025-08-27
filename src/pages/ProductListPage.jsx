import React from "react";

import { Navbar } from "../components/common/Navbar";
import { Footer } from "../components/common/Footer";

import { HeaderProduct } from "../components/HeaderProduct";
import { GalleryProduct } from "../components/GalleryProduct";

export default function ProductListPage() {
	return (
		<>
			<Navbar />

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col items-center justify-center py-8 lg:py-12 w-full">
					<HeaderProduct />
				</div>
			</div>

			<div className="bg-[#ffefe9]">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col items-center justify-center py-8 lg:py-12 w-full"></div>
					<GalleryProduct />
				</div>
			</div>

			<Footer />
		</>
	);
}
