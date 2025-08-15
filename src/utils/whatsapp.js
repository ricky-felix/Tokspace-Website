// WhatsApp Business configuration
export const WHATSAPP_CONFIG = {
	// Your WhatsApp Business phone number (include country code without + sign)
	phoneNumber: "6287746161488",

	// Default message templates
	messageTemplates: {
		en: {
			greeting: "Hello! I would like to order:",
			product: "Product: {productName}",
			variant: "Variant: {variantName}",
			quantity: "Quantity: {quantity}",
			price: "Price: {price}",
			total: "Total: {total}",
			inquiry:
				"Could you please confirm availability and provide payment details?",
			thanks: "Thank you!",
		},
		id: {
			greeting: "Halo! Saya ingin memesan:",
			product: "Produk: {productName}",
			variant: "Varian: {variantName}",
			quantity: "Jumlah: {quantity}",
			price: "Harga: {price}",
			total: "Total: {total}",
			inquiry: "Bisa tolong konfirmasi ketersediaan dan info pembayaran?",
			thanks: "Terima kasih!",
		},
	},
};

// Generate WhatsApp URL
export const generateWhatsAppURL = (phoneNumber, message) => {
	const encodedMessage = encodeURIComponent(message);
	return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

// Format currency for display
export const formatCurrency = (amount, locale = "id-ID") => {
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
	}).format(amount);
};
