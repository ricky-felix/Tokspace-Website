"use client";

import { Button } from "@/components/ui/button";
import React from "react";

import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import buttonStyles from "../css/Button.module.css";

export function ShopProduct() {
	return (
		<section className="grid grid-cols-1 items-center gap-y-16 pt-16 md:pt-24 lg:grid-cols-2 lg:pt-0">
			<div className="mx-[5%] sm:max-w-md md:justify-self-start lg:mr-20 lg:ml-[5vw] lg:justify-self-end">
				<h1 className="heading-h1 mb-5 font-bold md:mb-6">
					Discover Our Innovative 3D-Printed Products
				</h1>
				<p className="text-medium">
					Explore a world where creativity meets technology. Our unique
					offerings empower local entrepreneurs to bring their visions to life.
				</p>
				<div className="mt-6 flex flex-wrap gap-4 md:mt-8">
					<Link to="/shop">
						<Button
							title="Shop"
							variant="primary"
							className={`${buttonStyles.bubbleButton} ${buttonStyles.secondary}`}
						>
							Shop
						</Button>
					</Link>
				</div>
			</div>
			<div className="flex items-center gap-4 overflow-hidden bg-scheme-foreground py-8 md:py-16 lg:h-screen">
				<div className="grid shrink-0 grid-cols-1 gap-y-4">
					<div className="ml-[-8.5%] grid w-full animate-marquee-horizontally auto-cols-fr grid-cols-2 gap-4 self-center">
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
					</div>
					<div className="grid w-full animate-marquee-horizontally grid-cols-2 gap-4 self-center">
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
					</div>
				</div>
			</div>
		</section>
	);
}

export default ShopProduct;
