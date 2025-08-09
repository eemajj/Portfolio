import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Building2, Calendar, MapPin } from 'lucide-react';

const Experience = () => {
  const { t, i18n } = useTranslation();

  const experiences = [
    {
      id: 1,
      position: i18n.language === 'th' ? 'เจ้าหน้าที่ระบบงานคอมพิวเตอร์' : 'Computer Systems Officer',
      company: i18n.language === 'th' ? 'กลุ่มเทคโนโลยีสารสนเทศ, กองยุทธศาสตร์และแผนงาน, กรมกิจการสตรีและสถาบันครอบครัว, กระทรวง พม.' : 'IT Group, Strategic Planning Division, Department of Women Affairs and Family Development, Ministry of Social Development and Human Security',
      location: i18n.language === 'th' ? 'กรุงเทพฯ, ประเทศไทย' : 'Bangkok, Thailand',
      period: i18n.language === 'th' ? '2567 - ปัจจุบัน' : '2024 - Present',
      responsibilities: i18n.language === 'th' ? [
        'สนับสนุนการพัฒนาเว็บไซต์ระบบของหน่วยงานและความปลอดภัย (VA Scan & Pen Test)',
        'บูรณาการ AI เพื่อลดความซ้ำซ้อนในการทำงานของทีม'
      ] : [
        'Support website system development and security (VA Scan & Pen Test)',
        'Integrate AI to reduce redundancy in team operations'
      ]
    },
    {
      id: 2,
      position: i18n.language === 'th' ? 'เจ้าหน้าที่ช่วยปฏิบัติงานนักพัฒนาสังคม' : 'Assistant Social Development Officer',
      company: i18n.language === 'th' ? 'ศูนย์ปฏิบัติการกรมกิจการสตรีและสถาบันครอบครัว, กระทรวง พม.' : 'Operations Center, Department of Women Affairs and Family Development, Ministry of Social Development and Human Security',
      location: i18n.language === 'th' ? 'กรุงเทพฯ, ประเทศไทย' : 'Bangkok, Thailand',
      period: i18n.language === 'th' ? '2565 - 2567' : '2022 - 2024',
      responsibilities: i18n.language === 'th' ? [
        'ดูแลระบบเว็บไซต์ของหน่วยงาน และประสานงานระหว่างผู้พัฒนาระบบกับเจ้าหน้าที่ที่ใช้งานระบบ',
        'จัดทำสถิติเกี่ยวกับการดำเนินงานของกลุ่มเพื่อนำเสนอผู้บริหาร',
        'ผลิตวิดิโอและ Infographic การดำเนินงานของกลุ่ม',
        'ออกแบบ "คู่มือการปฏิบัติงานคุ้มครองผู้ถูกกระทำด้วยความรุนแรงในครอบครัว"'
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
      company: i18n.language === 'th' ? 'กลุ่มส่งเสริมและพัฒนา, กองส่งเสริมสถาบันครอบครัว กรมกิจการสตรีและสถาบันครอบครัว, กระทรวง พม.' : 'Promotion and Development Group, Family Institution Promotion Division, Department of Women Affairs and Family Development, Ministry of Social Development and Human Security',
      location: i18n.language === 'th' ? 'กรุงเทพฯ, ประเทศไทย' : 'Bangkok, Thailand',
      period: '2565',
      responsibilities: i18n.language === 'th' ? [
        'จัดทำสื่อสำหรับกิจกรรมการลงพื้นที่ของหน่วยงาน เช่น Infographic และสื่อวิดิทัศน์',
        'สนับสนุนงานเอกสารราชการและการประชุมออนไลน์ของกลุ่มงาน'
      ] : [
        'Create media for field activities such as infographics and audiovisual media',
        'Support official document work and online meetings of the working group'
      ]
    },
    {
      id: 4,
      position: i18n.language === 'th' ? 'นักพัฒนาสังคม' : 'Social Development Officer',
      company: i18n.language === 'th' ? 'กลุ่มการพัฒนาสังคมและสวัสดิการ, สำนักงานพัฒนาสังคมและความมั่นคงของมนุษย์ จ.ภูเก็ต, กระทรวง พม.' : 'Social Development and Welfare Group, Phuket Provincial Office of Social Development and Human Security, Ministry of Social Development and Human Security',
      location: i18n.language === 'th' ? 'ภูเก็ต, ประเทศไทย' : 'Phuket, Thailand',
      period: i18n.language === 'th' ? '2564 - 2565' : '2021 - 2022',
      responsibilities: i18n.language === 'th' ? [
        'จัดทำสื่อประชาสัมพันธ์ของหน่วยงาน',
        'ลงพื้นที่ร่วมกับนักสังคมสงเคราะห์เพื่อให้ความช่วยเหลือประชาชนกลุ่มเปราะบาง',
        'บันทึกข้อมูลการให้ความช่วยเหลือกลุ่มเปราะบางในระบบ MSO Logbook',
        'ลงพื้นที่จัดกิจกรรม CSR ต่างๆ ร่วมกับหน่วยงานภายนอก เช่น มูลนิธิบ้านเด็กตะวันฉาย จ.ภูเก็ต, Blueicon Foundation, มูลนิธิ Scholars Of Sustenance (SOS) จ.ภูเก็ต'
      ] : [
        'Create public relations media for the organization',
        'Field work with social welfare officers to help vulnerable groups',
        'Record data on assistance to vulnerable groups in MSO Logbook system',
        'Conduct various CSR activities with external organizations such as Tawan Chai Children\'s Home Foundation Phuket, Blueicon Foundation, Scholars Of Sustenance (SOS) Foundation Phuket'
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">{t('experience.title')}</h2>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-200 transform md:-translate-x-0.5"></div>

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col md:items-start`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-primary-600 rounded-full transform -translate-x-2 md:-translate-x-2 z-10 border-4 border-white shadow-lg"></div>

                {/* Content Card */}
                <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                }`}>
                  <div className="card p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          {exp.position}
                        </h3>
                        <div className="flex items-center space-x-2 text-primary-600 mb-2">
                          <Building2 size={16} />
                          <span className="font-medium">{exp.company}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin size={14} />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-700 mb-3">
                        {i18n.language === 'th' ? 'ความรับผิดชอบ:' : 'Responsibilities:'}
                      </h4>
                      <ul className="space-y-2">
                        {exp.responsibilities.map((resp, respIndex) => (
                          <li key={respIndex} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-600 text-sm">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;