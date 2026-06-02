"use client";

// import { Card } from "@relume_io/relume-ui";
import React from "react";
import { useTranslation } from "react-i18next";

import { MdOutlineJoinFull } from "react-icons/md";
import { MdDesignServices } from "react-icons/md";

import LazyVideo from "./common/LazyVideo";

export function Creativity() {
	const { t } = useTranslation();
	return (
		<section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
			<div className="container">
				<div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
					<h2 className="mb-5 md:mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
						{t("creativity.title")}
					</h2>
					<p className="text-base md:text-lg lg:text-xl">
						{t("creativity.subtitle")}
					</p>
				</div>
				<div className="grid auto-cols-fr grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
					<div className="grid auto-cols-fr grid-cols-1 gap-6 md:gap-8 ">
						<div className="flex flex-col sm:col-span-2 bg-[#DEE3E9] rounded-xl">
							<div className="block flex-1 p-6 sm:flex sm:flex-col sm:justify-center md:p-8 lg:p-12">
								<div>
									<p className="mb-2 font-semibold">
										{t("creativity.createLabel")}
									</p>
									<h3 className="rb-5 mb-5 leading-[1.2] md:mb-6 text-2xl font-bold md:text-3xl lg:text-4xl">
										{t("creativity.createTitle")}
									</h3>
									<p className="text-base md:text-lg lg:text-xl">
										{t("creativity.createDescription")}
									</p>
								</div>
							</div>
							<div className="flex w-full flex-col items-center justify-center self-start">
								<LazyVideo
									src="https://files.tokspace.cloud/website-videos/Tokspace-Website-Clip-3-Transforming_Ideas_into_Reality.webm"
									className="w-full aspect-video"
								/>
							</div>
						</div>
						<div className="flex flex-col bg-[#DEE3E9] rounded-xl">
							<div className="flex h-full flex-col justify-between p-6 md:p-8 lg:p-6">
								<div>
									<div className="mb-3 md:mb-4">
										<MdOutlineJoinFull className="size-12" />
									</div>
									<h3 className="mb-2 text-2xl font-bold md:text-3xl lg:text-4xl">
										{t("creativity.craftTitle")}
									</h3>
									<p className="text-base md:text-lg lg:text-xl">
										{t("creativity.craftDescription")}
									</p>
								</div>
							</div>
						</div>
						<div className="flex flex-col bg-[#DEE3E9] rounded-xl">
							<div className="flex h-full flex-col justify-between p-6 md:p-8 lg:p-6">
								<div>
									<div className="mb-3 md:mb-4">
										<MdDesignServices className="size-12" />
									</div>
									<h3 className="mb-2 text-2xl font-bold md:text-3xl lg:text-4xl">
										{t("creativity.experienceTitle")}
									</h3>
									<p className="text-base md:text-lg lg:text-xl">
										{t("creativity.experienceDescription")}
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="grid auto-cols-fr grid-cols-1 gap-6 md:gap-8">
						<div className="flex flex-col sm:col-span-2 sm:grid sm:auto-cols-fr sm:grid-cols-2 bg-[#DEE3E9] rounded-xl">
							<div className="flex size-full flex-col items-center justify-center self-start">
								<LazyVideo
									src="https://files.tokspace.cloud/website-videos/Tokspace-Website-Clip-3-Community.webm"
									className="w-full aspect-video"
								/>
							</div>
							<div className="block flex-col justify-center p-6 sm:flex">
								<p className="mb-2 font-semibold">
									{t("creativity.inspireLabel")}
								</p>
								<h3 className="mb-2 font-bold text-2xl md:text-3xl lg:text-4xl">
									{t("creativity.inspireTitle")}
								</h3>
								<p className="text-base md:text-lg lg:text-xl">
									{t("creativity.inspireDescription")}
								</p>
							</div>
						</div>
						<div className="flex flex-col sm:col-span-2 bg-[#DEE3E9] rounded-xl">
							<div className="block flex-1 p-6 sm:flex sm:flex-col sm:justify-center md:p-8 lg:p-12 ">
								<div>
									<p className="mb-2 font-semibold">
										{t("creativity.imagineLabel")}
									</p>
									<h3 className="rb-5 mb-5 leading-[1.2] text-2xl font-bold md:text-3xl lg:text-4xl">
										{t("creativity.imagineTitle")}
									</h3>
									<p className="text-base md:text-lg lg:text-xl">
										{t("creativity.imagineDescription")}
									</p>
								</div>
							</div>
							<div className="flex w-full flex-col items-center justify-center self-start">
								<LazyVideo
									src="https://files.tokspace.cloud/website-videos/Tokspace-Website-Clip-3-Launch_Ideas_Into_Space.webm"
									className="w-full aspect-video"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Creativity;
