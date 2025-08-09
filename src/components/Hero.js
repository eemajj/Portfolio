import { useTranslation } from 'react-i18next';
import { ChevronDown, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const { t } = useTranslation();

  const scrollToProjects = () => {
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-48 h-48 mx-auto mb-8"
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-200 to-secondary-200 flex items-center justify-center">
              <div className="w-44 h-44 rounded-full bg-white flex items-center justify-center shadow-lg overflow-hidden">
                <img 
                  src="/profile-image.jpg" 
                  alt="Itsara Itsarangkura Na Ayuttaya"
                  className="w-full h-full object-cover rounded-full"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-gray-600"
            >
              {t('hero.greeting')}
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight"
            >
              อิศรา อิศรางกูร ณ อยุธยา
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-xl md:text-2xl text-primary-600 font-semibold"
            >
              {t('hero.subtitle')}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              {t('hero.description')}
            </motion.p>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <button
              onClick={scrollToProjects}
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>{t('hero.cta')}</span>
            </button>
            
            <button
              onClick={scrollToContact}
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <Mail size={18} />
              <span>{t('hero.contact')}</span>
            </button>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="flex justify-center space-x-8 pt-8 text-sm text-gray-600"
          >
            <div className="flex items-center space-x-2">
              <Phone size={16} />
              <span>091-058-6229</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={16} />
              <span>j.itsarangkura@gmail.com</span>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <button
              onClick={scrollToProjects}
              className="text-primary-600 hover:text-primary-700 transition-colors duration-200"
            >
              <ChevronDown size={32} className="animate-bounce" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;