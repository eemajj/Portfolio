'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Calendar, ChevronDown, X } from 'lucide-react';

import { defaultProfileData } from '../utils/defaultProfileData';

const About = () => {
  const { t, i18n } = useTranslation();
  const [profileData, setProfileData] = useState(defaultProfileData);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

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

  // Photo gallery - รูปภาพของ Itsara
  const photoGallery = [
    { src: '/photo1.jpeg', alt: 'Itsara - Photo 1' },
    { src: '/photo2.jpg', alt: 'Itsara - Photo 2' },
    { src: '/photo3.jpg', alt: 'Itsara - Photo 3' },
    { src: '/photo4.jpg', alt: 'Itsara - Photo 4' },
    { src: '/photo5.jpg', alt: 'Itsara - Photo 5' },
    { src: '/photo6.jpg', alt: 'Itsara - Photo 6' },
    { src: '/photo7.jpg', alt: 'Itsara - Photo 7' },
    { src: '/photo8.jpg', alt: 'Itsara - Photo 8' }
  ];

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

  const formatLocation = (location) => {
    if (!location) return '';
    
    if (typeof location === 'object') {
      return i18n.language === 'th' ? location.th : location.en;
    }
    
    return location;
  };

  const visiblePhotos = showAllPhotos ? photoGallery : photoGallery.slice(0, 4);

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t('about.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-bangkok-500 to-secondary-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            
            {/* Description */}
            <div className="space-y-6">
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                {t('about.description')}
              </p>
            </div>

            {/* Key Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-bangkok-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-bangkok-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800">
                    {i18n.language === 'th' ? 'ประสบการณ์' : 'Experience'}
                  </h4>
                </div>
                <p className="text-sm sm:text-base text-gray-600">
                  {i18n.language === 'th'
                    ? '5+ ปี ในงานประชาสัมพันธ์ดิจิทัล'
                    : '5+ Years Digital PR Experience'
                  }
                </p>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-secondary-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800">
                    {i18n.language === 'th' ? 'สถานที่' : 'Location'}
                  </h4>
                </div>
                <p className="text-sm sm:text-base text-gray-600">
                  {formatLocation(profileData?.personal?.location)}
                </p>
              </div>
            </div>

            {/* Contact Information */}
            {profileData && (
              <div className="bg-gradient-to-br from-bangkok-50 to-secondary-50 p-6 sm:p-8 rounded-xl border border-bangkok-200">
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  {i18n.language === 'th' ? 'ติดต่อ' : 'Contact Info'}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <Phone className="w-5 h-5 text-bangkok-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wide">
                        {i18n.language === 'th' ? 'โทรศัพท์' : 'Phone'}
                      </p>
                      <p className="font-semibold text-gray-800">
                        {getPhoneNumber(i18n.language)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <Mail className="w-5 h-5 text-secondary-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wide">
                        {i18n.language === 'th' ? 'อีเมล' : 'Email'}
                      </p>
                      <p className="font-semibold text-gray-800">
                        {profileData.personal.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Right Column - Photo Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 text-center lg:text-left">
              {i18n.language === 'th' ? 'แกลเลอรี่' : 'Gallery'}
            </h3>

            {/* Photo Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {visiblePhotos.map((photo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative aspect-square rounded-xl overflow-hidden shadow-lg cursor-pointer group"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <span className="text-gray-800 text-xs">+</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Show More/Less Button */}
            {photoGallery.length > 4 && (
              <motion.button
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                onClick={() => setShowAllPhotos(!showAllPhotos)}
                className="w-full py-3 px-4 bg-white border-2 border-bangkok-300 text-bangkok-700 font-semibold rounded-xl hover:bg-bangkok-50 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>
                  {showAllPhotos 
                    ? (i18n.language === 'th' ? 'แสดงน้อยลง' : 'Show Less')
                    : (i18n.language === 'th' ? 'แสดงทั้งหมด' : 'Show All')
                  }
                </span>
                <ChevronDown 
                  className={`w-4 h-4 transition-transform duration-300 ${
                    showAllPhotos ? 'rotate-180' : ''
                  }`} 
                />
              </motion.button>
            )}
          </motion.div>

        </div>
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors duration-200 z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              className="w-full h-full object-contain rounded-xl"
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default About;
