import React, { useState, useEffect } from "react";
import {
	BiEnvelope,
	BiMap,
	BiPhone,
	BiCheckCircle,
	BiErrorCircle,
} from "react-icons/bi";
import { AiOutlineLoading } from "react-icons/ai";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";

import buttonStyles from "../css/Button.module.css";
import formStyles from "../css/Form.module.css";

export function ContactUs() {
	const { t } = useTranslation();
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
					<h2 className="rb-5 mb-5 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl">
						{t("contactUs.title")}
					</h2>
					<p className="text-base md:text-lg lg:text-xl">{t("contactUs.subtitle")}</p>
				</div>
				<div className="grid auto-cols-fr grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-[1fr_1fr] md:gap-x-20 md:gap-y-16">
					<form onSubmit={handleSubmit} className={formStyles.formContainer}>
						<div>
							<label htmlFor="name" className={formStyles.label}>
								{t("contactUs.nameLabel")}
							</label>
							<input
								type="text"
								id="name"
								name="name"
								placeholder={t("contactUs.namePlaceholder")}
								className={`${formStyles.input}`}
								value={formData.name}
								onChange={handleInputChange}
								required
							/>
						</div>

						<div>
							<label htmlFor="email" className={formStyles.label}>
								{t("contactUs.emailLabel")}
							</label>
							<input
								type="email"
								id="email"
								name="email"
								placeholder={t("contactUs.emailPlaceholder")}
								className={`${formStyles.input}`}
								value={formData.email}
								onChange={handleInputChange}
								required
							/>
						</div>

						<div>
							<label htmlFor="message" className={formStyles.label}>
								{t("contactUs.messageLabel")}
							</label>
							<textarea
								id="message"
								name="message"
								placeholder={t("contactUs.messagePlaceholder")}
								className={`${formStyles.textarea}`}
								value={formData.message}
								onChange={handleInputChange}
								required
							/>
						</div>

						{submitStatus === "success" && (
							<div className="flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50">
								<BiCheckCircle className="size-5 mr-2" />
								<span>{t("contactUs.successMessage")}</span>
							</div>
						)}

						{submitStatus === "error" && (
							<div className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50">
								<BiErrorCircle className="size-5 mr-2" />
								<span>{t("contactUs.errorMessage")}</span>
							</div>
						)}

						<button
							type="submit"
							className={`${buttonStyles.bubbleButton} ${buttonStyles.primary} flex items-center justify-center`}
							disabled={isSubmitting}
						>
							{isSubmitting ? (
								<>
									<AiOutlineLoading className="animate-spin mr-2 size-5" />
									{t("contactUs.sending")}
								</>
							) : (
								t("contactUs.sendButton")
							)}
						</button>
					</form>
					<div className="mb-auto grid gap-x-4 gap-y-10 py-2 sm:grid-cols-2">
						<div>
							<div className="mb-3 md:mb-4">
								<BiEnvelope className="size-8" />
							</div>
							<h3 className="mb-2 text-2xl leading-[1.4] font-bold md:text-3xl lg:text-4xl">
								{t("contactUs.emailTitle")}
							</h3>
							<a className="underline" href="mailto:tokspace@outlook.co.id">
								tokspace@outlook.co.id
							</a>
						</div>
						<div>
							<div className="mb-3 md:mb-4">
								<BiPhone className="size-8" />
							</div>
							<h3 className="mb-2 text-2xl leading-[1.4] font-bold md:text-3xl lg:text-4xl">
								{t("contactUs.whatsappTitle")}
							</h3>
							<a className="underline" href="https://wa.me/6287746161488">
								+62-877-4616-1488
							</a>
						</div>
						<div>
							<div className="mb-3 md:mb-4">
								<BiMap className="size-8" />
							</div>
							<h3 className="mb-2 text-2xl leading-[1.4] font-bold md:text-3xl lg:text-4xl">
								{t("contactUs.locationTitle")}
							</h3>
							<p className="text-base md:text-lg lg:text-xl mb-2">{t("contactUs.location")}</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default ContactUs;
