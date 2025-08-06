"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@relume_io/relume-ui";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@relume_io/relume-ui";
import { Button } from "@relume_io/relume-ui";
import { Carousel, CarouselContent, CarouselItem } from "@relume_io/relume-ui";
import { Input } from "@relume_io/relume-ui";
import { Label } from "@relume_io/relume-ui";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@relume_io/relume-ui";
import React, { Fragment, useEffect, useState } from "react";
import clsx from "clsx"; // Add this import

// Star icon components - you may need to adjust these based on your icon library
const StarFull = ({ className }) => (
	<svg
		className={className}
		width="16"
		height="16"
		viewBox="0 0 16 16"
		fill="currentColor"
	>
		<path d="M8 12.5l-4.5 2.5 1-5L0 6l5-0.5L8 1l3 4.5 5 0.5-4.5 4 1 5z" />
	</svg>
);

const StarHalf = ({ className }) => (
	<svg
		className={className}
		width="16"
		height="16"
		viewBox="0 0 16 16"
		fill="currentColor"
	>
		<defs>
			<linearGradient id="half">
				<stop offset="50%" stopColor="currentColor" />
				<stop offset="50%" stopColor="transparent" />
			</linearGradient>
		</defs>
		<path
			fill="url(#half)"
			d="M8 12.5l-4.5 2.5 1-5L0 6l5-0.5L8 1l3 4.5 5 0.5-4.5 4 1 5z"
		/>
	</svg>
);

const StarEmpty = ({ className }) => (
	<svg
		className={className}
		width="16"
		height="16"
		viewBox="0 0 16 16"
		fill="none"
		stroke="currentColor"
	>
		<path d="M8 12.5l-4.5 2.5 1-5L0 6l5-0.5L8 1l3 4.5 5 0.5-4.5 4 1 5z" />
	</svg>
);

// Fix the Star component to accept rating as a prop
const Star = ({ rating }) => {
	const fullStars = Math.floor(rating);
	const hasHalfStar = rating % 1 !== 0;
	return (
		<div className="flex items-center gap-1">
			{[...Array(5)].map((_, i) => {
				const isFullStar = i < fullStars;
				const isHalfStar = hasHalfStar && i === fullStars;

				return (
					<div key={i}>
						{isFullStar ? (
							<StarFull className="text-scheme-text" />
						) : isHalfStar ? (
							<StarHalf className="text-scheme-text" />
						) : (
							<StarEmpty className="text-scheme-text" />
						)}
					</div>
				);
			})}
		</div>
	);
};

const useCarousel = () => {
	const [mainApi, setMainApi] = useState();
	const [thumbApi, setThumbApi] = useState();
	const [current, setCurrent] = useState(0);
	useEffect(() => {
		if (!mainApi || !thumbApi) {
			return;
		}
		mainApi.on("select", () => {
			const index = mainApi.selectedScrollSnap();
			setCurrent(index);
			thumbApi.scrollTo(index);
		});
	}, [mainApi, thumbApi]);
	const handleClick = (index) => () => {
		return mainApi?.scrollTo(index);
	};
	const getThumbStyles = (index) => {
		return clsx("block", current === index && "opacity-60");
	};
	return {
		setMainApi,
		setThumbApi,
		handleClick,
		getThumbStyles,
	};
};

export function BuyProduct() {
	const useActive = useCarousel();
	return (
		<header className="px-[5%] py-12 md:py-16 lg:py-20">
			<div className="container">
				<Breadcrumb className="text-small mb-6 flex flex-wrap items-center">
					<BreadcrumbList>
						<Fragment>
							<BreadcrumbItem>
								<BreadcrumbLink href="#">Shop all</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
						</Fragment>
						<Fragment>
							<BreadcrumbItem>
								<BreadcrumbLink href="#">Category</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
						</Fragment>
						<Fragment>
							<BreadcrumbItem>
								<BreadcrumbLink href="#">Galactic Kit</BreadcrumbLink>
							</BreadcrumbItem>
						</Fragment>
					</BreadcrumbList>
				</Breadcrumb>
				<div className="grid grid-cols-1 gap-y-8 md:gap-y-10 lg:grid-cols-[1.25fr_1fr] lg:gap-x-20">
					<div className="grid grid-cols-1 md:grid-cols-[5rem_1fr] md:gap-x-4">
						<div className="relative hidden h-full md:block">
							<div className="absolute top-0 bottom-0 max-h-full overflow-y-auto">
								<Carousel
									setApi={useActive.setThumbApi}
									orientation="vertical"
									opts={{
										align: "start",
										containScroll: "keepSnaps",
										dragFree: true,
									}}
									className="m-0"
								>
									<CarouselContent className="m-0 gap-y-4">
										<CarouselItem className="p-0">
											<button
												onClick={useActive.handleClick(0)}
												className={useActive.getThumbStyles(0)}
											>
												<img
													src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
													alt="Relume placeholder image 1"
													className="aspect-[5/6] size-full object-cover"
												/>
											</button>
										</CarouselItem>
										<CarouselItem className="p-0">
											<button
												onClick={useActive.handleClick(1)}
												className={useActive.getThumbStyles(1)}
											>
												<img
													src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
													alt="Relume placeholder image 2"
													className="aspect-[5/6] size-full object-cover"
												/>
											</button>
										</CarouselItem>
										<CarouselItem className="p-0">
											<button
												onClick={useActive.handleClick(2)}
												className={useActive.getThumbStyles(2)}
											>
												<img
													src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
													alt="Relume placeholder image 3"
													className="aspect-[5/6] size-full object-cover"
												/>
											</button>
										</CarouselItem>
										<CarouselItem className="p-0">
											<button
												onClick={useActive.handleClick(3)}
												className={useActive.getThumbStyles(3)}
											>
												<img
													src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
													alt="Relume placeholder image 4"
													className="aspect-[5/6] size-full object-cover"
												/>
											</button>
										</CarouselItem>
									</CarouselContent>
								</Carousel>
							</div>
						</div>
						<div className="overflow-hidden">
							<Carousel
								setApi={useActive.setMainApi}
								opts={{ loop: true, align: "start" }}
								className="m-0"
							>
								<CarouselContent className="m-0">
									<CarouselItem className="basis-full pl-0">
										<button>
											<img
												src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
												alt="Relume placeholder image 1"
												className="aspect-[5/6] size-full object-cover"
											/>
										</button>
									</CarouselItem>
									<CarouselItem className="basis-full pl-0">
										<button>
											<img
												src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
												alt="Relume placeholder image 2"
												className="aspect-[5/6] size-full object-cover"
											/>
										</button>
									</CarouselItem>
									<CarouselItem className="basis-full pl-0">
										<button>
											<img
												src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
												alt="Relume placeholder image 3"
												className="aspect-[5/6] size-full object-cover"
											/>
										</button>
									</CarouselItem>
									<CarouselItem className="basis-full pl-0">
										<button>
											<img
												src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
												alt="Relume placeholder image 4"
												className="aspect-[5/6] size-full object-cover"
											/>
										</button>
									</CarouselItem>
								</CarouselContent>
							</Carousel>
						</div>
					</div>
					<div>
						<h1 className="heading-h3 mb-2 font-bold">Galactic Kit</h1>
						<p className="heading-h5 mb-5 font-bold md:mb-6">$55</p>
						<div className="mb-5 flex flex-wrap items-center gap-3 md:mb-6">
							<Star rating={3.5} />
							<p className="text-small">(3.5 stars) • 10 reviews</p>
						</div>
						<p className="mb-5 md:mb-6">
							Unleash your creativity with our Galactic Kit, designed for
							endless exploration. Perfect for makers and dreamers alike, it
							brings your ideas to life.
						</p>
						<form className="mb-8">
							<div className="grid grid-cols-1 gap-6">
								<div className="flex flex-col">
									<Label className="mb-2">Variant</Label>
									<Select>
										<SelectTrigger>
											<SelectValue placeholder="Select" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="first-choice">Option One</SelectItem>
											<SelectItem value="second-choice">Option Two</SelectItem>
											<SelectItem value="third-choice">Option Three</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="flex flex-col">
									<Label className="mb-2">Variant</Label>
									<div className="flex flex-wrap gap-4">
										<Button
											className="px-4 py-2"
											asChild={true}
											title="Option one"
											url="#"
										>
											<a href="#" className="">
												Option one
											</a>
										</Button>
										<Button
											className="px-4 py-2"
											asChild={true}
											title="Option two"
											url="#"
											variant="secondary"
										>
											<a href="#" className="">
												Option two
											</a>
										</Button>
										<Button
											className="px-4 py-2"
											asChild={true}
											title="Option three"
											url="#"
											variant="secondary"
											disabled={true}
										>
											<a href="#" className="pointer-events-none opacity-25">
												Option three
											</a>
										</Button>
									</div>
								</div>
								<div className="flex flex-col">
									<Label htmlFor="quantity" className="mb-2">
										Quantity
									</Label>
									<Input
										type="number"
										id="quantity"
										placeholder="1"
										className="w-16"
									/>
								</div>
							</div>
							<div className="mt-8 mb-4 flex flex-col gap-y-4">
								<Button title="Add to cart">Add to cart</Button>
								<Button title="Buy now" variant="secondary">
									Buy now
								</Button>
							</div>
							<p className="text-tiny text-center">Free shipping over $50</p>
						</form>
						<Accordion type="multiple">
							<AccordionItem value="item-0">
								<AccordionTrigger className="text-medium py-4 font-semibold [&_svg]:size-6">
									Details
								</AccordionTrigger>
								<AccordionContent className="md:pb-6">
									If you're not completely satisfied with your purchase, we
									accept returns within 30 days. Please ensure the product is in
									its original condition. Contact our support team for
									assistance with your return.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-1">
								<AccordionTrigger className="text-medium py-4 font-semibold [&_svg]:size-6">
									Shipping
								</AccordionTrigger>
								<AccordionContent className="md:pb-6">
									If you're not completely satisfied with your purchase, we
									accept returns within 30 days. Please ensure the product is in
									its original condition. Contact our support team for
									assistance with your return.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-2">
								<AccordionTrigger className="text-medium py-4 font-semibold [&_svg]:size-6">
									Returns
								</AccordionTrigger>
								<AccordionContent className="md:pb-6">
									If you're not completely satisfied with your purchase, we
									accept returns within 30 days. Please ensure the product is in
									its original condition. Contact our support team for
									assistance with your return.
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				</div>
			</div>
		</header>
	);
}

export default BuyProduct;
