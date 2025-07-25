"use client";

// import { Card } from "@relume_io/relume-ui";
import React from "react";

import { MdOutlineJoinFull } from "react-icons/md";
import { MdDesignServices } from "react-icons/md";

export function Creativity() {
	return (
		<section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
			<div className="container">
				<div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
					<h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-6xl">
						Unleash Your Creativity
					</h1>
					<p className="md:text-md">
						Explore our innovative modular kits and storytelling tools.
					</p>
				</div>
				<div className="grid auto-cols-fr grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
					<div className="grid auto-cols-fr grid-cols-1 gap-6 md:gap-8 ">
						<div className="flex flex-col sm:col-span-2 bg-[#f2f2f2] rounded-xl">
							<div className="block flex-1 p-6 sm:flex sm:flex-col sm:justify-center md:p-8 lg:p-12">
								<div>
									<p className="mb-2 font-semibold">Create</p>
									<h2 className="rb-5 mb-5 text-4xl leading-[1.2] font-bold md:mb-6 md:text-5xl lg:text-4xl">
										Transform Ideas into Reality
									</h2>
									<p>
										Discover how our tools empower your creative journey and
										inspire innovation.
									</p>
								</div>
							</div>
							<div className="flex w-full flex-col items-center justify-center self-start">
								<iframe
									src="https://player.vimeo.com/video/1103995631?controls=0&amp;autoplay=1&amp;loop=1&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;muted=1&amp;dnt=1"
									className="w-full aspect-video"
									width="300"
									loading="lazy"
									height="300"
									frameBorder="0"
									allow="autoplay; clipboard-write; encrypted-media; web-share"
									referrerPolicy="strict-origin-when-cross-origin"
									title="Tokspace - Website - Clip 1"
								></iframe>
							</div>
						</div>
						<div className="flex flex-col bg-[#f2f2f2] rounded-xl">
							<div className="flex h-full flex-col justify-between p-6 md:p-8 lg:p-6">
								<div>
									<div className="mb-3 md:mb-4">
										<MdOutlineJoinFull className="size-12" />
									</div>
									<h3 className="mb-2 text-xl font-bold md:text-2xl">
										Craft Your Unique Story
									</h3>
									<p>Join us in shaping the future of storytelling.</p>
								</div>
							</div>
						</div>
						<div className="flex flex-col bg-[#f2f2f2] rounded-xl">
							<div className="flex h-full flex-col justify-between p-6 md:p-8 lg:p-6">
								<div>
									<div className="mb-3 md:mb-4">
										<MdDesignServices className="size-12" />
									</div>
									<h3 className="mb-2 text-xl font-bold md:text-2xl">
										Experience the Future of Design
									</h3>
									<p>Embrace technology to elevate your creative projects.</p>
								</div>
							</div>
						</div>
					</div>
					<div className="grid auto-cols-fr grid-cols-1 gap-6 md:gap-8">
						<div className="flex flex-col sm:col-span-2 sm:grid sm:auto-cols-fr sm:grid-cols-2 bg-[#f2f2f2] rounded-xl">
							<div className="flex size-full flex-col items-center justify-center self-start">
								<iframe
									src="https://player.vimeo.com/video/1103996020?controls=0&amp;autoplay=1&amp;loop=1&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;muted=1&amp;dnt=1"
									className="w-full aspect-video"
									width="300"
									loading="lazy"
									height="300"
									frameBorder="0"
									allow="autoplay; clipboard-write; encrypted-media; web-share"
									referrerPolicy="strict-origin-when-cross-origin"
									title="Tokspace - Website - Clip 1"
								></iframe>
							</div>
							<div className="block flex-col justify-center p-6 sm:flex">
								<p className="mb-2 font-semibold">Inspire</p>
								<h2 className="mb-2 text-xl font-bold md:text-2xl">
									Connect with Local Creators
								</h2>
								<p>Collaborate and innovate with our vibrant community.</p>
							</div>
						</div>
						<div className="flex flex-col sm:col-span-2 bg-[#f2f2f2] rounded-xl">
							<div className="block flex-1 p-6 sm:flex sm:flex-col sm:justify-center md:p-8 lg:p-12 ">
								<div>
									<p className="mb-2 font-semibold">Imagine</p>
									<h2 className="rb-5 mb-5 text-4xl leading-[1.2] font-bold md:mb-6 md:text-5xl lg:text-5xl">
										Launch Your Ideas into Space
									</h2>
									<p>
										Let your imagination soar with our cutting-edge tools and
										resources.
									</p>
								</div>
							</div>
							<div className="flex w-full flex-col items-center justify-center self-start">
								<iframe
									src="https://player.vimeo.com/video/1103997132?controls=0&amp;autoplay=1&amp;loop=1&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;muted=1&amp;dnt=1"
									className="w-full aspect-video"
									width="300"
									loading="lazy"
									height="300"
									frameBorder="0"
									allow="autoplay; clipboard-write; encrypted-media; web-share"
									referrerPolicy="strict-origin-when-cross-origin"
									title="Tokspace - Website - Clip 1"
								></iframe>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Creativity;
