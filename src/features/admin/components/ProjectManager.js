'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Eye, 
  Calendar, 
  Image, 
  Video, 
  ExternalLink,
  Search,
  Filter,
  Download
} from 'lucide-react';
import { importDataToLocalStorage } from '../../portfolio/utils/dataImporter';
import { importSimpleData } from '../../portfolio/utils/dataImporterSimple';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [formData, setFormData] = useState({
    title: { th: '', en: '' },
    description: { th: '', en: '' },
    category: '',
    year: '',
    technologies: [],
    features: { th: [], en: [] },
    status: 'completed',
    impact: { th: '', en: '' },
    videoUrl: '',
    manualUrl: '',
    imageUrls: [],
    hasVideo: false,
    hasGallery: false,
    hasMultipleLinks: false
  });

  const categories = [
    'Contest & Competition',
    'Video Production', 
    'Film Production',
    'Manual Design & Development',
    'Social Innovation',
    'Social Campaign & Video Production',
    'Organizational Activity',
    'Training & Development',
    'Digital Technology Meeting',
    'Knowledge Management',
    'Innovation Contest',
    'Data Management',
    'Innovator Skills Workshop',
    'Social Innovation Training',
    'University Project',
    'Social Impact Project',
    'Community Outreach Activity',
    'CSR Project'
  ];

  const statusOptions = [
    { value: 'completed', label: 'เสร็จสิ้น', color: 'green' },
    { value: 'ongoing', label: 'กำลังดำเนินการ', color: 'blue' },
    { value: 'planning', label: 'วางแผน', color: 'yellow' },
    { value: 'paused', label: 'หยุดชั่วคราว', color: 'orange' }
  ];

  // Load projects from localStorage on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('portfolio_projects');
    if (savedProjects) {
      try {
        setProjects(JSON.parse(savedProjects));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error loading projects:', error);
      }
    }
  }, []);

  // Save projects to localStorage when projects change
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem('portfolio_projects', JSON.stringify(projects));
    }
  }, [projects]);

  const handleInputChange = (field, value, lang = null) => {
    if (lang) {
      setFormData(prev => ({
        ...prev,
        [field]: {
          ...prev[field],
          [lang]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleArrayInputChange = (field, value, lang = null) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    if (lang) {
      setFormData(prev => ({
        ...prev,
        [field]: {
          ...prev[field],
          [lang]: items
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: items
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      title: { th: '', en: '' },
      description: { th: '', en: '' },
      category: '',
      year: '',
      technologies: [],
      features: { th: [], en: [] },
      status: 'completed',
      impact: { th: '', en: '' },
      videoUrl: '',
      manualUrl: '',
      imageUrls: [],
      hasVideo: false,
      hasGallery: false,
      hasMultipleLinks: false
    });
    setEditingProject(null);
  };

  const handleSaveProject = () => {
    const projectData = {
      ...formData,
      id: editingProject?.id || Date.now(),
      createdAt: editingProject?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (editingProject) {
      setProjects(prev => prev.map(p => p.id === editingProject.id ? projectData : p));
    } else {
      setProjects(prev => [...prev, projectData]);
    }

    setIsFormOpen(false);
    resetForm();
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setFormData(project);
    setIsFormOpen(true);
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบผลงานนี้?')) {
      setProjects(prev => prev.filter(p => p.id !== projectId));
    }
  };

  const handleImportExistingData = async () => {
    const confirmImport = window.confirm(
      'คุณต้องการนำเข้าข้อมูลผลงานที่มีอยู่แล้วในระบบหรือไม่?\n\n' +
      'จะนำเข้าข้อมูล:\n' +
      '- ผลงาน 19 โปรเจค\n' +
      '- ข้อมูลส่วนตัว\n' +
      '- ข้อมูลตัวอย่างไฟล์สื่อ\n\n' +
      'หากมีข้อมูลอยู่แล้ว ข้อมูลเก่าจะถูกเขียนทับ'
    );

    if (!confirmImport) return;

    try {
      // แสดง loading
      const loadingAlert = 'กำลังนำเข้าข้อมูล...';
      console.log(loadingAlert);
      
      const result = importDataToLocalStorage();
      
      if (result.success) {
        // โหลดข้อมูลใหม่
        try {
          const savedProjects = localStorage.getItem('portfolio_projects');
          if (savedProjects) {
            const parsedProjects = JSON.parse(savedProjects);
            setProjects(parsedProjects);
            console.log('โหลดข้อมูลสำเร็จ:', parsedProjects.length, 'โปรเจค');
          }
          
          alert('✅ นำเข้าข้อมูลเรียบร้อยแล้ว!\n\n' +
                'ข้อมูลที่นำเข้า:\n' +
                '- ผลงาน: ' + (JSON.parse(localStorage.getItem('portfolio_projects') || '[]')).length + ' รายการ\n' +
                '- ข้อมูลส่วนตัว: อัปเดตแล้ว\n' +
                '- ไฟล์สื่อ: ' + (JSON.parse(localStorage.getItem('portfolio_media_files') || '[]')).length + ' ไฟล์');
          
          // รีเฟรชหน้าเพื่อแสดงข้อมูลใหม่
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } catch (parseError) {
          console.error('Parse error:', parseError);
          alert('❌ เกิดปัญหาในการแปลงข้อมูล: ' + parseError.message + '\n\nกรุณาลองใหม่อีกครั้ง');
        }
      } else {
        alert('❌ ' + result.message);
      }
    } catch (error) {
      console.error('Import error:', error);
      alert('❌ เกิดข้อผิดพลาดในการนำเข้าข้อมูล: ' + error.message);
    }
  };

  const filteredProjects = projects.filter(project => {
    // Safe access to project properties
    const titleTh = typeof project.title === 'object' ? project.title.th : project.title || '';
    const titleEn = typeof project.title === 'object' ? project.title.en : project.title || '';
    const category = project.category || '';
    
    const matchesSearch = 
      titleTh.toLowerCase().includes(searchTerm.toLowerCase()) ||
      titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterCategory === 'all' || project.category === filterCategory;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    const statusOption = statusOptions.find(opt => opt.value === status);
    return statusOption ? statusOption.color : 'gray';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">จัดการผลงาน</h2>
          <p className="text-gray-600 mt-1">เพิ่ม แก้ไข และจัดการผลงานของคุณ</p>
          {projects.length === 0 && (
            <p className="text-orange-600 text-sm mt-2 font-medium">
              💡 ยังไม่มีข้อมูลผลงาน - สามารถนำเข้าข้อมูลเดิมได้
            </p>
          )}
        </div>
        <div className="flex items-center space-x-3">
          {projects.length === 0 && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  try {
                    const result = importSimpleData();
                    if (result.success) {
                      const savedProjects = localStorage.getItem('portfolio_projects');
                      if (savedProjects) {
                        setProjects(JSON.parse(savedProjects));
                      }
                      alert('✅ ' + result.message);
                      window.location.reload();
                    } else {
                      alert('❌ ' + result.message);
                    }
                  } catch (error) {
                    alert('❌ เกิดข้อผิดพลาด: ' + error.message);
                  }
                }}
                className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <Download size={14} />
                <span>นำเข้าข้อมูล 5 โปรเจค</span>
              </button>
              <button
                onClick={handleImportExistingData}
                className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                <Download size={14} />
                <span>นำเข้าข้อมูลทั้งหมด</span>
              </button>
            </div>
          )}
          <button
            onClick={() => {
              resetForm();
              setIsFormOpen(true);
            }}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>เพิ่มผลงานใหม่</span>
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="ค้นหาผลงาน..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
            >
              <option value="all">ทุกหมวดหมู่</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 line-clamp-2 text-sm">
                    {typeof project.title === 'object' ? project.title.th : project.title || 'ไม่ระบุชื่อ'}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{project.category}</p>
                </div>
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium bg-${getStatusColor(project.status)}-100 text-${getStatusColor(project.status)}-700`}>
                  {statusOptions.find(s => s.value === project.status)?.label}
                </span>
              </div>

              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {typeof project.description === 'object' ? project.description.th : project.description || 'ไม่มีคำอธิบาย'}
              </p>

              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span className="flex items-center">
                  <Calendar size={12} className="mr-1" />
                  {project.year}
                </span>
                <div className="flex space-x-2">
                  {project.hasVideo && (
                    <Video size={12} className="text-red-500" />
                  )}
                  {project.hasGallery && (
                    <Image size={12} className="text-blue-500" />
                  )}
                  {project.videoUrl && (
                    <ExternalLink size={12} className="text-green-500" />
                  )}
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditProject(project)}
                  className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors text-sm"
                >
                  <Edit size={14} />
                  <span>แก้ไข</span>
                </button>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="flex items-center justify-center px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Eye size={48} className="mx-auto" />
          </div>
          <p className="text-gray-600">
            {searchTerm || filterCategory !== 'all' 
              ? 'ไม่พบผลงานที่ตรงกับเงื่อนไขการค้นหา'
              : 'ยังไม่มีผลงาน เริ่มต้นสร้างผลงานแรกของคุณ'
            }
          </p>
        </div>
      )}

      {/* Project Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {editingProject ? 'แก้ไขผลงาน' : 'เพิ่มผลงานใหม่'}
                  </h3>
                  <button
                    onClick={() => {
                      setIsFormOpen(false);
                      resetForm();
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ชื่อผลงาน (ไทย) *
                    </label>
                    <input
                      type="text"
                      value={formData.title.th}
                      onChange={(e) => handleInputChange('title', e.target.value, 'th')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="กรอกชื่อผลงานเป็นภาษาไทย"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ชื่อผลงาน (English)
                    </label>
                    <input
                      type="text"
                      value={formData.title.en}
                      onChange={(e) => handleInputChange('title', e.target.value, 'en')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter project title in English"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      คำอธิบาย (ไทย) *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.description.th}
                      onChange={(e) => handleInputChange('description', e.target.value, 'th')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="อธิบายผลงานเป็นภาษาไทย"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      คำอธิบาย (English)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.description.en}
                      onChange={(e) => handleInputChange('description', e.target.value, 'en')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Describe project in English"
                    />
                  </div>
                </div>

                {/* Category, Year, Status */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      หมวดหมู่ *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">เลือกหมวดหมู่</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ปี *
                    </label>
                    <input
                      type="text"
                      value={formData.year}
                      onChange={(e) => handleInputChange('year', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="เช่น 2024, 2566"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      สถานะ *
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      {statusOptions.map(status => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    เทคโนโลยี/เครื่องมือ
                  </label>
                  <input
                    type="text"
                    value={formData.technologies.join(', ')}
                    onChange={(e) => handleArrayInputChange('technologies', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="เช่น React, Node.js, MongoDB (คั่นด้วยจุลภาค)"
                  />
                  <p className="text-xs text-gray-500 mt-1">แยกแต่ละรายการด้วยจุลภาค (,)</p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      คุณสมบัติหลัก (ไทย)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.features.th.join(', ')}
                      onChange={(e) => handleArrayInputChange('features', e.target.value, 'th')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="คุณสมบัติ 1, คุณสมบัติ 2, คุณสมบัติ 3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      คุณสมบัติหลัก (English)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.features.en.join(', ')}
                      onChange={(e) => handleArrayInputChange('features', e.target.value, 'en')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Feature 1, Feature 2, Feature 3"
                    />
                  </div>
                </div>

                {/* Impact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ผลลัพธ์/ผลกระทบ (ไทย)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.impact.th}
                      onChange={(e) => handleInputChange('impact', e.target.value, 'th')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="อธิบายผลลัพธ์หรือผลกระทบของผลงาน"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ผลลัพธ์/ผลกระทบ (English)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.impact.en}
                      onChange={(e) => handleInputChange('impact', e.target.value, 'en')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Describe the impact or results"
                    />
                  </div>
                </div>

                {/* URLs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Video URL
                    </label>
                    <input
                      type="url"
                      value={formData.videoUrl}
                      onChange={(e) => handleInputChange('videoUrl', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="https://youtu.be/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Manual/Document URL
                    </label>
                    <input
                      type="url"
                      value={formData.manualUrl}
                      onChange={(e) => handleInputChange('manualUrl', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                {/* Image URLs */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URLs (สำหรับแกลเลอรี)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.imageUrls.join('\n')}
                    onChange={(e) => {
                      const urls = e.target.value.split('\n').map(url => url.trim()).filter(url => url);
                      handleInputChange('imageUrls', urls);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg&#10;..."
                  />
                  <p className="text-xs text-gray-500 mt-1">ใส่ URL รูปภาพแต่ละรูปในบรรทัดใหม่</p>
                </div>

                {/* Checkboxes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.hasVideo}
                      onChange={(e) => handleInputChange('hasVideo', e.target.checked)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">มีวิดีโอ</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.hasGallery}
                      onChange={(e) => handleInputChange('hasGallery', e.target.checked)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">มีแกลเลอรี</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.hasMultipleLinks}
                      onChange={(e) => handleInputChange('hasMultipleLinks', e.target.checked)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">มีหลายลิงก์</span>
                  </label>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setIsFormOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={handleSaveProject}
                  disabled={!formData.title.th || !formData.category || !formData.year}
                  className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save size={16} />
                  <span>{editingProject ? 'บันทึกการแก้ไข' : 'เพิ่มผลงาน'}</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectManager;
