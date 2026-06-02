"use client";

import buttonStyles from "../../css/Button.module.css";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { useTranslation } from "react-i18next";
import {
	BiLogoFacebookCircle,
	BiLogoInstagram,
	BiLogoLinkedinSquare,
	BiLogoYoutube,
} from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";

import { Link, useLocation } from "react-router-dom";

export function Footer() {
	const location = useLocation();
	const { t, i18n } = useTranslation();

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
		<footer id="relume" className="w-full py-12 md:py-18 lg:py-20">
			<div className="w-full px-[5%]">
				<div className="border-b border-border-primary">
					<div className="mb-12 grid grid-cols-1 gap-x-[8vw] gap-y-12 md:mb-18 md:gap-y-16 lg:mb-20 lg:grid-cols-[1fr_0.5fr] lg:gap-y-20">
						<div className="rb-6 max-w-md">
							<h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-6xl lg:text-7xl">
								{t("footer.exploreTitle")}
							</h1>
							<p className="text-lg md:text-xl lg:text-2xl">
								{t("footer.joinUs")}
							</p>
							<div className="mt-6 flex flex-wrap gap-4 md:mt-8">
								{/* <Button
									title="Discover"
									className={`${buttonStyles.bubbleButton} ${buttonStyles.primary}`}
								>
									{t("footer.checkRoadmap")}
								</Button>
								<Button
									title="Connect"
									variant="secondary"
									className={`${buttonStyles.bubbleButton} ${buttonStyles.secondary}`}
								>
									{t("footer.joinCommunity")}
								</Button> */}
							</div>
						</div>
						<div className="grid grid-cols-1 items-start gap-x-6 gap-y-5 sm:grid-cols-2 sm:gap-x-6 md:gap-x-8 md:gap-y-4">
							<ul>
								<li className="py-2 text-sm font-bold text-[#1c1f2a]">
									{t("footer.page")}
								</li>
								<li className="py-2 text-sm font-semibold">
									<Link
										to="/"
										className="text-black hover:text-[#ff6523] transition-colors duration-300"
									>
										{t("footer.meetTokspace")}
									</Link>
								</li>
								{/* <li className="py-2 text-sm font-semibold">
									<Link
										to="/#discover"
										onClick={(e) => handleScrollToSection(e, "discover")}
										className="text-black hover:text-[#ff6523] transition-colors duration-300"
									>
										{t("navbar.discover")}
									</Link>
								</li> */}
								{/* <li className="py-2 text-sm font-semibold">
									<Link
										to="/shop"
										className="text-black hover:text-[#ff6523] transition-colors duration-300"
									>
										{t("navbar.shop")}
									</Link>
								</li> */}
								<li className="py-2 text-sm font-semibold">
									<Link
										to="/custom-print"
										className="text-black hover:text-[#ff6523] transition-colors duration-300"
									>
										{t("navbar.customPrint")}
									</Link>
								</li>
							</ul>
							<ul>
								<li className="py-2 text-sm font-bold text-[#1c1f2a]">
									{t("footer.others")}
								</li>
								<li className="py-2 text-sm font-semibold">
									<Link
										to="/contact-us"
										className="text-black hover:text-[#ff6523] transition-colors duration-300"
									>
										{t("navbar.contactUs")}
									</Link>
								</li>
								{/* <li className="py-2 text-sm font-semibold">
									<a
										href="https://form.typeform.com/to/fkjdwnRR"
										className="text-black hover:text-[#ff6523] transition-colors duration-300"
										target="_blank"
										rel="noopener noreferrer"
									>
										{t("footer.bugReport")}
									</a>
								</li> */}

								{/* <li className="py-2 text-sm font-semibold">
									<a href="" target="_blank">
										Join Our Community! (Discord)
									</a>
								</li>
								<li className="py-2 text-sm font-semibold">
									<a href="" target="_blank">
										Check Our Roadmap (Trello)
									</a>
								</li> */}

								{/* <li className="py-2 text-sm font-semibold">
									<a href="#">Privacy Policy</a>
								</li>
								<li className="py-2 text-sm font-semibold">
									<a href="#">Terms of Use</a>
								</li> */}
							</ul>
						</div>
					</div>
					<div className="rb-6 col-span-1 flex flex-col items-start justify-between pb-6 sm:flex-row sm:items-center md:pb-8 lg:col-span-2">
						<Link
							to="/"
							className="hover:opacity-80 transition-opacity duration-300 border-0 outline-none ring-0 focus:outline-none focus:ring-0"
							style={{
								border: "none",
								outline: "none",
								textDecoration: "none",
							}}
						>
							<img
								src="./Tokspace-Logo.png"
								alt="Tokspace Logo"
								className="mb-6 inline-block sm:mb-0 border-0 outline-none ring-0"
								style={{
									border: "none",
									outline: "none",
									display: "block",
									marginTop: "2px", // Add some top margin
								}}
								width="100"
							/>
						</Link>
					</div>
				</div>
				<div className="flex flex-col-reverse items-start justify-between pt-6 pb-4 text-sm md:flex-row md:items-center md:pt-8 md:pb-0">
					<p className="text-black">{t("footer.copyright")}</p>
					<div className="grid grid-flow-col grid-cols-[max-content] items-start justify-start gap-x-3">
						{/* <a href="#" target="_blank">
							<BiLogoFacebookCircle className="size-6" />
						</a>
						<a href="#" target="_blank">
							<FaXTwitter className="size-6 p-0.5" />
						</a>
						<a href="#" target="_blank">
							<BiLogoYoutube className="size-6" />
						</a> */}
						<a
							href="https://www.instagram.com/tokspace.id/"
							target="_blank"
							rel="noreferrer"
							className="text-black hover:text-[#ff6523] transition-colors duration-300"
						>
							<BiLogoInstagram className="size-6" />
						</a>
						<a
							href="https://www.linkedin.com/company/108032151/"
							target="_blank"
							rel="noreferrer"
							className="text-black hover:text-[#ff6523] transition-colors duration-300"
						>
							<BiLogoLinkedinSquare className="size-6" />
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
