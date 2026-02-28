import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Calendar } from 'lucide-react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';

import { defaultProfileData } from '../utils/defaultProfileData';

const About = () => {
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
    if (lang === 'th') {
      return phone;
    } else {
      return phone.startsWith('0') ? `+66 ${phone.substring(1)}` : phone;
    }
  };

  const personalInfo = [
    { icon: Phone, label: t('about.phone'), value: getPhoneNumber(i18n.language) },
    { icon: Mail, label: t('about.email'), value: profileData.personal.email },
    { icon: MapPin, label: 'Location', value: 'Thailand' },
    { icon: Calendar, label: 'Experience', value: '4 Years' }
  ];

  return (
    <section id="about" className="py-20 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
            {t('about.title')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {i18n.language === 'th' ? 'เกี่ยวกับผม' : 'About Me'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {i18n.language === 'th' 
              ? 'ผู้เชี่ยวชาญด้านการสื่อสารดิจิทัลและการสร้างเนื้อหาสร้างสรรค์'
              : 'Digital Communications Specialist & Creative Content Creator'
            }
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content - About Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Main Description */}
            <div className="prose prose-lg text-gray-600 mb-8">
              <p className="text-lg leading-relaxed mb-6">
                {t('about.description')}
              </p>
              
              <p className="text-lg leading-relaxed">
                {i18n.language === 'th' 
                  ? 'ด้วยประสบการณ์ที่หลากหลายในสายงาน digital communications ผมมีความเชี่ยวชาญในการสร้างสรรค์เนื้อหาดิจิทัล การบริหารจัดการโครงการ และการสื่อสารองค์กร'
                  : 'With diverse experience in digital communications, I specialize in digital content creation, project management, and corporate communications.'
                }
              </p>
            </div>

            {/* Key Highlights */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">4+</div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">
                  {i18n.language === 'th' ? 'ปีประสบการณ์' : 'Years Experience'}
                </div>
              </div>
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
                <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">20+</div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">
                  {i18n.language === 'th' ? 'โครงการสำเร็จ' : 'Projects Completed'}
                </div>
              </div>
            </div>

            {/* Contact Information Cards */}
            <div className="space-y-3 sm:space-y-4">
              {personalInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-gray-500 font-medium">{item.label}</p>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Photo Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main Gallery Container */}
            <div className="relative">
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                effect={'fade'}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true
                }}
                loop={true}
                modules={[Autoplay, EffectFade, Pagination]}
                className="w-full aspect-[4/3] sm:aspect-[3/2] lg:aspect-[16/10] rounded-3xl shadow-2xl overflow-hidden"
              >
                {photoGallery.map((photo, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative w-full h-full">
                      <img 
                        src={photo.src} 
                        alt={photo.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Floating Decoration Elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-3 -right-3 sm:-top-6 sm:-right-6 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-white text-lg sm:text-xl">📸</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-3 -left-3 sm:-bottom-6 sm:-left-6 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-white text-sm sm:text-lg">✨</span>
              </motion.div>
            </div>

            {/* Background Decorative Shapes */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-200 to-purple-200 rounded-3xl -z-10 opacity-20 blur-xl"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
