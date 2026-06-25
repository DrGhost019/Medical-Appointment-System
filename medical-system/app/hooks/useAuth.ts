import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import api from '../lib/api';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const setAuth = useAuthStore((state) => state.setAuth);
  const logoutStore = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());

  // ۱. مرحله اول: ارسال شماره تلفن و دریافت کد OTP
  const sendOTP = async (phone: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.sendOTP(phone);
      setIsLoading(false);
      return response; // { success: true, message: "..." }
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || 'خطا در ارسال کد تایید');
      throw err;
    }
  };

  // ۲. مرحله دوم: تایید کد OTP و ورود به برنامه
  const verifyOTP = async (phone: string, code: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.verifyOTP(phone, code);
      // ذخیره توکن و اطلاعات کاربر در استور Zustand (و لوکال استوریج)
      if (response.token && response.user) {
        setAuth(response.token, response.user);
      }
      setIsLoading(false);
      return response;
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || 'کد تایید اشتباه است');
      throw err;
    }
  };

  // ۳. خروج از حساب کاربری
  const handleLogout = () => {
    logoutStore();
  };

  return {
    sendOTP,
    verifyOTP,
    handleLogout,
    isLoading,
    error,
    user,
    token,
    isAuthenticated,
  };
};