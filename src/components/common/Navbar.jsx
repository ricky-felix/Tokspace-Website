"use client";

import { Button, useMediaQuery } from "@relume_io/relume-ui";
import { motion } from "framer-motion";
import React, { useState } from "react";

import { Link, useLocation } from "react-router-dom";

import buttonStyles from "../../css/Button.module.css";

const useRelume = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const isMobile = useMediaQuery("(max-width: 991px)");
	const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
	const openOnMobileDropdownMenu = () => {
		setIsDropdownOpen((prev) => !prev);
	};
	const openOnDesktopDropdownMenu = () => {
		!isMobile && setIsDropdownOpen(true);
	};
	const closeOnDesktopDropdownMenu = () => {
		!isMobile && setIsDropdownOpen(false);
	};
	const animateMobileMenu = isMobileMenuOpen ? "open" : "close";
	const animateMobileMenuButtonSpan = isMobileMenuOpen
		? ["open", "rotatePhase"]
		: "closed";
	const animateDropdownMenu = isDropdownOpen ? "open" : "close";
	const animateDropdownMenuIcon = isDropdownOpen ? "rotated" : "initial";
	return {
		toggleMobileMenu,
		openOnDesktopDropdownMenu,
		closeOnDesktopDropdownMenu,
		openOnMobileDropdownMenu,
		animateMobileMenu,
		animateMobileMenuButtonSpan,
		animateDropdownMenu,
		animateDropdownMenuIcon,
	};
};

export function Navbar() {
	const useActive = useRelume();
	const location = useLocation();

	const handleScrollToSection = (e, sectionId) => {
		if (location.pathname === "/") {
			// Already on homepage, prevent navigation and just scroll
			e.preventDefault();
			const element = document.getElementById(sectionId);
			if (element) {
				element.scrollIntoView({ behavior: "smooth" });
			}
		}
		// If not on homepage, let the Link handle navigation normally
	};

	return (
		<section
			id="relume"
			className="z-[999] flex w-full items-center border-b border-border-primary bg-background-primary lg:min-h-18 lg:px-[5%]"
		>
			<div className="size-full lg:flex lg:items-center lg:justify-between">
				<div className="flex min-h-16 items-center justify-between px-[5%] md:min-h-18 lg:min-h-full lg:px-0">
					<a href="#">
						<img src="./Tokspace-Logo.png" alt="Logo image" width="100px" />
					</a>
					<button
						className="-mr-2 flex size-12 flex-col items-center justify-center lg:hidden"
						onClick={useActive.toggleMobileMenu}
					>
						<motion.span
							className="my-[3px] h-0.5 w-6 bg-black"
							animate={useActive.animateMobileMenuButtonSpan}
							variants={{
								open: { translateY: 8, transition: { delay: 0.1 } },
								rotatePhase: { rotate: -45, transition: { delay: 0.2 } },
								closed: {
									translateY: 0,
									rotate: 0,
									transition: { duration: 0.2 },
								},
							}}
						/>
						<motion.span
							className="my-[3px] h-0.5 w-6 bg-black"
							animate={useActive.animateMobileMenu}
							variants={{
								open: { width: 0, transition: { duration: 0.1 } },
								closed: {
									width: "1.5rem",
									transition: { delay: 0.3, duration: 0.2 },
								},
							}}
						/>
						<motion.span
							className="my-[3px] h-0.5 w-6 bg-black"
							animate={useActive.animateMobileMenuButtonSpan}
							variants={{
								open: { translateY: -8, transition: { delay: 0.1 } },
								rotatePhase: { rotate: 45, transition: { delay: 0.2 } },
								closed: {
									translateY: 0,
									rotate: 0,
									transition: { duration: 0.2 },
								},
							}}
						/>
					</button>
				</div>
				<motion.div
					variants={{
						open: { height: "var(--height-open, 100dvh)" },
						close: { height: "var(--height-closed, 0)" },
					}}
					initial="close"
					exit="close"
					animate={useActive.animateMobileMenu}
					transition={{ duration: 0.4 }}
					className="overflow-hidden px-[5%] lg:flex lg:items-center lg:px-0 lg:[--height-closed:auto] lg:[--height-open:auto]"
				>
					{/* Navigation Links Container */}
					<nav className="flex flex-col gap-6 py-6 lg:flex-row lg:gap-8 lg:py-0">
						<Link
							to="/#home"
							onClick={(e) => handleScrollToSection(e, "home")}
							className="block py-2 text-md font-semibold lg:px-3 lg:py-2 hover:text-primary transition-colors"
						>
							Home
						</Link>
						<Link
							to="/#creativity"
							onClick={(e) => handleScrollToSection(e, "creativity")}
							className="block py-2 text-md font-semibold lg:px-3 lg:py-2 hover:text-primary transition-colors"
						>
							Creativity
						</Link>
						<Link
							to="/#ourmission"
							onClick={(e) => handleScrollToSection(e, "ourmission")}
							className="block py-2 text-md font-semibold lg:px-3 lg:py-2 hover:text-primary transition-colors"
						>
							Our Mission
						</Link>
						<Link
							to="/#innovation"
							onClick={(e) => handleScrollToSection(e, "innovation")}
							className="block py-2 text-md font-semibold lg:px-3 lg:py-2 hover:text-primary transition-colors"
						>
							Innovation
						</Link>
					</nav>

					{/* Contact Button */}
					<div className="mt-4 flex flex-col items-center gap-4 lg:mt-0 lg:ml-4 lg:flex-row">
						<Link to="/contact-us">
							<Button
								title="Reach Out"
								size="sm"
								className={`w-full ${buttonStyles.bubbleButton} ${buttonStyles.primary}`}
							>
								Contact Us
							</Button>
						</Link>
					</div>
				</motion.div>
			</div>
		</section>
	);
}

export default Navbar;
