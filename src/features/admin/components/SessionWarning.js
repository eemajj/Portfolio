'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Clock, RefreshCw, LogOut } from 'lucide-react';
import { useAdminAuth } from '../contexts/AdminAuthContext';

const SessionWarning = () => {
  const { isAdminAuthenticated, sessionWarning, extendSession, adminLogout, getSessionInfo } = useAdminAuth();
  const [sessionInfo, setSessionInfo] = useState(null);
  const [isExtending, setIsExtending] = useState(false);

  useEffect(() => {
    if (isAdminAuthenticated) {
      const updateSessionInfo = () => {
        const info = getSessionInfo();
        setSessionInfo(info);
      };

      updateSessionInfo();
      const interval = setInterval(updateSessionInfo, 10000); // Update every 10 seconds

      return () => clearInterval(interval);
    }
  }, [isAdminAuthenticated, getSessionInfo]);

  const handleExtendSession = async () => {
    setIsExtending(true);
    const success = extendSession();
    if (success) {
      setSessionInfo(getSessionInfo());
    }
    setIsExtending(false);
  };

  if (!isAdminAuthenticated || !sessionInfo) {
    return null;
  }

  const { timeRemaining, isNearExpiry } = sessionInfo;

  return (
    <>
      {/* Session Info in Admin Panel Header */}
      <div className="flex items-center space-x-3 text-sm">
        <div className="flex items-center space-x-1 text-gray-600">
          <Clock size={14} />
          <span>{timeRemaining}m</span>
        </div>
        {isNearExpiry && (
          <div className="flex items-center space-x-1 text-orange-600">
            <AlertTriangle size={14} />
            <span className="font-medium">ใกล้หมดอายุ</span>
          </div>
        )}
      </div>

      {/* Session Warning Modal */}
      <AnimatePresence>
        {sessionWarning && (
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
              className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">เซสชันใกล้หมดอายุ</h3>
                  <p className="text-sm text-gray-600">
                    เซสชันจะหมดอายุใน {timeRemaining} นาที
                  </p>
                </div>
              </div>

              <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-orange-800 text-sm">
                  หากไม่ต่ออายุเซสชัน คุณจะถูกออกจากระบบอัตโนมัติ
                  เพื่อความปลอดภัย กรุณาเลือกดำเนินการด้านล่าง
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={adminLogout}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <LogOut size={16} />
                  <span>ออกจากระบบ</span>
                </button>
                <button
                  onClick={handleExtendSession}
                  disabled={isExtending}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                  {isExtending ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      <span>กำลังต่ออายุ...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw size={16} />
                      <span>ต่ออายุเซสชัน</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  การต่ออายุจะเพิ่มเวลาอีก 2 ชั่วโมง
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SessionWarning;
