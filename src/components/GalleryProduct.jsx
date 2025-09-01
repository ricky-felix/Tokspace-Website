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

import buttonStyles from "../css/Button.module.css";

// Initialize Supabase client
// Replace the direct assignments with environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const useCarousel = () => {
	const [api, setApi] = useState();
	const [current, setCurrent] = useState(0);
	useEffect(() => {
		if (!api) return;
		setCurrent(api.selectedScrollSnap() + 1);
		api.on("select", () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);
	const handleDotClick = (index) => () => {
		if (api) api.scrollTo(index);
	};
	const dotClassName = (index) =>
		clsx(
			"mx-[3px] size-2 rounded-full transition-all duration-300 cursor-pointer hover:scale-125",
			{
				"bg-[#ff6523]": current === index + 1,
				"bg-gray-300 hover:bg-gray-400": current !== index + 1,
			}
		);
	return { api, setApi, handleDotClick, dotClassName };
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

	const formatPrice = (price) => {
		// Handle the actual column name from your database
		const priceValue = price || product.base_price || 0;
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(priceValue);
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

				{/* Rating Badge (since your table has rating) */}
				{product.rating && (
					<div className="absolute top-3 left-3">
						<span className="px-2 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full flex items-center">
							⭐ {product.rating}
						</span>
					</div>
				)}

				{/* Availability Status */}
				{!product.is_available && (
					<div className="absolute inset-0 bg-black/50 flex items-center justify-center">
						<span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
							Unavailable
						</span>
					</div>
				)}
			</div>

			<div className="mb-2">
				<h3 className="text-gray-900 group-hover:text-[#ff6523] transition-colors line-clamp-1">
					{product.name}
				</h3>
				<div className="text-sm font-normal text-gray-500 line-clamp-1">
					{product.description || product.category}
				</div>
			</div>

			<div className="flex items-center justify-between">
				<div className="text-md md:text-lg font-bold text-[#ff6523]">
					{formatPrice(product.base_price)}
				</div>
				{product.review_count > 0 && (
					<span className="text-xs text-gray-500 font-medium">
						{product.review_count} reviews
					</span>
				)}
			</div>
		</Link>
	);
};

export function GalleryProduct() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const carouselState = useCarousel();

	// Fetch products from Supabase
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true);
				setError(null);

				if (!supabase) {
					throw new Error(
						"Supabase client not initialized. Please check your environment variables."
					);
				}

				try {
					// Now try with the correct column names based on sample data
					const { data, error } = await supabase
						.from("products")
						.select(
							`
							id,
							name,
							description,
							base_price,
							rating,
							review_count,
							category,
							is_available,
							is_featured,
							created_at
						`
						)
						.eq("is_available", true)
						.order("created_at", { ascending: false })
						.limit(12);

					// console.log("📊 Products query result:", {
					// 	data,
					// 	error,
					// 	count: data?.length,
					// });

					if (error) {
						console.error("❌ Query error:", error);

						// If the error is about missing columns, try a simpler query
						if (error.message.includes("does not exist")) {
							console.log("🔧 Trying simpler column selection...");

							const { data: simpleData, error: simpleError } = await supabase
								.from("products")
								.select(
									`
									id,
									name,
									description,
									base_price,
									category,
									is_available,
									created_at
								`
								)
								.limit(12);

							if (simpleError) {
								throw new Error(
									`Query failed even with basic columns: ${simpleError.message}`
								);
							}

							console.log("✅ Simple query successful:", simpleData?.length);
							// setProducts(simpleData || []);
							return;
						}

						throw new Error(`Query failed: ${error.message}`);
					}

					setProducts(data || []);
					console.log("✅ Products loaded successfully:", data?.length || 0);
				} catch (queryError) {
					console.error("Query execution error:", queryError);
					throw queryError;
				}
			} catch (err) {
				console.error("❌ Error fetching products:", err);

				if (
					err.message.includes("NetworkError") ||
					err.message.includes("fetch")
				) {
					setError(
						"Network connection failed. Please check your internet connection and Supabase project status."
					);
				} else if (err.message.includes("does not exist")) {
					setError(
						`Database schema issue: ${err.message}\n\nPlease check your products table structure.`
					);
				} else {
					setError(err.message || "Failed to load products");
				}
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

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

	// Error state
	if (error) {
		return (
			<section className="overflow-hidden px-[5%] py-16 md:py-24 lg:py-28">
				<div className="container">
					<div className="text-center">
						<div className="mb-4">
							<svg
								className="w-16 h-16 text-red-500 mx-auto"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
								/>
							</svg>
						</div>
						<h3 className="text-xl font-semibold text-gray-900 mb-2">
							Unable to load products
						</h3>
						<p className="text-gray-600 mb-4">{error}</p>
						<Button
							onClick={() => window.location.reload()}
							className={`${buttonStyles.bubbleButton} ${buttonStyles.primary}`}
						>
							Try Again
						</Button>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section
			id="relume"
			className="overflow-hidden px-[5%] py-16 md:py-24 lg:py-28 bg-gradient-to-br from-gray-50 via-white"
		>
			<h1 className="text-5xl font-bold md:text-6xl lg:text-7xl bg-gradient-to-r from-gray-900 via-gray-800 to-orange-600 bg-clip-text text-transparent">
				All Products
			</h1>
			<div className="absolute -top-2 -left-2 w-12 h-12 bg-orange-100 rounded-full blur-xl opacity-60 animate-pulse"></div>
			<p className="text-base md:text-lg lg:text-xl text-gray-600 mt-4">
				Innovative designs for a creative future.
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
	);
}

export default GalleryProduct;
