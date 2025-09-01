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

// Initialize Supabase client
// Replace the direct assignments with environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Remove console.logs and add proper initialization check
const supabase = (() => {
	if (
		!import.meta.env.VITE_SUPABASE_URL ||
		!import.meta.env.VITE_SUPABASE_ANON_KEY
	) {
		throw new Error("Missing Supabase environment variables");
	}
	return createClient(
		import.meta.env.VITE_SUPABASE_URL,
		import.meta.env.VITE_SUPABASE_ANON_KEY
	);
})();

console.log("Supabase URL:", import.meta.env.VITE_SUPABASE_URL);
console.log("Supabase Key exists:", !!import.meta.env.VITE_SUPABASE_ANON_KEY);

const useCarousel = () => {
	const [api, setApi] = useState();
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		if (!api) return;

		const updateCurrent = () => {
			setCurrent(api.selectedScrollSnap() + 1);
		};

		updateCurrent();
		api.on("select", updateCurrent);

		return () => {
			api.off("select", updateCurrent);
		};
	}, [api]);

	// ...rest of the hook
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
			{/* Arrow Icon */}
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

			{/* Ripple Effect */}
			<div className="absolute inset-0 rounded-full bg-[#ff6523] opacity-0 group-active:opacity-20 transition-opacity duration-150"></div>
		</button>
	);
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

	const getTierBadgeColor = (tier) => {
		const colors = {
			basic: "bg-blue-500",
			standard: "bg-green-500",
			pro: "bg-orange-500",
			advanced: "bg-purple-500",
			elite: "bg-gradient-to-r from-orange-500 to-red-500",
		};
		return colors[tier?.toLowerCase()] || "bg-gray-500";
	};

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

// {
// 	/* Rating Badge (since your table has rating) */
// }
// {
// 	product.rating && (
// 		<div className="absolute top-3 left-3">
// 			<span className="px-2 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full flex items-center">
// 				⭐ {product.rating}
// 			</span>
// 		</div>
// 	);
// }

// {
// 	!product.is_available && (
// 		<div className="absolute inset-0 bg-black/50 flex items-center justify-center">
// 			<span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
// 				{t("gallery.unavailable")}
// 			</span>
// 		</div>
// 	);
// }

// {
// 	product.review_count > 0 && (
// 		<span className="text-xs text-gray-500 font-medium">
// 			{t("gallery.reviews", { count: product.review_count })}
// 		</span>
// 	);
// }

// <div>
// 	<div className="mb-2">
// 		<h3 className="text-gray-900 group-hover:text-[#ff6523] transition-colors line-clamp-1">
// 			{t(product.name)}
// 		</h3>
// 		<div className="text-sm font-normal text-gray-500 line-clamp-1">
// 			{t(product.description || product.category)}
// 		</div>
// 	</div>

// 	<div className="flex items-center justify-between">
// 		<div className="text-md md:text-lg font-bold text-[#ff6523]">
// 			{formatPrice(product.base_price)}
// 		</div>
// 		{product.review_count > 0 && (
// 			<span className="text-xs text-gray-500 font-medium">
// 				{product.review_count} reviews
// 			</span>
// 		)}
// 	</div>
// </div>;

export function GalleryProduct() {
	const { t } = useTranslation();

	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const carouselState = useCarousel();

	useEffect(() => {
		let isMounted = true;

		const fetchProducts = async () => {
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

	// Add error boundary
	if (error) {
		return (
			<section className="overflow-hidden px-[5%] py-16 md:py-24 lg:py-28">
				<div className="container">
					<div className="text-center">
						<h3 className="text-xl font-semibold text-gray-900 mb-2">
							{t("gallery.errors.loadFailed")}
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
}

CustomArrowButton.propTypes = {
	direction: PropTypes.oneOf(["left", "right"]).isRequired,
	onClick: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
};

const handlePrevious = () => {
	if (carouselState.api) {
		carouselState.api.scrollPrev();
	}
};

const handleNext = () => {
	if (carouselState.api) {
		carouselState.api.scrollNext();
	}
};

<div>
	<section className="overflow-hidden px-[5%] py-16 md:py-24 lg:py-28 bg-gradient-to-br from-gray-50 via-white">
		<h1 className="text-5xl font-bold md:text-6xl lg:text-7xl bg-gradient-to-r from-gray-900 via-gray-800 to-orange-600 bg-clip-text text-transparent">
			{t("gallery.title")}
		</h1>
		<p className="text-base md:text-lg lg:text-xl text-gray-600 mt-4">
			{t("gallery.subtitle")}
		</p>
		<div className="absolute -top-2 -left-2 w-12 h-12 bg-orange-100 rounded-full blur-xl opacity-60 animate-pulse"></div>
		<p className="text-base md:text-lg lg:text-xl text-gray-600 mt-4">
			{t("gallery.reviews")}
		</p>

		{loading ? (
			// Loading State
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{Array.from({ length: 8 }, (_, index) => (
					<ProductSkeleton key={index} />
				))}
			</div>
		) : products.length === 0 ? (
			// Empty State component remains the same
			<div className="text-center py-16">
				{/* ... empty state content remains the same ... */}
			</div>
		) : (
			// Products Carousel
			<Carousel
				setApi={carouselState.setApi}
				opts={{ loop: true, align: "start" }}
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
						{/* Modified Dots */}
						<div className="flex h-7 pt-[10px] items-center">
							{Array.from({ length: products.length }, (_, index) => (
								<button
									key={index}
									onClick={carouselState.handleDotClick(index)}
									className={carouselState.dotClassName(index)}
									aria-label={`Go to slide ${index + 1}`}
								/>
							))}
						</div>

						{/* Custom Arrow Buttons */}
						<div className="flex gap-3">
							<CustomArrowButton
								direction="left"
								onClick={handlePrevious}
								aria-label="Previous products"
							/>
							<CustomArrowButton
								direction="right"
								onClick={handleNext}
								aria-label="Next products"
							/>
						</div>
					</div>
				</div>
			</Carousel>
		)}
	</section>
</div>;

export default GalleryProduct;

// // Add at the bottom of the file
// ProductItem.propTypes = {
// 	product: PropTypes.shape({
// 		id: PropTypes.string.isRequired,
// 		name: PropTypes.string.isRequired,
// 		description: PropTypes.string,
// 		base_price: PropTypes.number,
// 		rating: PropTypes.number,
// 		review_count: PropTypes.number,
// 		category: PropTypes.string,
// 		is_available: PropTypes.bool,
// 		image_url: PropTypes.string,
// 		images: PropTypes.arrayOf(PropTypes.string),
// 	}).isRequired,
// };

// CustomArrowButton.propTypes = {
// 	direction: PropTypes.oneOf(["left", "right"]).isRequired,
// 	onClick: PropTypes.func.isRequired,
// 	disabled: PropTypes.bool,
// };
