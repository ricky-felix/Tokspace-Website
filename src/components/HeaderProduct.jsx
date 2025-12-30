"use client";

import { Badge } from "@relume_io/relume-ui";
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function HeaderProduct() {
	const { t } = useTranslation();

	const handleScrollToSection = (e, section) => {
		e.preventDefault();
		// Add your scroll logic here
	};

	return (
		<section id="relume" className="px-[5%] bg-gradient-to-br via-white">
			<div className="container">
				<div className="grid grid-cols-1 items-start gap-12 py-16 md:grid-cols-[1.5fr_1fr] md:py-24 lg:gap-x-20 lg:py-28">
					{/* Main Content */}
					<div className="space-y-6">
						<div className="relative">
							<h1 className="text-5xl font-bold md:text-6xl lg:text-7xl bg-gradient-to-r from-gray-900 via-gray-800 to-orange-600 bg-clip-text text-transparent leading-tight">
								{t("headerProduct.title")}
							</h1>
							<div className="absolute -top-2 -left-2 w-16 h-16 bg-orange-100 rounded-full blur-xl opacity-60 animate-pulse"></div>
						</div>

						<p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl">
							{t("headerProduct.subtitle")}
						</p>

						{/* Enhanced Badge Section */}
						<div className="flex flex-wrap gap-3 mt-8">
							<div className="inline-flex items-center px-4 py-2 bg-white rounded-full border-2 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-orange-300 group">
								<div className="w-2 h-2 bg-orange-500 rounded-full mr-2 group-hover:animate-pulse"></div>
								<span className="text-sm font-semibold text-gray-700 group-hover:text-orange-600">
									{t("headerProduct.badges.printing")}
								</span>
							</div>
							<div className="inline-flex items-center px-4 py-2 bg-white rounded-full border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-blue-300 group">
								<div className="w-2 h-2 bg-blue-500 rounded-full mr-2 group-hover:animate-pulse"></div>
								<span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600">
									{t("headerProduct.badges.kits")}
								</span>
							</div>
							<div className="inline-flex items-center px-4 py-2 bg-white rounded-full border-2 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-purple-300 group">
								<div className="w-2 h-2 bg-purple-500 rounded-full mr-2 group-hover:animate-pulse"></div>
								<span className="text-sm font-semibold text-gray-700 group-hover:text-purple-600">
									{t("headerProduct.badges.solutions")}
								</span>
							</div>
						</div>
					</div>

					{/* Info Grid */}
					<div className="grid grid-cols-2 gap-6">
						{/* Owners Card */}
						<div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
							<div className="flex items-center mb-4">
								<div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mr-3">
									<svg
										className="w-4 h-4 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
										/>
									</svg>
								</div>
								<h3 className="text-lg font-bold text-gray-800">
									{t("headerProduct.info.owners.title")}
								</h3>
							</div>
							<p className="text-base md:text-lg text-gray-600 font-medium">
								{t("headerProduct.info.owners.content")}
							</p>
						</div>

						{/* Date Card */}
						<div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
							<div className="flex items-center mb-4">
								<div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mr-3">
									<svg
										className="w-4 h-4 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
										/>
									</svg>
								</div>
								<h3 className="text-lg font-bold text-gray-800">
									{t("headerProduct.info.date.title")}
								</h3>
							</div>
							<p className="text-base md:text-lg text-gray-600 font-medium">
								{t("headerProduct.info.date.content")}
							</p>
						</div>

						{/* License Card */}
						<div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
							<div className="flex items-center mb-4">
								<div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center mr-3">
									<svg
										className="w-4 h-4 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
								<h3 className="text-lg font-bold text-gray-800">
									{t("headerProduct.info.license.title")}
								</h3>
							</div>
							<p className="text-base md:text-lg text-gray-600 font-medium">
								{t("headerProduct.info.license.content")}
							</p>
						</div>

						{/* Website Card */}
						<div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 group">
							<div className="flex items-center mb-4">
								<div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
									<svg
										className="w-4 h-4 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
										/>
									</svg>
								</div>
								<h3 className="text-lg font-bold text-gray-800">
									{t("headerProduct.info.social.title")}
								</h3>
							</div>
							<Link
								to="msha.ke/tokspace.id"
								onClick={(e) => handleScrollToSection(e, "innovation")}
								className="relative inline-flex items-center text-base md:text-lg font-medium text-orange-600 hover:text-orange-700 transition-colors duration-300 group-hover:underline decoration-2 underline-offset-2"
							>
								{t("headerProduct.info.social.link")}
								<svg
									className="w-4 h-4 ml-1 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
									/>
								</svg>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default HeaderProduct;
