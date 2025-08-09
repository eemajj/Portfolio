import { useTranslation } from 'react-i18next';
import { Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center justify-center w-12 h-12 bg-primary-600 hover:bg-primary-700 rounded-full transition-colors duration-200 mb-8 transform hover:scale-105"
          >
            <ArrowUp size={20} />
          </button>

          {/* Name/Brand */}
          <h3 className="text-2xl font-bold text-white mb-4">
            อิศรา อิศรางกูร ณ อยุธยา
          </h3>
          
          {/* Subtitle */}
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            {t('hero.subtitle')} | Digital Communications Professional
          </p>


          {/* Divider */}
          <div className="w-24 h-1 bg-primary-600 rounded-full mx-auto mb-8"></div>

          {/* Copyright */}
          <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
            <span>{t('footer.copyright')}</span>
            <Heart size={14} className="text-red-500" />
            <span>Made with passion</span>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600"></div>
    </footer>
  );
};

export default Footer;