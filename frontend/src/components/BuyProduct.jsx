import React, { useEffect, useState } from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	Dialog,
	DialogContent,
	DialogTrigger,
	Input,
	Label,
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@relume_io/relume-ui";
import { BiSolidStar, BiSolidStarHalf, BiStar } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import buttonStyles from "../css/Button.module.css";

export const BuyProduct = (props) => {
	const { t } = useTranslation();
	const {
		breadcrumbs,
		heading,
		galleryImages,
		price,
		description,
		rating,
		showAllButton,
		buttons,
		options,
		quantityInputPlaceholder,
		freeShipping,
		list,
		tabs,
	} = {
		...ProductHeader2Defaults,
		...props,
	};
	const [optionInput, setOptionInput] = useState("Option one");
	const [quantityInput, setQuantityInput] = useState("");
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log({
			optionInput,
			quantityInput,
		});
	};
	return (
		<header id="relume" className="px-[5%] py-12 md:py-16 lg:py-20">
			<div className="container">
				<div className="mb-8 flex flex-col gap-6 md:mb-12">
					{/* <Breadcrumb className="order-last flex flex-wrap items-center text-sm md:order-none">
						<BreadcrumbList>
							{breadcrumbs.map((item, index) => (
								<React.Fragment key={index}>
									<BreadcrumbItem>
										<BreadcrumbLink href={item.url}>
											{item.title}
										</BreadcrumbLink>
									</BreadcrumbItem>
									{index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
								</React.Fragment>
							))}
						</BreadcrumbList>
					</Breadcrumb> */}
					<GalleryDialog images={galleryImages} showAllButton={showAllButton} />
				</div>

				<div className="grid grid-cols-1 gap-y-8 md:grid-cols-[1fr_16rem] md:gap-x-12 md:gap-y-10 lg:gap-12 xl:grid-cols-[1fr_0.5fr] xl:gap-x-20">
					<div>
					<h1 className="hidden text-4xl font-bold leading-[1.2] md:mb-8 md:block md:text-5xl lg:text-6xl">
						{heading || t("buyProduct.heading")}
					</h1>
					<p>{description || t("buyProduct.description")}</p>
						<ul className="mb-6 mt-4 list-inside list-disc md:mb-8">
							{list.map((item, index) => (
								<li key={index} className="py-0.5 pl-1.5 first:pt-0 last:pb-0">
									{item.title || t(`buyProduct.list.item${index + 1}`)}
								</li>
							))}
						</ul>
						<InformationTabs tabs={tabs} />
					</div>
					<div className="order-first md:order-none">
						<h1 className="mb-4 text-4xl font-bold leading-[1.2] md:hidden">
						{heading || t("buyProduct.heading")}
					</h1>
					<p className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl lg:text-4xl">
						{price || t("buyProduct.price")}
					</p>
						<div className="mb-5 flex flex-wrap items-center gap-3 md:mb-6">
							<Star rating={rating.starsNumber} />
							<p className="text-sm">{`(${rating.starsNumber} stars) • ${rating.review} reviews`}</p>
						</div>
						<form onSubmit={handleSubmit}>
							<div className="grid grid-cols-1 gap-6">
								<div className="flex flex-col">
									<Label className="mb-2">Variant</Label>
									<div className="flex flex-wrap gap-4">
										{options.map((option, index) => (
											<button
												key={index}
												type="button"
												className={`${buttonStyles.bubbleButton} ${
													optionInput === option.title
														? buttonStyles.primary
														: buttonStyles[option.variant || "secondary"]
												} ${
													option.disabled
														? "opacity-25 pointer-events-none"
														: ""
												}`}
												onClick={() => setOptionInput(option.title || "")}
												disabled={option.disabled}
											>
												{option.title}
											</button>
										))}
									</div>
								</div>
								<div className="flex flex-col">
									<Label htmlFor="quantity" className="mb-2">
										Quantity
									</Label>
									<Input
											type="number"
											id="quantity"
											placeholder={quantityInputPlaceholder || t("buyProduct.quantityInputPlaceholder")}
											className="w-full"
											value={quantityInput}
											onChange={(e) => setQuantityInput(e.target.value)}
										/>
								</div>
							</div>
							<div className="mb-4 mt-8 flex flex-col gap-y-4">
								{buttons.map((button, index) => (
									<button
												key={index}
												type="submit"
												className={`${buttonStyles.bubbleButton} ${buttonStyles[button.variant || "primary"]}`}
											>
												{button.title || t("buyProduct.buttons.buyNow")}
											</button>
								))}
							</div>
							<p className="text-center text-xs">{freeShipping || t("buyProduct.freeShipping")}</p>
						</form>
					</div>
				</div>
			</div>
		</header>
	);
};

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
							<BiSolidStar />
						) : isHalfStar ? (
							<BiSolidStarHalf />
						) : (
							<BiStar />
						)}
					</div>
				);
			})}
		</div>
	);
};

const GalleryDialog = ({ images, showAllButton }) => {
	const [selectedSlide, setSelectedSlide] = useState(0);
	return (
		<>
			<div className="relative">
				<Dialog>
					<div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4">
						<div>
							<DialogTrigger asChild>
								<button
									className="block size-full"
									onClick={() => setSelectedSlide(0)}
								>
									<img
										src={images[0].src}
										alt={images[0].alt}
										className="aspect-[5/4] size-full object-cover"
									/>
								</button>
							</DialogTrigger>
						</div>
						<div className="hidden md:grid md:grid-cols-2 md:gap-4 relative">
							{images.slice(1, 5).map((image, index) => (
								<DialogTrigger key={index} asChild>
									<button
										className="block w-full"
										onClick={() => setSelectedSlide(index + 1)}
									>
										<img
											src={image.src}
											alt={image.alt}
											className="aspect-[5/4] size-full object-cover"
										/>
									</button>
								</DialogTrigger>
							))}

							{/* Show all photos button positioned in bottom-right */}
							<div className="absolute bottom-2 right-2 z-10 pointer-events-auto">
								<GallerySheet
									images={images}
									showAllButton={showAllButton}
									setSelectedSlide={setSelectedSlide}
									selectedSlide={selectedSlide}
								/>
							</div>
						</div>
					</div>
					<DialogContent
						onCloseAutoFocus={(e) => e.preventDefault()}
						closeIconPosition="inside"
						closeIconClassName="text-text-alternative z-[1001]"
						className="z-[1001]"
					>
						<Lightbox images={images} selectedSlide={selectedSlide} />
					</DialogContent>
				</Dialog>
			</div>
		</>
	);
};

const GallerySheet = ({
	images,
	showAllButton,
	selectedSlide,
	setSelectedSlide,
}) => {
	const { t } = useTranslation();
	return (
		<Sheet>
			<SheetTrigger asChild>
				<button
					className={`${buttonStyles.bubbleButton} ${buttonStyles[showAllButton.variant || "secondary"]} !mb-0 bg-black/70 text-white hover:bg-black/80 transition-all duration-200 text-sm px-3 py-2 rounded-md shadow-md`}
				>
					{showAllButton.title || t("buyProduct.showAllButton.title")}
				</button>
			</SheetTrigger>
			<SheetContent side="bottom" className="size-full px-4 z-[1001]">
				<SheetClose className="z-[1002]" />
				<div className="container">
					<div className="mx-auto max-w-lg">
						<Dialog>
							<div className="grid grid-cols-2 gap-4">
								{images.map((image, index) => (
									<DialogTrigger key={index} asChild>
										<button
											onClick={() => setSelectedSlide(index)}
											className="first:col-span-2"
										>
											<img
												src={image.src}
												alt={image.alt}
												className="aspect-[5/4] size-full object-cover"
												onClick={() => setSelectedSlide(index)}
											/>
										</button>
									</DialogTrigger>
								))}
							</div>
							<DialogContent
								onCloseAutoFocus={(e) => e.preventDefault()}
								closeIconPosition="inside"
								closeIconClassName="text-text-alternative z-[1003]"
								className="z-[1002]"
							>
								<Lightbox images={images} selectedSlide={selectedSlide} />
							</DialogContent>
						</Dialog>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
};

const Lightbox = ({ images, selectedSlide }) => {
	const [mainApi, setMainApi] = useState();
	const [thumbApi, setThumbApi] = useState();
	const [current, setCurrent] = useState(selectedSlide);
	useEffect(() => {
		setCurrent(selectedSlide);
	}, [selectedSlide]);
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
	return (
		<div className="relative flex h-screen flex-col">
			<div className="flex grow items-center justify-center pb-[12vh]">
				<div className="mx-auto max-w-[1000px]">
					<div className="overflow-hidden">
						<Carousel
							setApi={setMainApi}
							opts={{
								loop: true,
								align: "start",
							}}
							className="static m-0"
						>
							<CarouselContent className="m-0">
								{images.map((slide, index) => (
									<CarouselItem key={index} className="pl-0">
										<button
											onClick={() => mainApi?.scrollTo(index + 1)}
											className="block w-full"
										>
											<img
												src={slide.src}
												alt={slide.alt}
												className="max-w-screen mx-auto max-h-[86vh] w-full md:max-h-[84vh] md:max-w-[82.3vw]"
											/>
										</button>
									</CarouselItem>
								))}
							</CarouselContent>
							<CarouselPrevious className="left-6 hidden rounded-none border-none bg-transparent text-text-alternative md:flex md:size-12 lg:size-14" />
							<CarouselNext className="right-6 hidden rounded-none border-none bg-transparent text-text-alternative md:flex md:size-12 lg:size-14" />
						</Carousel>
					</div>
				</div>
			</div>
			<div className="absolute bottom-0 left-0 w-full overflow-hidden p-[1vh]">
				<Carousel
					setApi={setThumbApi}
					opts={{
						align: "start",
						dragFree: true,
						loop: true,
					}}
					className="m-0"
				>
					<CarouselContent className="m-0 block whitespace-nowrap text-center">
						{images.map((slide, index) => (
							<CarouselItem
								key={index}
								className="inline-block max-w-[12vh] pl-[2vh]"
							>
								<button
									onClick={() => mainApi?.scrollTo(index)}
									className={clsx("block", current === index && "opacity-30")}
								>
									<img src={slide.src} alt={slide.alt} className="w-full" />
								</button>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>
		</div>
	);
};

const InformationTabs = ({ tabs }) => {
	const { t } = useTranslation();
	const [activeTab, setActiveTab] = useState(tabs[0]?.value);

	return (
		<div className="w-full">
			<div className="mb-6 flex flex-wrap gap-2">
				{tabs.map((tab, index) => (
					<button
						key={index}
						onClick={() => setActiveTab(tab.value)}
						className={clsx(
							"px-6 py-3 rounded-lg font-medium transition-all duration-300 ease-in-out",
							"border-2 relative overflow-hidden",
							activeTab === tab.value
								? [
										"bg-gradient-to-r from-orange-500 to-red-500",
										"text-white border-orange-500",
										"shadow-lg shadow-orange-500/30",
										"transform translate-y-0",
									]
								: [
										"bg-white text-gray-600",
										"border-gray-200 hover:border-gray-300",
										"hover:bg-gray-50 hover:text-gray-800",
										"hover:shadow-md hover:transform hover:-translate-y-0.5",
									]
						)}
					>
						<span className="relative z-10">{tab.trigger || t(`buyProduct.tabs.${tab.value}.trigger`)}</span>
						{activeTab === tab.value && (
							<div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-20"></div>
						)}
					</button>
				))}
			</div>

			<div className="mt-4">
				{tabs.map((tab, index) => (
					<div
						key={index}
						className={clsx(
							"transition-all duration-300 ease-in-out",
							activeTab === tab.value
								? "opacity-100 max-h-none"
								: "opacity-0 max-h-0 overflow-hidden"
						)}
					>
						{activeTab === tab.value && (
							<div className="animate-fade-in">
								<p className="text-gray-700 leading-relaxed">
								{tab.description || t(`buyProduct.tabs.${tab.value}.description`)}
							</p>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export const ProductHeader2Defaults = {
	breadcrumbs: [
		// { url: "#", title: "Shop all" },
		// { url: "#", title: "Category" },
		// { url: "#", title: "Product name" },
	],
	heading: "", // Will be set via translation
	price: "", // Will be set via translation
	rating: {
		review: 10,
		starsNumber: 4.0,
	},
	description: "", // Will be set via translation
	galleryImages: [
		{
			src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
			alt: "Relume placeholder image 1",
		},
		{
			src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
			alt: "Relume placeholder image 2",
		},
		{
			src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
			alt: "Relume placeholder image 3",
		},
		{
			src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
			alt: "Relume placeholder image 4",
		},
		{
			src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
			alt: "Relume placeholder image 5",
		},
		{
			src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
			alt: "Relume placeholder image 6",
		},
		{
			src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
			alt: "Relume placeholder image 7",
		},
		{
			src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
			alt: "Relume placeholder image 8",
		},
		{
			src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
			alt: "Relume placeholder image 9",
		},
		{
			src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
			alt: "Relume placeholder image 10",
		},
		{
			src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
			alt: "Relume placeholder image 11",
		},
		{
			src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
			alt: "Relume placeholder image 12",
		},
		{
			src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
			alt: "Relume placeholder image 13",
		},
		{
			src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
			alt: "Relume placeholder image 14",
		},
		{
			src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
			alt: "Relume placeholder image 15",
		},
		{
			src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
			alt: "Relume placeholder image 16",
		},
		{
			src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
			alt: "Relume placeholder image 17",
		},
		{
			src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
			alt: "Relume placeholder image 18",
		},
		{
			src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
			alt: "Relume placeholder image 19",
		},
		{
			src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
			alt: "Relume placeholder image 20",
		},
	],
	showAllButton: {
		title: "", // Will be set via translation
		variant: "secondary",
		size: "sm",
	},
	buttons: [
		// { title: "Add to cart" },
		{ title: "", variant: "primary" }, // Will be set via translation
	],
	options: [
		{
			title: "Option one",
			url: "#",
		},
		{ title: "Option two", url: "#", variant: "secondary" },
		{ title: "Option three", url: "#", variant: "secondary" },
		{ title: "Option four", url: "#", variant: "secondary" },
		{ title: "Option five", url: "#", variant: "secondary" },
	],
	quantityInputPlaceholder: "", // Will be set via translation
	freeShipping: "", // Will be set via translation
	list: [
		{
			title: "", // Will be set via translation
		},
		{
			title: "", // Will be set via translation
		},
		{
			title: "", // Will be set via translation
		},
	],
	defaultTabValue: "tab-details",
	tabs: [
		{
			value: "tab-details",
			trigger: "", // Will be set via translation
			description: "", // Will be set via translation
		},
		{
			value: "tab-shipping",
			trigger: "", // Will be set via translation
			description: "", // Will be set via translation
		},
		{
			value: "tab-returns",
			trigger: "", // Will be set via translation
			description: "", // Will be set via translation
		},
	],
};

export default BuyProduct;
