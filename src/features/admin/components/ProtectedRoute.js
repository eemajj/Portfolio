'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '../contexts/AdminAuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAdminAuthenticated, isLoading } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAdminAuthenticated) {
      router.replace('/secret-admin');
    }
  }, [isLoading, isAdminAuthenticated, router]);

  // แสดง loading ขณะตรวจสอบ session
  if (isLoading || (!isLoading && !isAdminAuthenticated)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังตรวจสอบสิทธิ์...</p>
        </div>
      </div>
    );
  }

  // ถ้าล็อกอินแล้ว แสดง component ที่ต้องการ
  return children;
};

export default ProtectedRoute;
