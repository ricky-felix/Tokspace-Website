"use client";

import {
	Button,
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@relume_io/relume-ui";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import buttonStyles from "../css/Button.module.css";

// Initialize Supabase client with proper error handling
const supabase = (() => {
	if (
		!import.meta.env.VITE_SUPABASE_URL ||
		!import.meta.env.VITE_SUPABASE_ANON_KEY
	) {
		console.error("Missing Supabase environment variables");
		return null;
	}
	return createClient(
		import.meta.env.VITE_SUPABASE_URL,
		import.meta.env.VITE_SUPABASE_ANON_KEY
	);
})();

// Price formatting utility
const formatPrice = (price) => {
	if (!price) return "Price not available";
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
	}).format(price);
};

// Custom carousel hook
const useCarousel = () => {
	const [api, setApi] = useState();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (!api) return;

		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap() + 1);

		const updateCurrent = () => {
			setCurrent(api.selectedScrollSnap() + 1);
		};

		api.on("select", updateCurrent);

		return () => {
			api.off("select", updateCurrent);
		};
	}, [api]);

	const handleDotClick = (index) => () => {
		if (api) {
			api.scrollTo(index);
		}
	};

	const dotClassName = (index) =>
		clsx(
			"mr-[6px] block size-2 cursor-pointer rounded-full transition-colors duration-300",
			current === index + 1 ? "bg-[#ff6523]" : "bg-gray-300"
		);

	const handlePrevious = () => {
		if (api) {
			api.scrollPrev();
		}
	};

	const handleNext = () => {
		if (api) {
			api.scrollNext();
		}
	};

	return {
		api,
		setApi,
		current,
		count,
		handleDotClick,
		dotClassName,
		handlePrevious,
		handleNext,
	};
};

// Custom Arrow Components
const CustomArrowButton = ({ direction, onClick, disabled }) => {
	const isLeft = direction === "left";

	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={clsx(
				"group relative size-12 rounded-full bg-white border-2 border-gray-200 shadow-lg transition-all duration-300",
				"hover:border-[#ff6523] hover:shadow-xl hover:-translate-y-1",
				"active:translate-y-0 active:shadow-md",
				"disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:border-gray-200",
				"flex items-center justify-center"
			)}
		>
			<svg
				className={clsx(
					"w-5 h-5 transition-all duration-300 text-gray-600 group-hover:text-[#ff6523]",
					isLeft ? "transform rotate-180" : ""
				)}
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M9 5l7 7-7 7"
				/>
			</svg>
			<div className="absolute inset-0 rounded-full bg-[#ff6523] opacity-0 group-active:opacity-20 transition-opacity duration-150"></div>
		</button>
	);
};

CustomArrowButton.propTypes = {
	direction: PropTypes.oneOf(["left", "right"]).isRequired,
	onClick: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
};

// Loading Skeleton Component
const ProductSkeleton = () => (
	<div className="animate-pulse">
		<div className="mb-3 aspect-[5/6] md:mb-4 bg-gray-200 rounded-2xl"></div>
		<div className="mb-2">
			<div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
			<div className="h-3 bg-gray-200 rounded w-1/2"></div>
		</div>
		<div className="h-4 bg-gray-200 rounded w-1/4"></div>
	</div>
);

// Product Item Component
const ProductItem = ({ product }) => {
	const { t } = useTranslation();

	return (
		<Link
			to={`/shop/${product.id}`}
			className="group block font-semibold md:text-md"
		>
			<div className="mb-3 aspect-[5/6] md:mb-4 relative overflow-hidden rounded-2xl bg-white shadow-lg group-hover:shadow-xl transition-all duration-300">
				<img
					src={
						product.image_url ||
						product.images?.[0] ||
						"https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
					}
					alt={product.name}
					className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
					onError={(e) => {
						e.target.src =
							"https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg";
					}}
				/>

				<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

				{product.rating && (
					<div className="absolute top-3 left-3">
						<span className="px-2 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full flex items-center">
							⭐ {product.rating}
						</span>
					</div>
				)}

				{!product.is_available && (
					<div className="absolute inset-0 bg-black/50 flex items-center justify-center">
						<span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
							{t("gallery.unavailable")}
						</span>
					</div>
				)}
			</div>

			<div className="mb-2">
				<h3 className="text-gray-900 group-hover:text-[#ff6523] transition-colors line-clamp-1">
					{t(product.name)}
				</h3>
				<div className="text-sm font-normal text-gray-500 line-clamp-1">
					{t(product.description || product.category)}
				</div>
			</div>

			<div className="flex items-center justify-between">
				<div className="text-md md:text-lg font-bold text-[#ff6523]">
					{formatPrice(product.base_price)}
				</div>
				{product.review_count > 0 && (
					<span className="text-xs text-gray-500 font-medium">
						{t("gallery.reviews", { count: product.review_count })}
					</span>
				)}
			</div>
		</Link>
	);
};

ProductItem.propTypes = {
	product: PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		description: PropTypes.string,
		base_price: PropTypes.number,
		rating: PropTypes.number,
		review_count: PropTypes.number,
		category: PropTypes.string,
		is_available: PropTypes.bool,
		image_url: PropTypes.string,
		images: PropTypes.arrayOf(PropTypes.string),
	}).isRequired,
};

// Empty State Component
const EmptyState = () => {
	const { t } = useTranslation();

	return (
		<div className="text-center py-16">
			<div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
				<svg
					className="w-12 h-12 text-gray-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={1.5}
						d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 9l3-3 3 3"
					/>
				</svg>
			</div>
			<h3 className="text-xl font-semibold text-gray-900 mb-2">
				{t("gallery.empty.title")}
			</h3>
			<p className="text-gray-600 mb-4">{t("gallery.empty.description")}</p>
			<Button
				onClick={() => window.location.reload()}
				className={`${buttonStyles.bubbleButton} ${buttonStyles.primary}`}
			>
				{t("gallery.empty.refresh")}
			</Button>
		</div>
	);
};

// Main Component
export function GalleryProduct() {
	const { t } = useTranslation();
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const carouselState = useCarousel();

	useEffect(() => {
		let isMounted = true;

		const fetchProducts = async () => {
			if (!supabase) {
				if (isMounted) {
					setError(t("gallery.errors.configError"));
					setLoading(false);
				}
				return;
			}

			try {
				setLoading(true);
				setError(null);

				const { data, error: supabaseError } = await supabase
					.from("products")
					.select("*")
					.eq("is_available", true)
					.order("created_at", { ascending: false })
					.limit(12);

				if (supabaseError) throw supabaseError;

				if (isMounted) {
					setProducts(data || []);
				}
			} catch (err) {
				if (isMounted) {
					console.error("Error fetching products:", err);
					setError(t("gallery.errors.loadFailed"));
				}
			} finally {
				if (isMounted) {
					setLoading(false);
				}
			}
		};

		fetchProducts();

		return () => {
			isMounted = false;
		};
	}, [t]);

	// Error state
	if (error) {
		return (
			<section className="overflow-hidden px-[5%] py-16 md:py-24 lg:py-28">
				<div className="container">
					<div className="text-center">
						<h3 className="text-xl font-semibold text-gray-900 mb-2">
							{t("gallery.errors.title")}
						</h3>
						<p className="text-gray-600 mb-4">{error}</p>
						<Button
							onClick={() => window.location.reload()}
							className={`${buttonStyles.bubbleButton} ${buttonStyles.primary}`}
						>
							{t("gallery.errors.tryAgain")}
						</Button>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="overflow-hidden px-[5%] py-16 md:py-24 lg:py-28 bg-gradient-to-br from-gray-50 via-white to-gray-50">
			<div className="container relative">
				{/* Header */}
				<div className="mb-12 text-center relative">
					<h1 className="text-5xl font-bold md:text-6xl lg:text-7xl bg-gradient-to-r from-gray-900 via-gray-800 to-orange-600 bg-clip-text text-transparent mb-4">
						{t("gallery.title")}
					</h1>
					<p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
						{t("gallery.subtitle")}
					</p>
					<div className="absolute -top-2 -left-2 w-12 h-12 bg-orange-100 rounded-full blur-xl opacity-60 animate-pulse"></div>
				</div>

				{/* Content */}
				{loading ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{Array.from({ length: 8 }, (_, index) => (
							<ProductSkeleton key={index} />
						))}
					</div>
				) : products.length === 0 ? (
					<EmptyState />
				) : (
					<Carousel
						setApi={carouselState.setApi}
						opts={{ loop: true, align: "start" }}
						className="w-full"
					>
						<div className="relative pb-24">
							<CarouselContent className="ml-0">
								{products.map((product) => (
									<CarouselItem
										key={product.id}
										className="basis-[95%] pr-6 pl-0 sm:basis-4/5 md:basis-1/2 md:pr-8 lg:basis-[33%] lg:pr-12"
									>
										<ProductItem product={product} />
									</CarouselItem>
								))}
							</CarouselContent>

							<div className="absolute bottom-0 flex w-full items-end justify-between">
								{/* Dots */}
								<div className="flex h-7 pt-[10px] items-center">
									{Array.from({ length: carouselState.count }, (_, index) => (
										<button
											key={index}
											onClick={carouselState.handleDotClick(index)}
											className={carouselState.dotClassName(index)}
											aria-label={`Go to slide ${index + 1}`}
										/>
									))}
								</div>

								{/* Navigation Arrows */}
								<div className="flex gap-3">
									<CustomArrowButton
										direction="left"
										onClick={carouselState.handlePrevious}
										aria-label="Previous products"
									/>
									<CustomArrowButton
										direction="right"
										onClick={carouselState.handleNext}
										aria-label="Next products"
									/>
								</div>
							</div>
						</div>
					</Carousel>
				)}
			</div>
		</section>
	);
}

export default GalleryProduct;
