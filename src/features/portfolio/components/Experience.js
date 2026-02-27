'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Building2, Calendar, MapPin } from 'lucide-react';

const Experience = () => {
  const { t, i18n } = useTranslation();

  const experiences = [
    {
      id: 1,
      position: i18n.language === 'th' ? 'นักประชาสัมพันธ์ปฏิบัติการ' : 'Public Relations Practitioner',
      company: i18n.language === 'th' ? 'สำนักงานเขตทวีวัฒนา\nกรุงเทพมหานคร' : 'Thawi Watthana District Office\nBangkok Metropolitan Administration',
      location: i18n.language === 'th' ? 'กรุงเทพฯ, ประเทศไทย' : 'Bangkok, Thailand',
      period: i18n.language === 'th' ? '2568 - ปัจจุบัน' : '2025 - Present',
      responsibilities: i18n.language === 'th' ? [
        'จัดทำสื่อประชาสัมพันธ์ของหน่วยงาน',
        'จัดทำแผนการประชาสัมพันธ์',
        'ดูแลเรื่องร้องเรียนของเขตทวีวัฒนาในระบบ Traffy Fondue'
      ] : [
        'Create public relations media for the agency',
        'Develop public relations plans',
        'Manage district complaints in the Traffy Fondue system'
      ]
    },
    {
      id: 2,
      position: i18n.language === 'th' ? 'เจ้าหน้าที่ระบบงานคอมพิวเตอร์' : 'Computer Systems Officer',
      company: i18n.language === 'th' ? 'กลุ่มเทคโนโลยีสารสนเทศ กองยุทธศาสตร์และแผนงาน\nกรมกิจการสตรีและสถาบันครอบครัว\nกระทรวงการพัฒนาสังคมและความมั่นคงของมนุษย์' : 'IT Group, Strategic Planning Division\nDepartment of Women Affairs and Family Development\nMinistry of Social Development and Human Security',
      location: i18n.language === 'th' ? 'กรุงเทพฯ, ประเทศไทย' : 'Bangkok, Thailand',
      period: i18n.language === 'th' ? '2567 - 2568' : '2024 - 2025',
      responsibilities: i18n.language === 'th' ? [
        'สนับสนุนการพัฒนาเว็บไซต์และระบบของหน่วยงาน รวมทั้งการรักษาความปลอดภัย (Vulnerability Assessment และ Penetration Test)',
        'บูรณาการเทคโนโลยี AI เพื่อลดความซ้ำซ้อนในการดำเนินงานของทีม',
        'สนับสนุนงานเอกสารราชการและระบบสารบัญอิเล็กทรอนิกส์'
      ] : [
        'Support website system development and security (VA Scan & Pen Test)',
        'Integrate AI to reduce redundancy in team operations',
        'Support official documents and electronic filing system'
      ]
    },
    {
      id: 4,
      position: i18n.language === 'th' ? 'เจ้าหน้าที่ช่วยปฏิบัติงานนักพัฒนาสังคม' : 'Assistant Social Development Officer',
      company: i18n.language === 'th' ? 'ศูนย์ปฏิบัติการ กรมกิจการสตรีและสถาบันครอบครัว\nกระทรวงการพัฒนาสังคมและความมั่นคงของมนุษย์' : 'Operations Center\nDepartment of Women Affairs and Family Development\nMinistry of Social Development and Human Security',
      location: i18n.language === 'th' ? 'กรุงเทพฯ, ประเทศไทย' : 'Bangkok, Thailand',
      period: i18n.language === 'th' ? '2565 - 2567' : '2022 - 2024',
      responsibilities: i18n.language === 'th' ? [
        'ดูแลระบบเว็บไซต์ของหน่วยงาน และประสานงานระหว่างผู้พัฒนาระบบกับเจ้าหน้าที่ผู้ใช้งาน',
        'จัดทำสถิติเกี่ยวกับการดำเนินงานของกลุ่ม เพื่อนำเสนอต่อผู้บริหาร',
        'ผลิตวิดีโอและอินโฟกราฟิกการดำเนินงานของกลุ่ม',
        'ออกแบบคู่มือการปฏิบัติงานคุ้มครองผู้ที่ถูกกระทำด้วยความรุนแรงในครอบครัว'
      ] : [
        'Manage organization website systems and coordinate between developers and system users',
        'Compile statistics on group operations for management presentation',
        'Produce videos and infographics for group operations',
        'Design "Manual for Protecting Victims of Domestic Violence"'
      ]
    },
    {
      id: 3,
      position: i18n.language === 'th' ? 'เจ้าหน้าที่ช่วยปฏิบัติงานนักพัฒนาสังคม' : 'Assistant Social Development Officer',
      company: i18n.language === 'th' ? 'กลุ่มส่งเสริมและพัฒนา กองส่งเสริมสถาบันครอบครัว\nกรมกิจการสตรีและสถาบันครอบครัว\nกระทรวงการพัฒนาสังคมและความมั่นคงของมนุษย์' : 'Promotion and Development Group\nFamily Institution Promotion Division\nDepartment of Women Affairs and Family Development\nMinistry of Social Development and Human Security',
      location: i18n.language === 'th' ? 'กรุงเทพฯ, ประเทศไทย' : 'Bangkok, Thailand',
      period: i18n.language === 'th' ? '2565' : '2022',
      responsibilities: i18n.language === 'th' ? [
        'จัดทำสื่อสำหรับกิจกรรมการลงพื้นที่ของหน่วยงาน เช่น อินโฟกราฟิกและสื่อวิดีทัศน์',
        'สนับสนุนงานเอกสารราชการและการประชุมออนไลน์ของกลุ่มงาน'
      ] : [
        'Create media for field activities such as infographics and audiovisual media',
        'Support official document work and online meetings of the working group'
      ]
    },
    {
      id: 4,
      position: i18n.language === 'th' ? 'นักพัฒนาสังคม' : 'Social Development Officer',
      company: i18n.language === 'th' ? 'กลุ่มการพัฒนาสังคมและสวัสดิการ\nสำนักงานพัฒนาสังคมและความมั่นคงของมนุษย์จังหวัดภูเก็ต\nกระทรวงการพัฒนาสังคมและความมั่นคงของมนุษย์' : 'Social Development and Welfare Group\nPhuket Provincial Office of Social Development and Human Security\nMinistry of Social Development and Human Security',
      location: i18n.language === 'th' ? 'ภูเก็ต, ประเทศไทย' : 'Phuket, Thailand',
      period: i18n.language === 'th' ? '2564 - 2565' : '2021 - 2022',
      responsibilities: i18n.language === 'th' ? [
        'จัดทำสื่อประชาสัมพันธ์ของหน่วยงาน',
        'ลงพื้นที่ร่วมกับนักสังคมสงเคราะห์ เพื่อให้ความช่วยเหลือประชาชนกลุ่มเปราะบาง',
        'บันทึกข้อมูลการให้ความช่วยเหลือกลุ่มเปราะบาง ในระบบ MSO Logbook',
        'ลงพื้นที่จัดกิจกรรม CSR ร่วมกับหน่วยงานภายนอก เช่น มูลนิธิบ้านเด็กตะวันฉาย จังหวัดภูเก็ต, Blueicon Foundation, มูลนิธิ Scholars of Sustenance (SOS) จังหวัดภูเก็ต'
      ] : [
        'Create public relations media for the organization',
        'Field work with social welfare officers to help vulnerable groups',
        'Record data on assistance to vulnerable groups in MSO Logbook system',
        'Conduct various CSR activities with external organizations such as Tawan Chai Children\'s Home Foundation Phuket, Blueicon Foundation, Scholars Of Sustenance (SOS) Foundation Phuket'
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-bangkok-50 to-secondary-50 font-bangkok">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title font-saochingcha text-4xl font-bold text-bangkok-800 mb-4">{t('experience.title')}</h2>
          <div className="w-24 h-1 bg-bangkok-600 rounded-full mx-auto"></div>
        </motion.div>

        {/* Grid Layout - Bangkok Style */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group relative overflow-hidden rounded-2xl ${
                index === 0 
                  ? 'bg-gradient-to-br from-bangkok-600 to-bangkok-700 text-white' 
                  : 'bg-white hover:bg-bangkok-50'
              } shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}
            >
              {/* Bangkok Pattern Background */}
              <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full" style={{
                  backgroundImage: `radial-gradient(circle at 25% 25%, currentColor 2px, transparent 2px),
                                   radial-gradient(circle at 75% 75%, currentColor 2px, transparent 2px)`,
                  backgroundSize: '40px 40px'
                }}></div>
              </div>

              <div className="relative p-8">
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    index === 0 
                      ? 'bg-white/20 text-white' 
                      : 'bg-bangkok-100 text-bangkok-700'
                  }`}>
                    <Calendar size={14} className="mr-1" />
                    {exp.period}
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    index === 0 ? 'bg-white/30' : 'bg-bangkok-400'
                  }`}></div>
                </div>

                {/* Position & Company */}
                <div className="mb-6">
                  <h3 className={`text-2xl font-bold mb-3 font-saochingcha ${
                    index === 0 ? 'text-white' : 'text-bangkok-800'
                  }`}>
                    {exp.position}
                  </h3>
                  
                  <div className={`flex items-start space-x-2 mb-3 ${
                    index === 0 ? 'text-bangkok-100' : 'text-bangkok-600'
                  }`}>
                    <Building2 size={18} className="mt-0.5 flex-shrink-0" />
                    <span className="font-medium text-sm leading-relaxed">{exp.company}</span>
                  </div>

                  <div className={`flex items-center space-x-2 ${
                    index === 0 ? 'text-bangkok-200' : 'text-gray-500'
                  }`}>
                    <MapPin size={16} />
                    <span className="text-sm">{exp.location}</span>
                  </div>
                </div>

                {/* Responsibilities */}
                <div>
                  <h4 className={`font-semibold mb-4 ${
                    index === 0 ? 'text-bangkok-100' : 'text-bangkok-700'
                  }`}>
                    {t('experience.responsibilities')}
                  </h4>
                  
                  <div className="space-y-3">
                    {exp.responsibilities.map((resp, respIndex) => (
                      <div key={respIndex} className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          index === 0 ? 'bg-bangkok-300' : 'bg-bangkok-500'
                        }`}></div>
                        <span className={`text-sm leading-relaxed ${
                          index === 0 ? 'text-bangkok-100' : 'text-gray-600'
                        }`}>
                          {resp}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decorative Corner */}
                <div className={`absolute top-4 right-4 w-12 h-12 border-2 border-dashed rounded-full flex items-center justify-center ${
                  index === 0 ? 'border-white/20' : 'border-bangkok-200'
                }`}>
                  <div className={`w-4 h-4 rounded-full ${
                    index === 0 ? 'bg-white/30' : 'bg-bangkok-400'
                  }`}></div>
                </div>
              </div>

              {/* Bottom Accent */}
              <div className={`h-1 ${
                index === 0 
                  ? 'bg-gradient-to-r from-bangkok-400 to-secondary-400' 
                  : 'bg-gradient-to-r from-bangkok-500 to-secondary-500'
              }`}></div>
            </motion.div>
          ))}
        </div>

        {/* Summary Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-bangkok-600 font-saochingcha">5+</div>
              <div className="text-gray-600 font-medium">
                {i18n.language === 'th' ? 'ปีประสบการณ์' : 'Years Experience'}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-bangkok-600 font-saochingcha">2</div>
              <div className="text-gray-600 font-medium">
                {i18n.language === 'th' ? 'หน่วยงานรัฐ' : 'Government Agencies'}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-bangkok-600 font-saochingcha">20+</div>
              <div className="text-gray-600 font-medium">
                {i18n.language === 'th' ? 'โครงการที่สำเร็จ' : 'Completed Projects'}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
