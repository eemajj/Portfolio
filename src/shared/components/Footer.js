'use client';

import { useTranslation } from 'react-i18next';
import { Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const { t, i18n } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-bangkok-800 to-bangkok-900 text-white py-12 relative font-bangkok">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center justify-center w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all duration-200 mb-8 transform hover:scale-105"
          >
            <ArrowUp size={20} className="text-white" />
          </button>

          {/* Name/Brand */}
          <h3 className="text-2xl font-bold text-white mb-4 font-saochingcha">
            {t('hero.name')}
          </h3>
          
          {/* Subtitle */}
          <p className="text-bangkok-200 mb-8 max-w-md mx-auto">
            {t('hero.subtitle')}
          </p>

          {/* Divider */}
          <div className="w-24 h-1 bg-secondary-400 rounded-full mx-auto mb-8"></div>

          {/* Copyright */}
          <div className="flex items-center justify-center space-x-2 text-bangkok-200 text-sm">
            <span>{t('footer.copyright')}</span>
            <Heart size={14} className="text-secondary-400" />
            <span>{i18n.language === 'th' ? 'สร้างด้วยความใส่ใจ' : 'Made with passion for Bangkok'}</span>
          </div>
        </div>
      </div>

      {/* Decorative Elements - Bangkok Green Gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary-400 via-secondary-300 to-secondary-400"></div>
      
      {/* Bangkok Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, white 2px, transparent 2px),
                           radial-gradient(circle at 80% 50%, white 2px, transparent 2px)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
    </footer>
  );
};

export default Footer;
