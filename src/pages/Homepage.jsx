import React, { useEffect } from "react";
import "../index.css";
import { useLocation } from "react-router";
import { motion } from "framer-motion";

import { Navbar } from "../components/common/Navbar";
import { Footer } from "../components/common/Footer";

import { Header } from "../components/Header";
import { Creativity } from "../components/Creativity";
import { OurMission } from "../components/OurMission";
import { Steppers } from "../components/Steppers";

export default function Home() {
	const location = useLocation();

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

	return (
		<>
			<Navbar />

			<div className="min-h-screen overflow-x-hidden">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col items-center justify-center py-8 lg:py-12 w-full">
						<motion.div
							className="w-full"
							id="header"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
						>
							<Header />
						</motion.div>

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
							id="creativity"
							style={{ maxWidth: "100%", overflow: "hidden" }}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							viewport={{ once: true }}
						>
							<Creativity />
						</motion.div>

						<motion.div
							className="w-full"
							id="steppers"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
							viewport={{ once: true }}
						>
							<Steppers />
						</motion.div>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
}
