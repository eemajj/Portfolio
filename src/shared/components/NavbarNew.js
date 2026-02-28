'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, Home, User, GraduationCap, Briefcase, Code, FolderOpen, Mail } from 'lucide-react';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleLanguage = () => {
    const newLang = i18n.language === 'th' ? 'en' : 'th';
    i18n.changeLanguage(newLang);
  };

  const navItems = [
    { key: 'home', href: '#home', icon: Home },
    { key: 'about', href: '#about', icon: User },
    { key: 'education', href: '#education', icon: GraduationCap },
    { key: 'experience', href: '#experience', icon: Briefcase },
    { key: 'skills', href: '#skills', icon: Code },
    { key: 'projects', href: '#projects', icon: FolderOpen },
    { key: 'contact', href: '#contact', icon: Mail }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      // Calculate offset for fixed navbar
      const offset = 80;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  // Track active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.key);
      const scrollPosition = window.scrollY + 100; // Offset for navbar height

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <>
      {/* Main Navbar */}
      <nav className="fixed top-0 left-0 right-0 w-full bg-white shadow-lg z-50 border-b border-gray-200">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-18 w-full">
            
            {/* Logo/Brand */}
            <div className="flex-shrink-0">
              <button 
                onClick={() => scrollToSection('#home')}
                className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-bangkok-400 rounded-lg p-2"
                aria-label="Go to home"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-bangkok-500 to-bangkok-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">I</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-gray-800 group-hover:text-bangkok-600 transition-colors duration-200">
                    Itsara
                  </h1>
                  <p className="text-xs text-gray-500 -mt-1">
                    {i18n.language === 'th' ? 'ดิจิทัล พีอาร์' : 'Digital PR'}
                  </p>
                </div>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => scrollToSection(item.href)}
                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg group focus:outline-none focus:ring-2 focus:ring-bangkok-400 ${
                      isActive 
                        ? 'text-bangkok-700 bg-bangkok-50' 
                        : 'text-gray-600 hover:text-bangkok-600 hover:bg-gray-50'
                    }`}
                    aria-label={`Navigate to ${t(`nav.${item.key}`)}`}
                  >
                    {t(`nav.${item.key}`)}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-0.5 bg-bangkok-500 rounded-full"></span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-bangkok-600 hover:bg-gray-50 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-bangkok-400"
                aria-label="Change language"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {i18n.language === 'th' ? 'ไทย' : 'EN'}
                </span>
                <span className="sm:hidden">
                  {i18n.language === 'th' ? 'TH' : 'EN'}
                </span>
              </button>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-bangkok-600 hover:bg-gray-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-bangkok-400"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen 
            ? 'max-h-screen opacity-100' 
            : 'max-h-0 opacity-0'
        }`}>
          <div className="border-t border-gray-200 bg-white shadow-lg">
            <div className="px-4 py-3 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeSection === item.key;
                
                return (
                  <button
                    key={item.key}
                    onClick={() => scrollToSection(item.href)}
                    className={`flex items-center w-full px-4 py-3 text-left font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-bangkok-400 ${
                      isActive
                        ? 'text-bangkok-700 bg-bangkok-50 border border-bangkok-200'
                        : 'text-gray-600 hover:text-bangkok-600 hover:bg-gray-50'
                    }`}
                    style={{
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                    <span className="flex-1">
                      {t(`nav.${item.key}`)}
                    </span>
                    {isActive && (
                      <div className="w-2 h-2 bg-bangkok-500 rounded-full"></div>
                    )}
                  </button>
                );
              })}
              
              {/* Mobile Language Toggle */}
              <div className="pt-3 mt-3 border-t border-gray-200">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center justify-center w-full px-4 py-3 text-gray-600 hover:text-bangkok-600 hover:bg-gray-50 rounded-xl text-base font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-bangkok-400"
                >
                  <Globe className="w-5 h-5 mr-3" />
                  {i18n.language === 'th' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile overlay when menu is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
