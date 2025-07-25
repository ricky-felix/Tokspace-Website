import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";

// https://vite.dev/config/
export default defineConfig({
	base: "./",
	plugins: [
		react(),
		tailwindcss(),
		obfuscatorPlugin({
			options: {
				compact: true,
				controlFlowFlattening: true,
				controlFlowFlatteningThreshold: 0.75,
				numbersToExpressions: true,
				simplify: true,
				stringArrayShuffle: true,
				splitStrings: true,
				stringArrayThreshold: 0.75,
				unicodeEscapeSequence: false,
				// Additional obfuscation options
				deadCodeInjection: true,
				deadCodeInjectionThreshold: 0.4,
				debugProtection: false, // Keep false to avoid issues
				disableConsoleOutput: true,
				identifierNamesGenerator: "hexadecimal",
				rotateStringArray: true,
				selfDefending: true,
				stringArray: true,
				transformObjectKeys: true,
			},
			apply: "build",
		}),
	],
	css: {
		modules: {
			// Configure CSS Modules for better obfuscation
			generateScopedName:
				process.env.NODE_ENV === "production"
					? "[hash:base64:8]"
					: "[name]__[local]___[hash:base64:5]",
		},
	},
	build: {
		minify: "terser",
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
				pure_funcs: [
					"console.log",
					"console.info",
					"console.debug",
					"console.warn",
				],
			},
			mangle: {
				// Mangle all variable names for better obfuscation
				toplevel: true,
			},
		},
		// Additional build optimizations
		rollupOptions: {
			output: {
				// Obfuscate chunk file names
				chunkFileNames:
					process.env.NODE_ENV === "production"
						? "assets/[hash].js"
						: "assets/[name]-[hash].js",
				entryFileNames:
					process.env.NODE_ENV === "production"
						? "assets/[hash].js"
						: "assets/[name]-[hash].js",
				assetFileNames:
					process.env.NODE_ENV === "production"
						? "assets/[hash].[ext]"
						: "assets/[name]-[hash].[ext]",
			},
		},
	},
});
