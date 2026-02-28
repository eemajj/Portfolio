import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe } from 'lucide-react';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'th' ? 'en' : 'th';
    i18n.changeLanguage(newLang);
  };

  const navItems = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'education', href: '#education' },
    { key: 'experience', href: '#experience' },
    { key: 'skills', href: '#skills' },
    { key: 'projects', href: '#projects' },
    { key: 'contact', href: '#contact' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-gradient-to-r from-bangkok-700 to-bangkok-800 backdrop-blur-md shadow-lg z-[9999] border-b border-bangkok-600">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 lg:h-18 w-full">
          
          {/* Logo/Brand - Simplified for mobile */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => scrollToSection('#home')}
              className="flex items-center space-x-2 group focus:outline-none focus:ring-2 focus:ring-secondary-400 rounded-lg p-1"
              aria-label="Go to home"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <h1 className="text-lg font-bold text-white group-hover:text-secondary-200 transition-colors duration-200 hidden sm:block">
                Portfolio
              </h1>
            </button>
          </div>

          {/* Desktop Navigation - Responsive */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className="relative px-2 lg:px-3 xl:px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg text-sm lg:text-base font-medium transition-all duration-200 group whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-secondary-400"
                aria-label={`Navigate to ${t(`nav.${item.key}`)}`}
              >
                {t(`nav.${item.key}`)}
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-secondary-300 group-hover:w-4/5 transition-all duration-300 rounded-full"></span>
              </button>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-400"
              aria-label="Change language"
            >
              <Globe size={16} />
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
              className="lg:hidden p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-400"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu - Enhanced */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen 
          ? 'max-h-screen opacity-100 translate-y-0' 
          : 'max-h-0 opacity-0 -translate-y-2'
      }`}>
        <div className="border-t border-bangkok-600 bg-gradient-to-b from-bangkok-700 to-bangkok-800 backdrop-blur-md shadow-lg">
          <div className="px-3 sm:px-4 py-3 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {navItems.map((item, index) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className="flex items-center w-full px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg text-base font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-400 group"
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                <span className="w-2 h-2 bg-secondary-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                {t(`nav.${item.key}`)}
              </button>
            ))}
            
            {/* Mobile Language Toggle */}
            <div className="pt-3 mt-3 border-t border-bangkok-600">
              <button
                onClick={toggleLanguage}
                className="flex items-center justify-center w-full px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg text-base font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-400"
              >
                <Globe size={18} className="mr-3" />
                {i18n.language === 'th' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;