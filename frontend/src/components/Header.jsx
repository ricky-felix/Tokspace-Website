"use client";

import { Button } from "@relume_io/relume-ui";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import buttonStyles from "../css/Button.module.css";

export function Header() {
	const { t } = useTranslation();
	const [windowWidth, setWindowWidth] = useState(
		typeof window !== "undefined" ? window.innerWidth : 0
	);

	// Effect to handle window resize
	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const scrollToOurMission = () => {
		const element = document.getElementById("ourmission");
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	// Get responsive aspect ratio for videos
	const getVideoAspectRatio = () => {
		if (windowWidth < 640) {
			// Mobile - slightly taller aspect ratio for better mobile viewing
			return "aspect-[16/10]";
		} else if (windowWidth < 1024) {
			// Tablet - standard video aspect ratio
			return "aspect-video";
		} else {
			// Desktop - cinematic widescreen aspect ratio
			return "aspect-[21/9]";
		}
	};

	// Get responsive container classes
	const getVideoContainerClasses = () => {
		const baseClasses = "relative w-full overflow-hidden rounded-lg";
		return `${baseClasses} ${getVideoAspectRatio()}`;
	};

	return (
		<section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
			<div className="container">
				<div className="mb-12 grid grid-cols-1 gap-x-12 gap-y-5 md:mb-18 md:grid-cols-2 md:gap-y-8 md:items-center lg:mb-20 lg:gap-x-20 lg:gap-y-16">
					<div className="text-center md:text-left">
						<h1 className="text-5xl font-bold md:text-6xl lg:text-7xl">
							{t("header.title")}
						</h1>
					</div>
					<div className="text-center md:text-left">
						<p className="text-base md:text-lg lg:text-xl">{t("header.description")}</p>
						{/* <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
							<Button
								title={t("header.learnMore")}
								variant="primary"
								className={`${buttonStyles.bubbleButton} ${buttonStyles.primary}`}
								onClick={scrollToOurMission}
							>
								{t("header.learnMore")}
							</Button>
						</div> */}
					</div>
				</div>
				<div className={getVideoContainerClasses()}>
					<iframe
						src="https://player.vimeo.com/video/1103973310?background=1&amp;autoplay=1&amp;loop=1&amp;byline=0&amp;title=0&amp;portrait=0&amp;muted=1&amp;dnt=1"
						className="absolute inset-0 w-full h-full"
						width="800"
						height="720"
						frameBorder="0"
						allow="autoplay; fullscreen"
						referrerPolicy="strict-origin-when-cross-origin"
						title="Tokspace - Website - Clip 1"
					/>
				</div>
			</div>
		</section>
	);
}

export default Header;
