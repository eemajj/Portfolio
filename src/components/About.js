import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Calendar } from 'lucide-react';

const About = () => {
  const { t } = useTranslation();

  const personalInfo = [
    {
      icon: Phone,
      label: t('about.phone'),
      value: '091-058-6229'
    },
    {
      icon: Mail,
      label: t('about.email'),
      value: 'j.itsarangkura@gmail.com'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Thailand'
    },
    {
      icon: Calendar,
      label: 'Experience',
      value: '4 Years'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">{t('about.title')}</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-600 leading-relaxed">
              {t('about.description')}
            </p>
            
            <div className="prose prose-lg text-gray-600">
              <p>
                ด้วยประสบการณ์ที่หลากหลายในสาขา Digital Communications ผมมีความเชี่ยวชาญในการสร้าง
                เนื้อหาสื่อดิจิทัล การจัดการโครงการ และการสื่อสารองค์กร พร้อมด้วยทักษะในการใช้เครื่องมือ
                ต่างๆ เช่น Adobe Creative Suite, Video Editing และ CMS platforms
              </p>
            </div>

            {/* Personal Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
              {personalInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="font-medium text-gray-800">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              {/* Profile Image */}
              <div className="w-full h-96 rounded-2xl shadow-lg overflow-hidden">
                <img 
                  src="/about-image.jpeg" 
                  alt="Itsara Itsarangkura Na Ayuttaya - About"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary-500 rounded-full opacity-20"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-secondary-500 rounded-full opacity-20"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;