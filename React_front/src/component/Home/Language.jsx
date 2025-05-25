import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../../context/LanguageContext';

const Language = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const { language, toggleLanguage } = useLanguage();

  const languages = [
    'English',
    'Chinese',
  ];

  const handleLanguageSelect = (lang) => {
    toggleLanguage(lang);
    console.log('切换语言到：', lang);
  };

  // 计算下拉菜单位置
  useEffect(() => {
    if (isHovered) {
      const languageElement = document.querySelector('.navbar-language');
      if (languageElement) {
        const rect = languageElement.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX
        });
      }
    }
  }, [isHovered]);

  return (
    <>
      <div 
        className="navbar-language"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="current-language flex items-center">
          <span className="text-gray-400" style={{ fontSize: '0.4rem' }}>{language}</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="0.4rem" 
            height="0.4rem" 
            fill="currentColor" 
            className="ml-1"
            style={{ 
              transform: isHovered ? 'rotate(180deg)' : 'rotate(0deg)', 
              transition: 'transform 0.2s ease',
              marginLeft: '0.25rem'
            }}
            viewBox="0 0 16 16"
          >
            <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/>
          </svg>
        </div>
      </div>
      {isHovered && createPortal(
        <div 
          style={{
            position: 'absolute',
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            backgroundColor: 'white',
            boxShadow: '0 0.05rem 0.25rem rgba(0,0,0,0.1)',
            borderRadius: '0.2rem',
            minWidth: '2.375rem',
            zIndex: 1000,
            overflow: 'hidden'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {languages.map((lang, index) => (
            <div
              key={index}
              style={{
                padding: '0.2rem 0.4rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                backgroundColor: language === lang ? '#f5f5f5' : 'transparent',
                fontSize: '0.35rem'
              }}
              onClick={() => handleLanguageSelect(lang)}
            >
              {lang}
            </div>
          ))}
        </div>,
        document.body
      )}
    </>
  );
};

export default Language;
