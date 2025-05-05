import React, { useState } from 'react';

const Language = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = [
    'English',
    'Chinese',
  ];

  const handleLanguageSelect = (lang) => {
    setSelectedLanguage(lang);
    console.log('切换语言到：', lang);
    // 这里可以添加重新渲染页面的逻辑
  };

  return (
    <div 
      className="navbar-language"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="current-language flex items-center">
        <span className="text-gray-400">{selectedLanguage}</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          fill="currentColor" 
          className="ml-1"
          viewBox="0 0 16 16"
        >
          <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/>
        </svg>
      </div>
      {isHovered && (
        <div className="language-dropdown">
          {languages.map((lang, index) => (
            <div
              key={index}
              className={`language-option ${selectedLanguage === lang ? 'text-gray-400' : ''}`}
              onClick={() => handleLanguageSelect(lang)}
            >
              {lang}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Language;
