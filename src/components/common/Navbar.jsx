"use client";

import { Button, useMediaQuery } from "@relume_io/relume-ui";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useState, useEffect } from "react";
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
	};
};

// Mobile Language Switcher Component for Navbar
const MobileLanguageSwitcher = ({ isMobile }) => {
	if (!isMobile) return null;

	return (
		<motion.div
			className="flex items-center"
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
			<LanguageSwitcher />
		</motion.div>
	);
};

export function Navbar() {
	const useActive = useRelume();
	const location = useLocation();
	const { t } = useTranslation();
	const [scrolled, setScrolled] = useState(false);
	const { scrollY } = useScroll();

	// Transform values based on scroll
	const backgroundColor = useTransform(
		scrollY,
		[0, 100],
		["rgba(255, 255, 255, 0.95)", "rgba(255, 255, 255, 0.98)"]
	);

	const backdropBlur = useTransform(
		scrollY,
		[0, 100],
		["blur(0px)", "blur(10px)"]
	);

	// Track scroll position
	useEffect(() => {
		const handleScroll = () => {
			const isScrolled = window.scrollY > 10;
			setScrolled(isScrolled);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleScrollToSection = (e, sectionId) => {
		if (location.pathname === "/") {
			e.preventDefault();
			const element = document.getElementById(sectionId);
			if (element) {
				element.scrollIntoView({ behavior: "smooth" });
			}
		}
	};

	const handleNavLinkClick = (e, sectionId) => {
		handleScrollToSection(e, sectionId);
		if (useActive.animateMobileMenu === "open") {
			useActive.toggleMobileMenu();
		}
	};

	// Navigation link variants
	const linkVariants = {
		initial: { y: 0 },
		hover: {
			y: -2,
			transition: {
				type: "spring",
				stiffness: 300,
				damping: 10,
			},
		},
	};

	// Logo animation variants
	const logoVariants = {
		initial: { scale: 1 },
		hover: {
			scale: 1.05,
			transition: {
				type: "spring",
				stiffness: 400,
				damping: 10,
			},
		},
	};

	// Mobile menu backdrop variants
	const backdropVariants = {
		open: {
			opacity: 1,
			backdropFilter: "blur(8px)",
			transition: { duration: 0.3 },
		},
		close: {
			opacity: 0,
			backdropFilter: "blur(0px)",
			transition: { duration: 0.3 },
		},
	};

	return (
		<>
			{/* Mobile menu backdrop */}
			{useActive.animateMobileMenu === "open" && (
				<motion.div
					className="fixed inset-0 bg-black/20 z-[998] lg:hidden"
					variants={backdropVariants}
					initial="close"
					animate="open"
					exit="close"
					onClick={useActive.toggleMobileMenu}
				/>
			)}

			<motion.section
				id="relume"
				className="fixed top-0 left-0 right-0 z-[999] flex w-full items-center border-b border-border-primary bg-white/95 backdrop-blur-sm lg:min-h-18 lg:px-[5%]"
				style={{
					backgroundColor,
					backdropFilter: backdropBlur,
				}}
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				transition={{
					type: "spring",
					stiffness: 300,
					damping: 30,
					duration: 0.6,
				}}
			>
				{/* Logo - always left */}
				<motion.div
					variants={logoVariants}
					initial="initial"
					whileHover="hover"
					className="flex items-center"
				>
					<Link to="/" className="flex items-center">
						<motion.img
							src="./Tokspace-Logo.png"
							width="100px"
							alt="Tokspace Logo"
							whileHover={{ rotate: [0, -5, 5, 0] }}
							transition={{ duration: 0.5 }}
						/>
					</Link>
				</motion.div>

				{/* Everything else - right side */}
				<div className="flex flex-1 justify-end items-center">
					{/* Desktop Navigation */}
					<div className="hidden lg:flex items-center space-x-8 mr-4">
						<motion.div
							variants={linkVariants}
							initial="initial"
							whileHover="hover"
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1, duration: 0.3 }}
						>
							<Link
								to="/"
								className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
							>
								{t("navbar.home")}
							</Link>
						</motion.div>
						<motion.div
							variants={linkVariants}
							initial="initial"
							whileHover="hover"
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2, duration: 0.3 }}
						>
							<Link
								to="/shop"
								className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
							>
								{t("navbar.shop")}
							</Link>
						</motion.div>
					</div>

					{/* Desktop Right Section */}
					<div className="hidden lg:flex items-center space-x-4">
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.3, duration: 0.3 }}
						>
							<LanguageSwitcher />
						</motion.div>
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.4, duration: 0.3 }}
						>
							<Link to="/contact-us">
								<motion.div
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									transition={{ type: "spring", stiffness: 400, damping: 17 }}
								>
									<Button
										title="Contact Us"
										size="sm"
										className={`${buttonStyles.bubbleButton} ${buttonStyles.primary}`}
									>
										{t("navbar.contactUs")}
									</Button>
								</motion.div>
							</Link>
						</motion.div>
					</div>

					{/* Mobile Right Section */}
					<div className="flex items-center space-x-3 lg:hidden">
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.3, duration: 0.3 }}
						>
							<Link to="/contact-us">
								<motion.div
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									<Button
										title="Contact Us"
										size="sm"
										className={`${buttonStyles.bubbleButton} ${buttonStyles.primary} text-sm px-3 py-2`}
									>
										Contact Us
									</Button>
								</motion.div>
							</Link>
						</motion.div>
						<motion.button
							className="flex size-10 flex-col items-center justify-center"
							onClick={useActive.toggleMobileMenu}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.4, duration: 0.3 }}
						>
							<motion.span
								className="my-[2px] h-0.5 w-5 bg-black"
								animate={useActive.animateMobileMenuButtonSpan}
								variants={{
									open: { translateY: 6, transition: { delay: 0.1 } },
									rotatePhase: { rotate: -45, transition: { delay: 0.2 } },
									closed: {
										translateY: 0,
										rotate: 0,
										transition: { duration: 0.2 },
									},
								}}
							/>
							<motion.span
								className="my-[2px] h-0.5 w-5 bg-black"
								animate={useActive.animateMobileMenu}
								variants={{
									open: { width: 0, transition: { duration: 0.1 } },
									closed: {
										width: "1.25rem",
										transition: { delay: 0.3, duration: 0.2 },
									},
								}}
							/>
							<motion.span
								className="my-[2px] h-0.5 w-5 bg-black"
								animate={useActive.animateMobileMenuButtonSpan}
								variants={{
									open: { translateY: -6, transition: { delay: 0.1 } },
									rotatePhase: { rotate: 45, transition: { delay: 0.2 } },
									closed: {
										translateY: 0,
										rotate: 0,
										transition: { duration: 0.2 },
									},
								}}
							/>
						</motion.button>
					</div>
				</div>
				{/* Mobile Menu */}
				<motion.div
					variants={{
						open: {
							height: "auto",
							opacity: 1,
							transition: {
								duration: 0.4,
								staggerChildren: 0.1,
								delayChildren: 0.2,
							},
						},
						close: {
							height: 0,
							opacity: 0,
							transition: {
								duration: 0.4,
								staggerChildren: 0.05,
								staggerDirection: -1,
							},
						},
					}}
					animate={useActive.animateMobileMenu}
					initial="close"
					exit="close"
					className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-sm border-b border-border-primary overflow-hidden lg:hidden"
				>
					<div className="px-4 py-6 space-y-4">
						<motion.div
							variants={{
								open: { opacity: 1, y: 0 },
								close: { opacity: 0, y: -20 },
							}}
						>
							<Link
								to="/"
								className="block py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
								onClick={() => useActive.toggleMobileMenu()}
							>
								Home
							</Link>
						</motion.div>
						<motion.div
							variants={{
								open: { opacity: 1, y: 0 },
								close: { opacity: 0, y: -20 },
							}}
						>
							<Link
								to="/shop"
								className="block py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
								onClick={() => useActive.toggleMobileMenu()}
							>
								Shop
							</Link>
						</motion.div>
						<motion.div
							variants={{
								open: { opacity: 1, y: 0 },
								close: { opacity: 0, y: -20 },
							}}
							className="pt-2 border-t border-gray-200"
						>
							<LanguageSwitcher />
						</motion.div>
					</div>
				</motion.div>
			</motion.section>

			<div className="h-16 md:h-18 lg:h-20"></div>
		</>
	);
}

export default Navbar;
