
'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Languages, ChevronDown } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en' as const, name: 'English', flag: '🇺🇸' },
    { code: 'de' as const, name: 'Deutsch', flag: '🇩🇪' },
  ];

  const handleLanguageChange = (langCode: 'en' | 'de') => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-colors"
        type="button"
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Languages className="h-4 w-4" />
        {languages.find(l => l.code === language)?.flag}
        <span className="hidden sm:inline">
          {languages.find(l => l.code === language)?.name}
        </span>
        <ChevronDown className={`h-3 w-3 opacity-50 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none first:rounded-t-md last:rounded-b-md ${
                language === lang.code ? 'bg-orange-50 text-orange-700' : ''
              }`}
            >
              <span className="mr-2">{lang.flag}</span>
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
