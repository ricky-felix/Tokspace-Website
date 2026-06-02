import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * Image wrapper for remote assets (e.g. files.tokspace.cloud).
 * Shows an animate-pulse skeleton while the image downloads, fades it in once
 * loaded, and falls back to `fallbackSrc` if the source errors.
 *
 * Sizing should be set via `className` on the wrapper.
 */
const PLACEHOLDER =
	"https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg";

export default function LazyImage({
	src,
	alt = "",
	className = "",
	imgClassName = "",
	fallbackSrc = PLACEHOLDER,
	...imgProps
}) {
	const [loaded, setLoaded] = useState(false);
	const [failed, setFailed] = useState(false);

	return (
		<div className={`relative overflow-hidden bg-gray-200 ${className}`}>
			{!loaded && (
				<div className="absolute inset-0 animate-pulse bg-gray-200" />
			)}

			<img
				src={failed ? fallbackSrc : src || fallbackSrc}
				alt={alt}
				loading="lazy"
				onLoad={() => setLoaded(true)}
				onError={() => {
					if (!failed) setFailed(true);
					setLoaded(true);
				}}
				className={`h-full w-full object-cover transition-opacity duration-500 ${
					loaded ? "opacity-100" : "opacity-0"
				} ${imgClassName}`}
				{...imgProps}
			/>
		</div>
	);
}

LazyImage.propTypes = {
	src: PropTypes.string,
	alt: PropTypes.string,
	className: PropTypes.string,
	imgClassName: PropTypes.string,
	fallbackSrc: PropTypes.string,
};
