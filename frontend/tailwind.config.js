/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html", 
		"./src/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}"
	],
	presets: [require("@relume_io/relume-tailwind")],
	theme: {
		extend: {},
	},
	prefix: 'tx_', // Adding prefix for obfuscation
	plugins: [],
	// Purge unused styles in production
	purge: {
		enabled: process.env.NODE_ENV === "production",
		content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
	},
	// Class name obfuscation settings
	className: (({ className }) => {
		// Only apply to production builds
		if (process.env.NODE_ENV === 'production') {
			// Skip obfuscation for certain utility classes that might be used in JS
			const skipList = ['hidden', 'block', 'flex', 'grid', 'absolute', 'relative', 'fixed'];
			if (skipList.includes(className)) return className;
			
			// Return the prefixed class name
			return `tx_${className}`;
		}
		return className;
	}),
};
