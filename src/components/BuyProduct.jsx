"use client";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
	Button,
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
	SheetClose,
	SheetContent,
	SheetTrigger,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@relume_io/relume-ui";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../utils/supabase.js";
import { BiSolidStar, BiSolidStarHalf, BiStar } from "react-icons/bi";
import clsx from "clsx";

import buttonStyles from "../css/Button.module.css";
import { WhatsAppService } from "../services/whatsappService.js";
import PropTypes from "prop-types";

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

const useGalleryDialog = () => {
	const [selectedSlide, setSelectedSlide] = useState(0);
	const handleSelectSlide = (number) => () => {
		setSelectedSlide(number);
	};
	const preventDefault = (e) => e.preventDefault();
	return {
		selectedSlide,
		handleSelectSlide,
		preventDefault,
	};
};

const useLightbox = (selectedSlide) => {
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
	const handleClick = (index) => () => {
		return mainApi?.scrollTo(index);
	};
	const getThumbStyles = (index) => {
		return clsx("block", current === index && "opacity-30");
	};
	return {
		setMainApi,
		setThumbApi,
		handleClick,
		getThumbStyles,
	};
};

export function BuyProduct({ productId }) {
	const gallery = useGalleryDialog();
	const lightbox = useLightbox(gallery.selectedSlide);
	const useActive = { ...gallery, ...lightbox };
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [variants, setVariants] = useState([]);
	const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [categoryProducts, setCategoryProducts] = useState([]);
	const [categoryLoading, setCategoryLoading] = useState(false);

	useEffect(() => {
		if (!productId) return;
		const isUuid = (v) =>
			typeof v === "string" &&
			/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{4}-[0-9a-f]{12}$/i.test(
				v
			);
		const fetchProduct = async () => {
			try {
				setLoading(true);
				setError(null);
				const selectFields = `id,name,description,price,color,stock_quantity,category_id`;

				let data = null;
				let err = null;

				if (isUuid(productId)) {
					const r1 = await supabase
						.from("products")
						.select(selectFields)
						.eq("id", productId)
						.eq("is_available", true)
						.single();
					data = r1.data;
					err = r1.error;
					if (err) {
						const r2 = await supabase
							.from("products")
							.select(selectFields)
							.eq("slug", productId)
							.eq("is_available", true)
							.single();
						data = r2.data;
						err = r2.error;
					}
				} else {
					const r1 = await supabase
						.from("products")
						.select(selectFields)
						.eq("slug", productId)
						.eq("is_available", true)
						.single();
					data = r1.data;
					err = r1.error;
					if (err) {
						const r2 = await supabase
							.from("products")
							.select(selectFields)
							.eq("id", productId)
							.eq("is_available", true)
							.single();
						data = r2.data;
						err = r2.error;
					}
				}
				if (err) throw err;
				let productImages = [];
				try {
					const { data: imgRows, error: imgErr } = await supabase
						.from("product_images")
						.select("id,image_url,alt_text,display_order,is_primary")
						.eq("product_id", data.id)
						.order("display_order", { ascending: true });
					if (imgErr) throw imgErr;
					productImages = imgRows || [];
				} catch (ie) {
					console.error(ie);
				}
				setProduct({ ...data, product_images: productImages });
				setVariants([]);
				setSelectedVariantIndex(0);

				if (data?.category_id) {
					setCategoryLoading(true);
					try {
						const { data: siblings, error: catErr } = await supabase
							.from("products")
							.select("id,name,price,color,is_available")
							.eq("category_id", data.category_id)
							.eq("is_available", true)
							.order("created_at", { ascending: true });
						if (catErr) throw catErr;
						const sibs = siblings || [];
						const sibIds = sibs.map((s) => s.id);
						let imageRows = [];
						if (sibIds.length) {
							const { data: rows, error: imgErr } = await supabase
								.from("product_images")
								.select(
									"product_id,id,image_url,alt_text,display_order,is_primary"
								)
								.in("product_id", sibIds)
								.order("display_order", { ascending: true });
							if (imgErr) throw imgErr;
							imageRows = rows || [];
						}
						const imagesByProduct = new Map();
						for (const r of imageRows) {
							const arr = imagesByProduct.get(r.product_id) || [];
							arr.push(r);
							imagesByProduct.set(r.product_id, arr);
						}
						const processed = sibs.map((p) => {
							const images = imagesByProduct.get(p.id) || [];
							const primary = images.find((img) => img.is_primary) || images[0];
							return {
								...p,
								price: Number(p.price),
								image_url: primary?.image_url || null,
								images,
							};
						});
						setCategoryProducts(processed);
						const fallbackVariants = processed
							.map((cp) => ({
								id: cp.id,
								name: cp.color || cp.name,
								price: cp.price,
								is_available: cp.is_available,
								images: cp.images,
							}))
							.slice(0, 5);
						setVariants(fallbackVariants);
						const idx = fallbackVariants.findIndex((v) => v.id === data.id);
						setSelectedVariantIndex(idx >= 0 ? idx : 0);
					} catch (ce) {
						console.error(ce);
					} finally {
						setCategoryLoading(false);
					}
				}
			} catch (e) {
				setError(e.message);
			} finally {
				setLoading(false);
			}
		};
		fetchProduct();
	}, [productId]);

	const selectedVariant = variants[selectedVariantIndex] || null;
	const imagesForVariant = useMemo(() => {
		const imgs = product?.product_images || [];
		if (selectedVariant?.images && selectedVariant.images.length) {
			return selectedVariant.images;
		}
		if (selectedVariant?.name) {
			const filtered = imgs.filter((img) =>
				(img.alt_text || "")
					.toLowerCase()
					.includes(selectedVariant.name.toLowerCase())
			);
			if (filtered.length) return filtered;
		}
		return imgs;
	}, [product, selectedVariant]);
	const getImageSrc = (index) =>
		imagesForVariant[index]?.image_url ||
		"https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg";

	const unitPrice = selectedVariant?.price ?? product?.price ?? 0;
	const handleBuyNow = () => {
		const url = WhatsAppService.generateOrderMessage(
			{
				productName: product?.name || "",
				variantName: selectedVariant?.name || product?.color || "",
				quantity: Number(quantity) || 1,
				unitPrice,
				totalPrice: (Number(quantity) || 1) * unitPrice,
			},
			"en"
		);
		WhatsAppService.openWhatsApp(url);
	};
	if (loading) {
		return (
			<header id="relume" className="px-[5%] ">
				<div className="container">
					<div className="mb-8 flex flex-col gap-6 md:mb-12">
						<div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4">
							<div className="animate-pulse h-[40vh] bg-gray-200 rounded-lg" />
							<div className="hidden md:grid md:grid-cols-2 md:gap-4">
								<div className="animate-pulse h-[19vh] bg-gray-200 rounded-lg" />
								<div className="animate-pulse h-[19vh] bg-gray-200 rounded-lg" />
								<div className="animate-pulse h-[19vh] bg-gray-200 rounded-lg" />
								<div className="animate-pulse h-[19vh] bg-gray-200 rounded-lg" />
							</div>
						</div>
					</div>
				</div>
			</header>
		);
	}

	if (error) {
		return (
			<header id="relume" className="px-[5%] ">
				<div className="container">
					<div className="text-center text-red-600 py-10">{String(error)}</div>
				</div>
			</header>
		);
	}

	return (
		<header id="relume" className="px-[5%] ">
			<div className="container">
				<div className="mb-8 flex flex-col gap-6 md:mb-12">
					{/* <Breadcrumb className="order-last flex flex-wrap items-center text-sm md:order-none">
						<BreadcrumbList>
							<Fragment>
								<BreadcrumbItem>
									<BreadcrumbLink href="#">Shop all</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
							</Fragment>
							<Fragment>
								<BreadcrumbItem>
									<BreadcrumbLink href="#">Keychains</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
							</Fragment>
							<Fragment>
								<BreadcrumbItem>
									<BreadcrumbLink href="#">Fidgeting Toy</BreadcrumbLink>
								</BreadcrumbItem>
							</Fragment>
						</BreadcrumbList>
					</Breadcrumb> */}
					<div className="relative">
						<Dialog>
							<div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4">
								<div>
									<DialogTrigger className="block size-full">
										<div
											onClick={useActive.handleSelectSlide(0)}
											className="h-full"
										>
											<img
												src={getImageSrc(0)}
												alt="Image 1"
												className="aspect-[5/4] size-full object-cover"
											/>
										</div>
									</DialogTrigger>
								</div>
								<div className="hidden md:grid md:grid-cols-2 md:gap-4">
									<DialogTrigger className="block w-full">
										<div onClick={useActive.handleSelectSlide(1)}>
											<img
												src={getImageSrc(1)}
												alt="Image 2"
												className="aspect-[5/4] size-full object-cover"
											/>
										</div>
									</DialogTrigger>
									<DialogTrigger className="block w-full">
										<div onClick={useActive.handleSelectSlide(2)}>
											<img
												src={getImageSrc(2)}
												alt="Image 3"
												className="aspect-[5/4] size-full object-cover"
											/>
										</div>
									</DialogTrigger>
									<DialogTrigger className="block w-full">
										<div onClick={useActive.handleSelectSlide(3)}>
											<img
												src={getImageSrc(3)}
												alt="Image 4"
												className="aspect-[5/4] size-full object-cover"
											/>
										</div>
									</DialogTrigger>
									<DialogTrigger className="block w-full">
										<div onClick={useActive.handleSelectSlide(4)}>
											<img
												src={getImageSrc(4)}
												alt="Image 5"
												className="aspect-[5/4] size-full object-cover"
											/>
										</div>
									</DialogTrigger>
								</div>
							</div>
							<DialogContent
								onCloseAutoFocus={useActive.preventDefault}
								closeIconPosition="inside"
								closeIconClassName="text-text-alternative"
							>
								<div className="relative flex h-screen flex-col">
									<div className="flex grow items-center justify-center pb-[12vh]">
										<div className="mx-auto max-w-[1000px]">
											<div className="overflow-hidden">
												<Carousel
													setApi={useActive.setMainApi}
													opts={{ loop: true, align: "start" }}
													className="static m-0"
												>
													<CarouselContent className="m-0">
														<CarouselItem className="pl-0">
															<button
																onClick={useActive.handleClick(1)}
																className="block w-full"
															>
																<img
																	src={getImageSrc(0)}
																	alt="Image 1"
																	className="mx-auto max-h-[86vh] w-full max-w-screen md:max-h-[84vh] md:max-w-[82.3vw]"
																/>
															</button>
														</CarouselItem>
														<CarouselItem className="pl-0">
															<button
																onClick={useActive.handleClick(2)}
																className="block w-full"
															>
																<img
																	src={getImageSrc(1)}
																	alt="Image 2"
																	className="mx-auto max-h-[86vh] w-full max-w-screen md:max-h-[84vh] md:max-w-[82.3vw]"
																/>
															</button>
														</CarouselItem>
														<CarouselItem className="pl-0">
															<button
																onClick={useActive.handleClick(3)}
																className="block w-full"
															>
																<img
																	src={getImageSrc(2)}
																	alt="Image 3"
																	className="mx-auto max-h-[86vh] w-full max-w-screen md:max-h-[84vh] md:max-w-[82.3vw]"
																/>
															</button>
														</CarouselItem>
														<CarouselItem className="pl-0">
															<button
																onClick={useActive.handleClick(4)}
																className="block w-full"
															>
																<img
																	src={getImageSrc(3)}
																	alt="Image 4"
																	className="mx-auto max-h-[86vh] w-full max-w-screen md:max-h-[84vh] md:max-w-[82.3vw]"
																/>
															</button>
														</CarouselItem>
														<CarouselItem className="pl-0">
															<button
																onClick={useActive.handleClick(5)}
																className="block w-full"
															>
																<img
																	src={getImageSrc(4)}
																	alt="Image 5"
																	className="mx-auto max-h-[86vh] w-full max-w-screen md:max-h-[84vh] md:max-w-[82.3vw]"
																/>
															</button>
														</CarouselItem>
													</CarouselContent>
													<CarouselPrevious className="left-6 hidden rounded-none border-none bg-transparent text-text-alternative md:flex md:size-12 lg:size-14" />
													<CarouselNext className="right-6 hidden rounded-none border-none bg-transparent text-text-alternative md:flex md:size-12 lg:size-14" />
												</Carousel>
											</div>
										</div>
									</div>
									<div className="absolute bottom-0 left-0 w-full overflow-hidden p-[1vh]">
										<Carousel
											setApi={useActive.setThumbApi}
											opts={{ align: "start", dragFree: true, loop: true }}
											className="m-0"
										>
											<CarouselContent className="m-0 block text-center whitespace-nowrap">
												<CarouselItem className="inline-block max-w-[12vh] pl-[2vh]">
													<button
														onClick={useActive.handleClick(0)}
														className={useActive.getThumbStyles(0)}
													>
														<img
															src={getImageSrc(0)}
															alt="Image 1"
															className="w-full"
														/>
													</button>
												</CarouselItem>
												<CarouselItem className="inline-block max-w-[12vh] pl-[2vh]">
													<button
														onClick={useActive.handleClick(1)}
														className={useActive.getThumbStyles(1)}
													>
														<img
															src={getImageSrc(1)}
															alt="Image 2"
															className="w-full"
														/>
													</button>
												</CarouselItem>
												<CarouselItem className="inline-block max-w-[12vh] pl-[2vh]">
													<button
														onClick={useActive.handleClick(2)}
														className={useActive.getThumbStyles(2)}
													>
														<img
															src={getImageSrc(2)}
															alt="Image 3"
															className="w-full"
														/>
													</button>
												</CarouselItem>
												<CarouselItem className="inline-block max-w-[12vh] pl-[2vh]">
													<button
														onClick={useActive.handleClick(3)}
														className={useActive.getThumbStyles(3)}
													>
														<img
															src={getImageSrc(3)}
															alt="Image 4"
															className="w-full"
														/>
													</button>
												</CarouselItem>
												<CarouselItem className="inline-block max-w-[12vh] pl-[2vh]">
													<button
														onClick={useActive.handleClick(4)}
														className={useActive.getThumbStyles(4)}
													>
														<img
															src={getImageSrc(4)}
															alt="Image 5"
															className="w-full"
														/>
													</button>
												</CarouselItem>
											</CarouselContent>
										</Carousel>
									</div>
								</div>
							</DialogContent>
						</Dialog>
						<Dialog>
							{/* <SheetTrigger className="absolute right-4 bottom-4 z-10 border border-border-alternative bg-background-primary px-5 py-2">
								Show all photos
							</SheetTrigger> */}
							<SheetContent side="bottom" className="size-full px-4">
								<SheetClose />
								<div className="container">
									<div className="mx-auto max-w-lg">
										<Dialog>
											<div className="grid grid-cols-2 gap-4">
												<DialogTrigger>
													<div
														onClick={useActive.handleSelectSlide(0)}
														className="first:col-span-2"
													>
														<img
															src={getImageSrc(0)}
															alt="Image 1"
															className="aspect-[5/4] size-full object-cover"
															onClick={useActive.handleSelectSlide(0)}
														/>
													</div>
												</DialogTrigger>
												<DialogTrigger>
													<div
														onClick={useActive.handleSelectSlide(1)}
														className="first:col-span-2"
													>
														<img
															src={getImageSrc(1)}
															alt="Image 2"
															className="aspect-[5/4] size-full object-cover"
															onClick={useActive.handleSelectSlide(1)}
														/>
													</div>
												</DialogTrigger>
												<DialogTrigger>
													<div
														onClick={useActive.handleSelectSlide(2)}
														className="first:col-span-2"
													>
														<img
															src={getImageSrc(2)}
															alt="Image 3"
															className="aspect-[5/4] size-full object-cover"
															onClick={useActive.handleSelectSlide(2)}
														/>
													</div>
												</DialogTrigger>
												<DialogTrigger>
													<div
														onClick={useActive.handleSelectSlide(3)}
														className="first:col-span-2"
													>
														<img
															src={getImageSrc(3)}
															alt="Image 4"
															className="aspect-[5/4] size-full object-cover"
															onClick={useActive.handleSelectSlide(3)}
														/>
													</div>
												</DialogTrigger>
												<DialogTrigger>
													<div
														onClick={useActive.handleSelectSlide(4)}
														className="first:col-span-2"
													>
														<img
															src={getImageSrc(4)}
															alt="Image 5"
															className="aspect-[5/4] size-full object-cover"
															onClick={useActive.handleSelectSlide(4)}
														/>
													</div>
												</DialogTrigger>
											</div>
											<DialogContent
												onCloseAutoFocus={useActive.preventDefault}
												closeIconPosition="inside"
												closeIconClassName="text-text-alternative"
											>
												<div className="relative flex h-screen flex-col">
													<div className="flex grow items-center justify-center pb-[12vh]">
														<div className="mx-auto max-w-[1000px]">
															<div className="overflow-hidden">
																<Carousel
																	setApi={useActive.setMainApi}
																	opts={{ loop: true, align: "start" }}
																	className="static m-0"
																>
																	<CarouselContent className="m-0">
																		<CarouselItem className="pl-0">
																			<button
																				onClick={useActive.handleClick(1)}
																				className="block w-full"
																			>
																				<img
																					src={getImageSrc(0)}
																					alt="Image 1"
																					className="mx-auto max-h-[86vh] w-full max-w-screen md:max-h-[84vh] md:max-w-[82.3vw]"
																				/>
																			</button>
																		</CarouselItem>
																		<CarouselItem className="pl-0">
																			<button
																				onClick={useActive.handleClick(2)}
																				className="block w-full"
																			>
																				<img
																					src={getImageSrc(1)}
																					alt="Image 2"
																					className="mx-auto max-h-[86vh] w-full max-w-screen md:max-h-[84vh] md:max-w-[82.3vw]"
																				/>
																			</button>
																		</CarouselItem>
																		<CarouselItem className="pl-0">
																			<button
																				onClick={useActive.handleClick(3)}
																				className="block w-full"
																			>
																				<img
																					src={getImageSrc(2)}
																					alt="Image 3"
																					className="mx-auto max-h-[86vh] w-full max-w-screen md:max-h-[84vh] md:max-w-[82.3vw]"
																				/>
																			</button>
																		</CarouselItem>
																		<CarouselItem className="pl-0">
																			<button
																				onClick={useActive.handleClick(4)}
																				className="block w-full"
																			>
																				<img
																					src={getImageSrc(3)}
																					alt="Image 4"
																					className="mx-auto max-h-[86vh] w-full max-w-screen md:max-h-[84vh] md:max-w-[82.3vw]"
																				/>
																			</button>
																		</CarouselItem>
																		<CarouselItem className="pl-0">
																			<button
																				onClick={useActive.handleClick(5)}
																				className="block w-full"
																			>
																				<img
																					src={getImageSrc(4)}
																					alt="Image 5"
																					className="mx-auto max-h-[86vh] w-full max-w-screen md:max-h-[84vh] md:max-w-[82.3vw]"
																				/>
																			</button>
																		</CarouselItem>
																	</CarouselContent>
																	<CarouselPrevious className="left-6 hidden rounded-none border-none bg-transparent text-text-alternative md:flex md:size-12 lg:size-14" />
																	<CarouselNext className="right-6 hidden rounded-none border-none bg-transparent text-text-alternative md:flex md:size-12 lg:size-14" />
																</Carousel>
															</div>
														</div>
													</div>
													<div className="absolute bottom-0 left-0 w-full overflow-hidden p-[1vh]">
														<Carousel
															setApi={useActive.setThumbApi}
															opts={{
																align: "start",
																dragFree: true,
																loop: true,
															}}
															className="m-0"
														>
															<CarouselContent className="m-0 block text-center whitespace-nowrap">
																<CarouselItem className="inline-block max-w-[12vh] pl-[2vh]">
																	<button
																		onClick={useActive.handleClick(0)}
																		className={useActive.getThumbStyles(0)}
																	>
																		<img
																			src={getImageSrc(0)}
																			alt="Image 1"
																			className="w-full"
																		/>
																	</button>
																</CarouselItem>
																<CarouselItem className="inline-block max-w-[12vh] pl-[2vh]">
																	<button
																		onClick={useActive.handleClick(1)}
																		className={useActive.getThumbStyles(1)}
																	>
																		<img
																			src={getImageSrc(1)}
																			alt="Image 2"
																			className="w-full"
																		/>
																	</button>
																</CarouselItem>
																<CarouselItem className="inline-block max-w-[12vh] pl-[2vh]">
																	<button
																		onClick={useActive.handleClick(2)}
																		className={useActive.getThumbStyles(2)}
																	>
																		<img
																			src={getImageSrc(2)}
																			alt="Image 3"
																			className="w-full"
																		/>
																	</button>
																</CarouselItem>
																<CarouselItem className="inline-block max-w-[12vh] pl-[2vh]">
																	<button
																		onClick={useActive.handleClick(3)}
																		className={useActive.getThumbStyles(3)}
																	>
																		<img
																			src={getImageSrc(3)}
																			alt="Image 4"
																			className="w-full"
																		/>
																	</button>
																</CarouselItem>
																<CarouselItem className="inline-block max-w-[12vh] pl-[2vh]">
																	<button
																		onClick={useActive.handleClick(4)}
																		className={useActive.getThumbStyles(4)}
																	>
																		<img
																			src={getImageSrc(4)}
																			alt="Image 5"
																			className="w-full"
																		/>
																	</button>
																</CarouselItem>
															</CarouselContent>
														</Carousel>
													</div>
												</div>
											</DialogContent>
										</Dialog>
									</div>
								</div>
							</SheetContent>
						</Dialog>
					</div>
				</div>
				<div className="grid grid-cols-1 gap-y-8 md:grid-cols-[1fr_16rem] md:gap-x-12 md:gap-y-10 lg:gap-12 xl:grid-cols-[1fr_0.5fr] xl:gap-x-20">
					<div>
						<h1 className="hidden text-4xl leading-[1.2] font-bold md:mb-8 md:block md:text-5xl lg:text-6xl">
							{product?.name || ""}
						</h1>
						<p>
							This small keychain is more than just an accessory—it's a piece of
							your narrative. Carry it everywhere to express yourself or simply
							keep it as a cherished companion.
						</p>
						<ul className="mt-4 mb-6 list-inside list-disc md:mb-8">
							<li className="py-0.5 pl-1.5 first:pt-0 last:pb-0">
								Perfect for focus and self-expression on the go.
							</li>
							<li className="py-0.5 pl-1.5 first:pt-0 last:pb-0">
								A pocket-sized friend for your daily adventures.
							</li>
							<li className="py-0.5 pl-1.5 first:pt-0 last:pb-0">
								Designed for creativity and personal connection.
							</li>
						</ul>
						<Tabs defaultValue="tab-details">
							<TabsList className="mb-5 flex-wrap items-center gap-6 md:mb-6">
								<TabsTrigger
									value="tab-details"
									className="border-0 border-b-[1.5px] border-border-alternative px-0 py-2 duration-0 data-[state=active]:border-b-[1.5px] data-[state=active]:border-border-primary data-[state=active]:bg-transparent data-[state=active]:text-text-primary"
								>
									Details
								</TabsTrigger>
								<TabsTrigger
									value="tab-shipping"
									className="border-0 border-b-[1.5px] border-border-alternative px-0 py-2 duration-0 data-[state=active]:border-b-[1.5px] data-[state=active]:border-border-primary data-[state=active]:bg-transparent data-[state=active]:text-text-primary"
								>
									Shipping
								</TabsTrigger>
								<TabsTrigger
									value="tab-returns"
									className="border-0 border-b-[1.5px] border-border-alternative px-0 py-2 duration-0 data-[state=active]:border-b-[1.5px] data-[state=active]:border-border-primary data-[state=active]:bg-transparent data-[state=active]:text-text-primary"
								>
									Returns
								</TabsTrigger>
							</TabsList>
							<TabsContent
								value="tab-details"
								className="data-[state=active]:animate-tabs"
							>
								<p>
									Our keychains are crafted with care, ensuring durability and
									style. Each piece is a unique expression of your personality.
									Enjoy a seamless shopping experience with our easy returns
									policy.
								</p>
							</TabsContent>
							<TabsContent
								value="tab-shipping"
								className="data-[state=active]:animate-tabs"
							>
								<p>
									Shipping is fast and reliable, so you can get your keychain
									quickly. We offer various shipping options to suit your needs.
									Track your order easily right from our website.
								</p>
							</TabsContent>
							<TabsContent
								value="tab-returns"
								className="data-[state=active]:animate-tabs"
							>
								<p>
									If you're not completely satisfied, our return process is
									hassle-free. Simply reach out to our customer service for
									assistance. We want you to love your purchase!
								</p>
							</TabsContent>
						</Tabs>
					</div>
					<div className="order-first md:order-none">
						<h1 className="mb-4 text-4xl leading-[1.2] font-bold md:hidden">
							{product?.name || ""}
						</h1>
						<p className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl lg:text-4xl">
							{new Intl.NumberFormat("id-ID", {
								style: "currency",
								currency: "IDR",
								minimumFractionDigits: 0,
							}).format(Number(unitPrice))}
						</p>
						<div className="mb-5 flex flex-wrap items-center gap-3 md:mb-6">
							<Star rating={3.5} />
							<p className="text-sm">(3.5 stars) • 10 reviews</p>
						</div>
						<form>
							<div className="grid grid-cols-1 gap-6">
								<div className="flex flex-col">
									<Label className="mb-2">Variant</Label>
									<div className="flex flex-wrap gap-4">
										{variants.map((v, i) => {
											const isSelected = i === selectedVariantIndex;
											const baseClass =
												"rounded-button inline-flex gap-3 items-center justify-center whitespace-nowrap transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none border border-border-primary px-4 py-2";
											const selectedClass =
												" bg-background-alternative text-text-alternative";
											const defaultClass =
												" text-text-primary bg-background-primary";
											const disabledClass =
												v.is_available === false
													? " pointer-events-none opacity-25"
													: "";
											return (
												<button
													key={v.id || i}
													type="button"
													onClick={() => setSelectedVariantIndex(i)}
													className={
														baseClass +
														(isSelected ? selectedClass : defaultClass) +
														disabledClass
													}
												>
													{v.name}
												</button>
											);
										})}
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
										min={1}
										value={quantity}
										onChange={(e) => {
											const val = parseInt(e.target.value, 10);
											setQuantity(Number.isNaN(val) ? 1 : Math.max(1, val));
										}}
									/>
								</div>
							</div>
							<div className="mt-8 mb-4 flex flex-col gap-y-4">
								<Button
									title="Buy now"
									variant="secondary"
									onClick={handleBuyNow}
								>
									Buy now
								</Button>
							</div>
							<p className="text-center text-xs">Free shipping over $50</p>
						</form>
					</div>
				</div>
			</div>
		</header>
	);
}

BuyProduct.propTypes = {
	productId: PropTypes.string.isRequired,
};

export default BuyProduct;
