import React, { forwardRef, useState } from "react";
import PropTypes from "prop-types";

/**
 * Video wrapper for remote assets (e.g. files.tokspace.cloud).
 * Shows an animate-pulse skeleton while buffering, fades the video in once it
 * can play, and renders a graceful fallback if the source fails to load.
 *
 * Sizing (aspect ratio, width) should be set via `className` on the wrapper.
 */
const LazyVideo = forwardRef(function LazyVideo(
	{
		src,
		type = "video/webm",
		className = "",
		videoClassName = "",
		poster,
		...videoProps
	},
	ref
) {
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(false);

	return (
		<div className={`relative overflow-hidden bg-gray-200 ${className}`}>
			{!loaded && !error && (
				<div className="absolute inset-0 z-10 flex animate-pulse items-center justify-center rounded-lg bg-gray-100">
					<div className="flex flex-col items-center">
						<div className="mb-2 h-8 w-8 animate-spin rounded-full border-4 border-[#ff6523] border-t-transparent"></div>
						<p className="text-sm text-gray-600">Loading video...</p>
					</div>
				</div>
			)}

			{error ? (
				<div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-sm text-gray-400">
					Video unavailable
				</div>
			) : (
				<video
					ref={ref}
					autoPlay
					muted
					loop
					playsInline
					preload="auto"
					poster={poster}
					onLoadedData={() => setLoaded(true)}
					onCanPlay={() => setLoaded(true)}
					onError={() => setError(true)}
					className={`h-full w-full object-cover transition-opacity duration-700 ${
						loaded ? "opacity-100" : "opacity-0"
					} ${videoClassName}`}
					{...videoProps}
				>
					<source src={src} type={type} />
					Your browser does not support the video tag.
				</video>
			)}
		</div>
	);
});

LazyVideo.propTypes = {
	src: PropTypes.string.isRequired,
	type: PropTypes.string,
	className: PropTypes.string,
	videoClassName: PropTypes.string,
	poster: PropTypes.string,
};

export default LazyVideo;
