"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";

export function Steppers() {
	const { t } = useTranslation();
	const [windowWidth, setWindowWidth] = useState(
		typeof window !== "undefined" ? window.innerWidth : 0
	);
	const [currentStep, setCurrentStep] = useState(0);
	const [isVideoLoading, setIsVideoLoading] = useState(true);
	const [videoProgress, setVideoProgress] = useState(0);

	// Use a single video element that we'll change the source on
	const videoRef = useRef(null);
	const containerRef = useRef(null);

	const steps = [
		{
			id: 0,
			title: t("steppers.step1Title"),
			description: t("steppers.step1Description"),
			video:
				"https://files.tokspace.cloud/website-videos/Tokspace-Website-Clip-4-Design.webm",
			duration: 15,
		},
		{
			id: 1,
			title: t("steppers.step2Title"),
			description: t("steppers.step2Description"),
			video:
				"https://files.tokspace.cloud/website-videos/Tokspace-Website-Clip-4-Ideation.webm",
			duration: 11,
		},
		{
			id: 2,
			title: t("steppers.step3Title"),
			description: t("steppers.step3Description"),
			video:
				"https://files.tokspace.cloud/website-videos/Tokspace-Website-Clip-4-Prototype.webm",
			duration: 18,
		},
	];

	// Effect to handle window resize
	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Single effect to handle all video events - this prevents flickering
	useLayoutEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const handleLoadStart = () => {
			setIsVideoLoading(true);
			setVideoProgress(0);
		};

		const handleCanPlay = () => {
			setIsVideoLoading(false);
		};

		const handleTimeUpdate = () => {
			if (video.duration && video.duration > 0) {
				const progress = (video.currentTime / video.duration) * 100;
				setVideoProgress(progress);
			}
		};

		const handleEnded = () => {
			if (currentStep < steps.length - 1) {
				setCurrentStep((prev) => prev + 1);
			} else {
				setCurrentStep(0);
			}
		};

		const handleError = (e) => {
			console.error("Video error:", e);
			setIsVideoLoading(false);
		};

		// Add all event listeners
		video.addEventListener("loadstart", handleLoadStart);
		video.addEventListener("canplay", handleCanPlay);
		video.addEventListener("timeupdate", handleTimeUpdate);
		video.addEventListener("ended", handleEnded);
		video.addEventListener("error", handleError);

		// Load the current video source
		const currentVideo = steps[currentStep];
		if (video.src !== currentVideo.video) {
			video.src = currentVideo.video;
			video.load(); // Force reload with new source
		}

		return () => {
			video.removeEventListener("loadstart", handleLoadStart);
			video.removeEventListener("canplay", handleCanPlay);
			video.removeEventListener("timeupdate", handleTimeUpdate);
			video.removeEventListener("ended", handleEnded);
			video.removeEventListener("error", handleError);
		};
	}, [currentStep, steps]);

	// Separate effect to handle video playback after source change
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const playVideo = async () => {
			try {
				video.currentTime = 0;
				await video.play();
			} catch (error) {
				console.log("Autoplay prevented, user interaction required");
			}
		};

		// Small delay to ensure video source is loaded
		const timer = setTimeout(playVideo, 200);
		return () => clearTimeout(timer);
	}, [currentStep]);

	// Manual step navigation
	const goToStep = (stepIndex) => {
		if (
			stepIndex >= 0 &&
			stepIndex < steps.length &&
			stepIndex !== currentStep
		) {
			setCurrentStep(stepIndex);
		}
	};

	// Get responsive aspect ratio for videos
	const getVideoAspectRatio = () => {
		if (windowWidth < 640) {
			return "aspect-[16/10]";
		} else if (windowWidth < 1024) {
			return "aspect-video";
		} else {
			return "aspect-[21/9]";
		}
	};

	// Get responsive container classes
	const getVideoContainerClasses = () => {
		const baseClasses = "relative w-full overflow-hidden rounded-lg";
		return `${baseClasses} ${getVideoAspectRatio()}`;
	};

	// Progress bar component
	const ProgressBar = () => (
		<div className="mb-8 md:mb-12">
			<div className="flex justify-between items-center mb-4">
				{steps.map((step, index) => {
					let textColor = "text-gray-500";

					if (index < currentStep) {
						textColor = "text-orange-400";
					} else if (index === currentStep) {
						textColor = "text-[#ff6523]";
					}

					return (
						<div
							key={step.id}
							className="flex flex-col items-center text-center flex-1 cursor-pointer"
							onClick={() => goToStep(index)}
						>
							<h4
								className={`text-lg font-bold md:text-xl lg:text-2xl ${textColor} transition-colors duration-300 mb-1 hover:opacity-80`}
							>
								{step.title}
							</h4>
							<p
								className={`text-xs md:text-sm lg:text-base ${textColor} transition-colors duration-300 hover:opacity-80`}
							>
								{step.description}
							</p>
						</div>
					);
				})}
			</div>

			{/* Progress line */}
			<div className="relative h-1 bg-gray-300 rounded-full overflow-hidden">
				{steps.map((step, index) => {
					const sectionWidth = 100 / steps.length;
					const sectionStart = index * sectionWidth;

					let fillWidth = 0;
					let fillColor = "bg-gray-300";

					if (index < currentStep) {
						fillWidth = sectionWidth;
						fillColor = "bg-orange-300";
					} else if (index === currentStep) {
						if (videoProgress > 0) {
							fillWidth = (videoProgress / 100) * sectionWidth;
							fillColor = "bg-[#ff6523]";
						} else if (isVideoLoading) {
							fillColor = "bg-orange-200 animate-pulse";
							fillWidth = sectionWidth * 0.1;
						}
					}

					return (
						<div
							key={`progress-${index}`}
							className={`absolute top-0 h-full ${fillColor} transition-all duration-300 ease-out`}
							style={{
								left: `${sectionStart}%`,
								width: `${fillWidth}%`,
							}}
						/>
					);
				})}
			</div>
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

				<ProgressBar />

				<div className="relative" ref={containerRef}>
					<div className={getVideoContainerClasses()}>
						{isVideoLoading && (
							<div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg z-10">
								<div className="flex flex-col items-center">
									<div className="w-8 h-8 border-4 border-[#ff6523] border-t-transparent rounded-full animate-spin mb-2"></div>
									<p className="text-sm text-gray-600">Loading video...</p>
								</div>
							</div>
						)}

						<video
							ref={videoRef}
							className="w-full h-full object-cover"
							muted
							playsInline
							preload="auto"
							controls={false}
						>
							Your browser does not support the video tag.
						</video>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Steppers;
