"use client";

import buttonStyles from "../../css/Button.module.css";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import {
	BiLogoFacebookCircle,
	BiLogoInstagram,
	BiLogoLinkedinSquare,
	BiLogoYoutube,
} from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";

import { Link, useLocation } from "react-router";

export function Footer() {
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
		<footer id="relume" className="w-full py-12 md:py-18 lg:py-20">
			<div className="w-full px-[5%]">
				<div className="border-b border-border-primary">
					<div className="mb-12 grid grid-cols-1 gap-x-[8vw] gap-y-12 md:mb-18 md:gap-y-16 lg:mb-20 lg:grid-cols-[1fr_0.5fr] lg:gap-y-20">
						<div className="rb-6 max-w-md">
							<h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-6xl">
								Explore the Future of Creativity
							</h1>
							<p>
								Join us in shaping tomorrow with innovative design and
								technology.
							</p>
							<div className="mt-6 flex flex-wrap gap-4 md:mt-8">
								<Button
									title="Discover"
									className={`${buttonStyles.bubbleButton} ${buttonStyles.primary}`}
								>
									Check out Roadmap! (COMING SOON)
								</Button>
								<Button
									title="Connect"
									variant="secondary"
									className={`${buttonStyles.bubbleButton} ${buttonStyles.secondary}`}
								>
									Join Our Community! (COMING SOON)
								</Button>
							</div>
						</div>
						<div className="grid grid-cols-1 items-start gap-x-6 gap-y-5 sm:grid-cols-2 sm:gap-x-6 md:gap-x-8 md:gap-y-4">
							<ul>
								<li className="py-2 text-sm font-bold">HYPERLINKS</li>
								<li className="py-2 text-sm font-semibold">
									<Link
										to="/#header"
										onClick={(e) => handleScrollToSection(e, "header")}
									>
										Home
									</Link>
								</li>
								<li className="py-2 text-sm font-semibold">
									<Link
										to="/#creativity"
										onClick={(e) => handleScrollToSection(e, "creativity")}
									>
										Creativity
									</Link>
								</li>
								<li className="py-2 text-sm font-semibold">
									<Link
										to="/#ourmission"
										onClick={(e) => handleScrollToSection(e, "ourmission")}
									>
										Our Mission
									</Link>
								</li>
								<li className="py-2 text-sm font-semibold">
									<Link
										to="/#steppers"
										onClick={(e) => handleScrollToSection(e, "steppers")}
									>
										Innovation
									</Link>
								</li>
							</ul>
							<ul>
								<li className="py-2 text-sm font-bold">OTHERS</li>
								<li className="py-2 text-sm font-semibold">
									<Link to="/contact-us">Contact Us</Link>
								</li>

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
						<a href="#">
							<img
								src="./Tokspace-Logo.png"
								alt="Logo image"
								className="mb-6 inline-block sm:mb-0"
								width="100px"
							/>
						</a>
					</div>
				</div>
				<div className="flex flex-col-reverse items-start justify-between pt-6 pb-4 text-sm md:flex-row md:items-center md:pt-8 md:pb-0">
					<p>Tokspace. 2025.</p>
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
						>
							<BiLogoInstagram className="size-6" />
						</a>
						<a
							href="https://www.linkedin.com/company/108032151/"
							target="_blank"
							rel="noreferrer"
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
