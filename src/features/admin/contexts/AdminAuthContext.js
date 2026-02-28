'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionWarning, setSessionWarning] = useState(false);

  // Secret password - เฉพาะคุณอิศราเท่านั้นที่รู้
  const SECRET_PASSWORD = 'Id1102002539216';
  const ADMIN_SESSION_KEY = 'itsara_admin_session';
  const SESSION_DURATION = 2 * 60 * 60 * 1000; // 2 hours
  const WARNING_BEFORE_EXPIRE = 5 * 60 * 1000; // 5 minutes before expiry

  useEffect(() => {
    // ตรวจสอบ session ที่เก็บไว้
    const checkAdminSession = () => {
      try {
        const adminSession = localStorage.getItem(ADMIN_SESSION_KEY);
        if (adminSession) {
          const session = JSON.parse(adminSession);
          const now = new Date().getTime();
          
          // ตรวจสอบว่า session ยังไม่หมดอายุ
          if (session.expires > now && session.authenticated === true) {
            setIsAdminAuthenticated(true);
            
            // ตรวจสอบว่าใกล้หมดอายุหรือไม่
            const timeUntilExpiry = session.expires - now;
            if (timeUntilExpiry <= WARNING_BEFORE_EXPIRE) {
              setSessionWarning(true);
            }
          } else {
            // Session หมดอายุ - ลบออก
            localStorage.removeItem(ADMIN_SESSION_KEY);
            setIsAdminAuthenticated(false);
          }
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Admin session check failed:', error);
        localStorage.removeItem(ADMIN_SESSION_KEY);
        setIsAdminAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAdminSession();
    
    // ตรวจสอบ session ทุก 30 วินาที
    const sessionInterval = setInterval(checkAdminSession, 30000);
    
    return () => clearInterval(sessionInterval);
  }, [WARNING_BEFORE_EXPIRE]);

  // Auto logout when session expires
  useEffect(() => {
    if (isAdminAuthenticated) {
      const checkExpiry = () => {
        const adminSession = localStorage.getItem(ADMIN_SESSION_KEY);
        if (adminSession) {
          const session = JSON.parse(adminSession);
          const now = new Date().getTime();
          
          if (session.expires <= now) {
            adminLogout();
            alert('เซสชันหมดอายุแล้ว กรุณาเข้าสู่ระบบใหม่');
          }
        }
      };

      const expiryInterval = setInterval(checkExpiry, 60000); // Check every minute
      return () => clearInterval(expiryInterval);
    }
  }, [isAdminAuthenticated]);

  const adminLogin = (password) => {
    // Enhanced security checks
    if (password !== SECRET_PASSWORD) {
      // Log failed login attempts (in production, send to monitoring service)
      const failedAttempts = localStorage.getItem('admin_failed_attempts') || '0';
      const attempts = parseInt(failedAttempts) + 1;
      localStorage.setItem('admin_failed_attempts', attempts.toString());
      
      // Block after 5 failed attempts
      if (attempts >= 5) {
        const blockUntil = new Date().getTime() + (15 * 60 * 1000); // 15 minutes
        localStorage.setItem('admin_blocked_until', blockUntil.toString());
        return { success: false, error: 'บัญชีถูกล็อกชั่วคราว กรุณารอ 15 นาที' };
      }
      
      return { success: false, error: `รหัสผ่านไม่ถูกต้อง (เหลือโอกาส ${5 - attempts} ครั้ง)` };
    }

    // Check if account is blocked
    const blockedUntil = localStorage.getItem('admin_blocked_until');
    if (blockedUntil && new Date().getTime() < parseInt(blockedUntil)) {
      const remainingTime = Math.ceil((parseInt(blockedUntil) - new Date().getTime()) / 60000);
      return { success: false, error: `บัญชีถูกล็อก กรุณารอ ${remainingTime} นาที` };
    }

    // Successful login
    const session = {
      authenticated: true,
      loginTime: new Date().getTime(),
      expires: new Date().getTime() + SESSION_DURATION,
      userAgent: navigator.userAgent,
      ipAddress: 'localhost', // In production, get real IP
      securityToken: Math.random().toString(36).substr(2, 9) // Random security token
    };
    
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
    localStorage.removeItem('admin_failed_attempts'); // Reset failed attempts
    localStorage.removeItem('admin_blocked_until'); // Remove block
    setIsAdminAuthenticated(true);
    setSessionWarning(false);
    
    // Log successful login (in production, send to monitoring service)
    // eslint-disable-next-line no-console
    console.info('Admin login successful at', new Date().toISOString());
    
    return { success: true };
  };

  const adminLogout = () => {
    // Log logout (in production, send to monitoring service)
    // eslint-disable-next-line no-console
    console.info('Admin logout at', new Date().toISOString());
    
    localStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAdminAuthenticated(false);
    setSessionWarning(false);
  };

  const extendSession = () => {
    if (isAdminAuthenticated) {
      try {
        const currentSession = JSON.parse(localStorage.getItem(ADMIN_SESSION_KEY));
        const session = {
          ...currentSession,
          expires: new Date().getTime() + SESSION_DURATION, // Extend by SESSION_DURATION
          lastExtended: new Date().getTime()
        };
        localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
        setSessionWarning(false);
        return true;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to extend session:', error);
        return false;
      }
    }
    return false;
  };

  const getSessionInfo = () => {
    if (!isAdminAuthenticated) return null;
    
    try {
      const session = JSON.parse(localStorage.getItem(ADMIN_SESSION_KEY));
      const now = new Date().getTime();
      const timeRemaining = session.expires - now;
      
      return {
        loginTime: new Date(session.loginTime),
        expiresAt: new Date(session.expires),
        timeRemaining: Math.max(0, Math.floor(timeRemaining / 1000 / 60)), // minutes
        isNearExpiry: timeRemaining <= WARNING_BEFORE_EXPIRE
      };
    } catch (error) {
      return null;
    }
  };

  const value = {
    isAdminAuthenticated,
    isLoading,
    sessionWarning,
    adminLogin,
    adminLogout,
    extendSession,
    getSessionInfo
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
