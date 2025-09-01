import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NotFound404 } from "../components/NotFound404";

export default function NotFound404Page() {
	const navigate = useNavigate();
	const { t } = useTranslation();

	useEffect(() => {
		// Log 404 errors for monitoring
		console.error(`404 Error: ${window.location.pathname}`);
	}, []);

	return (
		<div className="min-h-screen">
			<NotFound404
				onGoBack={() => navigate(-1)}
				onGoHome={() => navigate("/")}
			/>
		</div>
	);
}
