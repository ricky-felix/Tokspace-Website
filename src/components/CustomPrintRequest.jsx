import React, { useState, useEffect, useRef } from "react";
import {
	BiCheckCircle,
	BiErrorCircle,
	BiCloudUpload,
	BiCube,
	BiRocket,
	BiTime,
	BiDollar,
	BiCheck,
	BiFile,
	BiX,
} from "react-icons/bi";
import { AiOutlineLoading } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

import buttonStyles from "../css/Button.module.css";
import formStyles from "../css/Form.module.css";
import { WhatsAppService } from "../services/whatsappService";

// Material options - BambuLab A1 with PLA
const materialOptions = [
	{
		id: "PLA",
		name: "PLA",
		description: "Easy to print, biodegradable, great for prototypes",
		bgColor: "bg-gradient-to-br from-green-50 to-green-100",
		borderColor: "border-green-300",
		accentColor: "bg-green-500",
		icon: "🌱",
		available: true,
	},
	{
		id: "ABS",
		name: "ABS",
		description: "Durable, heat-resistant, ideal for functional parts",
		bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
		borderColor: "border-blue-300",
		accentColor: "bg-blue-500",
		icon: "💪",
		available: false,
	},
	{
		id: "PETG",
		name: "PETG",
		description: "Strong, flexible, chemical resistant",
		bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
		borderColor: "border-purple-300",
		accentColor: "bg-purple-500",
		icon: "🛡️",
		available: false,
	},
	{
		id: "TPU",
		name: "TPU",
		description: "Flexible, rubber-like, shock absorbent",
		bgColor: "bg-gradient-to-br from-orange-50 to-orange-100",
		borderColor: "border-orange-300",
		accentColor: "bg-orange-500",
		icon: "🤸",
		available: false,
	},
	{
		id: "Nylon",
		name: "Nylon",
		description: "Very strong, wear-resistant, professional grade",
		bgColor: "bg-gradient-to-br from-gray-50 to-gray-100",
		borderColor: "border-gray-300",
		accentColor: "bg-gray-500",
		icon: "⚡",
		available: false,
	},
];

// Available color options
const colorOptions = [
	{ id: "white", name: "White", hex: "#FFFFFF", border: "border-gray-300" },
	{ id: "black", name: "Black", hex: "#000000" },
	{ id: "grey", name: "Grey", hex: "#808080" },
	{ id: "ocean-blue", name: "Ocean Blue", hex: "#0077BE" },
	{ id: "orange", name: "Orange", hex: "#FF6523" },
	{ id: "light-brown", name: "Light Brown", hex: "#C4A57B" },
];

export function CustomPrintRequest() {
	const { t } = useTranslation();
	const fileInputRef = useRef(null);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		projectName: "",
		description: "",
		material: "PLA", // Default to PLA since it's the only option
		color: "",
		quantity: "1",
		dimensions: "",
		deadline: "",
		additionalNotes: "",
	});
	const [attachedFiles, setAttachedFiles] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState("idle");
	const [estimatedPrice, setEstimatedPrice] = useState(null);

	// Calculate estimated price based on inputs
	useEffect(() => {
		if (formData.quantity && formData.dimensions) {
			// This is a simple estimation - adjust based on your actual pricing
			const basePrice = 50000; // Base price in IDR
			const qty = parseInt(formData.quantity) || 1;
			const estimated = basePrice * qty;
			setEstimatedPrice(estimated);
		} else {
			setEstimatedPrice(null);
		}
	}, [formData.quantity, formData.dimensions]);

	const handleInputChange = (e) => {
		const { id, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[id]: value,
		}));
	};

	const handleMaterialSelect = (materialId) => {
		setFormData((prev) => ({
			...prev,
			material: materialId,
		}));
	};

	const handleColorSelect = (colorId) => {
		setFormData((prev) => ({
			...prev,
			color: colorId,
		}));
	};

	const handleFileSelect = (e) => {
		const files = Array.from(e.target.files);
		const validFiles = files.filter(file => {
			// Accept common 3D file formats and images
			const validTypes = [
				'model/stl',
				'application/sla',
				'model/obj',
				'application/x-tgif',
				'image/jpeg',
				'image/png',
				'image/jpg',
				'application/pdf',
				'.stl',
				'.obj',
				'.3mf',
				'.step',
				'.stp'
			];
			return file.size <= 10 * 1024 * 1024; // 10MB limit
		});

		setAttachedFiles(prev => [...prev, ...validFiles]);
	};

	const removeFile = (index) => {
		setAttachedFiles(prev => prev.filter((_, i) => i !== index));
	};

	const triggerFileInput = () => {
		fileInputRef.current?.click();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validate file upload
		if (attachedFiles.length === 0) {
			setSubmitStatus("error");
			alert("Please upload at least one file for your 3D print request.");
			return;
		}

		setIsSubmitting(true);
		setSubmitStatus("idle");

		try {
			const fileInfo = attachedFiles.length > 0
				? `\n\n📎 *Attached Files (${attachedFiles.length}):*\n${attachedFiles.map((f, i) => `${i + 1}. ${f.name} (${(f.size / 1024).toFixed(2)} KB)`).join('\n')}`
				: '';

			const whatsappMessage = `*🖨️ Custom 3D Print Request*

*📋 Contact Information:*
• Name: ${formData.name}
• Email: ${formData.email}
• Phone: ${formData.phone}

*🔧 Project Details:*
• Project Name: ${formData.projectName}
• Description: ${formData.description}
• Material: ${formData.material}
• Color: ${formData.color}
• Quantity: ${formData.quantity}
• Dimensions: ${formData.dimensions || "Not specified"}
• Deadline: ${formData.deadline || "Not specified"}
• Printer: BambuLab A1

*📝 Additional Notes:*
${formData.additionalNotes || "None"}${fileInfo}

${attachedFiles.length > 0 ? `\n⚠️ Note: I have ${attachedFiles.length} file(s) to send. I will send them separately.` : ''}`;

			// Generate WhatsApp URL using service
			const whatsappURL = WhatsAppService.generateCustomMessage(whatsappMessage);

			// Open WhatsApp in a new window
			WhatsAppService.openWhatsApp(whatsappURL);

			// Mark as success
			setSubmitStatus("success");

			// Reset form after a short delay
			setTimeout(() => {
				setFormData({
					name: "",
					email: "",
					phone: "",
					projectName: "",
					description: "",
					material: "PLA",
					color: "",
					quantity: "1",
					dimensions: "",
					deadline: "",
					additionalNotes: "",
				});
				setAttachedFiles([]);
			}, 1000);
		} catch (error) {
			console.error("Error sending custom print request:", error);
			setSubmitStatus("error");
		} finally {
			setIsSubmitting(false);
		}
	};

	const formatPrice = (price) => {
		return new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
			minimumFractionDigits: 0,
		}).format(price);
	};

	return (
		<section id="custom-print" className="w-full">
			{/* Hero Section */}
			<div className="bg-gradient-to-br from-[#ff6523] to-[#ff8c52] text-white py-20 md:py-28">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						className="text-center"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<div className="mb-6 flex justify-center">
							<BiCube className="size-20 md:size-24" />
						</div>
						<h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
							{t("customPrint.title")}
						</h1>
						<p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto opacity-90">
							{t("customPrint.subtitle")}
						</p>
					</motion.div>
				</div>
			</div>

			{/* How It Works - Step by Step */}
			<div className="py-16 md:py-20 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						className="text-center mb-12"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
					>
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							{t("customPrint.howItWorks")}
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							{t("customPrint.howItWorksSubtitle")}
						</p>
					</motion.div>

					<div className="grid md:grid-cols-3 gap-8 lg:gap-12">
						{[
							{
								icon: <BiCloudUpload className="size-12" />,
								step: "1",
								title: t("customPrint.step1Title"),
								description: t("customPrint.step1Description"),
							},
							{
								icon: <BiDollar className="size-12" />,
								step: "2",
								title: t("customPrint.step2Title"),
								description: t("customPrint.step2Description"),
							},
							{
								icon: <BiRocket className="size-12" />,
								step: "3",
								title: t("customPrint.step3Title"),
								description: t("customPrint.step3Description"),
							},
						].map((item, index) => (
							<motion.div
								key={index}
								className="relative text-center"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								viewport={{ once: true }}
							>
								<div className="mb-4 flex justify-center text-[#ff6523]">
									{item.icon}
								</div>
								<div className="absolute top-0 right-0 bg-[#ff6523] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
									{item.step}
								</div>
								<h3 className="text-xl font-bold mb-3">{item.title}</h3>
								<p className="text-gray-600">{item.description}</p>
							</motion.div>
						))}
					</div>
				</div>
			</div>

			{/* Form Section with Side-by-Side Layout */}
			<div className="py-16 md:py-20 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						className="text-center mb-12"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
					>
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							{t("customPrint.requestFormTitle")}
						</h2>
						<p className="text-lg text-gray-600">
							{t("customPrint.requestFormSubtitle")}
						</p>
					</motion.div>

					<div className="grid lg:grid-cols-3 gap-8">
						{/* Form Section - 2 columns */}
						<motion.div
							className="lg:col-span-2"
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
						>
							<div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
								<form onSubmit={handleSubmit} className="space-y-8">
									{/* Contact Information */}
									<div>
										<h3 className="text-2xl font-bold mb-6 text-[#1c1f2a] flex items-center">
											<span className="bg-[#ff6523] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">
												1
											</span>
											{t("customPrint.contactInfo")}
										</h3>
										<div className="grid gap-4 md:grid-cols-2">
											<div>
												<label htmlFor="name" className={formStyles.label}>
													{t("customPrint.nameLabel")} *
												</label>
												<input
													type="text"
													id="name"
													name="name"
													placeholder={t("customPrint.namePlaceholder")}
													className={formStyles.input}
													value={formData.name}
													onChange={handleInputChange}
													required
												/>
											</div>

											<div>
												<label htmlFor="email" className={formStyles.label}>
													{t("customPrint.emailLabel")} *
												</label>
												<input
													type="email"
													id="email"
													name="email"
													placeholder={t("customPrint.emailPlaceholder")}
													className={formStyles.input}
													value={formData.email}
													onChange={handleInputChange}
													required
												/>
											</div>

											<div className="md:col-span-2">
												<label htmlFor="phone" className={formStyles.label}>
													{t("customPrint.phoneLabel")} *
												</label>
												<input
													type="tel"
													id="phone"
													name="phone"
													placeholder={t("customPrint.phonePlaceholder")}
													className={formStyles.input}
													value={formData.phone}
													onChange={handleInputChange}
													required
												/>
											</div>
										</div>
									</div>

									{/* Project Details */}
									<div>
										<h3 className="text-2xl font-bold mb-6 text-[#1c1f2a] flex items-center">
											<span className="bg-[#ff6523] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">
												2
											</span>
											{t("customPrint.projectDetails")}
										</h3>
										<div className="space-y-4">
											<div>
												<label htmlFor="projectName" className={formStyles.label}>
													{t("customPrint.projectNameLabel")} *
												</label>
												<input
													type="text"
													id="projectName"
													name="projectName"
													placeholder={t("customPrint.projectNamePlaceholder")}
													className={formStyles.input}
													value={formData.projectName}
													onChange={handleInputChange}
													required
												/>
											</div>

											<div>
												<label htmlFor="description" className={formStyles.label}>
													{t("customPrint.descriptionLabel")} *
												</label>
												<textarea
													id="description"
													name="description"
													placeholder={t("customPrint.descriptionPlaceholder")}
													className={formStyles.textarea}
													rows="4"
													value={formData.description}
													onChange={handleInputChange}
													required
												/>
											</div>

											{/* Visual Material Selector */}
											<div>
												<label className={formStyles.label}>
													{t("customPrint.materialLabel")} *
												</label>
												<div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
													{materialOptions.map((material) => (
														<motion.button
															key={material.id}
															type="button"
															onClick={() => material.available && handleMaterialSelect(material.id)}
															disabled={!material.available}
															className={`relative p-4 rounded-xl border-2 text-left transition-all ${
																!material.available
																	? "bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed"
																	: formData.material === material.id
																	? `${material.bgColor} ${material.borderColor} shadow-md`
																	: "bg-white border-gray-200 hover:border-gray-300"
															}`}
															whileHover={material.available ? { scale: 1.02 } : {}}
															whileTap={material.available ? { scale: 0.98 } : {}}
														>
															{!material.available && (
																<div className="absolute top-2 right-2 bg-gray-600 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
																	N/A
																</div>
															)}
															{formData.material === material.id && material.available && (
																<BiCheck className="absolute top-2 right-2 size-6 text-[#ff6523]" />
															)}
															<div className="text-2xl mb-2">{material.icon}</div>
															<div className="font-bold text-sm mb-1">
																{material.name}
															</div>
															<div className="text-xs text-gray-600">
																{material.description}
															</div>
														</motion.button>
													))}
												</div>
												<div className="mt-2 text-xs text-gray-500">
													Printer: BambuLab A1
												</div>
											</div>

											{/* Color Selector */}
											<div>
												<label className={formStyles.label}>
													{t("customPrint.colorLabel")} *
												</label>
												<div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-2">
													{colorOptions.map((color) => (
														<motion.button
															key={color.id}
															type="button"
															onClick={() => handleColorSelect(color.id)}
															className={`relative p-3 rounded-xl border-2 transition-all ${
																formData.color === color.id
																	? "border-[#ff6523] bg-[#ffefe9] shadow-md"
																	: color.border
																	? `border-gray-200 ${color.border}`
																	: "border-gray-200 hover:border-gray-300"
															}`}
															whileHover={{ scale: 1.05 }}
															whileTap={{ scale: 0.95 }}
														>
															{formData.color === color.id && (
																<BiCheck className="absolute top-1 right-1 size-5 text-[#ff6523]" />
															)}
															<div className="flex flex-col items-center gap-2">
																<div
																	className={`w-10 h-10 rounded-full ${
																		color.id === "white" ? "border-2 border-gray-300" : ""
																	}`}
																	style={{ backgroundColor: color.hex }}
																/>
																<div className="text-xs font-medium text-center">
																	{color.name}
																</div>
															</div>
														</motion.button>
													))}
												</div>
											</div>

											{/* File Upload Section */}
											<div>
												<label className={formStyles.label}>
													{t("customPrint.fileUploadLabel")} *
												</label>
												<p className="text-sm text-gray-600 mb-3">
													{t("customPrint.fileUploadDescription")}
												</p>

												<input
													ref={fileInputRef}
													type="file"
													multiple
													accept=".stl,.obj,.3mf,.step,.stp,.pdf,.jpg,.jpeg,.png"
													onChange={handleFileSelect}
													className="hidden"
												/>

												<motion.button
													type="button"
													onClick={triggerFileInput}
													className="w-full p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#ff6523] hover:bg-[#ffefe9] transition-colors flex flex-col items-center justify-center gap-2"
													whileHover={{ scale: 1.01 }}
													whileTap={{ scale: 0.99 }}
												>
													<BiCloudUpload className="size-8 text-gray-400" />
													<div className="text-sm font-semibold text-gray-700">
														{t("customPrint.clickToUpload")}
													</div>
													<div className="text-xs text-gray-500">
														{t("customPrint.fileTypes")}
													</div>
												</motion.button>

												{/* File List */}
												{attachedFiles.length > 0 && (
													<div className="mt-3 space-y-2">
														<AnimatePresence>
															{attachedFiles.map((file, index) => (
																<motion.div
																	key={index}
																	initial={{ opacity: 0, y: -10 }}
																	animate={{ opacity: 1, y: 0 }}
																	exit={{ opacity: 0, x: -100 }}
																	className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
																>
																	<div className="flex items-center gap-2 flex-1 min-w-0">
																		<BiFile className="size-5 text-[#ff6523] flex-shrink-0" />
																		<div className="min-w-0 flex-1">
																			<div className="text-sm font-medium text-gray-700 truncate">
																				{file.name}
																			</div>
																			<div className="text-xs text-gray-500">
																				{(file.size / 1024).toFixed(2)} KB
																			</div>
																		</div>
																	</div>
																	<motion.button
																		type="button"
																		onClick={() => removeFile(index)}
																		className="ml-2 p-1 hover:bg-red-100 rounded-full transition-colors flex-shrink-0"
																		whileHover={{ scale: 1.1 }}
																		whileTap={{ scale: 0.9 }}
																	>
																		<BiX className="size-5 text-red-500" />
																	</motion.button>
																</motion.div>
															))}
														</AnimatePresence>
													</div>
												)}
											</div>

											<div className="grid gap-4 md:grid-cols-2">
												<div>
													<label htmlFor="quantity" className={formStyles.label}>
														{t("customPrint.quantityLabel")} *
													</label>
													<input
														type="number"
														id="quantity"
														name="quantity"
														min="1"
														placeholder="1"
														className={formStyles.input}
														value={formData.quantity}
														onChange={handleInputChange}
														required
													/>
												</div>

												<div>
													<label htmlFor="dimensions" className={formStyles.label}>
														{t("customPrint.dimensionsLabel")}
													</label>
													<input
														type="text"
														id="dimensions"
														name="dimensions"
														placeholder={t("customPrint.dimensionsPlaceholder")}
														className={formStyles.input}
														value={formData.dimensions}
														onChange={handleInputChange}
													/>
												</div>
											</div>

											<div>
												<label htmlFor="deadline" className={formStyles.label}>
													{t("customPrint.deadlineLabel")}
												</label>
												<input
													type="date"
													id="deadline"
													name="deadline"
													className={formStyles.input}
													value={formData.deadline}
													onChange={handleInputChange}
												/>
											</div>

											<div>
												<label htmlFor="additionalNotes" className={formStyles.label}>
													{t("customPrint.additionalNotesLabel")}
												</label>
												<textarea
													id="additionalNotes"
													name="additionalNotes"
													placeholder={t("customPrint.additionalNotesPlaceholder")}
													className={formStyles.textarea}
													rows="3"
													value={formData.additionalNotes}
													onChange={handleInputChange}
												/>
											</div>
										</div>
									</div>

									{/* Status Messages */}
									{submitStatus === "success" && (
										<motion.div
											className="flex items-center p-4 text-green-800 rounded-lg bg-green-50"
											initial={{ opacity: 0, y: -10 }}
											animate={{ opacity: 1, y: 0 }}
										>
											<BiCheckCircle className="size-5 mr-2 flex-shrink-0" />
											<span>{t("customPrint.successMessage")}</span>
										</motion.div>
									)}

									{submitStatus === "error" && (
										<motion.div
											className="flex items-center p-4 text-red-800 rounded-lg bg-red-50"
											initial={{ opacity: 0, y: -10 }}
											animate={{ opacity: 1, y: 0 }}
										>
											<BiErrorCircle className="size-5 mr-2 flex-shrink-0" />
											<span>{t("customPrint.errorMessage")}</span>
										</motion.div>
									)}

									{/* Submit Button */}
									<motion.button
										type="submit"
										className={`${buttonStyles.bubbleButton} ${buttonStyles.primary} w-full flex items-center justify-center text-lg`}
										disabled={isSubmitting}
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
									>
										{isSubmitting ? (
											<>
												<AiOutlineLoading className="animate-spin mr-2 size-5" />
												{t("customPrint.sending")}
											</>
										) : (
											<>
												<BiCloudUpload className="mr-2 size-5" />
												{t("customPrint.submitButton")}
											</>
										)}
									</motion.button>
								</form>
							</div>
						</motion.div>

						{/* Pricing Calculator Sidebar - 1 column */}
						<motion.div
							className="lg:col-span-1"
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							viewport={{ once: true }}
						>
							<div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
								<h3 className="text-xl font-bold mb-6 text-[#1c1f2a]">
									{t("customPrint.projectSummary")}
								</h3>

								<div className="space-y-4 mb-6">
									<div className="flex justify-between items-center pb-3 border-b border-gray-200">
										<span className="text-gray-600">
											{t("customPrint.quantityLabel")}:
										</span>
										<span className="font-semibold">
											{formData.quantity || "-"}
										</span>
									</div>
									<div className="flex justify-between items-center pb-3 border-b border-gray-200">
										<span className="text-gray-600">
											{t("customPrint.materialLabel")}:
										</span>
										<span className="font-semibold">
											{formData.material || "-"}
										</span>
									</div>
									<div className="flex justify-between items-center pb-3 border-b border-gray-200">
										<span className="text-gray-600">
											{t("customPrint.colorLabel")}:
										</span>
										<span className="font-semibold capitalize">
											{formData.color ? colorOptions.find(c => c.id === formData.color)?.name : "-"}
										</span>
									</div>
									<div className="flex justify-between items-center pb-3 border-b border-gray-200">
										<span className="text-gray-600">Files:</span>
										<span className="font-semibold">
											{attachedFiles.length > 0 ? `${attachedFiles.length} file(s)` : "-"}
										</span>
									</div>
								</div>

								{estimatedPrice && (
									<motion.div
										className="bg-[#ffefe9] rounded-xl p-4 mb-6"
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
									>
										<div className="text-sm text-gray-600 mb-1">
											{t("customPrint.estimatedPrice")}
										</div>
										<div className="text-2xl font-bold text-[#ff6523]">
											{formatPrice(estimatedPrice)}
										</div>
										<div className="text-xs text-gray-500 mt-2">
											{t("customPrint.estimatedNote")}
										</div>
									</motion.div>
								)}

								<div className="space-y-3">
									<div className="flex items-start gap-3">
										<BiTime className="size-5 text-[#ff6523] flex-shrink-0 mt-0.5" />
										<div className="text-sm">
											<div className="font-semibold mb-1">
												{t("customPrint.responseTime")}
											</div>
											<div className="text-gray-600">
												{t("customPrint.responseTimeText")}
											</div>
										</div>
									</div>
									<div className="flex items-start gap-3">
										<BiCheck className="size-5 text-[#ff6523] flex-shrink-0 mt-0.5" />
										<div className="text-sm">
											<div className="font-semibold mb-1">
												{t("customPrint.freeConsultation")}
											</div>
											<div className="text-gray-600">
												{t("customPrint.freeConsultationText")}
											</div>
										</div>
									</div>
									<div className="flex items-start gap-3">
										<BiRocket className="size-5 text-[#ff6523] flex-shrink-0 mt-0.5" />
										<div className="text-sm">
											<div className="font-semibold mb-1">
												{t("customPrint.fastProduction")}
											</div>
											<div className="text-gray-600">
												{t("customPrint.fastProductionText")}
											</div>
										</div>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</div>

			{/* Footer Note */}
			<div className="py-12 bg-white">
				<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<motion.p
						className="text-gray-600"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
					>
						{t("customPrint.footerNote")}
					</motion.p>
				</div>
			</div>
		</section>
	);
}

export default CustomPrintRequest;
