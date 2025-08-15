import {
	WHATSAPP_CONFIG,
	generateWhatsAppURL,
	formatCurrency,
} from "../utils/whatsapp.js";

export class WhatsAppService {
	/**
	 * Generate WhatsApp order message
	 * @param {Object} orderData - Order details
	 * @param {string} language - Language code (en/id)
	 * @returns {string} WhatsApp URL with pre-filled message
	 */
	static generateOrderMessage(orderData, language = "en") {
		const { productName, variantName, quantity, unitPrice, totalPrice } =
			orderData;

		const templates = WHATSAPP_CONFIG.messageTemplates[language];

		// Build message parts
		const messageParts = [
			templates.greeting,
			"",
			templates.product.replace("{productName}", productName),
		];

		// Add variant if specified
		if (variantName) {
			messageParts.push(
				templates.variant.replace("{variantName}", variantName)
			);
		}

		// Add quantity and pricing
		messageParts.push(
			templates.quantity.replace("{quantity}", quantity),
			templates.price.replace("{price}", formatCurrency(unitPrice))
		);

		// Add total if quantity > 1
		if (quantity > 1) {
			messageParts.push(
				templates.total.replace("{total}", formatCurrency(totalPrice))
			);
		}

		// Add inquiry and closing
		messageParts.push("", templates.inquiry, "", templates.thanks);

		const message = messageParts.join("\n");

		return generateWhatsAppURL(WHATSAPP_CONFIG.phoneNumber, message);
	}

	/**
	 * Generate simple inquiry message for a product
	 * @param {Object} productData - Product details
	 * @param {string} language - Language code (en/id)
	 * @returns {string} WhatsApp URL with pre-filled message
	 */
	static generateInquiryMessage(productData, language = "en") {
		const { productName } = productData;

		const templates = WHATSAPP_CONFIG.messageTemplates[language];

		const message =
			language === "en"
				? `Hello! I'm interested in learning more about: ${productName}\n\nCould you please provide more details and pricing information?\n\nThank you!`
				: `Halo! Saya tertarik untuk mengetahui lebih lanjut tentang: ${productName}\n\nBisa tolong berikan detail dan informasi harga?\n\nTerima kasih!`;

		return generateWhatsAppURL(WHATSAPP_CONFIG.phoneNumber, message);
	}

	/**
	 * Generate custom message
	 * @param {string} customMessage - Custom message text
	 * @returns {string} WhatsApp URL with custom message
	 */
	static generateCustomMessage(customMessage) {
		return generateWhatsAppURL(WHATSAPP_CONFIG.phoneNumber, customMessage);
	}

	/**
	 * Open WhatsApp with generated URL
	 * @param {string} whatsappURL - Generated WhatsApp URL
	 */
	static openWhatsApp(whatsappURL) {
		// Open in new tab/window
		window.open(whatsappURL, "_blank", "noopener,noreferrer");
	}

	/**
	 * Get formatted phone number for display
	 * @returns {string} Formatted phone number
	 */
	static getFormattedPhoneNumber() {
		const phone = WHATSAPP_CONFIG.phoneNumber;
		// Format: +62 812-3456-7890
		return `+${phone.slice(0, 2)} ${phone.slice(2, 5)}-${phone.slice(5, 9)}-${phone.slice(9)}`;
	}
}
