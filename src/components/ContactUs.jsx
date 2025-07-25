import { Button, Checkbox, Input, Label, Textarea } from "@relume_io/relume-ui";
import React, { useState } from "react";
import { BiEnvelope, BiMap, BiPhone } from "react-icons/bi";
import { RxChevronRight } from "react-icons/rx";
import emailjs from "@emailjs/browser";

export function ContactUs() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState("idle"); // 'idle', 'success', or 'error'

	const handleInputChange = (e) => {
		const { id, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[id]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitStatus("idle");

		try {
			// EmailJS configuration
			const result = await emailjs.send(
				import.meta.env.VITE_EMAILJS_SERVICE_ID,
				import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
				{
					from_name: formData.name,
					from_email: formData.email,
					message: formData.message,
					to_email: "tokspace@outlook.co.id",
				},
				import.meta.env.VITE_EMAILJS_PUBLIC_KEY
			);

			console.log("Email sent successfully:", result);
			setSubmitStatus("success");
			setFormData({ name: "", email: "", message: "" });
		} catch (error) {
			console.error("Error sending email:", error);
			setSubmitStatus("error");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
			<div className="container">
				<div className="rb-12 mb-8 max-w-lg md:mb-12">
					<p className="mb-3 font-semibold md:mb-4">Connect</p>
					<h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
						Get in Touch
					</h2>
					<p className="md:text-md">We'd love to hear from you!</p>
				</div>
				<div className="grid auto-cols-fr grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-[1fr_1fr] md:gap-x-20 md:gap-y-16">
					<form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
						{submitStatus === "success" && (
							<div className="p-4 bg-green-100 text-green-700 rounded-md">
								Thank you! Your message has been sent successfully.
							</div>
						)}
						{submitStatus === "error" && (
							<div className="p-4 bg-red-100 text-red-700 rounded-md">
								Sorry, there was an error sending your message. Please try
								again.
							</div>
						)}

						<div className="grid w-full items-center">
							<Label htmlFor="name" className="mb-2">
								Name
							</Label>
							<Input
								type="text"
								id="name"
								value={formData.name}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="grid w-full items-center">
							<Label htmlFor="email" className="mb-2">
								Email
							</Label>
							<Input
								type="email"
								id="email"
								value={formData.email}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="grid w-full items-center">
							<Label htmlFor="message" className="mb-2">
								Message
							</Label>
							<Textarea
								id="message"
								placeholder="Type your message..."
								className="min-h-[11.25rem] overflow-auto"
								value={formData.message}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div>
							<Button
								type="submit"
								title="Submit"
								className="bubble-button primary"
								disabled={isSubmitting}
							>
								{isSubmitting ? "Sending..." : "Submit"}
							</Button>
						</div>
					</form>
					<div className="mb-auto grid gap-x-4 gap-y-10 py-2 sm:grid-cols-2">
						<div>
							<div className="mb-3 md:mb-4">
								<BiEnvelope className="size-8" />
							</div>
							<h3 className="mb-2 text-md leading-[1.4] font-bold md:text-xl">
								Email
							</h3>
							<a className="underline" href="mailto:tokspace@outlook.co.id">
								tokspace@outlook.co.id
							</a>
						</div>
						<div>
							<div className="mb-3 md:mb-4">
								<BiPhone className="size-8" />
							</div>
							<h3 className="mb-2 text-md leading-[1.4] font-bold md:text-xl">
								Phone
							</h3>
							<a className="underline" href="#">
								Coming Soon
							</a>
						</div>
						<div>
							<div className="mb-3 md:mb-4">
								<BiMap className="size-8" />
							</div>
							<h3 className="mb-2 text-md leading-[1.4] font-bold md:text-xl">
								Location
							</h3>
							<p className="mb-2">Medan, Indonesia</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default ContactUs;
