"use client";

import { Button } from "@relume_io/relume-ui";
import { motion } from "framer-motion";
import React from "react";

export function NotFound404() {
	return (
		<section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
			<div className="container">
				<div className="mx-auto w-full max-w-lg text-center">
					<h1>
						<motion.span
							initial={{ x: "-50%" }}
							animate={{ x: "0%" }}
							transition={{ type: "spring", bounce: 0 }}
							className="block text-6xl font-bold md:text-9xl lg:text-10xl"
						>
							Lost in Space
						</motion.span>
					</h1>
					<h1>
						<motion.span
							initial={{ x: "50%" }}
							animate={{ x: "0%" }}
							transition={{ type: "spring", bounce: 0 }}
							className="mb-5 block text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl"
						>
							Oops! Page Missing
						</motion.span>
					</h1>
					<p className="md:text-md">
						It seems the page you're looking for has launched into the cosmos.
						Let's get you home.
					</p>
					<div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
						<Button title="Home">Home</Button>
						<Button title="Shop" variant="secondary">
							Shop
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}

export default NotFound404;
