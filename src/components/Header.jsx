"use client";

import { Button } from "@relume_io/relume-ui";
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import buttonStyles from "../css/Button.module.css";
import LazyVideo from "./common/LazyVideo";

export function Header() {
	const { t } = useTranslation();
	const videoRef = useRef(null);
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

	// Force video to play when component mounts
	useEffect(() => {
		if (videoRef.current) {
			const video = videoRef.current;
			video.muted = true; // Ensure muted for autoplay

			const playVideo = async () => {
				try {
					await video.play();
					// console.log("Video started playing");
				} catch (error) {
					// console.error("Video play failed:", error);
				}
			};

			// Try to play immediately
			playVideo();

			// Also try when video can play
			video.addEventListener("canplay", playVideo);
			video.addEventListener("loadeddata", playVideo);

			return () => {
				video.removeEventListener("canplay", playVideo);
				video.removeEventListener("loadeddata", playVideo);
			};
		}
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
		<section
			id="relume"
			className="px-[5%] pt-32 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-28"
		>
			<div className="container">
				<div className="mb-12 grid grid-cols-1 gap-x-12 gap-y-5 md:mb-18 md:grid-cols-2 md:gap-y-8 md:items-center lg:mb-20 lg:gap-x-20 lg:gap-y-16">
					<div className="text-center md:text-left">
						<h1 className="text-5xl font-bold md:text-6xl lg:text-7xl">
							{t("header.title")}
						</h1>
					</div>
					<div className="text-center md:text-left">
						<p className="text-base md:text-lg lg:text-xl">
							{t("header.description")}
						</p>
					</div>
				</div>
				<LazyVideo
					ref={videoRef}
					src="https://files.tokspace.cloud/website-videos/Tokspace-Website-Clip-1.webm"
					className={getVideoContainerClasses()}
				/>
			</div>
		</section>
	);
}

export default Header;
