import { Button } from "@relume_io/relume-ui";
import { useTranslation } from "react-i18next";
import buttonStyles from "../css/Button.module.css";

import { Link } from "react-router-dom";

export const ProductCTADetailPage = (props) => {
	const { t } = useTranslation();
	const { heading, description, buttons, image } = {
		...ProductCTADetailPageDefaults,
		...props,
	};
	return (
		<section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28 ]">
			<div className="container">
				<div className="grid auto-cols-fr grid-cols-1 lg:grid-cols-2 bg-[#e9edf1] rounded-xl">
					<div className="flex flex-col justify-center p-8 md:p-12">
						<h2 className="rb-5 mb-5 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl">
							{heading || t("productCTADetailPage.heading")}
						</h2>
						<p className="text-base md:text-lg lg:text-xl">
							{description || t("productCTADetailPage.description")}
						</p>
						<div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
							<Link to="/contact-us">
								<Button {...buttons[0]}>
									{buttons[0].title || t("productCTADetailPage.contactButton")}
								</Button>
							</Link>
							{/* <Button {...buttons[1]}>
								{buttons[1].title || t("productCTADetailPage.inquiryButton")}
							</Button> */}
						</div>
					</div>
					<div className="flex items-center justify-center">
						<img
							src={image.src}
							className="w-full object-cover"
							alt={image.alt}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export const ProductCTADetailPageDefaults = {
	heading: "", // Will be set via translation
	description: "", // Will be set via translation
	buttons: [
		{
			title: "", // Will be set via translation
			variant: "primary",
			className: `${buttonStyles.bubbleButton} ${buttonStyles.primary}`,
		},
		{
			title: "", // Will be set via translation
			variant: "secondary",
			className: `${buttonStyles.bubbleButton} ${buttonStyles.secondary}`,
		},
	],
	image: {
		src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape4x3.svg",
		alt: "Relume placeholder image",
	},
};

export default ProductCTADetailPage;
