'use client';

import React from 'react';
import { Trash2, RefreshCw } from 'lucide-react';

const ForceResetProjects = () => {
  const handleForceReset = () => {
    if (window.confirm('⚠️ คุณแน่ใจหรือไม่? การดำเนินการนี้จะ:\n\n1. ลบข้อมูลทั้งหมดใน localStorage\n2. รีโหลดหน้าใหม่\n3. โหลดข้อมูลผลงาน 20 ตัวใหม่\n\nการดำเนินการนี้ไม่สามารถยกเลิกได้!')) {
      // ลบข้อมูลทั้งหมด
      localStorage.clear();
      
      // แสดงข้อความแจ้งเตือน
      alert('🗑️ ลบข้อมูลเก่าเรียบร้อยแล้ว\n\n🔄 กำลังรีโหลดระบบใหม่...');
      
      // รอครู่ให้ผู้ใช้อ่านข้อความ แล้วรีโหลด
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <RefreshCw className="w-5 h-5 text-yellow-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-yellow-800 mb-1">
            แก้ไขปัญหาข้อมูลไม่ตรงกัน
          </h3>
          <p className="text-sm text-yellow-700 mb-3">
            หากคุณเห็นผลงานไม่ครบ 20 ตัว หรือข้อมูลไม่อัปเดต ให้กดปุ่มด้านล่างเพื่อรีเซ็ตระบบ
          </p>
          <button
            onClick={handleForceReset}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium rounded-md transition-colors"
          >
            <Trash2 size={16} />
            <span>รีเซ็ตระบบและโหลดข้อมูลใหม่</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForceResetProjects;
