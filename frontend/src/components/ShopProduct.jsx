"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { motion } from "framer-motion";

import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import buttonStyles from "../css/Button.module.css";

export function ShopProduct() {
	const { t } = useTranslation();

	return (
		<section className="grid grid-cols-1 items-center gap-y-16 pt-16 md:pt-24 lg:grid-cols-2 lg:pt-0">
			<div className="mx-[5%] sm:max-w-md md:justify-self-start lg:mr-20 lg:ml-[5vw] lg:justify-self-end">
				<h2 className="rb-5 mb-5 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl">
					{t("shopProduct.title")}
				</h2>
				<p className="text-medium">{t("shopProduct.description")}</p>
				<div className="mt-6 flex flex-wrap gap-4 md:mt-8">
					<Link to="/shop">
						<Button
							title={t("shopProduct.shopButton")}
							variant="primary"
							className={`${buttonStyles.bubbleButton} ${buttonStyles.primary}`}
						>
							{t("shopProduct.shopButton")}
						</Button>
					</Link>
				</div>
			</div>

			<div className="flex items-center gap-4 overflow-hidden bg-scheme-foreground py-8 md:py-16 lg:h-screen bg-[#ffefe9]">
				<div className="grid shrink-0 grid-cols-1 gap-y-4">
					{/* First row - moving left */}
					<motion.div
						className="ml-[-8.5%] grid w-full auto-cols-fr grid-cols-2 gap-4 self-center"
						animate={{
							x: [0, -2000],
						}}
						transition={{
							duration: 20,
							repeat: Infinity,
							ease: "linear",
						}}
					>
						<div className="grid w-full grid-flow-col gap-4 ">
							<div className="relative w-[60vw] pt-[75%] sm:w-[18rem] md:w-[26rem]">
								<img
									className="absolute inset-0 size-full rounded-image object-cover"
									src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
									alt="Relume placeholder image 1"
								/>
							</div>
							<div className="relative w-[60vw] pt-[75%] sm:w-[18rem] md:w-[26rem]">
								<img
									className="absolute inset-0 size-full rounded-image object-cover"
									src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
									alt="Relume placeholder image 2"
								/>
							</div>
							<div className="relative w-[60vw] pt-[75%] sm:w-[18rem] md:w-[26rem]">
								<img
									className="absolute inset-0 size-full rounded-image object-cover"
									src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
									alt="Relume placeholder image 3"
								/>
							</div>
						</div>
						<div className="grid w-full grid-flow-col gap-4">
							<div className="relative w-[60vw] pt-[75%] sm:w-[18rem] md:w-[26rem]">
								<img
									className="absolute inset-0 size-full rounded-image object-cover"
									src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
									alt="Relume placeholder image 1"
								/>
							</div>
							<div className="relative w-[60vw] pt-[75%] sm:w-[18rem] md:w-[26rem]">
								<img
									className="absolute inset-0 size-full rounded-image object-cover"
									src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
									alt="Relume placeholder image 2"
								/>
							</div>
							<div className="relative w-[60vw] pt-[75%] sm:w-[18rem] md:w-[26rem]">
								<img
									className="absolute inset-0 size-full rounded-image object-cover"
									src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
									alt="Relume placeholder image 3"
								/>
							</div>
						</div>
					</motion.div>

					{/* Second row - moving right */}
					<motion.div
						className="grid w-full grid-cols-2 gap-4 self-center"
						animate={{
							x: [-2000, 0],
						}}
						transition={{
							duration: 20,
							repeat: Infinity,
							ease: "linear",
						}}
					>
						<div className="grid w-full grid-flow-col gap-4">
							<div className="relative w-[60vw] pt-[75%] sm:w-[18rem] md:w-[26rem]">
								<img
									className="absolute inset-0 size-full rounded-image object-cover"
									src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
									alt="Relume placeholder image 1"
								/>
							</div>
							<div className="relative w-[60vw] pt-[75%] sm:w-[18rem] md:w-[26rem]">
								<img
									className="absolute inset-0 size-full rounded-image object-cover"
									src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
									alt="Relume placeholder image 2"
								/>
							</div>
							<div className="relative w-[60vw] pt-[75%] sm:w-[18rem] md:w-[26rem]">
								<img
									className="absolute inset-0 size-full rounded-image object-cover"
									src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
									alt="Relume placeholder image 3"
								/>
							</div>
						</div>
						<div className="grid w-full grid-flow-col gap-4">
							<div className="relative w-[60vw] pt-[75%] sm:w-[18rem] md:w-[26rem]">
								<img
									className="absolute inset-0 size-full rounded-image object-cover"
									src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
									alt="Relume placeholder image 1"
								/>
							</div>
							<div className="relative w-[60vw] pt-[75%] sm:w-[18rem] md:w-[26rem]">
								<img
									className="absolute inset-0 size-full rounded-image object-cover"
									src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
									alt="Relume placeholder image 2"
								/>
							</div>
							<div className="relative w-[60vw] pt-[75%] sm:w-[18rem] md:w-[26rem]">
								<img
									className="absolute inset-0 size-full rounded-image object-cover"
									src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
									alt="Relume placeholder image 3"
								/>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}

export default ShopProduct;
