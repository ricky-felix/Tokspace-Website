"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function ProductCTA() {
	return (
		<section className="relative px-[5%] py-16 md:py-24 lg:py-28">
			<div className="container grid grid-rows-1 items-start gap-y-5 md:grid-cols-2 md:gap-x-12 md:gap-y-8 lg:gap-x-20 lg:gap-y-16">
				<div>
					<h1 className="heading-h2 font-bold">Ready to Bring Your Vision?</h1>
				</div>
				<div>
					<p className="text-medium">
						Have a unique project in mind? Our team is here to help you
						transform your ideas into reality with custom solutions tailored
						just for you.
					</p>
					<div className="mt-6 flex flex-wrap gap-4 md:mt-8">
						<Button title="Contact">Contact</Button>
					</div>
				</div>
			</div>
		</section>
	);
}

export default ProductCTA;
