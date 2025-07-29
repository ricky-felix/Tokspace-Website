import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center space-x-2">
      <button 
        onClick={() => changeLanguage('en')} 
        className={`px-2 py-1 text-sm rounded ${i18n.language === 'en' ? 'bg-[#ff6523] text-white' : 'bg-gray-200 text-black hover:bg-gray-300'}`}
      >
        EN
      </button>
      <button 
        onClick={() => changeLanguage('id')} 
        className={`px-2 py-1 text-sm rounded ${i18n.language === 'id' ? 'bg-[#ff6523] text-white' : 'bg-gray-200 text-black hover:bg-gray-300'}`}
      >
        ID
      </button>
    </div>
  );
};

export default LanguageSwitcher;