import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen, Calendar, MapPin, Star, FileText, ExternalLink } from 'lucide-react';

const Education = () => {
  const { t, i18n } = useTranslation();

  const education = [
    {
      id: 1,
      degree: i18n.language === 'th' ? 'ปริญญาตรี' : 'Bachelor\'s Degree',
      major: i18n.language === 'th' ? 'สาขา นวัตกรรมสื่อสารมวลชน-ภาพยนตร์ดิจิทัล' : 'Mass Communication Innovation - Digital Film Major',
      university: i18n.language === 'th' ? 'คณะนิเทศศาสตร์ มหาวิทยาลัยหอการค้าไทย' : 'Faculty of Communication Arts, University of the Thai Chamber of Commerce',
      location: i18n.language === 'th' ? 'กรุงเทพฯ, ประเทศไทย' : 'Bangkok, Thailand',
      period: i18n.language === 'th' ? '2563' : '2020',
      gpa: '2.67',
      description: i18n.language === 'th' 
        ? 'สำเร็จการศึกษาระดับปริญญาตรี คณะนิเทศศาสตร์ สาขาภาพยนตร์ดิจิทัล จากมหาวิทยาลัยหอการค้าไทย'
        : 'Graduated with Bachelor\'s degree in Digital Film from Faculty of Communication Arts, University of the Thai Chamber of Commerce',
      achievements: i18n.language === 'th' ? [
        'จบสาขาภาพยนตร์ดิจิทัล',
        'มีความรู้ด้านการสื่อสารและสื่อดิจิทัล',
        'พื้นฐานที่แข็งแกร่งด้านการผลิตสื่อ'
      ] : [
        'Graduated in Digital Film major',
        'Knowledge in communication and digital media',
        'Strong foundation in media production'
      ]
    }
  ];

  const certifications = [
    {
      id: 1,
      name: 'GDCC - Machine Learning และ AI',
      organization: 'GDCC',
      year: '2023-2024',
      type: 'government',
      status: 'Certified',
      description: i18n.language === 'th' 
        ? 'หลักสูตร Machine Learning และ Artificial Intelligence เพื่อพัฒนาประสิทธิภาพข้อมูลภาครัฐ'
        : 'Machine Learning and Artificial Intelligence course for developing government data efficiency',
      pdfUrl: '/certificates/gdcc-ai-ml.pdf',
      hasPdf: true
    },
    {
      id: 2,
      name: 'GDCC - Chatbot Design',
      organization: 'GDCC',
      year: '2023-2024',
      type: 'government',
      status: 'Certified',
      description: i18n.language === 'th' 
        ? 'หลักสูตรการออกแบบและพัฒนา Chatbot สำหรับบริการภาครัฐ'
        : 'Chatbot Design and Development course for government services',
      pdfUrl: '/certificates/gdcc-chatbot.pdf',
      hasPdf: true
    },
    {
      id: 3,
      name: 'GDCC - Security',
      organization: 'GDCC',
      year: '2023-2024',
      type: 'government',
      status: 'Certified',
      description: i18n.language === 'th' 
        ? 'หลักสูตรความปลอดภัยระบบสารสนเทศและไซเบอร์ซีเคียวริตี้ภาครัฐ'
        : 'Information System Security and Cybersecurity course for government sector',
      pdfUrl: '/certificates/gdcc-security.pdf',
      hasPdf: true
    },
    {
      id: 4,
      name: 'Team Talent กองส่งเสริมสถาบันครอบครัว',
      organization: 'กรมกิจการสตรีและสถาบันครอบครัว',
      year: '2566',
      type: 'professional',
      status: 'Certified',
      description: i18n.language === 'th' 
        ? 'ประกาศนียบัตร Team Talent กองส่งเสริมสถาบันครอบครัว ประจำปีงบประมาณ 2566'
        : 'Team Talent Certificate from Family Institution Promotion Division, fiscal year 2566',
      pdfUrl: '/certificates/team-talent-2566.pdf',
      hasPdf: true
    },
    {
      id: 5,
      name: 'นวัตกรด้านสังคมรุ่นใหม่',
      organization: 'กรมกิจการสตรีและสถาบันครอบครัว',
      year: '2566',
      type: 'professional',
      status: 'Certified',
      description: i18n.language === 'th' 
        ? 'นวัตกรด้านสังคมรุ่นใหม่ของกรมกิจการสตรีและสถาบันครอบครัว ประจำปี 2566'
        : 'New Generation Social Innovator of Department of Women Affairs and Family Development, 2566',
      pdfUrl: '/certificates/social-innovator-2566.pdf',
      hasPdf: true
    },
    {
      id: 6,
      name: 'PDPA และ ROPA',
      organization: 'กรมกิจการสตรีและสถาบันครอบครัว',
      year: '2568',
      type: 'professional',
      status: 'Certified',
      description: i18n.language === 'th' 
        ? 'หลักสูตรความรู้เกี่ยวกับการคุ้มครองข้อมูลส่วนบุคคล (PDPA) และการจัดทำบันทึกกิจกรรมการประมวลผลข้อมูลส่วนบุคคล (ROPA)'
        : 'Personal Data Protection Act (PDPA) and Record of Processing Activities (ROPA) course',
      pdfUrl: '/certificates/pdpa-ropa-2568.pdf',
      hasPdf: true
    },
    {
      id: 7,
      name: 'Thammasat University English Test',
      organization: 'Thammasat University',
      year: 'Not specified',
      type: 'language',
      status: 'Certified',
      description: i18n.language === 'th' 
        ? 'Paper-based Test Score 470'
        : 'Paper-based Test Score 470',
      pdfUrl: '/certificates/thammasat-english-test.pdf',
      hasPdf: true
    },
    {
      id: 8,
      name: 'การสอบวัดความรู้ความสามารถทั่วไป ก.พ. (ภาค ก.)',
      organization: 'สำนักงาน ก.พ.',
      year: 'Not specified',
      type: 'government',
      status: 'Certified',
      description: i18n.language === 'th' 
        ? 'ผ่านการสอบวัดความรู้ความสามารถทั่วไปของข้าราชการพลเรือน ภาค ก. (GAT) สำนักงานคณะกรรมการข้าราชการพลเรือน'
        : 'Passed General Aptitude Test (GAT) Part A for Civil Servants by Office of the Civil Service Commission',
      pdfUrl: '/certificates/ocsc-gat-part-a.pdf',
      hasPdf: true
    }
  ];

  const skills = [
    {
      category: i18n.language === 'th' ? 'ทักษะเทคนิค' : 'Technical Skills',
      items: [
        'Adobe Creative Suite',
        'Video Editing (Premiere Pro, After Effects)',
        'Photography & Videography',
        'Social Media Management',
        'Content Management Systems'
      ]
    },
    {
      category: i18n.language === 'th' ? 'ทักษะการสื่อสาร' : 'Communication Skills',
      items: [
        i18n.language === 'th' ? 'การสื่อสารองค์กร' : 'Corporate Communications',
        i18n.language === 'th' ? 'การประชาสัมพันธ์' : 'Public Relations',
        i18n.language === 'th' ? 'การนำเสนอ' : 'Presentation Skills',
        i18n.language === 'th' ? 'การเขียนเนื้อหา' : 'Content Writing',
        i18n.language === 'th' ? 'ภาษาอังกฤษ' : 'English Proficiency'
      ]
    }
  ];

  const getCertificationColor = (type) => {
    const colors = {
      cybersecurity: 'bg-red-100 text-red-800',
      creative: 'bg-purple-100 text-purple-800',
      marketing: 'bg-green-100 text-green-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <section id="education" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">{t('education.title')}</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center space-x-2">
              <GraduationCap className="text-primary-600" size={28} />
              <span>{i18n.language === 'th' ? 'การศึกษา' : 'Education'}</span>
            </h3>

            {education.map((edu) => (
              <div key={edu.id} className="card p-6 mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-800 mb-1">
                      {edu.degree}
                    </h4>
                    <p className="text-primary-600 font-semibold mb-2">
                      {edu.major}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center space-x-1">
                        <BookOpen size={14} />
                        <span>{edu.university}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{edu.period}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin size={14} />
                        <span>{edu.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="flex items-center space-x-1 text-primary-600 font-bold">
                      <Star size={16} />
                      <span>{t('education.gpa')} {edu.gpa}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {edu.description}
                </p>

                <div>
                  <h5 className="font-semibold text-gray-700 mb-2">
                    {i18n.language === 'th' ? 'ความสำเร็จ:' : 'Achievements:'}
                  </h5>
                  <ul className="space-y-1">
                    {edu.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="flex items-start space-x-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Certifications & Skills Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {/* Certifications */}
            <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center space-x-2">
              <Award className="text-primary-600" size={28} />
              <span>{i18n.language === 'th' ? 'ใบรับรอง' : 'Certifications'}</span>
            </h3>

            <div className="space-y-4 mb-12">
              {certifications.map((cert) => (
                <div key={cert.id} className="card p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 mb-1">{cert.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{cert.organization}</p>
                      <p className="text-xs text-gray-500 mb-2">{cert.description}</p>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCertificationColor(cert.type)}`}>
                          {cert.type}
                        </span>
                        <span className="text-xs text-gray-500">{cert.year}</span>
                      </div>
                      {cert.hasPdf && (
                        <div className="mt-3">
                          <a
                            href={cert.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-xs font-medium transition-colors duration-200"
                          >
                            <FileText size={14} />
                            <span>{i18n.language === 'th' ? 'ดูใบรับรอง' : 'View Certificate'}</span>
                            <ExternalLink size={12} />
                          </a>
                        </div>
                      )}
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      cert.status === 'Certified' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {cert.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Skills Summary */}
            <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center space-x-2">
              <BookOpen className="text-primary-600" size={28} />
              <span>{i18n.language === 'th' ? 'ทักษะหลัก' : 'Core Skills'}</span>
            </h3>

            <div className="space-y-6">
              {skills.map((skillGroup, skillIndex) => (
                <div key={skillIndex} className="card p-4">
                  <h4 className="font-bold text-gray-800 mb-3">{skillGroup.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, itemIndex) => (
                      <span
                        key={itemIndex}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-700 hover:bg-primary-200 transition-colors duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
