'use client';

import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload } from 'lucide-react';
import { useProjectData } from '../../portfolio/contexts/ProjectDataContext';
import ForceResetProjects from './ForceResetProjects';

const SimpleProjectManager = () => {
  const { projects, addProject, updateProject, deleteProject, isLoading, uploadProjectImage } = useProjectData();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    year: '',
    status: 'completed',
    videoUrl: '',
    manualUrl: '',
    impact: '',
    technologies: [],
    features: [],
    imageUrls: [],
    hasVideo: false,
    hasGallery: false,
    hasMultipleLinks: false
  });
  const [uploadingImages, setUploadingImages] = useState(false);

  // เอา loadSampleData ออก เพื่อป้องกัน error

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      year: '',
      status: 'completed',
      videoUrl: '',
      manualUrl: '',
      impact: '',
      technologies: [],
      features: [],
      imageUrls: [],
      hasVideo: false,
      hasGallery: false,
      hasMultipleLinks: false
    });
    setEditingProject(null);
  };

  const handleSave = () => {
    if (!formData.title) {
      alert('กรุณาใส่ชื่อผลงาน');
      return;
    }

    // อัพเดทฟีเจอร์ flags ตามข้อมูลที่มี
    const projectData = {
      ...formData,
      hasVideo: Boolean(formData.videoUrl),
      hasGallery: Boolean(formData.imageUrls && formData.imageUrls.length > 0),
      hasMultipleLinks: Boolean(formData.videoUrl && formData.manualUrl)
    };

    if (editingProject) {
      updateProject(editingProject.id, projectData);
    } else {
      addProject(projectData);
    }

    setIsFormOpen(false);
    resetForm();
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData(project);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('ต้องการลบผลงานนี้หรือไม่?')) {
      deleteProject(id);
    }
  };

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    // ตรวจสอบจำนวนรูปทั้งหมด
    const currentImageCount = (formData.imageUrls || []).length;
    const maxImages = 5;
    
    if (currentImageCount + files.length > maxImages) {
      alert(`⚠️ สามารถอัปโหลดได้สูงสุด ${maxImages} รูปต่อผลงาน\n\nปัจจุบันมี: ${currentImageCount} รูป\nพยายามเพิ่ม: ${files.length} รูป`);
      return;
    }

    // ตรวจสอบขนาดไฟล์
    const maxSizePerFile = 2 * 1024 * 1024; // 2MB per file
    const oversizedFiles = files.filter(file => file.size > maxSizePerFile);
    
    if (oversizedFiles.length > 0) {
      const fileNames = oversizedFiles.map(f => f.name).join(', ');
      alert(`⚠️ ไฟล์เหล่านี้ใหญ่เกิน 2MB:\n\n${fileNames}\n\nกรุณาลดขนาดรูปก่อนอัปโหลด`);
      return;
    }

    setUploadingImages(true);
    try {
      const uploadPromises = files.map(file => uploadProjectImage(file));
      const imageUrls = await Promise.all(uploadPromises);
      
      setFormData(prev => ({
        ...prev,
        imageUrls: [...(prev.imageUrls || []), ...imageUrls]
      }));
      
      alert(`✅ อัปโหลดรูป ${files.length} รูปเรียบร้อยแล้ว`);
    } catch (error) {
      alert('❌ เกิดข้อผิดพลาดในการอัปโหลดรูป');
      // eslint-disable-next-line no-console
      console.error('Image upload error:', error);
    } finally {
      setUploadingImages(false);
    }
  };

  const removeImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, index) => index !== indexToRemove)
    }));
  };

  
  const addSampleData = () => {
    // ใช้ข้อมูลจาก ProjectDataContext แทน
    alert('✅ ระบบใช้ข้อมูลจาก Context แล้ว ไม่ต้องกดปุ่มนี้');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-500">กำลังโหลดข้อมูล...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Force Reset Component */}
      <ForceResetProjects />
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">จัดการผลงาน (แบบง่าย)</h2>
          <p className="text-gray-600 mt-1">เพิ่ม แก้ไข และจัดการผลงานของคุณ</p>
        </div>
        <div className="flex space-x-2">
          {projects.length === 0 && (
            <button
              onClick={addSampleData}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              เพิ่มข้อมูลทั้งหมด (20 ผลงาน)
            </button>
          )}
          <button
            onClick={() => {
              resetForm();
              setIsFormOpen(true);
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} />
            <span>เพิ่มผลงานใหม่</span>
          </button>
        </div>
      </div>

      {/* Form */}
      {isFormOpen && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {editingProject ? 'แก้ไขผลงาน' : 'เพิ่มผลงานใหม่'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อผลงาน *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="ใส่ชื่อผลงาน"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">หมวดหมู่</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">เลือกหมวดหมู่</option>
                <option value="Contest & Competition">การประกวด</option>
                <option value="Video Production">ผลิตวิดีโอ</option>
                <option value="Film Production">ผลิตภาพยนตร์</option>
                <option value="Social Innovation">นวัตกรรมสังคม</option>
                <option value="Manual Design">ออกแบบคู่มือ</option>
                <option value="Training & Development">การฝึกอบรม</option>
                <option value="Social Campaign">รณรงค์สังคม</option>
                <option value="Organizational Activity">กิจกรรมองค์กร</option>
                <option value="Digital Technology Meeting">การประชุมเทคโนโลยี</option>
                <option value="Knowledge Management">การจัดการความรู้</option>
                <option value="Innovation Contest">ประกวดนวัตกรรม</option>
                <option value="Data Management">การจัดการข้อมูล</option>
                <option value="Innovator Skills Workshop">เวิร์คช็อปทักษะนวัตกร</option>
                <option value="Social Innovation Training">อบรมนวัตกรรมสังคม</option>
                <option value="University Project">โปรเจคมหาวิทยาลัย</option>
                <option value="Social Impact Project">โปรเจคเพื่อสังคม</option>
                <option value="Community Outreach Activity">กิจกรรมเพื่อชุมชน</option>
                <option value="CSR Project">โปรเจค CSR</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ปี</label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="2024"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">สถานะ</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="completed">เสร็จสิ้น</option>
                <option value="ongoing">กำลังดำเนินการ</option>
                <option value="planning">วางแผน</option>
                <option value="paused">หยุดชั่วคราว</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">คำอธิบาย</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="อธิบายผลงาน..."
            />
          </div>
          
          {/* ผลลัพธ์/ผลกระทบ */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">ผลลัพธ์/ผลกระทบ</label>
            <textarea
              value={formData.impact}
              onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="ผลที่ได้จากผลงานนี้ เช่น ได้รางวัล, เข้ารอบสุดท้าย, เป็นมาตรฐาน..."
            />
          </div>
          
          {/* เทคโนโลยี/ทักษะ */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              เทคโนโลยี/ทักษะ 
              <span className="text-xs text-gray-500">(คั่นด้วยจุลภาค ,)</span>
            </label>
            <input
              type="text"
              value={Array.isArray(formData.technologies) ? formData.technologies.join(', ') : (formData.technologies || '')}
              onChange={(e) => {
                const techArray = e.target.value.split(',').map(t => t.trim()).filter(t => t);
                setFormData({ ...formData, technologies: techArray });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="React, Node.js, Video Production, Canva, Photoshop"
            />
          </div>
          
          {/* คุณสมบัติหลัก */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              คุณสมบัติหลัก 
              <span className="text-xs text-gray-500">(คั่นด้วยขีด |)</span>
            </label>
            <textarea
              value={Array.isArray(formData.features) ? formData.features.join(' | ') : (formData.features || '')}
              onChange={(e) => {
                const featArray = e.target.value.split('|').map(f => f.trim()).filter(f => f);
                setFormData({ ...formData, features: featArray });
              }}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="ผลิตวิดีโอคุณภาพสูง | เข้ารอบ 10 ผลงานสุดท้าย | สร้างความตระหนักทางสังคม"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ลิงก์วิดีโอ</label>
              <input
                type="url"
                value={formData.videoUrl}
                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="https://youtube.com/..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ลิงก์คู่มือ/เอกสาร</label>
              <input
                type="url"
                value={formData.manualUrl}
                onChange={(e) => setFormData({ ...formData, manualUrl: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="https://canva.com/..."
              />
            </div>
          </div>
          
          {/* อัปโหลดรูปผลงาน */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              รูปผลงาน 
              <span className="text-xs text-red-600 ml-2">
                (แนะนำ: รูปละไม่เกิน 2MB, ไม่ควรเกิน 5 รูป)
              </span>
            </label>
            <div className="flex items-center space-x-3">
              <label className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
                <Upload size={16} />
                <span>{uploadingImages ? 'กำลังอัปโหลด...' : 'เลือกรูป'}</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImages}
                  className="hidden"
                />
              </label>
              {formData.imageUrls && formData.imageUrls.length > 0 && (
                <span className="text-sm text-green-600">
                  {formData.imageUrls.length} รูป
                </span>
              )}
            </div>
            
            {/* แสดงรูปที่อัปโหลด */}
            {formData.imageUrls && formData.imageUrls.length > 0 && (
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-2">รูปที่อัปโหลด:</p>
                <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                  {formData.imageUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-20 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => {
                setIsFormOpen(false);
                resetForm();
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <X size={16} />
              <span>ยกเลิก</span>
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save size={16} />
              <span>บันทึก</span>
            </button>
          </div>
        </div>
      )}

      {/* Project List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          รายการผลงาน ({projects.length} รายการ)
        </h3>
        
        {projects.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>ยังไม่มีผลงาน</p>
            <p className="text-sm mt-1">คลิก &quot;เพิ่มข้อมูลตัวอย่าง&quot; หรือ &quot;เพิ่มผลงานใหม่&quot;</p>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{project.title}</h4>
                    <p className="text-gray-600 text-sm mt-1">{project.description}</p>
                    {project.impact && (
                      <div className="mt-2 p-2 bg-green-50 rounded text-xs text-green-700">
                        <strong>ผลลัพธ์:</strong> {project.impact}
                      </div>
                    )}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-700">
                        <strong>เทคโนโลยี:</strong> {project.technologies.join(', ')}
                      </div>
                    )}
                    {project.features && project.features.length > 0 && (
                      <div className="mt-2 p-2 bg-purple-50 rounded text-xs text-purple-700">
                        <strong>คุณสมบัติ:</strong> {project.features.join(' | ')}
                      </div>
                    )}
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>หมวด: {project.category || 'ไม่ระบุ'}</span>
                      <span>ปี: {project.year || 'ไม่ระบุ'}</span>
                      <span className={`px-2 py-1 rounded-full ${
                        project.status === 'completed' ? 'bg-green-100 text-green-700' :
                        project.status === 'ongoing' ? 'bg-blue-100 text-blue-700' :
                        project.status === 'planning' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {project.status === 'completed' ? 'เสร็จสิ้น' :
                         project.status === 'ongoing' ? 'กำลังดำเนินการ' :
                         project.status === 'planning' ? 'วางแผน' : 'หยุดชั่วคราว'}
                      </span>
                      {project.videoUrl && (
                        <a 
                          href={project.videoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          ดูวิดีโอ
                        </a>
                      )}
                      {project.manualUrl && (
                        <a 
                          href={project.manualUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:text-purple-800"
                        >
                          ดูคู่มือ
                        </a>
                      )}
                      {project.imageUrls && project.imageUrls.length > 0 && (
                        <span className="text-green-600">
                          รูป {project.imageUrls.length} รูป
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(project)}
                      className="flex items-center space-x-1 px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                    >
                      <Edit size={14} />
                      <span>แก้ไข</span>
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="flex items-center space-x-1 px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={14} />
                      <span>ลบ</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleProjectManager;
