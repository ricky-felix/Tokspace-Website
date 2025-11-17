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
import React, { Fragment, useEffect, useState } from "react";

import buttonStyles from "../css/Button.module.css";

const Star = () => {
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

const useGalleyDialog = () => {
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

const useLightbox = () => {
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

const useGalleyDialog = () => {
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

export function BuyProduct() {
	const useActive = useGalleyDialog();
	const useActive = useLightbox(useActive.selectedSlide);
	const useActive = useGalleyDialog();
	return (
		<header id="relume" className="px-[5%] py-12 md:py-16 lg:py-20">
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
												src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
												alt="Relume placeholder image 1"
												className="aspect-[5/4] size-full object-cover"
											/>
										</div>
									</DialogTrigger>
								</div>
								<div className="hidden md:grid md:grid-cols-2 md:gap-4">
									<DialogTrigger className="block w-full">
										<div onClick={useActive.handleSelectSlide(1)}>
											<img
												src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
												alt="Relume placeholder image 2"
												className="aspect-[5/4] size-full object-cover"
											/>
										</div>
									</DialogTrigger>
									<DialogTrigger className="block w-full">
										<div onClick={useActive.handleSelectSlide(2)}>
											<img
												src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
												alt="Relume placeholder image 3"
												className="aspect-[5/4] size-full object-cover"
											/>
										</div>
									</DialogTrigger>
									<DialogTrigger className="block w-full">
										<div onClick={useActive.handleSelectSlide(3)}>
											<img
												src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
												alt="Relume placeholder image 4"
												className="aspect-[5/4] size-full object-cover"
											/>
										</div>
									</DialogTrigger>
									<DialogTrigger className="block w-full">
										<div onClick={useActive.handleSelectSlide(4)}>
											<img
												src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
												alt="Relume placeholder image 5"
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
																	src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
																	alt="Relume placeholder image 1"
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
																	src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
																	alt="Relume placeholder image 2"
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
																	src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
																	alt="Relume placeholder image 3"
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
																	src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
																	alt="Relume placeholder image 4"
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
																	src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
																	alt="Relume placeholder image 5"
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
															src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
															alt="Relume placeholder image 1"
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
															src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
															alt="Relume placeholder image 2"
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
															src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
															alt="Relume placeholder image 3"
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
															src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
															alt="Relume placeholder image 4"
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
															src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
															alt="Relume placeholder image 5"
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
							<SheetTrigger className="absolute right-4 bottom-4 z-10 border border-border-alternative bg-background-primary px-5 py-2">
								Show all photos
							</SheetTrigger>
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
															src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
															alt="Relume placeholder image 1"
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
															src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
															alt="Relume placeholder image 2"
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
															src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
															alt="Relume placeholder image 3"
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
															src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
															alt="Relume placeholder image 4"
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
															src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
															alt="Relume placeholder image 5"
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
																					src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
																					alt="Relume placeholder image 1"
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
																					src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
																					alt="Relume placeholder image 2"
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
																					src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
																					alt="Relume placeholder image 3"
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
																					src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
																					alt="Relume placeholder image 4"
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
																					src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
																					alt="Relume placeholder image 5"
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
																			src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
																			alt="Relume placeholder image 1"
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
																			src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
																			alt="Relume placeholder image 2"
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
																			src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
																			alt="Relume placeholder image 3"
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
																			src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
																			alt="Relume placeholder image 4"
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
																			src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
																			alt="Relume placeholder image 5"
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
							Fidgeting Toy
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
							Fidgeting Toy
						</h1>
						<p className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl lg:text-4xl">
							$55
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
										<a
											href="#"
											className="rounded-button inline-flex gap-3 items-center justify-center whitespace-nowrap transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none border border-border-primary bg-background-alternative text-text-alternative px-4 py-2"
										>
											Classic Style
										</a>
										<a
											href="#"
											className="rounded-button inline-flex gap-3 items-center justify-center whitespace-nowrap transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none border border-border-primary text-text-primary bg-background-primary px-4 py-2"
										>
											Modern Look
										</a>
										<a
											href="#"
											className="rounded-button inline-flex gap-3 items-center justify-center whitespace-nowrap transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none border border-border-primary text-text-primary bg-background-primary px-4 py-2 pointer-events-none opacity-25"
										>
											Limited Edition
										</a>
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
								<Button title="Buy now" variant="secondary">
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

export default BuyProduct;
