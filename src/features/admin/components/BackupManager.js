'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, 
  Upload, 
  Database, 
  FileText, 
  Image, 
  User, 
  Check, 
  AlertCircle,
  RefreshCw,
  Calendar,
  Archive,
  Trash2,
  Copy,
  Settings
} from 'lucide-react';

const BackupManager = () => {
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [backupHistory, setBackupHistory] = useState([]);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const getCurrentData = () => {
    const projects = JSON.parse(localStorage.getItem('portfolio_projects') || '[]');
    const mediaFiles = JSON.parse(localStorage.getItem('portfolio_media_files') || '[]');
    const profileData = JSON.parse(localStorage.getItem('portfolio_profile_data') || '{}');
    
    return {
      projects,
      mediaFiles,
      profileData,
      exportDate: new Date().toISOString(),
      version: '1.0.0',
      description: 'Portfolio Backup Data'
    };
  };

  const getDataStats = () => {
    const data = getCurrentData();
    return {
      projects: data.projects.length,
      mediaFiles: data.mediaFiles.length,
      skills: data.profileData.skills?.length || 0,
      experience: data.profileData.experience?.length || 0,
      totalSize: JSON.stringify(data).length
    };
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const exportAllData = async () => {
    setIsExporting(true);
    
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const data = getCurrentData();
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Add to backup history
      const newBackup = {
        id: Date.now(),
        date: new Date().toISOString(),
        type: 'full',
        size: jsonString.length,
        stats: getDataStats()
      };
      
      setBackupHistory(prev => [newBackup, ...prev].slice(0, 10));
      showNotification('ส่งออกข้อมูลเรียบร้อย', 'success');
    } catch (error) {
      showNotification('เกิดข้อผิดพลาดในการส่งออกข้อมูล', 'error');
    }
    
    setIsExporting(false);
  };

  const exportProjects = async () => {
    try {
      const projects = JSON.parse(localStorage.getItem('portfolio_projects') || '[]');
      const data = {
        projects,
        exportDate: new Date().toISOString(),
        type: 'projects_only'
      };
      
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `projects-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showNotification('ส่งออกผลงานเรียบร้อย', 'success');
    } catch (error) {
      showNotification('เกิดข้อผิดพลาดในการส่งออกผลงาน', 'error');
    }
  };

  const exportProfile = async () => {
    try {
      const profileData = JSON.parse(localStorage.getItem('portfolio_profile_data') || '{}');
      const data = {
        profileData,
        exportDate: new Date().toISOString(),
        type: 'profile_only'
      };
      
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `profile-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showNotification('ส่งออกข้อมูลส่วนตัวเรียบร้อย', 'success');
    } catch (error) {
      showNotification('เกิดข้อผิดพลาดในการส่งออกข้อมูลส่วนตัว', 'error');
    }
  };

  const importData = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsImporting(true);
    
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      // Validate data structure
      if (!data.exportDate) {
        throw new Error('Invalid backup file format');
      }

      // Show confirmation dialog
      const confirmImport = window.confirm(
        `คุณต้องการนำเข้าข้อมูลจาก ${new Date(data.exportDate).toLocaleDateString('th-TH')} หรือไม่?\n\n` +
        'ข้อมูลปัจจุบันจะถูกเขียนทับ:\\n' +
        `- ผลงาน: ${data.projects?.length || 0} รายการ\n` +
        `- ไฟล์สื่อ: ${data.mediaFiles?.length || 0} ไฟล์\n` +
        `- ข้อมูลส่วนตัว: ${data.profileData ? 'มี' : 'ไม่มี'}`
      );

      if (!confirmImport) {
        setIsImporting(false);
        return;
      }

      // Import data based on type
      if (data.type === 'projects_only') {
        if (data.projects) {
          localStorage.setItem('portfolio_projects', JSON.stringify(data.projects));
        }
      } else if (data.type === 'profile_only') {
        if (data.profileData) {
          localStorage.setItem('portfolio_profile_data', JSON.stringify(data.profileData));
        }
      } else {
        // Full backup
        if (data.projects) {
          localStorage.setItem('portfolio_projects', JSON.stringify(data.projects));
        }
        if (data.mediaFiles) {
          localStorage.setItem('portfolio_media_files', JSON.stringify(data.mediaFiles));
        }
        if (data.profileData) {
          localStorage.setItem('portfolio_profile_data', JSON.stringify(data.profileData));
        }
      }

      showNotification('นำเข้าข้อมูลเรียบร้อย', 'success');
      
      // Reload page to reflect changes
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
    } catch (error) {
      showNotification('เกิดข้อผิดพลาดในการนำเข้าข้อมูล: ' + error.message, 'error');
    }
    
    setIsImporting(false);
    event.target.value = ''; // Reset file input
  };

  const clearAllData = async () => {
    const confirmClear = window.confirm(
      'คุณแน่ใจหรือไม่ว่าต้องการล้างข้อมูลทั้งหมด?\n\n' +
      'การดำเนินการนี้ไม่สามารถย้อนกลับได้ กรุณาสำรองข้อมูลก่อน'
    );

    if (!confirmClear) return;

    const confirmAgain = window.confirm('ยืนยันอีกครั้ง: ลบข้อมูลทั้งหมดใช่หรือไม่?');
    if (!confirmAgain) return;

    try {
      // Clear all localStorage data
      ['portfolio_projects', 'portfolio_media_files', 'portfolio_profile_data'].forEach(key => {
        localStorage.removeItem(key);
      });

      showNotification('ล้างข้อมูลเรียบร้อย', 'success');
      
      // Reload page
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
    } catch (error) {
      showNotification('เกิดข้อผิดพลาดในการล้างข้อมูล', 'error');
    }
  };

  const duplicateCurrentData = () => {
    try {
      const data = getCurrentData();
      const jsonString = JSON.stringify(data, null, 2);
      navigator.clipboard.writeText(jsonString);
      showNotification('คัดลอกข้อมูลไปยังคลิปบอร์ดเรียบร้อย', 'success');
    } catch (error) {
      showNotification('เกิดข้อผิดพลาดในการคัดลอกข้อมูล', 'error');
    }
  };

  const stats = getDataStats();

  const exportOptions = [
    {
      id: 'full',
      title: 'ส่งออกทั้งหมด',
      description: 'ผลงาน, ไฟล์สื่อ, และข้อมูลส่วนตัว',
      icon: Database,
      color: 'blue',
      action: exportAllData,
      stats: `${stats.projects + stats.mediaFiles} รายการ, ${formatFileSize(stats.totalSize)}`
    },
    {
      id: 'projects',
      title: 'ส่งออกผลงาน',
      description: 'เฉพาะข้อมูลผลงานและโปรเจค',
      icon: FileText,
      color: 'green',
      action: exportProjects,
      stats: `${stats.projects} ผลงาน`
    },
    {
      id: 'profile',
      title: 'ส่งออกข้อมูลส่วนตัว',
      description: 'ประวัติ, ทักษะ, และประสบการณ์',
      icon: User,
      color: 'purple',
      action: exportProfile,
      stats: `${stats.skills} ทักษะ, ${stats.experience} ประสบการณ์`
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">สำรองและจัดการข้อมูล</h2>
          <p className="text-gray-600 mt-1">ส่งออก นำเข้า และจัดการข้อมูล Portfolio</p>
        </div>
        <button
          onClick={duplicateCurrentData}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Copy size={16} />
          <span>คัดลอกข้อมูล</span>
        </button>
      </div>

      {/* Data Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">ผลงาน</p>
              <p className="text-blue-900 text-2xl font-bold">{stats.projects}</p>
            </div>
            <FileText className="w-6 h-6 text-blue-500" />
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">ไฟล์สื่อ</p>
              <p className="text-green-900 text-2xl font-bold">{stats.mediaFiles}</p>
            </div>
            <Image className="w-6 h-6 text-green-500" />
          </div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">ทักษะ</p>
              <p className="text-purple-900 text-2xl font-bold">{stats.skills}</p>
            </div>
            <Settings className="w-6 h-6 text-purple-500" />
          </div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-sm font-medium">ข้อมูลทั้งหมด</p>
              <p className="text-orange-900 text-lg font-bold">{formatFileSize(stats.totalSize)}</p>
            </div>
            <Archive className="w-6 h-6 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">ส่งออกข้อมูล</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {exportOptions.map((option) => (
            <motion.div
              key={option.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`bg-${option.color}-50 border border-${option.color}-200 rounded-xl p-6 cursor-pointer hover:shadow-md transition-all`}
              onClick={option.action}
            >
              <div className="flex items-center justify-between mb-4">
                <option.icon className={`w-8 h-8 text-${option.color}-500`} />
                <Download className={`w-5 h-5 text-${option.color}-400`} />
              </div>
              <h4 className={`text-${option.color}-900 font-semibold mb-2`}>{option.title}</h4>
              <p className={`text-${option.color}-700 text-sm mb-3`}>{option.description}</p>
              <p className={`text-${option.color}-600 text-xs font-medium`}>{option.stats}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Import & Manage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Import Data */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Upload className="w-5 h-5 mr-2 text-blue-600" />
            นำเข้าข้อมูล
          </h3>
          <p className="text-gray-600 text-sm mb-6">
            นำเข้าข้อมูลจากไฟล์สำรองข้อมูล (.json)
          </p>
          
          <label className="block">
            <input
              type="file"
              accept=".json"
              onChange={importData}
              className="hidden"
              disabled={isImporting}
            />
            <div className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer ${isImporting ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {isImporting ? (
                <div className="flex items-center justify-center space-x-2">
                  <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
                  <span className="text-blue-600">กำลังนำเข้าข้อมูล...</span>
                </div>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">คลิกเพื่อเลือกไฟล์สำรองข้อมูล</p>
                  <p className="text-gray-400 text-xs mt-1">รองรับไฟล์ .json เท่านั้น</p>
                </>
              )}
            </div>
          </label>
          
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-xs">
              ⚠️ การนำเข้าข้อมูลจะเขียนทับข้อมูลปัจจุบัน กรุณาสำรองข้อมูลก่อน
            </p>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
          <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
            เขตอันตราย
          </h3>
          <p className="text-red-600 text-sm mb-6">
            การดำเนินการเหล่านี้ไม่สามารถย้อนกลับได้
          </p>
          
          <div className="space-y-4">
            <button
              onClick={clearAllData}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 size={16} />
              <span>ล้างข้อมูลทั้งหมด</span>
            </button>
          </div>

          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-xs">
              ⚠️ การล้างข้อมูลจะลบข้อมูลทั้งหมดถาวร กรุณาสำรองข้อมูลก่อน
            </p>
          </div>
        </div>
      </div>

      {/* Backup History */}
      {backupHistory.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-gray-600" />
            ประวัติการสำรองข้อมูล
          </h3>
          <div className="space-y-3">
            {backupHistory.map((backup) => (
              <div key={backup.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Database className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {backup.type === 'full' ? 'สำรองข้อมูลทั้งหมด' : 'สำรองข้อมูลบางส่วน'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(backup.date).toLocaleDateString('th-TH', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{formatFileSize(backup.size)}</p>
                  <p className="text-xs text-gray-500">
                    {backup.stats.projects} ผลงาน, {backup.stats.mediaFiles} ไฟล์
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Loading States */}
      {isExporting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 text-center">
            <RefreshCw className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-4" />
            <p className="text-gray-800 font-medium">กำลังส่งออกข้อมูล...</p>
            <p className="text-gray-600 text-sm mt-1">กรุณารอสักครู่</p>
          </div>
        </div>
      )}

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

export default BackupManager;
