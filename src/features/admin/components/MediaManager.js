'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  Image, 
  Video, 
  File, 
  Trash2, 
  Copy, 
  Eye, 
  Download,
  Search,
  Filter,
  X,
  Check,
  AlertCircle,
  Folder,
  Grid,
  List,
  ExternalLink
} from 'lucide-react';

const MediaManager = () => {
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [previewFile, setPreviewFile] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  // File types
  const fileTypes = {
    image: { extensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'], icon: Image, color: 'blue' },
    video: { extensions: ['.mp4', '.avi', '.mov', '.webm', '.mkv'], icon: Video, color: 'red' },
    document: { extensions: ['.pdf', '.doc', '.docx', '.txt', '.md'], icon: File, color: 'green' },
    other: { extensions: [], icon: File, color: 'gray' }
  };

  // Load files from localStorage
  useEffect(() => {
    const savedFiles = localStorage.getItem('portfolio_media_files');
    if (savedFiles) {
      try {
        setFiles(JSON.parse(savedFiles));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error loading files:', error);
        showNotification('เกิดข้อผิดพลาดในการโหลดไฟล์', 'error');
      }
    }
  }, []);

  // Save files to localStorage
  useEffect(() => {
    if (files.length > 0) {
      localStorage.setItem('portfolio_media_files', JSON.stringify(files));
    }
  }, [files]);

  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 3000);
  }, []);

  const getFileType = (filename) => {
    const ext = '.' + filename.split('.').pop().toLowerCase();
    for (const [type, config] of Object.entries(fileTypes)) {
      if (config.extensions.includes(ext)) {
        return type;
      }
    }
    return 'other';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    
    uploadedFiles.forEach((file) => {
      const fileId = Date.now() + Math.random();
      const fileData = {
        id: fileId,
        name: file.name,
        size: file.size,
        type: getFileType(file.name),
        uploadDate: new Date().toISOString(),
        url: URL.createObjectURL(file), // ใน production จะต้องอัปโหลดจริง
        file: file // เก็บ file object สำหรับการจัดการ
      };

      // Simulate upload progress
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));
      
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const currentProgress = prev[fileId] || 0;
          const newProgress = Math.min(currentProgress + 10, 100);
          
          if (newProgress === 100) {
            clearInterval(interval);
            setFiles(prevFiles => [...prevFiles, fileData]);
            setTimeout(() => {
              setUploadProgress(prev => {
                const updated = { ...prev };
                delete updated[fileId];
                return updated;
              });
            }, 1000);
            showNotification(`อัปโหลด ${file.name} เสร็จสิ้น`, 'success');
          }
          
          return { ...prev, [fileId]: newProgress };
        });
      }, 200);
    });

    event.target.value = ''; // Clear input
  };

  const handleDeleteFile = (fileId) => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบไฟล์นี้?')) {
      const file = files.find(f => f.id === fileId);
      if (file && file.url) {
        URL.revokeObjectURL(file.url); // Clean up object URL
      }
      setFiles(prev => prev.filter(f => f.id !== fileId));
      setSelectedFiles(prev => prev.filter(id => id !== fileId));
      showNotification('ลบไฟล์เรียบร้อย', 'success');
    }
  };

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      showNotification('คัดลอก URL เรียบร้อย', 'success');
    }).catch(() => {
      showNotification('ไม่สามารถคัดลอก URL ได้', 'error');
    });
  };

  const handleSelectFile = (fileId) => {
    setSelectedFiles(prev => {
      if (prev.includes(fileId)) {
        return prev.filter(id => id !== fileId);
      } else {
        return [...prev, fileId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedFiles.length === filteredFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(filteredFiles.map(f => f.id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedFiles.length === 0) return;
    
    if (window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบไฟล์ ${selectedFiles.length} ไฟล์?`)) {
      selectedFiles.forEach(fileId => {
        const file = files.find(f => f.id === fileId);
        if (file && file.url) {
          URL.revokeObjectURL(file.url);
        }
      });
      
      setFiles(prev => prev.filter(f => !selectedFiles.includes(f.id)));
      setSelectedFiles([]);
      showNotification(`ลบไฟล์ ${selectedFiles.length} ไฟล์เรียบร้อย`, 'success');
    }
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || file.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getFileIcon = (type) => {
    const config = fileTypes[type] || fileTypes.other;
    const Icon = config.icon;
    return <Icon className={`w-6 h-6 text-${config.color}-500`} />;
  };

  const renderGridView = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {filteredFiles.map((file) => (
        <motion.div
          key={file.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className={`relative bg-white rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
            selectedFiles.includes(file.id) ? 'border-primary-500 shadow-md' : 'border-gray-200'
          }`}
        >
          {/* Selection checkbox */}
          <div className="absolute top-2 left-2 z-10">
            <input
              type="checkbox"
              checked={selectedFiles.includes(file.id)}
              onChange={() => handleSelectFile(file.id)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
          </div>

          {/* File preview */}
          <div 
            className="aspect-square p-4 flex items-center justify-center cursor-pointer"
            onClick={() => setPreviewFile(file)}
          >
            {file.type === 'image' ? (
              <img 
                src={file.url} 
                alt={file.name}
                className="w-full h-full object-cover rounded-md"
                loading="lazy"
              />
            ) : (
              <div className="text-center">
                {getFileIcon(file.type)}
                <p className="text-xs text-gray-600 mt-2 truncate">{file.name}</p>
              </div>
            )}
          </div>

          {/* File info */}
          <div className="p-3 border-t border-gray-100">
            <p className="text-xs font-medium text-gray-800 truncate" title={file.name}>
              {file.name}
            </p>
            <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
          </div>

          {/* Action buttons */}
          <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPreviewFile(file);
              }}
              className="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              title="ดูตัวอย่าง"
            >
              <Eye size={12} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCopyUrl(file.url);
              }}
              className="p-1 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
              title="คัดลอก URL"
            >
              <Copy size={12} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteFile(file.id);
              }}
              className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              title="ลบไฟล์"
            >
              <Trash2 size={12} />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 py-3 text-left">
              <input
                type="checkbox"
                checked={selectedFiles.length === filteredFiles.length && filteredFiles.length > 0}
                onChange={handleSelectAll}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">ไฟล์</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">ขนาด</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">วันที่อัปโหลด</th>
            <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">การจัดการ</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredFiles.map((file) => (
            <tr key={file.id} className={`hover:bg-gray-50 ${selectedFiles.includes(file.id) ? 'bg-primary-50' : ''}`}>
              <td className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedFiles.includes(file.id)}
                  onChange={() => handleSelectFile(file.id)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center space-x-3">
                  {getFileIcon(file.type)}
                  <div>
                    <p className="text-sm font-medium text-gray-800">{file.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{file.type}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {formatFileSize(file.size)}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {new Date(file.uploadDate).toLocaleDateString('th-TH')}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end space-x-2">
                  <button
                    onClick={() => setPreviewFile(file)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="ดูตัวอย่าง"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => handleCopyUrl(file.url)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="คัดลอก URL"
                  >
                    <Copy size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteFile(file.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="ลบไฟล์"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">จัดการสื่อและไฟล์</h2>
          <p className="text-gray-600 mt-1">อัปโหลดและจัดการไฟล์สำหรับ Portfolio</p>
        </div>
        <div className="flex items-center space-x-3">
          {selectedFiles.length > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 size={16} />
              <span>ลบที่เลือก ({selectedFiles.length})</span>
            </button>
          )}
          <label className="btn-primary flex items-center space-x-2 cursor-pointer">
            <Upload size={16} />
            <span>อัปโหลดไฟล์</span>
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileUpload}
              accept="image/*,video/*,.pdf,.doc,.docx,.txt,.md"
            />
          </label>
        </div>
      </div>

      {/* Upload Progress */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-800 mb-3">กำลังอัปโหลด...</h3>
          <div className="space-y-2">
            {Object.entries(uploadProgress).map(([fileId, progress]) => (
              <div key={fileId} className="flex items-center space-x-3">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-12">{progress}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="ค้นหาไฟล์..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
              >
                <option value="all">ทุกประเภท</option>
                <option value="image">รูปภาพ</option>
                <option value="video">วิดีโอ</option>
                <option value="document">เอกสาร</option>
                <option value="other">อื่นๆ</option>
              </select>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(fileTypes).map(([type, config]) => {
          const count = files.filter(f => f.type === type).length;
          const Icon = config.icon;
          return (
            <div key={type} className={`bg-${config.color}-50 border border-${config.color}-200 rounded-xl p-4`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-${config.color}-600 text-sm font-medium capitalize`}>
                    {type === 'other' ? 'อื่นๆ' : type === 'image' ? 'รูปภาพ' : type === 'video' ? 'วิดีโอ' : 'เอกสาร'}
                  </p>
                  <p className={`text-${config.color}-900 text-xl font-bold`}>{count}</p>
                </div>
                <Icon className={`w-6 h-6 text-${config.color}-500`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Files Display */}
      <AnimatePresence mode="wait">
        {filteredFiles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <Folder size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600">
              {searchTerm || filterType !== 'all' 
                ? 'ไม่พบไฟล์ที่ตรงกับเงื่อนไขการค้นหา'
                : 'ยังไม่มีไฟล์ เริ่มต้นอัปโหลดไฟล์แรกของคุณ'
              }
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {viewMode === 'grid' ? renderGridView() : renderListView()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* File Preview Modal */}
      <AnimatePresence>
        {previewFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            >
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{previewFile.name}</h3>
                  <p className="text-sm text-gray-600">
                    {formatFileSize(previewFile.size)} • {new Date(previewFile.uploadDate).toLocaleDateString('th-TH')}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleCopyUrl(previewFile.url)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="คัดลอก URL"
                  >
                    <Copy size={16} />
                  </button>
                  <a
                    href={previewFile.url}
                    download={previewFile.name}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="ดาวน์โหลด"
                  >
                    <Download size={16} />
                  </a>
                  <button
                    onClick={() => setPreviewFile(null)}
                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
              
              <div className="p-6 flex items-center justify-center bg-gray-50 min-h-96">
                {previewFile.type === 'image' ? (
                  <img 
                    src={previewFile.url} 
                    alt={previewFile.name}
                    className="max-w-full max-h-96 object-contain rounded-lg shadow-sm"
                  />
                ) : previewFile.type === 'video' ? (
                  <video 
                    src={previewFile.url} 
                    controls
                    className="max-w-full max-h-96 rounded-lg shadow-sm"
                  >
                    Your browser does not support video playback.
                  </video>
                ) : (
                  <div className="text-center">
                    {getFileIcon(previewFile.type)}
                    <p className="text-gray-600 mt-4">ไม่สามารถแสดงตัวอย่างไฟล์นี้ได้</p>
                    <p className="text-sm text-gray-500 mt-2">คลิกดาวน์โหลดเพื่อเปิดไฟล์</p>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <ExternalLink size={14} />
                    <code className="bg-gray-200 px-2 py-1 rounded text-xs">{previewFile.url}</code>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

export default MediaManager;
