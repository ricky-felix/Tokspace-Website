import { Button } from "@relume_io/relume-ui";
import buttonStyles from "../css/Button.module.css";

export const ProductCTA = (props) => {
	const { heading, description, buttons, image } = {
		...ProductCTADefaults,
		...props,
	};
	return (
		<>
			<section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
				<div className="container">
					<div className="grid auto-cols-fr grid-cols-1 border border-border-primary lg:grid-cols-2">
						<div className="flex flex-col justify-center p-8 md:p-12">
							<h2 className="rb-5 mb-5 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl">
								{heading}
							</h2>
							<p className="md:text-md">{description}</p>
							<div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
								{buttons.map((button, index) => (
									<Button key={index} {...button}>
										{button.title}
									</Button>
								))}
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
		</>
	);
};

export const ProductCTADefaults = {
	heading: "Ready to Bring Your Vision Into Reality?",
	description:
		"Contact us today for custom projects tailored to your unique needs and aspirations.",
	buttons: [
		{
			title: "Contact",
			variant: "primary",
			className: `${buttonStyles.bubbleButton} ${buttonStyles.primary}`,
		},
		{
			title: "Inquiry Now",
			variant: "secondary",
			className: `${buttonStyles.bubbleButton} ${buttonStyles.secondary}`,
		},
	],
	image: {
		src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape4x3.svg",
		alt: "Relume placeholder image",
	},
};

export default ProductCTA;
