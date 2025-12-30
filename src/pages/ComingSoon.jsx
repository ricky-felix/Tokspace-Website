import TokspaceLogo from "./Tokspace.png";

import React from "react";

export function ComingSoon() {
	return (
		<main className="flex flex-col md:flex-row min-h-screen bg-white">
			{/* Left Side */}
			<section className="flex flex-col justify-center items-start flex-1 px-6 py-8 gap-6 max-w-full md:max-w-2xl md:px-12 md:gap-8">
				<div className="w-32 md:w-40 mb-4 mx-auto md:mx-0">
					<img
						src={TokspaceLogo}
						alt="Tokspace Logo"
						className="block w-full"
					/>
				</div>
				<h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4 text-center md:text-left items-center justify-center">
					Coming Soon
				</h1>
				<p className="text-base md:text-lg text-gray-700 mb-2 text-center md:text-left">
					Tokspace is building the next generation of collaborative design tools
					for creative teams. Our platform empowers designers, developers, and
					creators to work together seamlessly, from concept to launch.
				</p>
				<p className="text-sm md:text-base text-gray-500 text-center md:text-left">
					Stay tuned for our launch and join us on our journey to transform the
					way teams create together.
				</p>
			</section>
			{/* Right Side */}
			<section
				className="flex flex-1 items-center justify-center"
				style={{ backgroundColor: "#ff6523" }}
			>
				<div className="aspect-[9/16] w-56 sm:w-64 md:w-80 max-w-full rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-black my-8 md:my-0">
					<iframe
						className="w-full h-full"
						src="https://player.vimeo.com/video/1103018893?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
						frameBorder="0"
						allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
						referrerPolicy="strict-origin-when-cross-origin"
						title="Tokspace Brand Announcement Video - Mashup - Assembly Edit - v1.0"
					/>
				</div>
			</section>
		</main>
	);
}
