import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
	const { i18n } = useTranslation();

	return (
		<div className="inline-flex items-center gap-1 sm:gap-2">
			<button
				onClick={() => i18n.changeLanguage("en")}
				className={`
          relative overflow-hidden border-none rounded-lg sm:rounded-xl px-3 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold cursor-pointer
          transition-all duration-300 ease-out transform
          ${
						i18n.language === "en"
							? "bg-[#011ad6] text-white translate-y-0 shadow-[0_3px_0_#0013a8,0_4px_10px_rgba(1,26,214,0.4)] sm:shadow-[0_6px_0_#0013a8,0_8px_20px_rgba(1,26,214,0.4)] hover:translate-y-0.5 hover:shadow-[0_2px_0_#0013a8,0_3px_8px_rgba(1,26,214,0.6)] sm:hover:shadow-[0_4px_0_#0013a8,0_6px_15px_rgba(1,26,214,0.6)] hover:bg-[#1129e0] active:translate-y-1 active:shadow-[0_1px_0_#0013a8,0_2px_5px_rgba(1,26,214,0.5)] sm:active:shadow-[0_2px_0_#0013a8,0_4px_10px_rgba(1,26,214,0.5)]"
							: "bg-white text-[#666] border-2 border-[#e0e0e0] translate-y-0 shadow-[0_3px_0_#d0d0d0,0_4px_10px_rgba(0,0,0,0.1)] sm:shadow-[0_6px_0_#d0d0d0,0_8px_20px_rgba(0,0,0,0.1)] hover:translate-y-0.5 hover:shadow-[0_2px_0_#d0d0d0,0_3px_8px_rgba(0,0,0,0.15)] sm:hover:shadow-[0_4px_0_#d0d0d0,0_6px_15px_rgba(0,0,0,0.15)] hover:bg-[#f8f9fa] hover:border-[#d0d0d0] active:translate-y-1 active:shadow-[0_1px_0_#d0d0d0,0_2px_5px_rgba(0,0,0,0.12)] sm:active:shadow-[0_2px_0_#d0d0d0,0_4px_10px_rgba(0,0,0,0.12)]"
					}
          before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:w-0 before:h-0 before:rounded-full before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:transition-all before:duration-600
          ${
						i18n.language === "en"
							? "before:bg-white/30 active:before:w-[150px] active:before:h-[150px] sm:active:before:w-[300px] sm:active:before:h-[300px]"
							: "before:bg-black/10 active:before:w-[150px] active:before:h-[150px] sm:active:before:w-[300px] sm:active:before:h-[300px]"
					}
        `}
			>
				EN
			</button>

			<button
				onClick={() => i18n.changeLanguage("id")}
				className={`
          relative overflow-hidden border-none rounded-lg sm:rounded-xl px-3 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold cursor-pointer
          transition-all duration-300 ease-out transform
          ${
						i18n.language === "id"
							? "bg-[#011ad6] text-white translate-y-0 shadow-[0_3px_0_#0013a8,0_4px_10px_rgba(1,26,214,0.4)] sm:shadow-[0_6px_0_#0013a8,0_8px_20px_rgba(1,26,214,0.4)] hover:translate-y-0.5 hover:shadow-[0_2px_0_#0013a8,0_3px_8px_rgba(1,26,214,0.6)] sm:hover:shadow-[0_4px_0_#0013a8,0_6px_15px_rgba(1,26,214,0.6)] hover:bg-[#1129e0] active:translate-y-1 active:shadow-[0_1px_0_#0013a8,0_2px_5px_rgba(1,26,214,0.5)] sm:active:shadow-[0_2px_0_#0013a8,0_4px_10px_rgba(1,26,214,0.5)]"
							: "bg-white text-[#666] border-2 border-[#e0e0e0] translate-y-0 shadow-[0_3px_0_#d0d0d0,0_4px_10px_rgba(0,0,0,0.1)] sm:shadow-[0_6px_0_#d0d0d0,0_8px_20px_rgba(0,0,0,0.1)] hover:translate-y-0.5 hover:shadow-[0_2px_0_#d0d0d0,0_3px_8px_rgba(0,0,0,0.15)] sm:hover:shadow-[0_4px_0_#d0d0d0,0_6px_15px_rgba(0,0,0,0.15)] hover:bg-[#f8f9fa] hover:border-[#d0d0d0] active:translate-y-1 active:shadow-[0_1px_0_#d0d0d0,0_2px_5px_rgba(0,0,0,0.12)] sm:active:shadow-[0_2px_0_#d0d0d0,0_4px_10px_rgba(0,0,0,0.12)]"
					}
          before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:w-0 before:h-0 before:rounded-full before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:transition-all before:duration-600
          ${
						i18n.language === "id"
							? "before:bg-white/30 active:before:w-[150px] active:before:h-[150px] sm:active:before:w-[300px] sm:active:before:h-[300px]"
							: "before:bg-black/10 active:before:w-[150px] active:before:h-[150px] sm:active:before:w-[300px] sm:active:before:h-[300px]"
					}
        `}
			>
				ID
			</button>
		</div>
	);
};

export default LanguageSwitcher;
