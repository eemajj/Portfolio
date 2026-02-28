'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { Eye, EyeOff, Lock, Shield, AlertCircle } from 'lucide-react';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { adminLogin, isAdminAuthenticated } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    // ถ้าล็อกอินอยู่แล้ว redirect ไป admin panel
    if (isAdminAuthenticated) {
      router.replace('/admin-panel');
    }
  }, [isAdminAuthenticated, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate loading delay for better UX
    setTimeout(() => {
      const result = adminLogin(password);
      
      if (result.success) {
        router.replace('/admin-panel');
      } else {
        setError(result.error);
        setPassword(''); // เคลียร์รหัสผ่านเมื่อผิด
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center justify-center mb-4"
          >
            <div className="p-3 bg-primary-100 rounded-full">
              <Shield className="w-8 h-8 text-primary-600" />
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-2xl font-bold text-gray-800 mb-2"
          >
            Admin Access
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-gray-600 text-sm"
          >
            เข้าสู่ระบบจัดการ Portfolio
          </motion.p>
        </div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
        >
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Lock className="inline w-4 h-4 mr-2" />
                รหัสผ่าน
              </label>
              
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="กรอกรหัสผ่านสำหรับเข้าระบบ"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-sm"
                  disabled={isLoading}
                  autoFocus
                  autoComplete="off"
                />
                
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg border border-red-200"
              >
                <AlertCircle size={16} />
                <span className="text-sm font-medium">{error}</span>
              </motion.div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={!password.trim() || isLoading}
              className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 transform ${
                !password.trim() || isLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-primary-600 hover:bg-primary-700 text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>กำลังตรวจสอบ...</span>
                </div>
              ) : (
                'เข้าสู่ระบบ'
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-start space-x-2 text-xs text-gray-500">
              <Shield size={14} className="mt-0.5 text-primary-500" />
              <p>
                ระบบนี้มีการป้องกันความปลอดภัยขั้นสูง
                <br />
                หากไม่ใช่ผู้ดูแลระบบ กรุณาออกจากหน้านี้
              </p>
            </div>
          </div>
        </motion.div>

        {/* Back to Portfolio */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-center mt-6"
        >
          <button
            onClick={() => router.replace('/')}
            className="text-sm text-gray-500 hover:text-primary-600 transition-colors duration-200"
          >
            ← กลับไปหน้า Portfolio
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
