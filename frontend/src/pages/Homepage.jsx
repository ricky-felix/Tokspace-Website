import React, { useEffect, useState } from "react";

import "../css/index.css";

import { useLocation } from "react-router";
import { motion } from "framer-motion";
import { SkeletonLoader } from "../components/SkeletonLoader";

import { Navbar } from "../components/common/Navbar";
import { Footer } from "../components/common/Footer";

import { Header } from "../components/Header";
import { Creativity } from "../components/Creativity";
import { ShopProduct } from "../components/ShopProduct";
import { OurMission } from "../components/OurMission";
import { Steppers } from "../components/Steppers";

export default function Home() {
	const location = useLocation();
	const [isLoading, setIsLoading] = useState(true);
	const [showContent, setShowContent] = useState(false);

	useEffect(() => {
		if (location.hash) {
			const timer = setTimeout(() => {
				const id = location.hash.substring(1);
				const element = document.getElementById(id);
				if (element) {
					element.scrollIntoView({
						behavior: "smooth",
						block: "start",
					});
				}
			}, 100);

			return () => clearTimeout(timer);
		}
	}, [location.hash]);

	// Start loading content immediately but keep it hidden
	useEffect(() => {
		// Show content immediately (so videos start loading)
		setShowContent(true);

		// Hide skeleton after videos have had time to buffer
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 2500); // 2 seconds - adjust based on your video loading time

		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			<Navbar />

			{/* Always render content so videos start loading immediately */}
			{/* REMOVED: min-h-screen overflow-x-hidden - these were causing the scrollbar issues */}
			<div
				className={`min-h-screen overflow-x-hidden overflow-y-hidden transition-opacity duration-500 ${
					isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
				}`}
				style={{
					position: isLoading ? "absolute" : "relative",
					zIndex: isLoading ? -1 : 1,
				}}
			>
				<div className="bg-[#ffefe9]">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex flex-col items-center justify-center py-8 lg:py-12 w-full">
							<motion.div
								className="w-full bg"
								id="header"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6 }}
								viewport={{ once: true }}
							>
								<Header />
							</motion.div>
						</div>
					</div>
				</div>

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col items-center justify-center py-8 lg:py-12 w-full"></div>
					<motion.div
						className="w-full"
						id="ourmission"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						viewport={{ once: true }}
					>
						<OurMission />
					</motion.div>

					<motion.div
						className="w-full"
						id="discover"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						viewport={{ once: true }}
					>
						<ShopProduct />
					</motion.div>

					<motion.div
						className="w-full"
						id="creativity"
						// REMOVED: style={{ maxWidth: "100%", overflow: "hidden" }} - this was redundant
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						viewport={{ once: true }}
					>
						<Creativity />
					</motion.div>

					<motion.div
						className="w-full"
						id="innovation"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						viewport={{ once: true }}
					>
						<Steppers />
					</motion.div>
				</div>

				{/* MOVED Footer inside the main content area */}
				<Footer />
			</div>

			{/* Skeleton overlay - shows on top while content loads underneath */}
			{isLoading && (
				<div className="fixed inset-0 bg-white z-50">
					<SkeletonLoader />
				</div>
			)}
		</>
	);
}
