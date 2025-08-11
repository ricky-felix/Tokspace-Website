"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@relume_io/relume-ui";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export function Steppers() {
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

	// Video iframe component for reusability
	const VideoIframe = ({ src }) => (
		<div className={getVideoContainerClasses()}>
			<video
				className="w-full h-full aspect-video"
				autoPlay
				muted
				loop
				playsInline
				preload="auto" // Eager loading
				frameBorder="0"
			>
				<source src={src} type="video/webm" />
			</video>
		</div>
	);

	return (
		<section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
			<div className="container">
				<div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
					<h2 className="mb-5 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl">
						{t("steppers.title")}
					</h2>
					<p className="text-base md:text-lg lg:text-xl">
						{t("steppers.subtitle")}
					</p>
				</div>
				<Tabs defaultValue="tab-one">
					<TabsList className="mb-12 flex-col md:mb-16 md:flex-row">
						<TabsTrigger
							value="tab-one"
							className="flex w-full flex-col gap-1 border-0 px-6 py-4 text-center whitespace-normal duration-0 data-[state=active]:border-b-[1.5px] data-[state=active]:border-border-primary data-[state=active]:bg-transparent data-[state=active]:text-text-primary"
						>
							<h3 className="text-2xl leading-[1.4] font-bold md:text-3xl lg:text-4xl">
								{t("steppers.step1Title")}
							</h3>
							<p className="text-base md:text-lg lg:text-xl">
								{t("steppers.step1Description")}
							</p>
						</TabsTrigger>
						<TabsTrigger
							value="tab-two"
							className="flex w-full flex-col gap-1 border-0 px-6 py-4 text-center whitespace-normal duration-0 data-[state=active]:border-b-[1.5px] data-[state=active]:border-border-primary data-[state=active]:bg-transparent data-[state=active]:text-text-primary"
						>
							<h3 className="text-2xl leading-[1.4] font-bold md:text-3xl lg:text-4xl">
								{t("steppers.step2Title")}
							</h3>
							<p className="text-base md:text-lg lg:text-xl">
								{t("steppers.step2Description")}
							</p>
						</TabsTrigger>
						<TabsTrigger
							value="tab-three"
							className="flex w-full flex-col gap-1 border-0 px-6 py-4 text-center whitespace-normal duration-0 data-[state=active]:border-b-[1.5px] data-[state=active]:border-border-primary data-[state=active]:bg-transparent data-[state=active]:text-text-primary"
						>
							<h3 className="text-2xl leading-[1.4] font-bold md:text-3xl lg:text-4xl">
								{t("steppers.step3Title")}
							</h3>
							<p className="text-base md:text-lg lg:text-xl">
								{t("steppers.step3Description")}
							</p>
						</TabsTrigger>
					</TabsList>
					<TabsContent
						value="tab-one"
						className="data-[state=active]:animate-tabs"
					>
						<VideoIframe src="https://files.tokspace.cloud/website-videos/Tokspace-Website-Clip-4-Design.webm" />
					</TabsContent>
					<TabsContent
						value="tab-two"
						className="data-[state=active]:animate-tabs"
					>
						<VideoIframe src="https://files.tokspace.cloud/website-videos/Tokspace-Website-Clip-4-Ideation.webm" />
					</TabsContent>
					<TabsContent
						value="tab-three"
						className="data-[state=active]:animate-tabs"
					>
						<VideoIframe src="https://files.tokspace.cloud/website-videos/Tokspace-Website-Clip-4-Prototype.webm" />
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}

export default Steppers;
