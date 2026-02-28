'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import SimpleProjectManager from './SimpleProjectManager';
import MediaManager from './MediaManager';
import ProfileManager from './ProfileManager';
import BackupManager from './BackupManager';
import SessionWarning from './SessionWarning';
import { 
  LogOut, 
  Settings, 
  FileText, 
  Image, 
  BarChart3, 
  User, 
  Activity,
  Award,
  Briefcase
} from 'lucide-react';

const AdminPanel = () => {
  const { adminLogout, isAdminAuthenticated } = useAdminAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = () => {
    adminLogout();
    router.replace('/');
  };

  useEffect(() => {
    if (!isAdminAuthenticated) {
      router.replace('/secret-admin');
    }
  }, [isAdminAuthenticated, router]);

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">กำลังตรวจสอบสิทธิ์...</p>
        </div>
      </div>
    );
  }

  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'แดชบอร์ด', 
      icon: BarChart3, 
      desc: 'ภาพรวมและสถิติ' 
    },
    { 
      id: 'projects', 
      label: 'จัดการผลงาน', 
      icon: FileText, 
      desc: 'เพิ่ม แก้ไข ลบผลงาน' 
    },
    { 
      id: 'media', 
      label: 'สื่อและรูปภาพ', 
      icon: Image, 
      desc: 'อัปโหลดและจัดการไฟล์' 
    },
    { 
      id: 'profile', 
      label: 'ข้อมูลส่วนตัว', 
      icon: User, 
      desc: 'แก้ไขประวัติและข้อมูล' 
    },
    { 
      id: 'settings', 
      label: 'ตั้งค่าระบบ', 
      icon: Settings, 
      desc: 'การตั้งค่าทั่วไป' 
    }
  ];

  const renderDashboard = () => {
    // Get data from localStorage
    const projects = JSON.parse(localStorage.getItem('portfolio_projects') || '[]');
    const mediaFiles = JSON.parse(localStorage.getItem('portfolio_media_files') || '[]');
    const profileData = JSON.parse(localStorage.getItem('portfolio_profile_data') || '{}');
    
    const totalProjects = projects.length;
    const completedProjects = projects.filter(p => p.status === 'completed').length;
    const ongoingProjects = projects.filter(p => p.status === 'ongoing').length;
    const totalMedia = mediaFiles.length;
    const mediaByType = mediaFiles.reduce((acc, file) => {
      acc[file.type] = (acc[file.type] || 0) + 1;
      return acc;
    }, {});

    const recentActivity = [
      ...projects.slice(0, 3).map(p => ({
        type: 'project',
        text: `อัปเดตผลงาน "${p.title?.th || p.title}" เมื่อ ${new Date(p.updatedAt || p.createdAt).toLocaleDateString('th-TH')}`,
        date: new Date(p.updatedAt || p.createdAt)
      })),
      ...mediaFiles.slice(0, 2).map(f => ({
        type: 'media',
        text: `อัปโหลดไฟล์ "${f.name}" เมื่อ ${new Date(f.uploadDate).toLocaleDateString('th-TH')}`,
        date: new Date(f.uploadDate)
      }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

    return (
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'ผลงานทั้งหมด', value: totalProjects.toString(), icon: FileText, color: 'blue', detail: `เสร็จ ${completedProjects} | กำลังทำ ${ongoingProjects}` },
            { label: 'ไฟล์สื่อ', value: totalMedia.toString(), icon: Image, color: 'green', detail: `รูป ${mediaByType.image || 0} | วิดีโอ ${mediaByType.video || 0}` },
            { label: 'ทักษะ', value: (profileData.skills?.length || 0).toString(), icon: Award, color: 'purple', detail: 'หมวดหมู่ทักษะ' },
            { label: 'ประสบการณ์', value: (profileData.experience?.length || 0).toString(), icon: Briefcase, color: 'orange', detail: 'ตำแหน่งงาน' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white border-l-4 border-${stat.color}-500 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-gray-900 text-3xl font-bold mt-1">{stat.value}</p>
                  <p className="text-gray-500 text-xs mt-1">{stat.detail}</p>
                </div>
                <stat.icon className={`w-8 h-8 text-${stat.color}-500`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Project Status Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">สถานะผลงาน</h3>
            <div className="space-y-4">
              {[
                { status: 'completed', label: 'เสร็จสิ้น', count: completedProjects, color: 'green' },
                { status: 'ongoing', label: 'กำลังดำเนินการ', count: ongoingProjects, color: 'blue' },
                { status: 'planning', label: 'วางแผน', count: projects.filter(p => p.status === 'planning').length, color: 'yellow' },
                { status: 'paused', label: 'หยุดชั่วคราว', count: projects.filter(p => p.status === 'paused').length, color: 'red' }
              ].map((item) => (
                <div key={item.status} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 bg-${item.color}-500 rounded-full`}></div>
                    <span className="text-gray-700">{item.label}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-900 font-semibold">{item.count}</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-${item.color}-500 h-2 rounded-full`}
                        style={{ width: totalProjects > 0 ? `${(item.count / totalProjects) * 100}%` : '0%' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Media Types Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">ประเภทไฟล์สื่อ</h3>
            <div className="space-y-4">
              {[
                { type: 'image', label: 'รูปภาพ', count: mediaByType.image || 0, color: 'blue', icon: Image },
                { type: 'video', label: 'วิดีโอ', count: mediaByType.video || 0, color: 'red', icon: FileText },
                { type: 'document', label: 'เอกสาร', count: mediaByType.document || 0, color: 'green', icon: FileText },
                { type: 'other', label: 'อื่นๆ', count: mediaByType.other || 0, color: 'gray', icon: FileText }
              ].map((item) => (
                <div key={item.type} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <item.icon className={`w-4 h-4 text-${item.color}-500`} />
                    <span className="text-gray-700">{item.label}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-900 font-semibold">{item.count}</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-${item.color}-500 h-2 rounded-full`}
                        style={{ width: totalMedia > 0 ? `${(item.count / totalMedia) * 100}%` : '0%' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-primary-600" />
            กิจกรรมล่าสุด
          </h3>
          <div className="space-y-3">
            {recentActivity.length > 0 ? recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 text-sm">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'project' ? 'bg-blue-400' : 'bg-green-400'
                }`}></div>
                <span className="text-gray-600 flex-1">{activity.text}</span>
                <span className="text-gray-400 text-xs">
                  {new Date(activity.date).toLocaleDateString('th-TH')}
                </span>
              </div>
            )) : (
              <p className="text-gray-500 text-center py-8">ยังไม่มีกิจกรรมล่าสุด</p>
            )}
          </div>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">ระบบ Portfolio</p>
                <p className="text-green-900 text-lg font-semibold">พร้อมใช้งาน</p>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">ข้อมูล</p>
                <p className="text-blue-900 text-lg font-semibold">ซิงค์แล้ว</p>
              </div>
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            </div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">ความปลอดภัย</p>
                <p className="text-purple-900 text-lg font-semibold">ปลอดภัย</p>
              </div>
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProjects = () => <SimpleProjectManager />;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'projects':
        return renderProjects();
      case 'media':
        return <MediaManager />;
      case 'profile':
        return <ProfileManager />;
      case 'settings':
        return <BackupManager />;
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Settings className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-800">Admin Panel</h1>
              <p className="text-xs text-gray-500">ระบบจัดการ Portfolio</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <SessionWarning />
            <button
              onClick={() => navigate('/')}
              className="text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200"
            >
              ดู Portfolio
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-sm text-red-600 hover:text-red-700 transition-colors duration-200"
            >
              <LogOut size={16} />
              <span>ออกจากระบบ</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)]">
          <nav className="p-6">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                    activeTab === item.id
                      ? 'bg-primary-50 text-primary-700 border border-primary-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                >
                  <item.icon size={18} />
                  <div>
                    <div className="font-medium text-sm">{item.label}</div>
                    <div className="text-xs text-gray-500">{item.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>

      {/* Session Warning Modal */}
      <SessionWarning />
    </div>
  );
};

export default AdminPanel;
