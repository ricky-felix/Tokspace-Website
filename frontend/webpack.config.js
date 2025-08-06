const path = require("path"); // Node.js path module for resolving paths
import { webpackPlugin as utwm } from "unplugin-tailwindcss-mangle";

module.exports = {
	// Entry point(s) of your application
	entry: "./src/index.js", // Assuming your main application file is in src/index.js

	// Output configuration for bundled files
	output: {
		filename: "bundle.js", // Name of the bundled output file
		path: path.resolve(__dirname, "dist"), // Absolute path to the output directory
	},

	// Add other configurations as needed (e.g., loaders, plugins)
	// module: {
	//   rules: [
	//     // Loader rules for different file types (e.g., JavaScript, CSS)
	//   ],
	// },
	// plugins: [
	//   // Webpack plugins for various tasks (e.g., HTML generation, code splitting)
	// ],
};
