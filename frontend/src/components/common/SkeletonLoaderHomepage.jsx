import React from "react";

// Skeleton utility components
const SkeletonBox = ({ className }) => (
	<div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

const SkeletonText = ({ lines = 1, className = "" }) => (
	<div className={`space-y-2 ${className}`}>
		{Array.from({ length: lines }).map((_, i) => (
			<div
				key={i}
				className={`bg-gray-200 animate-pulse rounded h-4 ${
					i === lines - 1 ? "w-3/4" : "w-full"
				}`}
			/>
		))}
	</div>
);

// Header Section Skeleton
const HeaderSkeleton = () => (
	<section className="px-[5%] py-16 md:py-24 lg:py-28">
		<div className="container">
			<div className="rb-12 mb-12 grid grid-cols-1 items-start gap-x-12 gap-y-5 md:mb-18 md:grid-cols-2 md:gap-y-8 lg:mb-20 lg:gap-x-20 lg:gap-y-16">
				<div>
					<SkeletonBox className="h-16 w-full mb-4" />
				</div>
				<div>
					<SkeletonText lines={3} className="mb-6" />
					<SkeletonBox className="h-12 w-32" />
				</div>
			</div>
			<SkeletonBox className="w-full aspect-video" />
		</div>
	</section>
);

// OurMission Section Skeleton
const OurMissionSkeleton = () => (
	<section className="py-16 md:py-24 lg:py-28 w-full">
		<div className="w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8">
			<div className="rb-12 mb-12 w-full max-w-lg md:mb-18 lg:mb-20 mx-auto text-center">
				<SkeletonBox className="h-16 w-full mb-4" />
				<SkeletonText lines={2} />
			</div>
			<div className="flex w-full flex-col overflow-hidden border border-gray-200 lg:h-[90vh] lg:flex-row bg-[#E9EDF1]">
				{[1, 2, 3, 4].map((i) => (
					<div key={i} className="flex-1 p-6">
						<div className="h-16 mb-4 flex items-center justify-center">
							<SkeletonBox className="h-8 w-8" />
						</div>
						<SkeletonText lines={3} className="mb-4" />
						<SkeletonBox className="w-full aspect-video" />
					</div>
				))}
			</div>
		</div>
	</section>
);

// Creativity Section Skeleton
const CreativitySkeleton = () => (
	<section className="px-[5%] py-16 md:py-24 lg:py-28">
		<div className="container">
			<div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
				<SkeletonBox className="h-16 w-3/4 mx-auto mb-4" />
				<SkeletonText lines={1} />
			</div>
			<div className="grid auto-cols-fr grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
				<div className="grid auto-cols-fr grid-cols-1 gap-6 md:gap-8">
					<div className="bg-[#DEE3E9] rounded-xl p-6">
						<SkeletonText lines={3} className="mb-4" />
						<SkeletonBox className="w-full aspect-video" />
					</div>
					<SkeletonBox className="bg-[#DEE3E9] rounded-xl h-48" />
					<SkeletonBox className="bg-[#DEE3E9] rounded-xl h-48" />
				</div>
				<div className="grid auto-cols-fr grid-cols-1 gap-6 md:gap-8">
					<div className="bg-[#DEE3E9] rounded-xl p-6">
						<SkeletonBox className="w-full aspect-video mb-4" />
						<SkeletonText lines={2} />
					</div>
					<div className="bg-[#DEE3E9] rounded-xl p-6">
						<SkeletonText lines={3} className="mb-4" />
						<SkeletonBox className="w-full aspect-video" />
					</div>
				</div>
			</div>
		</div>
	</section>
);

// Steppers Section Skeleton
const SteppersSkeleton = () => (
	<section className="px-[5%] py-16 md:py-24 lg:py-28">
		<div className="container">
			<div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
				<SkeletonBox className="h-16 w-full mb-4" />
				<SkeletonText lines={3} />
			</div>
			<div className="mb-12 flex flex-col md:mb-16 md:flex-row gap-4">
				{[1, 2, 3].map((i) => (
					<div key={i} className="flex-1 p-6 text-center">
						<SkeletonBox className="h-6 w-3/4 mx-auto mb-2" />
						<SkeletonText lines={2} />
					</div>
				))}
			</div>
			<SkeletonBox className="w-full aspect-video" />
		</div>
	</section>
);

// Main Skeleton Loader Component
export const SkeletonLoaderHomepage = () => {
	return (
		<div className="min-h-screen overflow-x-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col items-center justify-center py-8 lg:py-12 w-full">
					<div className="w-full">
						<HeaderSkeleton />
					</div>
					<div className="w-full">
						<OurMissionSkeleton />
					</div>
					<div
						className="w-full"
						style={{ maxWidth: "100%", overflow: "hidden" }}
					>
						<CreativitySkeleton />
					</div>
					<div className="w-full">
						<SteppersSkeleton />
					</div>
				</div>
			</div>
		</div>
	);
};
