"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@relume_io/relume-ui";
import React from "react";
import { useTranslation } from "react-i18next";

export function Steppers() {
	const { t } = useTranslation();
	return (
		<section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
			<div className="container">
				<div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
					<h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-6xl">
						{t("steppers.title")}
					</h2>
					<p className="md:text-md">{t("steppers.subtitle")}</p>
				</div>
				<Tabs defaultValue="tab-one">
					<TabsList className="mb-12 flex-col md:mb-16 md:flex-row">
						<TabsTrigger
							value="tab-one"
							className="flex w-full flex-col gap-1 border-0 px-6 py-4 text-center whitespace-normal duration-0 data-[state=active]:border-b-[1.5px] data-[state=active]:border-border-primary data-[state=active]:bg-transparent data-[state=active]:text-text-primary"
						>
							<h3 className="text-md leading-[1.4] font-bold md:text-xl">
								{t("steppers.step1Title")}
							</h3>
							<p>{t("steppers.step1Description")}</p>
						</TabsTrigger>
						<TabsTrigger
							value="tab-two"
							className="flex w-full flex-col gap-1 border-0 px-6 py-4 text-center whitespace-normal duration-0 data-[state=active]:border-b-[1.5px] data-[state=active]:border-border-primary data-[state=active]:bg-transparent data-[state=active]:text-text-primary"
						>
							<h3 className="text-md leading-[1.4] font-bold md:text-xl">
								{t("steppers.step2Title")}
							</h3>
							<p>{t("steppers.step2Description")}</p>
						</TabsTrigger>
						<TabsTrigger
							value="tab-three"
							className="flex w-full flex-col gap-1 border-0 px-6 py-4 text-center whitespace-normal duration-0 data-[state=active]:border-b-[1.5px] data-[state=active]:border-border-primary data-[state=active]:bg-transparent data-[state=active]:text-text-primary"
						>
							<h3 className="text-md leading-[1.4] font-bold md:text-xl">
								{t("steppers.step3Title")}
							</h3>
							<p>{t("steppers.step3Description")}</p>
						</TabsTrigger>
					</TabsList>
					<TabsContent
						value="tab-one"
						className="data-[state=active]:animate-tabs"
					>
						<div>
							<iframe
								src="https://player.vimeo.com/video/1103999740?controls=0&amp;autoplay=1&amp;loop=1&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;muted=1&amp;dnt=1"
								className="w-full aspect-video"
								width="800"
								height="720"
								frameBorder="0"
								allow="autoplay; fullscreen"
								referrerPolicy="strict-origin-when-cross-origin"
								title="Tokspace - Website - Clip 1"
							></iframe>
						</div>
					</TabsContent>
					<TabsContent
						value="tab-two"
						className="data-[state=active]:animate-tabs"
					>
						<div>
							<iframe
								src="https://player.vimeo.com/video/1104325374?controls=0&amp;autoplay=1&amp;loop=1&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;muted=1&amp;dnt=1"
								className="w-full aspect-video"
								width="800"
								height="720"
								frameBorder="0"
								allow="autoplay; fullscreen"
								referrerPolicy="strict-origin-when-cross-origin"
								title="Tokspace - Website - Clip 1"
							></iframe>
						</div>
					</TabsContent>
					<TabsContent
						value="tab-three"
						className="data-[state=active]:animate-tabs"
					>
						<div>
							<iframe
								src="https://player.vimeo.com/video/1104004919?controls=0&amp;autoplay=1&amp;loop=1&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;muted=1&amp;dnt=1"
								className="w-full aspect-video"
								width="800"
								height="720"
								frameBorder="0"
								allow="autoplay; fullscreen"
								referrerPolicy="strict-origin-when-cross-origin"
								title="Tokspace - Website - Clip 1"
							></iframe>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}

export default Steppers;
