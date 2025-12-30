import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	base: "./",
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@": "/src",
			"@public": "/public",
		},
	},
	css: {
		modules: {
			generateScopedName:
				process.env.NODE_ENV === "production"
					? "[hash:base64:8]"
					: "[name]__[local]___[hash:base64:5]",
		},
	},
	build: {
		cssCodeSplit: false,
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
				toplevel: false,
				properties: false,
			},
		},
		rollupOptions: {
			output: {
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
				manualChunks: {
					vendor: ["react", "react-dom"],
				},
			},
		},
	},
	json: {
		namedExports: true,
		stringify: true,
	},
});
