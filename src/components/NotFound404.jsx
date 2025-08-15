"use client";

import { Button } from "@relume_io/relume-ui";
import { motion } from "framer-motion";
import React from "react";
import { useTranslation } from "react-i18next";

import { Link } from "react-router";

import buttonStyles from "../css/Button.module.css";

export function NotFound404() {
	const { t } = useTranslation();
	return (
		<section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
			<div className="container">
				<div className="mx-auto w-full max-w-lg text-center">
					<h1>
						<motion.span
							initial={{ x: "-50%" }}
							animate={{ x: "0%" }}
							transition={{ type: "spring", bounce: 0 }}
							className="block text-5xl font-bold md:text-6xl lg:text-7xl"
						>
							{t("notFound.title1")}
						</motion.span>
					</h1>
					<h1>
						<motion.span
							initial={{ x: "50%" }}
							animate={{ x: "0%" }}
							transition={{ type: "spring", bounce: 0 }}
							className="mb-5 block text-5xl font-bold md:mb-6 md:text-6xl lg:text-7xl"
						>
							{t("notFound.title2")}
						</motion.span>
					</h1>
					<p className="text-lg md:text-xl lg:text-2xl">{t("notFound.description")}</p>
					<div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
						<Link to="/">
							<Button
								title="Home"
								className={`${buttonStyles.bubbleButton} ${buttonStyles.primary}`}
							>
								{t("notFound.homeButton")}
							</Button>
						</Link>
						<Link to="/contact-us">
							<Button
								title="Shop"
								variant="secondary"
								className={`${buttonStyles.bubbleButton} ${buttonStyles.secondary}`}
							>
								{t("notFound.contactButton")}
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}

export default NotFound404;
