'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Monitor,
  Database,
  Briefcase
} from 'lucide-react';

const Skills = () => {
  const { t, i18n } = useTranslation();

  const skillCategories = [
    {
      title: i18n.language === 'th' ? 'Core PR & Content' : 'Core PR & Content',
      icon: Briefcase,
      color: 'primary',
      skills: i18n.language === 'th' ? [
        'ข่าวองค์กร',
        'Press Kit',
        'วิดีโอและอินโฟกราฟิก',
        'คอนเทนต์เพื่อการสื่อสารองค์กร',
        'การใช้กล้อง DSLR และกล้องถ่ายภาพยนตร์',
        'การถ่ายภาพและการทำหนัง'
      ] : [
        'Corporate News',
        'Press Kit',
        'Video and Infographic',
        'Corporate Communication Content',
        'DSLR & Cinema Camera Operation',
        'Photography & Cinematography'
      ]
    },
    {
      title: 'Post-Production',
      icon: Monitor,
      color: 'secondary',
      skills: [
        'Premiere Pro',
        'After Effects',
        'DaVinci Resolve',
        'Final Cut Pro',
        'Canva',
        'Capcut'
      ]
    },
    {
      title: 'Digital & IT Support',
      icon: Database,
      color: 'primary',
      skills: i18n.language === 'th' ? [
        'การจัดการไฟล์สื่อ',
        'Web Dev',
        'IT Support',
        'Microsoft 365'
      ] : [
        'Media File Management',
        'Web Dev',
        'IT Support',
        'Microsoft 365'
      ]
    },
    {
      title: 'Automation & AI',
      icon: Shield,
      color: 'secondary',
      skills: [
        'Claude (Claude Code)',
        'ManusAI',
        'Gemini (CLI, Veo 3, Jules)',
        'ChatGPT (Codex, Sora)',
        'Local LLMs',
        'N8N'
      ]
    },
    {
      title: 'Programming & Tools',
      icon: Monitor,
      color: 'primary',
      skills: [
        'JavaScript',
        'TypeScript',
        'Ruby on Rails',
        'Reactjs',
        'Vue.js',
        'Docker',
        'Git',
        'VS Code',
        'Cursor',
        'Vim'
      ]
    },
    {
      title: 'CyberSecurity',
      icon: Shield,
      color: 'secondary',
      skills: [
        'OWASP Zap',
        'Wireshark',
        'Basic Vulnerability Scan',
        'Basic Penetration Test'
      ]
    },
    {
      title: 'Operation System',
      icon: Database,
      color: 'primary',
      skills: [
        'macOS',
        'Windows',
        'Linux/Ubuntu'
      ]
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">{t('skills.title')}</h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="card p-4 sm:p-6 lg:p-8 group"
            >
              <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <div className={`p-2 sm:p-3 rounded-lg ${
                  category.color === 'primary' 
                    ? 'bg-bangkok-100 text-bangkok-600' 
                    : 'bg-secondary-100 text-secondary-600'
                } group-hover:scale-110 transition-transform duration-200`}>
                  <category.icon size={20} className="sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">
                  {category.title}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: skillIndex * 0.1 + index * 0.1 
                    }}
                    viewport={{ once: true }}
                    className={`p-2 sm:p-3 rounded-lg ${
                      category.color === 'primary'
                        ? 'bg-bangkok-50 border-l-4 border-bangkok-300'
                        : 'bg-secondary-50 border-l-4 border-secondary-300'
                    } hover:scale-105 transition-transform duration-200`}
                  >
                    <span className="text-gray-700 font-medium text-sm sm:text-base">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;
