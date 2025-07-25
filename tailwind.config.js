// Tailwind.config.js
module.exports = {
	content: ["./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}"],
	presets: [require("@relume_io/relume-tailwind")],
};

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [],
	// Purge unused styles in production
	purge: {
		enabled: process.env.NODE_ENV === "production",
		content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
	},
};
