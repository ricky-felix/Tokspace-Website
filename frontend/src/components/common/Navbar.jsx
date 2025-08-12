// Updated Navbar component with sticky positioning
"use client";

import { Button, useMediaQuery } from "@relume_io/relume-ui";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
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
		isMobile,
	};
};

// Mobile Language Switcher Component for Navbar
const MobileLanguageSwitcher = ({ isMobile }) => {
	if (!isMobile) return null;

	return (
		<div className="flex items-center">
			<LanguageSwitcher />
		</div>
	);
};

export function Navbar() {
	const useActive = useRelume();
	const location = useLocation();
	const { t } = useTranslation();

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

	const handleNavLinkClick = (e, sectionId) => {
		handleScrollToSection(e, sectionId);
		// Close mobile menu after clicking a nav link
		if (useActive.animateMobileMenu === "open") {
			useActive.toggleMobileMenu();
		}
	};

	return (
		<section
			id="relume"
			// Use fixed positioning for always visible navbar
			className="fixed top-0 left-0 right-0 z-[999] flex w-full items-center border-b border-border-primary bg-white shadow-sm lg:min-h-20 lg:px-[5%] py-2"
			// Explicit inline styles for cross-browser compatibility
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				zIndex: 999,
				backgroundColor: "white",
				boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
			}}
		>
			<div className="size-full lg:flex lg:items-center lg:justify-between">
				<div className="flex min-h-14 items-center justify-between px-6 md:min-h-18 md:px-[5%] lg:min-h-full lg:px-0">
					<Link to="/">
						<img
							src="./Tokspace-Logo.png"
							className="mb-3 inline-block sm:mb-0 border-0 outline-none ring-0"
							style={{ border: "none", outline: "none", display: "block" }}
							alt="Tokspace Logo"
							width="80px"
						/>
					</Link>
					<div className="flex items-center gap-4 lg:hidden">
						{/* Mobile Language Switcher */}
						<MobileLanguageSwitcher isMobile={useActive.isMobile} />
						<button
							className="-mr-1 flex size-12 flex-col items-center justify-center"
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
					className="overflow-hidden px-6 md:px-[5%] lg:flex lg:items-center lg:px-0 lg:[--height-closed:auto] lg:[--height-open:auto]"
				>
					{/* Navigation Links Container */}
					<nav className="flex flex-col gap-6 py-6 lg:flex-row lg:gap-10 lg:py-0">
						<Link
							to="/#home"
							onClick={(e) => handleNavLinkClick(e, "header")}
							className="block py-3 text-md font-semibold lg:px-4 lg:py-3 hover:text-[#ff6523] transition-colors"
						>
							{t("navbar.home")}
						</Link>
						<Link
							to="/#ourmission"
							onClick={(e) => handleNavLinkClick(e, "discover")}
							className="block py-3 text-md font-semibold lg:px-4 lg:py-3 hover:text-[#ff6523] transition-colors"
						>
							{t("navbar.discover")}
						</Link>
						<Link
							to="/#creativity"
							onClick={(e) => handleNavLinkClick(e, "ourmission")}
							className="block py-3 text-md font-semibold lg:px-4 lg:py-3 hover:text-[#ff6523] transition-colors"
						>
							{t("navbar.ourMission")}
						</Link>
						<Link
							to="/#creativity"
							onClick={(e) => handleNavLinkClick(e, "creativity")}
							className="block py-3 text-md font-semibold lg:px-4 lg:py-3 hover:text-[#ff6523] transition-colors"
						>
							{t("navbar.creativity")}
						</Link>
						<Link
							to="/#innovation"
							onClick={(e) => handleNavLinkClick(e, "innovation")}
							className="block py-3 text-md font-semibold lg:px-4 lg:py-3 hover:text-[#ff6523] transition-colors"
						>
							{t("navbar.innovation")}
						</Link>
					</nav>

					{/* Desktop Language Switcher - Hidden on mobile */}
					<div className="hidden lg:block">
						<LanguageSwitcher />
					</div>

					{/* Contact Button */}
					<div className="mt-6 flex flex-col items-center gap-4 lg:mt-0 lg:ml-6 lg:flex-row">
						<Link to="/contact-us">
							<Button
								title="Reach Out"
								size="sm"
								className={`w-full ${buttonStyles.bubbleButton} ${buttonStyles.primary}`}
							>
								{t("navbar.contactUs")}
							</Button>
						</Link>
					</div>
				</motion.div>
			</div>
		</section>
	);
}

export default Navbar;
