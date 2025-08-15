import React, { useEffect, useState } from "react";
import {
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
} from "@relume_io/relume-ui";
import { BiSolidStar, BiSolidStarHalf, BiStar } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import buttonStyles from "../css/Button.module.css";
import { useProduct } from "../hooks/useProducts";
import { WhatsAppService } from "../services/whatsappService";
import { formatCurrency } from "../config/whatsapp";

export const BuyProduct = ({ productId, ...props }) => {
	const { t, i18n } = useTranslation();
	const { product, loading, error } = useProduct(productId);

	const [selectedVariant, setSelectedVariant] = useState(null);
	const [quantity, setQuantity] = useState(1);

	// Set initial variant when product loads
	useEffect(() => {
		if (
			product &&
			product.product_variants &&
			product.product_variants.length > 0
		) {
			// Set first available variant as default
			const firstAvailableVariant = product.product_variants.find(
				(v) => v.is_available
			);
			setSelectedVariant(firstAvailableVariant || product.product_variants[0]);
		}
	}, [product]);

	const handleWhatsAppOrder = () => {
		if (!product) return;

		const orderData = {
			productName: product.name,
			variantName: selectedVariant?.name,
			quantity: quantity,
			unitPrice: selectedVariant?.price || product.base_price,
			totalPrice: (selectedVariant?.price || product.base_price) * quantity,
		};

		const whatsappURL = WhatsAppService.generateOrderMessage(
			orderData,
			i18n.language
		);
		WhatsAppService.openWhatsApp(whatsappURL);
	};

	const handleWhatsAppInquiry = () => {
		if (!product) return;

		const whatsappURL = WhatsAppService.generateInquiryMessage(
			{ productName: product.name },
			i18n.language
		);
		WhatsAppService.openWhatsApp(whatsappURL);
	};

	const getCurrentPrice = () => {
		const price = selectedVariant?.price || product?.base_price || 0;
		return formatCurrency(price);
	};

	const getTotalPrice = () => {
		const price = selectedVariant?.price || product?.base_price || 0;
		return formatCurrency(price * quantity);
	};

	// Loading state
	if (loading) {
		return (
			<div className="px-[5%] py-12 md:py-16 lg:py-20">
				<div className="container">
					<div className="flex items-center justify-center h-64">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
					</div>
				</div>
			</div>
		);
	}

	// Error state
	if (error) {
		return (
			<div className="px-[5%] py-12 md:py-16 lg:py-20">
				<div className="container">
					<div className="text-center">
						<h2 className="text-2xl font-bold text-gray-900 mb-4">
							{t("buyProduct.errorTitle") || "Error loading product"}
						</h2>
						<p className="text-gray-600">{error}</p>
					</div>
				</div>
			</div>
		);
	}

	// No product found
	if (!product) {
		return (
			<div className="px-[5%] py-12 md:py-16 lg:py-20">
				<div className="container">
					<div className="text-center">
						<h2 className="text-2xl font-bold text-gray-900 mb-4">
							{t("buyProduct.notFoundTitle") || "Product not found"}
						</h2>
						<p className="text-gray-600">
							{t("buyProduct.notFoundMessage") ||
								"The product you're looking for doesn't exist."}
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<header id="relume" className="px-[5%] py-12 md:py-16 lg:py-20">
			<div className="container">
				<div className="mb-8 flex flex-col gap-6 md:mb-12">
					<GalleryDialog
						images={product.product_images || []}
						showAllButton={{
							title: t("buyProduct.showAllPhotos") || "Show all photos",
						}}
					/>
				</div>

				<div className="grid grid-cols-1 gap-y-8 md:grid-cols-[1fr_16rem] md:gap-x-12 md:gap-y-10 lg:gap-12 xl:grid-cols-[1fr_0.5fr] xl:gap-x-20">
					<div>
						<h1 className="hidden text-4xl font-bold leading-[1.2] md:mb-8 md:block md:text-5xl lg:text-6xl">
							{product.name}
						</h1>
						<p className="mb-6 text-gray-700">{product.description}</p>

						{product.product_features &&
							product.product_features.length > 0 && (
								<ul className="mb-6 mt-4 list-inside list-disc md:mb-8">
									{product.product_features.map((feature) => (
										<li
											key={feature.id}
											className="py-0.5 pl-1.5 first:pt-0 last:pb-0"
										>
											{feature.feature_text}
										</li>
									))}
								</ul>
							)}

						<InformationTabs tabs={product.product_tabs || []} />
					</div>

					<div className="order-first md:order-none">
						<h1 className="mb-4 text-4xl font-bold leading-[1.2] md:hidden">
							{product.name}
						</h1>
						<p className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl lg:text-4xl">
							{getCurrentPrice()}
						</p>

						{/* Rating */}
						<div className="mb-5 flex flex-wrap items-center gap-3 md:mb-6">
							<Star rating={product.rating || 0} />
							<p className="text-sm">
								{`(${product.rating || 0} stars) • ${product.review_count || 0} reviews`}
							</p>
						</div>

						{/* Order Form */}
						<div className="grid grid-cols-1 gap-6">
							{/* Variants Selection */}
							{product.product_variants &&
								product.product_variants.length > 0 && (
									<div className="flex flex-col">
										<Label className="mb-2">
											{t("buyProduct.variantLabel") || "Select Variant"}
										</Label>
										<div className="flex flex-wrap gap-4">
											{product.product_variants.map((variant) => (
												<button
													key={variant.id}
													type="button"
													className={`${buttonStyles.bubbleButton} ${
														selectedVariant?.id === variant.id
															? buttonStyles.primary
															: buttonStyles.secondary
													} ${
														!variant.is_available
															? "opacity-25 pointer-events-none"
															: ""
													}`}
													onClick={() => setSelectedVariant(variant)}
													disabled={!variant.is_available}
												>
													{variant.name}
													{variant.price !== product.base_price && (
														<span className="ml-1 text-xs">
															({formatCurrency(variant.price)})
														</span>
													)}
												</button>
											))}
										</div>
									</div>
								)}

							{/* Quantity Selection */}
							<div className="flex flex-col">
								<Label htmlFor="quantity" className="mb-2">
									{t("buyProduct.quantityLabel") || "Quantity"}
								</Label>
								<Input
									type="number"
									id="quantity"
									min="1"
									max="99"
									placeholder="1"
									className="w-full"
									value={quantity}
									onChange={(e) =>
										setQuantity(Math.max(1, parseInt(e.target.value) || 1))
									}
								/>
							</div>

							{/* Total Price Display */}
							{quantity > 1 && (
								<div className="bg-gray-50 p-4 rounded-lg">
									<p className="text-lg font-semibold">
										{t("buyProduct.total") || "Total"}: {getTotalPrice()}
									</p>
								</div>
							)}
						</div>

						{/* Action Buttons */}
						<div className="mb-4 mt-8 flex flex-col gap-y-4">
							<button
								type="button"
								onClick={handleWhatsAppOrder}
								className={`${buttonStyles.bubbleButton} ${buttonStyles.primary} flex items-center justify-center gap-2`}
							>
								<span>📱</span>
								{t("buyProduct.orderWhatsApp") || "Order via WhatsApp"}
							</button>

							<button
								type="button"
								onClick={handleWhatsAppInquiry}
								className={`${buttonStyles.bubbleButton} ${buttonStyles.secondary} flex items-center justify-center gap-2`}
							>
								<span>💬</span>
								{t("buyProduct.askQuestion") || "Ask Questions"}
							</button>
						</div>

						{/* WhatsApp Contact Info */}
						<div className="text-center text-sm text-gray-600">
							<p>
								{t("buyProduct.whatsappInfo") ||
									"Orders processed via WhatsApp Business"}
							</p>
							<p className="font-medium">
								{WhatsAppService.getFormattedPhoneNumber()}
							</p>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

// Star Rating Component
const Star = ({ rating }) => {
	const fullStars = Math.floor(rating);
	const hasHalfStar = rating % 1 !== 0;
	return (
		<div className="flex items-center gap-1">
			{[...Array(5)].map((_, i) => {
				const isFullStar = i < fullStars;
				const isHalfStar = hasHalfStar && i === fullStars;

				return (
					<div key={i} className="text-yellow-400">
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

// Image Gallery Dialog Component
const GalleryDialog = ({ images, showAllButton }) => {
	const [selectedSlide, setSelectedSlide] = useState(0);

	if (!images || images.length === 0) {
		return (
			<div className="aspect-[5/4] bg-gray-200 flex items-center justify-center rounded-lg">
				<p className="text-gray-500">No images available</p>
			</div>
		);
	}

	return (
		<div className="relative">
			<Dialog>
				<div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4">
					<div>
						<DialogTrigger asChild>
							<button
								className="block size-full rounded-lg overflow-hidden"
								onClick={() => setSelectedSlide(0)}
							>
								<img
									src={images[0].image_url}
									alt={images[0].alt_text || "Product image"}
									className="aspect-[5/4] size-full object-cover hover:scale-105 transition-transform duration-300"
								/>
							</button>
						</DialogTrigger>
					</div>
					{images.length > 1 && (
						<div className="hidden md:grid md:grid-cols-2 md:gap-4 relative">
							{images.slice(1, 5).map((image, index) => (
								<DialogTrigger key={index} asChild>
									<button
										className="block w-full rounded-lg overflow-hidden"
										onClick={() => setSelectedSlide(index + 1)}
									>
										<img
											src={image.image_url}
											alt={image.alt_text || `Product image ${index + 2}`}
											className="aspect-[5/4] size-full object-cover hover:scale-105 transition-transform duration-300"
										/>
									</button>
								</DialogTrigger>
							))}

							{/* Show all photos button */}
							{images.length > 5 && (
								<div className="absolute bottom-2 right-2 z-10 pointer-events-auto">
									<GallerySheet
										images={images}
										showAllButton={showAllButton}
										setSelectedSlide={setSelectedSlide}
										selectedSlide={selectedSlide}
									/>
								</div>
							)}
						</div>
					)}
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
	);
};

// Gallery Sheet Component
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
					{showAllButton.title}
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
											className="first:col-span-2 rounded-lg overflow-hidden"
										>
											<img
												src={image.image_url}
												alt={image.alt_text || `Product image ${index + 1}`}
												className="aspect-[5/4] size-full object-cover"
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

// Lightbox Component
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
												src={slide.image_url}
												alt={slide.alt_text || `Product image ${index + 1}`}
												className="max-w-screen mx-auto max-h-[86vh] w-full md:max-h-[84vh] md:max-w-[82.3vw] object-contain"
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
									className={clsx(
										"block rounded-lg overflow-hidden",
										current === index && "opacity-30"
									)}
								>
									<img
										src={slide.image_url}
										alt={slide.alt_text || `Product image ${index + 1}`}
										className="w-full aspect-square object-cover"
									/>
								</button>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>
		</div>
	);
};

// Information Tabs Component
const InformationTabs = ({ tabs }) => {
	const { t } = useTranslation();
	const [activeTab, setActiveTab] = useState(tabs[0]?.id);

	if (!tabs || tabs.length === 0) {
		return null;
	}

	return (
		<div className="w-full">
			<div className="mb-6 flex flex-wrap gap-2">
				{tabs.map((tab) => (
					<button
						key={tab.id}
						onClick={() => setActiveTab(tab.id)}
						className={clsx(
							"px-6 py-3 rounded-lg font-medium transition-all duration-300 ease-in-out",
							"border-2 relative overflow-hidden",
							activeTab === tab.id
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
						<span className="relative z-10">{tab.tab_name}</span>
						{activeTab === tab.id && (
							<div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-20"></div>
						)}
					</button>
				))}
			</div>

			<div className="mt-4">
				{tabs.map((tab) => (
					<div
						key={tab.id}
						className={clsx(
							"transition-all duration-300 ease-in-out",
							activeTab === tab.id
								? "opacity-100 max-h-none"
								: "opacity-0 max-h-0 overflow-hidden"
						)}
					>
						{activeTab === tab.id && (
							<div className="animate-fade-in">
								<p className="text-gray-700 leading-relaxed whitespace-pre-line">
									{tab.tab_content}
								</p>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default BuyProduct;
