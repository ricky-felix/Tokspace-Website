"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

import styles from "../css/Button.module.css";

export function Header() {
	const scrollToOurMission = () => {
		const element = document.getElementById("ourmission");
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
			<div className="container">
				<div className="rb-12 mb-12 grid grid-cols-1 items-start gap-x-12 gap-y-5 md:mb-18 md:grid-cols-2 md:gap-y-8 lg:mb-20 lg:gap-x-20 lg:gap-y-16">
					<div>
						<h1 className="text-2xl font-bold md:text-4xl lg:text-6xl">
							Unleash Your Creativity with 3D Innovation
						</h1>
					</div>
					<div>
						<p className="md:text-md">
							At Tokspace, we empower local creators to transform their ideas
							into reality using cutting-edge technology. Join us in a journey
							of exploration and innovation, where your dreams take flight.
						</p>
						<div className="mt-6 flex flex-wrap gap-4 md:mt-8">
							<Button
								title="Learn More"
								variant="primary"
								className={`${styles.bubbleButton} ${styles.primary}`}
								onClick={scrollToOurMission}
							>
								Learn More
							</Button>
						</div>
					</div>
				</div>
				<div>
					<iframe
						src="https://player.vimeo.com/video/1103973310?controls=0&amp;autoplay=1&amp;loop=1&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
						className="w-full aspect-video"
						width="800"
						height="720"
						loading="lazy"
						frameBorder="0"
						allow="autoplay; clipboard-write; encrypted-media; web-share"
						referrerPolicy="strict-origin-when-cross-origin"
						title="Tokspace - Website - Clip 1"
					></iframe>
				</div>
			</div>
		</section>
	);
}

export default Header;
