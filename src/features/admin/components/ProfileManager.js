'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Save, 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  GraduationCap,
  Award,
  Plus,
  X,
  Check,
  AlertCircle,
  Image
} from 'lucide-react';

import { defaultProfileData } from '../../portfolio/utils/defaultProfileData';

const ProfileManager = () => {
  const [profileData, setProfileData] = useState(defaultProfileData);;

  const [activeSection, setActiveSection] = useState('personal');
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  // Load profile data from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('portfolio_profile_data');
    if (savedProfile) {
      try {
        setProfileData(JSON.parse(savedProfile));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error loading profile:', error);
        showNotification('เกิดข้อผิดพลาดในการโหลดข้อมูล', 'error');
      }
    }
  }, []);

  // Save profile data to localStorage
  useEffect(() => {
    localStorage.setItem('portfolio_profile_data', JSON.stringify(profileData));
  }, [profileData]);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const handleInputChange = (section, field, value, lang = null, index = null) => {
    setProfileData(prev => {
      const newData = { ...prev };
      
      if (index !== null) {
        // For arrays like skills or experience
        if (lang) {
          newData[section][index][field][lang] = value;
        } else {
          newData[section][index][field] = value;
        }
      } else {
        // For regular fields
        if (lang) {
          newData[section][field][lang] = value;
        } else {
          newData[section][field] = value;
        }
      }
      
      return newData;
    });
  };

  const handleArrayInputChange = (section, index, field, value) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    setProfileData(prev => {
      const newData = { ...prev };
      newData[section][index][field] = items;
      return newData;
    });
  };

  const handlePhoneChange = (value) => {
    const thPhone = value;
    const enPhone = value.startsWith('0') ? `+66 ${value.substring(1)}` : value;

    setProfileData(prev => {
      const newData = { ...prev };
      newData.personal.phone = { th: thPhone, en: enPhone };
      return newData;
    });
  };

  const addSkillCategory = () => {
    setProfileData(prev => ({
      ...prev,
      skills: [
        ...prev.skills,
        {
          category: { th: '', en: '' },
          items: []
        }
      ]
    }));
  };

  const removeSkillCategory = (index) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addExperience = () => {
    setProfileData(prev => ({
      ...prev,
      experience: [
        {
          position: { th: '', en: '' },
          company: { th: '', en: '' },
          period: { th: '', en: '' },
          responsibilities: []
        },
        ...prev.experience
      ]
    }));
  };

  const removeExperience = (index) => {
    setProfileData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    showNotification('บันทึกข้อมูลเรียบร้อย', 'success');
  };

  const renderPersonalSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ชื่อ-นามสกุล (ไทย)
          </label>
          <input
            type="text"
            value={profileData.personal.name.th}
            onChange={(e) => handleInputChange('personal', 'name', e.target.value, 'th')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ชื่อ-นามสกุล (English)
          </label>
          <input
            type="text"
            value={profileData.personal.name.en}
            onChange={(e) => handleInputChange('personal', 'name', e.target.value, 'en')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ตำแหน่ง/หน้าที่ (ไทย)
          </label>
          <input
            type="text"
            value={profileData.personal.title.th}
            onChange={(e) => handleInputChange('personal', 'title', e.target.value, 'th')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ตำแหน่ง/หน้าที่ (English)
          </label>
          <input
            type="text"
            value={profileData.personal.title.en}
            onChange={(e) => handleInputChange('personal', 'title', e.target.value, 'en')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Mail size={16} className="inline mr-1" />
            อีเมล
          </label>
          <input
            type="email"
            value={profileData.personal.email}
            onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Phone size={16} className="inline mr-1" />
            เบอร์โทรศัพท์
          </label>
          <input
            type="tel"
            value={profileData.personal.phone.th}
            onChange={(e) => handlePhoneChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LINE ID
          </label>
          <input
            type="text"
            value={profileData.personal.line}
            onChange={(e) => handleInputChange('personal', 'line', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            เกี่ยวกับตัวเอง (ไทย)
          </label>
          <textarea
            rows={4}
            value={profileData.personal.bio.th}
            onChange={(e) => handleInputChange('personal', 'bio', e.target.value, 'th')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            เกี่ยวกับตัวเอง (English)
          </label>
          <textarea
            rows={4}
            value={profileData.personal.bio.en}
            onChange={(e) => handleInputChange('personal', 'bio', e.target.value, 'en')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Image size={16} className="inline mr-1" />
            URL รูปโปรไฟล์
          </label>
          <input
            type="url"
            value={profileData.personal.profileImage}
            onChange={(e) => handleInputChange('personal', 'profileImage', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="/profile-image.jpg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Image size={16} className="inline mr-1" />
            URL รูป About
          </label>
          <input
            type="url"
            value={profileData.personal.aboutImage}
            onChange={(e) => handleInputChange('personal', 'aboutImage', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="/about-image.jpeg"
          />
        </div>
      </div>
    </div>
  );

  const renderSkillsSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">ทักษะและความสามารถ</h3>
        <button
          onClick={addSkillCategory}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>เพิ่มหมวดหมู่</span>
        </button>
      </div>

      <div className="space-y-4">
        {profileData.skills.map((skill, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-800">หมวดหมู่ที่ {index + 1}</h4>
              <button
                onClick={() => removeSkillCategory(index)}
                className="text-red-600 hover:bg-red-50 p-1 rounded transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ชื่อหมวดหมู่ (ไทย)
                </label>
                <input
                  type="text"
                  value={skill.category.th}
                  onChange={(e) => handleInputChange('skills', 'category', e.target.value, 'th', index)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ชื่อหมวดหมู่ (English)
                </label>
                <input
                  type="text"
                  value={skill.category.en}
                  onChange={(e) => handleInputChange('skills', 'category', e.target.value, 'en', index)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ทักษะ/เครื่องมือ (คั่นด้วยจุลภาค)
              </label>
              <textarea
                rows={2}
                value={skill.items.join(', ')}
                onChange={(e) => handleArrayInputChange('skills', index, 'items', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="React, Node.js, JavaScript, ..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderExperienceSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">ประสบการณ์การทำงาน</h3>
        <button
          onClick={addExperience}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>เพิ่มประสบการณ์</span>
        </button>
      </div>

      <div className="space-y-6">
        {profileData.experience.map((exp, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-800">ประสบการณ์ที่ {index + 1}</h4>
              <button
                onClick={() => removeExperience(index)}
                className="text-red-600 hover:bg-red-50 p-1 rounded transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ตำแหน่งงาน (ไทย)
                </label>
                <input
                  type="text"
                  value={exp.position.th}
                  onChange={(e) => handleInputChange('experience', 'position', e.target.value, 'th', index)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ตำแหน่งงาน (English)
                </label>
                <input
                  type="text"
                  value={exp.position.en}
                  onChange={(e) => handleInputChange('experience', 'position', e.target.value, 'en', index)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  หน่วยงาน (ไทย)
                </label>
                <textarea
                  rows={2}
                  value={exp.company.th}
                  onChange={(e) => handleInputChange('experience', 'company', e.target.value, 'th', index)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  หน่วยงาน (English)
                </label>
                <textarea
                  rows={2}
                  value={exp.company.en}
                  onChange={(e) => handleInputChange('experience', 'company', e.target.value, 'en', index)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ช่วงเวลา (ไทย)
                </label>
                <input
                  type="text"
                  value={exp.period.th}
                  onChange={(e) => handleInputChange('experience', 'period', e.target.value, 'th', index)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="2567 - ปัจจุบัน"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ช่วงเวลา (English)
                </label>
                <input
                  type="text"
                  value={exp.period.en}
                  onChange={(e) => handleInputChange('experience', 'period', e.target.value, 'en', index)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="2024 - Present"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                หน้าที่ความรับผิดชอบ (ไทย|English - คั่นด้วย |)
              </label>
              <textarea
                rows={3}
                value={exp.responsibilities.map(r => `${r.th}|${r.en}`).join('\n')}
                onChange={(e) => {
                  const responsibilities = e.target.value.split('\n').map(line => {
                    const [th = '', en = ''] = line.split('|');
                    return { th: th.trim(), en: en.trim() };
                  }).filter(r => r.th || r.en);
                  handleInputChange('experience', 'responsibilities', responsibilities, null, index);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="หน้าที่ภาษาไทย|Responsibility in English"
              />
              <p className="text-xs text-gray-500 mt-1">แยกแต่ละหน้าที่ด้วยบรรทัดใหม่ และแยกภาษาไทย-อังกฤษด้วย |</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEducationSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">การศึกษา</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            คณะ/สาขา (ไทย)
          </label>
          <input
            type="text"
            value={profileData.education.degree.th}
            onChange={(e) => handleInputChange('education', 'degree', e.target.value, 'th')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            คณะ/สาขา (English)
          </label>
          <input
            type="text"
            value={profileData.education.degree.en}
            onChange={(e) => handleInputChange('education', 'degree', e.target.value, 'en')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            สถาบันการศึกษา (ไทย)
          </label>
          <input
            type="text"
            value={profileData.education.institution.th}
            onChange={(e) => handleInputChange('education', 'institution', e.target.value, 'th')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            สถาบันการศึกษา (English)
          </label>
          <input
            type="text"
            value={profileData.education.institution.en}
            onChange={(e) => handleInputChange('education', 'institution', e.target.value, 'en')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          ปีที่จบการศึกษา
        </label>
        <input
          type="text"
          value={profileData.education.year}
          onChange={(e) => handleInputChange('education', 'year', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 md:w-48"
          placeholder="2020"
        />
      </div>

      <div>
        <h4 className="text-md font-semibold text-gray-800 mb-4">ทักษะด้านภาษา</h4>
        <div className="space-y-4">
          {profileData.languages.map((lang, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ภาษา
                </label>
                <input
                  type="text"
                  value={lang.language}
                  onChange={(e) => {
                    const newLanguages = [...profileData.languages];
                    newLanguages[index].language = e.target.value;
                    setProfileData(prev => ({ ...prev, languages: newLanguages }));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ระดับ
                </label>
                <input
                  type="text"
                  value={lang.level}
                  onChange={(e) => {
                    const newLanguages = [...profileData.languages];
                    newLanguages[index].level = e.target.value;
                    setProfileData(prev => ({ ...prev, languages: newLanguages }));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ความชำนาญ (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={lang.proficiency}
                  onChange={(e) => {
                    const newLanguages = [...profileData.languages];
                    newLanguages[index].proficiency = parseInt(e.target.value) || 0;
                    setProfileData(prev => ({ ...prev, languages: newLanguages }));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const sections = [
    { id: 'personal', label: 'ข้อมูลส่วนตัว', icon: User },
    { id: 'skills', label: 'ทักษะ', icon: Award },
    { id: 'experience', label: 'ประสบการณ์', icon: Briefcase },
    { id: 'education', label: 'การศึกษา', icon: GraduationCap }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'personal':
        return renderPersonalSection();
      case 'skills':
        return renderSkillsSection();
      case 'experience':
        return renderExperienceSection();
      case 'education':
        return renderEducationSection();
      default:
        return renderPersonalSection();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">จัดการข้อมูลส่วนตัว</h2>
          <p className="text-gray-600 mt-1">แก้ไขข้อมูลส่วนตัวและประวัติของคุณ</p>
        </div>
        <button
          onClick={handleSave}
          className="btn-primary flex items-center space-x-2"
        >
          <Save size={16} />
          <span>บันทึกข้อมูล</span>
        </button>
      </div>

      {/* Section Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeSection === section.id
                  ? 'bg-primary-100 text-primary-700 border border-primary-200'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <section.icon size={16} />
              <span className="font-medium">{section.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </div>

      {/* Notification */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <div className={`flex items-center space-x-2 px-4 py-3 rounded-lg shadow-lg ${
              notification.type === 'success' 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
            }`}>
              {notification.type === 'success' ? (
                <Check size={16} />
              ) : (
                <AlertCircle size={16} />
              )}
              <span>{notification.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileManager;
