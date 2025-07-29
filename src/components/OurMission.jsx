"use client";

import { useMediaQuery } from "@relume_io/relume-ui";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const useRelume = (features = []) => {
	// Accept features as parameter
	const [activeIndex, setActiveIndex] = useState(0);
	const isMobile = useMediaQuery("(max-width: 991px)");
	const CardContent = isMobile ? motion.div : "div";
	const animateWidth = (index) => {
		return isMobile ? "100%" : index === activeIndex ? "100%" : "5rem";
	};
	const animateHeight = (index) => {
		return index === activeIndex ? "auto" : "0px";
	};
	const handleSetIsActive = (index) => () => {
		setActiveIndex((prevIndex) => {
			if (
				prevIndex === index &&
				features.filter((_, i) => i === prevIndex).length === 1
			) {
				return prevIndex;
			}
			return prevIndex === index ? null : index;
		});
	};
	return {
		handleSetIsActive,
		CardContent,
		animateWidth,
		animateHeight,
	};
};

export function OurMission() {
	const { t } = useTranslation();
	// const features = [
	// 	{
	// 		columnText: "01",
	// 		verticalText: "Feature one",
	// 		horizontalText: "Feature one",
	// 		heading: "Short heading goes here",
	// 		description:
	// 			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
	// 		image: {
	// 			src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
	// 			alt: "Relume placeholder image 1",
	// 		},
	// 	},
	// 	{
	// 		columnText: "02",
	// 		verticalText: "Feature two",
	// 		horizontalText: "Feature two",
	// 		heading: "Short heading goes here",
	// 		description:
	// 			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
	// 		image: {
	// 			src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
	// 			alt: "Relume placeholder image 2",
	// 		},
	// 	},
	// 	{
	// 		columnText: "03",
	// 		verticalText: "Feature three",
	// 		horizontalText: "Feature three",
	// 		heading: "Short heading goes here",
	// 		description:
	// 			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
	// 		image: {
	// 			src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
	// 			alt: "Relume placeholder image 3",
	// 		},
	// 	},
	// 	{
	// 		columnText: "04",
	// 		verticalText: "Feature four",
	// 		horizontalText: "Feature four",
	// 		heading: "Short heading goes here",
	// 		description:
	// 			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
	// 		image: {
	// 			src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
	// 			alt: "Relume placeholder image 4",
	// 		},
	// 	},
	// ];

	// const useSctoll = useRelume(features); // Pass features to the hook

	const useSctoll = useRelume([{}, {}, {}, {}]); // Just pass 4 empty objects for length

	return (
		<section id="relume" className="py-16 md:py-24 lg:py-28 w-full">
			<div className="w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8">
				<div className="rb-12 mb-12 w-full max-w-lg md:mb-18 lg:mb-20 mx-auto text-center">
					<h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-6xl">
						{t("ourMission.title")}
					</h1>
					<p className="md:text-md">{t("ourMission.subtitle")}</p>
				</div>
				<div className="flex w-full flex-col overflow-hidden border border-border-primary lg:h-[90vh] lg:flex-row bg-[#E9EDF1]">
					<motion.div
						className="flex flex-col justify-start overflow-hidden lg:h-[90vh] lg:min-w-20 lg:flex-row lg:border-r lg:border-border-primary"
						onClick={useSctoll.handleSetIsActive(0)}
						initial={false}
						animate={{ width: useSctoll.animateWidth(0) }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
					>
						<div className="relative flex h-16 w-full min-w-full cursor-pointer items-center justify-center border-t border-border-primary py-8 md:h-20 lg:h-[90vh] lg:w-20 lg:min-w-20 lg:flex-col lg:justify-between lg:border-none">
							<p className="absolute left-6 text-xl font-bold whitespace-nowrap md:left-10 md:text-2xl lg:relative lg:left-0">
								01
							</p>
							<h2 className="hidden [writing-mode:vertical-rl] lg:mx-auto lg:block lg:rotate-180 lg:text-2xl lg:font-bold">
								{t("ourMission.exploration")}
							</h2>
							<p className="text-xl font-bold md:text-2xl lg:hidden">
								{t("ourMission.exploration")}
							</p>
						</div>
						<useSctoll.CardContent
							className="w-full overflow-hidden lg:h-full lg:w-auto lg:max-w-full lg:overflow-auto"
							animate={{ height: useSctoll.animateHeight(0) }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
						>
							<div className="flex h-full flex-col px-6 pt-4 pb-8 md:px-10 md:pt-12 md:pb-12 lg:w-full lg:max-w-2xl lg:px-12 lg:pt-16 lg:pb-16">
								<h3 className="mb-5 text-4xl leading-[1.2] font-bold md:mb-6 md:text-5xl lg:text-6xl">
									{t("ourMission.explorationTitle")}
								</h3>
								<p className="md:text-md">
									{t("ourMission.explorationDescription")}
								</p>
								<div className="rt-8 mt-8 h-80 md:mt-10 md:h-[25rem] lg:mt-12">
									<div>
										<iframe
											src="https://player.vimeo.com/video/1103988039?controls=0&autoplay=1&loop=1&title=0&byline=0&portrait=0&badge=0&autopause=0&muted=1&dnt=1"
											className="w-full aspect-video"
											width="300"
											height="300"
											frameBorder="0"
											allow="autoplay; fullscreen"
											referrerPolicy="strict-origin-when-cross-origin"
											title="Tokspace - Website - Clip 1"
										></iframe>
									</div>
								</div>
							</div>
						</useSctoll.CardContent>
					</motion.div>
					<motion.div
						className="flex flex-col justify-start overflow-hidden lg:h-[90vh] lg:min-w-20 lg:flex-row lg:border-r lg:border-border-primary"
						onClick={useSctoll.handleSetIsActive(1)}
						initial={false}
						animate={{ width: useSctoll.animateWidth(1) }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
					>
						<div className="relative flex h-16 w-full min-w-full cursor-pointer items-center justify-center border-t border-border-primary py-8 md:h-20 lg:h-[90vh] lg:w-20 lg:min-w-20 lg:flex-col lg:justify-between lg:border-none">
							<p className="absolute left-6 text-xl font-bold whitespace-nowrap md:left-10 md:text-2xl lg:relative lg:left-0">
								02
							</p>
							<h2 className="hidden [writing-mode:vertical-rl] lg:mx-auto lg:block lg:rotate-180 lg:text-2xl lg:font-bold">
								{t("ourMission.community")}
							</h2>
							<p className="text-xl font-bold md:text-2xl lg:hidden">
								{t("ourMission.community")}
							</p>
						</div>
						<useSctoll.CardContent
							className="w-full overflow-hidden lg:h-full lg:w-auto lg:max-w-full lg:overflow-auto"
							animate={{ height: useSctoll.animateHeight(1) }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
						>
							<div className="flex h-full flex-col px-6 pt-4 pb-8 md:px-10 md:pt-12 md:pb-12 lg:w-full lg:max-w-2xl lg:px-12 lg:pt-16 lg:pb-16">
								<h3 className="mb-5 text-4xl leading-[1.2] font-bold md:mb-6 md:text-5xl lg:text-6xl">
									{t("ourMission.communityTitle")}
								</h3>
								<p className="md:text-md">
									{t("ourMission.communityDescription")}
								</p>
								<div className="rt-8 mt-8 h-80 md:mt-10 md:h-[25rem] lg:mt-12">
									<iframe
										src="https://player.vimeo.com/video/1103988016?controls=0&amp;autoplay=1&amp;loop=1&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;&muted=1&amp;dnt=1"
										className="w-full aspect-video"
										width="300"
										height="300"
										frameBorder="0"
										allow="autoplay; fullscreen"
										referrerPolicy="strict-origin-when-cross-origin"
										title="Tokspace - Website - Clip 1"
									></iframe>
								</div>
							</div>
						</useSctoll.CardContent>
					</motion.div>
					<motion.div
						className="flex flex-col justify-start overflow-hidden lg:h-[90vh] lg:min-w-20 lg:flex-row lg:border-r lg:border-border-primary"
						onClick={useSctoll.handleSetIsActive(2)}
						initial={false}
						animate={{ width: useSctoll.animateWidth(2) }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
					>
						<div className="relative flex h-16 w-full min-w-full cursor-pointer items-center justify-center border-t border-border-primary py-8 md:h-20 lg:h-[90vh] lg:w-20 lg:min-w-20 lg:flex-col lg:justify-between lg:border-none">
							<p className="absolute left-6 text-xl font-bold whitespace-nowrap md:left-10 md:text-2xl lg:relative lg:left-0">
								03
							</p>
							<h2 className="hidden [writing-mode:vertical-rl] lg:mx-auto lg:block lg:rotate-180 lg:text-2xl lg:font-bold">
								{t("ourMission.curiosity")}
							</h2>
							<p className="text-xl font-bold md:text-2xl lg:hidden">
								{t("ourMission.curiosity")}
							</p>
						</div>
						<useSctoll.CardContent
							className="w-full overflow-hidden lg:h-full lg:w-auto lg:max-w-full lg:overflow-auto"
							animate={{ height: useSctoll.animateHeight(2) }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
						>
							<div className="flex h-full flex-col px-6 pt-4 pb-8 md:px-10 md:pt-12 md:pb-12 lg:w-full lg:max-w-2xl lg:px-12 lg:pt-16 lg:pb-16">
								<h3 className="mb-5 text-4xl leading-[1.2] font-bold md:mb-6 md:text-5xl lg:text-6xl">
									{t("ourMission.curiosityTitle")}
								</h3>
								<p className="md:text-md">
									{t("ourMission.curiosityDescription")}
								</p>
								<div className="rt-8 mt-8 h-80 md:mt-10 md:h-[25rem] lg:mt-12">
									<iframe
										src="https://player.vimeo.com/video/1103988720?controls=0&amp;autoplay=1&amp;loop=1&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;&muted=1&amp;dnt=1"
										className="w-full aspect-video"
										width="300"
										height="300"
										frameBorder="0"
										allow="autoplay; fullscreen"
										referrerPolicy="strict-origin-when-cross-origin"
										title="Tokspace - Website - Clip 1"
									></iframe>
								</div>
							</div>
						</useSctoll.CardContent>
					</motion.div>
					<motion.div
						className="flex flex-col justify-start overflow-hidden lg:h-[90vh] lg:min-w-20 lg:flex-row"
						onClick={useSctoll.handleSetIsActive(3)}
						initial={false}
						animate={{ width: useSctoll.animateWidth(3) }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
					>
						<div className="relative flex h-16 w-full min-w-full cursor-pointer items-center justify-center border-t border-border-primary py-8 md:h-20 lg:h-[90vh] lg:w-20 lg:min-w-20 lg:flex-col lg:justify-between lg:border-none">
							<p className="absolute left-6 text-xl font-bold whitespace-nowrap md:left-10 md:text-2xl lg:relative lg:left-0">
								04
							</p>
							<h2 className="hidden [writing-mode:vertical-rl] lg:mx-auto lg:block lg:rotate-180 lg:text-2xl lg:font-bold">
								{t("ourMission.sustainability")}
							</h2>
							<p className="text-xl font-bold md:text-2xl lg:hidden">
								{t("ourMission.sustainability")}
							</p>
						</div>
						<useSctoll.CardContent
							className="w-full overflow-hidden lg:h-full lg:w-auto lg:max-w-full lg:overflow-auto"
							animate={{ height: useSctoll.animateHeight(3) }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
						>
							<div className="flex h-full flex-col px-6 pt-4 pb-8 md:px-10 md:pt-12 md:pb-12 lg:w-full lg:max-w-2xl lg:px-12 lg:pt-16 lg:pb-16">
								<h3 className="mb-5 text-4xl leading-[1.2] font-bold md:mb-6 md:text-5xl lg:text-6xl">
									{t("ourMission.sustainabilityTitle")}
								</h3>
								<p className="md:text-md">
									{t("ourMission.sustainabilityDescription")}
								</p>
								<div className="rt-8 mt-8 h-80 md:mt-10 md:h-[25rem] lg:mt-12">
									<iframe
										src="https://player.vimeo.com/video/1103990201?controls=0&amp;autoplay=1&amp;loop=1&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;muted=1&amp;dnt=1"
										className="w-full aspect-video"
										width="300"
										height="300"
										frameBorder="0"
										allow="autoplay; fullscreen"
										referrerPolicy="strict-origin-when-cross-origin"
										title="Tokspace - Website - Clip 1"
									></iframe>
								</div>
							</div>
						</useSctoll.CardContent>
					</motion.div>
				</div>
			</div>
		</section>
	);
}

export default OurMission;
