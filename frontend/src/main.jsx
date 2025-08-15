import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./css/index.css";
import App from "./App.jsx";
import "./i18n";

/*
	Loading component for suspense fallback
	const Loading = () => (
	  <div className="flex items-center justify-center h-screen">
	    <p>Loading...</p>
	  </div>
	);
*/

createRoot(document.getElementById("root")).render(
	<StrictMode>
		{/* <Suspense fallback={<Loading />}> */}
		<BrowserRouter>
			<App />
		</BrowserRouter>
		{/* </Suspense> */}
	</StrictMode>
);
