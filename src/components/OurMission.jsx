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

	const useSctoll = useRelume([{}, {}, {}, {}]); // Just pass 4 empty objects for length

	return (
		<section id="relume" className="py-16 md:py-24 lg:py-28 w-full">
			<div className="w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8">
				<div className="rb-12 mb-12 w-full max-w-lg md:mb-18 lg:mb-20 mx-auto text-center">
					<h2 className="mb-5 md:mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
						{t("ourMission.title")}
					</h2>
					<p className="text-base md:text-lg lg:text-xl">
						{t("ourMission.subtitle")}
					</p>
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
							<p className="absolute left-6 text-xl font-bold md:left-10 md:text-2xl lg:relative lg:left-0 lg:whitespace-nowrap">
								01
							</p>
							<h2 className="hidden [writing-mode:vertical-rl] lg:block lg:rotate-180 lg:text-2xl lg:font-bold text-left">
								{t("ourMission.exploration")}
							</h2>
							<p className="text-sm font-bold md:text-lg lg:hidden leading-tight text-center px-1 break-words hyphens-auto">
								{t("ourMission.exploration").split(" ").length > 1 ? (
									<>
										{t("ourMission.exploration").split(" ")[0]}
										<br />
										{t("ourMission.exploration").split(" ").slice(1).join(" ")}
									</>
								) : (
									t("ourMission.exploration")
								)}
							</p>
						</div>
						<useSctoll.CardContent
							className="w-full overflow-hidden lg:h-full lg:w-auto lg:max-w-full lg:overflow-hidden"
							animate={{ height: useSctoll.animateHeight(0) }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
						>
							<div className="flex h-full flex-col px-6 pt-4 pb-8 md:px-10 md:pt-12 md:pb-12 lg:w-full lg:max-w-2xl lg:px-12 lg:pt-16 lg:pb-16">
								<h3 className="mb-5 text-2xl leading-[1.2] font-bold md:mb-6 md:text-3xl lg:text-4xl">
									{t("ourMission.explorationTitle")}
								</h3>
								<p className="text-base md:text-lg lg:text-xl">
									{t("ourMission.explorationDescription")}
								</p>
								<div className="rt-8 mt-8 h-80 md:mt-10 md:h-[25rem] lg:mt-12">
									<video
										className="w-full aspect-video"
										width="300"
										height="300"
										autoPlay
										muted
										loop
										playsInline
										preload="eager"
										frameBorder="0"
									>
										<source
											src="https://files.tokspace.cloud/website-videos/Tokspace-Website-Clip-2-Iteration_over_Perfection.webm"
											type="video/webm"
										/>
									</video>
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
							<p className="absolute left-6 text-xl font-bold md:left-10 md:text-2xl lg:relative lg:left-0 lg:whitespace-nowrap">
								02
							</p>
							<h2 className="hidden [writing-mode:vertical-rl] lg:block lg:rotate-180 lg:text-2xl lg:font-bold">
								{t("ourMission.community")}
							</h2>
							<p className="text-sm font-bold md:text-lg lg:hidden leading-tight text-center px-1 break-words hyphens-auto">
								{t("ourMission.community").split(" ").length > 1 ? (
									<>
										{t("ourMission.community").split(" ")[0]}
										<br />
										{t("ourMission.community").split(" ").slice(1).join(" ")}
									</>
								) : (
									t("ourMission.community")
								)}
							</p>
						</div>
						<useSctoll.CardContent
							className="w-full overflow-hidden lg:h-full lg:w-auto lg:max-w-full lg:overflow-hidden"
							animate={{ height: useSctoll.animateHeight(1) }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
						>
							<div className="flex h-full flex-col px-6 pt-4 pb-8 md:px-10 md:pt-12 md:pb-12 lg:w-full lg:max-w-2xl lg:px-12 lg:pt-16 lg:pb-16">
								<h3 className="mb-5 text-2xl leading-[1.2] font-bold md:mb-6 md:text-3xl lg:text-4xl">
									{t("ourMission.communityTitle")}
								</h3>
								<p className="text-base md:text-lg lg:text-xl">
									{t("ourMission.communityDescription")}
								</p>
								<div className="rt-8 mt-8 h-80 md:mt-10 md:h-[25rem] lg:mt-12">
									<video
										className="w-full aspect-video"
										autoPlay
										muted
										loop
										playsInline
										preload="eager"
										frameBorder="0"
									>
										<source
											src="https://files.tokspace.cloud/website-videos/Tokspace-Website-Clip-2-Community.webm"
											type="video/webm"
										/>
									</video>
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
							<p className="absolute left-6 text-xl font-bold md:left-10 md:text-2xl lg:relative lg:left-0 lg:whitespace-nowrap">
								03
							</p>
							<h2 className="hidden [writing-mode:vertical-rl] lg:block lg:rotate-180 lg:text-2xl lg:font-bold">
								{t("ourMission.curiosity")}
							</h2>
							<p className="text-sm font-bold md:text-lg lg:hidden leading-tight text-center px-1 break-words hyphens-auto">
								{t("ourMission.curiosity").split(" ").length > 1 ? (
									<>
										{t("ourMission.curiosity").split(" ")[0]}
										<br />
										{t("ourMission.curiosity").split(" ").slice(1).join(" ")}
									</>
								) : (
									t("ourMission.curiosity")
								)}
							</p>
						</div>
						<useSctoll.CardContent
							className="w-full overflow-hidden lg:h-full lg:w-auto lg:max-w-full lg:overflow-hidden"
							animate={{ height: useSctoll.animateHeight(2) }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
						>
							<div className="flex h-full flex-col px-6 pt-4 pb-8 md:px-10 md:pt-12 md:pb-12 lg:w-full lg:max-w-2xl lg:px-12 lg:pt-16 lg:pb-16">
								<h3 className="mb-5 text-2xl leading-[1.2] font-bold md:mb-6 md:text-3xl lg:text-4xl">
									{t("ourMission.curiosityTitle")}
								</h3>
								<p className="text-base md:text-lg lg:text-xl">
									{t("ourMission.curiosityDescription")}
								</p>
								<div className="rt-8 mt-8 h-80 md:mt-10 md:h-[25rem] lg:mt-12">
									<video
										className="w-full aspect-video"
										autoPlay
										muted
										loop
										playsInline
										preload="eager"
										frameBorder="0"
									>
										<source
											src="https://files.tokspace.cloud/website-videos/Tokspace-Website-Clip-2-Sharing.webm"
											type="video/webm"
										/>
									</video>
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
							<p className="absolute left-6 text-xl font-bold md:left-10 md:text-2xl lg:relative lg:left-0 lg:whitespace-nowrap">
								04
							</p>
							<h2 className="hidden [writing-mode:vertical-rl] lg:block lg:rotate-180 lg:text-2xl lg:font-bold">
								{t("ourMission.sustainability")}
							</h2>
							<p className="text-sm font-bold md:text-lg lg:hidden leading-tight text-center px-1 break-words hyphens-auto">
								{t("ourMission.sustainability").split(" ").length > 1 ? (
									<>
										{t("ourMission.sustainability").split(" ")[0]}
										<br />
										{t("ourMission.sustainability")
											.split(" ")
											.slice(1)
											.join(" ")}
									</>
								) : (
									t("ourMission.sustainability")
								)}
							</p>
						</div>
						<useSctoll.CardContent
							className="w-full overflow-hidden lg:h-full lg:w-auto lg:max-w-full lg:overflow-hidden"
							animate={{ height: useSctoll.animateHeight(3) }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
						>
							<div className="flex h-full flex-col px-6 pt-4 pb-8 md:px-10 md:pt-12 md:pb-12 lg:w-full lg:max-w-2xl lg:px-12 lg:pt-16 lg:pb-16">
								<h3 className="mb-5 text-2xl leading-[1.2] font-bold md:mb-6 md:text-3xl lg:text-4xl">
									{t("ourMission.sustainabilityTitle")}
								</h3>
								<p className="text-base md:text-lg lg:text-xl">
									{t("ourMission.sustainabilityDescription")}
								</p>
								<div className="rt-8 mt-8 h-80 md:mt-10 md:h-[25rem] lg:mt-12">
									<video
										className="w-full aspect-video"
										autoPlay
										muted
										loop
										playsInline
										preload="eager"
										frameBorder="0"
									>
										<source
											src="https://files.tokspace.cloud/website-videos/Tokspace-Website-Clip-2-Sustainability.webm"
											type="video/webm"
										/>
									</video>
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
