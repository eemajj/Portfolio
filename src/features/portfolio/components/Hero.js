'use client';

import { useTranslation } from 'react-i18next';
import { ChevronDown, Mail, Phone, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

import { defaultProfileData } from '../utils/defaultProfileData';

const Hero = () => {
  const { t, i18n } = useTranslation();
  const [profileData, setProfileData] = useState(defaultProfileData);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedProfile = localStorage.getItem('portfolio_profile_data');
      if (savedProfile) {
        try {
          const parsedProfile = JSON.parse(savedProfile);
          setProfileData(parsedProfile);
        } catch (error) {
          // It's okay if parsing fails, we'll just use the default.
        }
      }
    }
  }, []);

  const getPhoneNumber = (lang) => {
    if (!profileData || !profileData.personal || !profileData.personal.phone) {
      return '';
    }

    const phone = profileData.personal.phone;

    if (typeof phone === 'object') {
      return lang === 'th' ? phone.th : phone.en;
    }

    // Handle old string format
    if (lang === 'th') {
      return phone;
    } else {
      return phone.startsWith('0') ? `+66 ${phone.substring(1)}` : phone;
    }
  };

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
    <section id="home" className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden pt-14 sm:pt-16 lg:pt-18">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] flex items-center py-8 sm:py-12">
        <div className="w-full grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight"
            >
              {t('hero.name')}
            </motion.h1>

            {/* Subtitle with Gradient */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6"
            >
              {t('hero.subtitle')}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 px-2 sm:px-0"
            >
              {t('hero.description')}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-2 sm:px-0"
            >
              <button
                onClick={scrollToProjects}
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                <span className="mr-2">{t('hero.cta')}</span>
                <ChevronDown size={18} className="sm:w-5 sm:h-5 rotate-[-90deg]" />
              </button>

              <a
                href="/resume.pdf"
                download="Itsara_Itsarangkura_Resume.pdf"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
              >
                <Download size={18} className="sm:w-5 sm:h-5 mr-2" />
                <span>{i18n.language === 'th' ? 'ดาวน์โหลด Resume' : 'Download Resume'}</span>
              </a>
            </motion.div>

            {/* Contact Info - Hidden on very small screens */}
            {profileData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="hidden sm:flex flex-col md:flex-row gap-4 md:gap-6 justify-center lg:justify-start pt-6 sm:pt-8 text-gray-600 text-sm"
              >
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Phone size={16} className="sm:w-[18px] sm:h-[18px] text-gray-600" />
                  </div>
                  <span className="font-medium truncate">{getPhoneNumber(i18n.language)}</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Mail size={16} className="sm:w-[18px] sm:h-[18px] text-gray-600" />
                  </div>
                  <span className="font-medium truncate">{profileData.personal.email}</span>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right Content - Profile */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative mx-auto w-48 h-48 xs:w-56 xs:h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {/* Background Decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-3xl rotate-6 opacity-20"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-600 rounded-3xl -rotate-6 opacity-20"></div>
              
              {/* Profile Image */}
              <div className="relative z-10 w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden border-4 sm:border-8 border-white">
                <img 
                  src="/profile-image.jpg" 
                  alt="Itsara Itsarangkura Na Ayuttaya"
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl"
              >
                <span className="text-white font-bold text-sm sm:text-lg">💼</span>
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
              >
                <span className="text-white font-bold text-sm">✨</span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <button
          onClick={() => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="flex flex-col items-center text-gray-400 hover:text-blue-600 transition-colors duration-300"
        >
          <span className="text-sm font-medium mb-2">{i18n.language === 'th' ? 'เลื่อนลง' : 'Scroll Down'}</span>
          <ChevronDown size={24} className="animate-bounce" />
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
