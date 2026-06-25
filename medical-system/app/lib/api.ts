const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

async function fetchAPI<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, ...fetchOptions } = options;
  let url = `${API_BASE_URL}${endpoint}`;
  
  if (params) {
    const queryString = new URLSearchParams(
      Object.entries(params).map(([key, value]) => [key, String(value)])
    ).toString();
    url += `?${queryString}`;
  }

  // خواندن توکن از استور Zustand تحت نام auth-storage
  let token = '';
  if (typeof window !== 'undefined') {
    try {
      const authStorage = localStorage.getItem('auth-storage');
      if (authStorage) {
        const parsed = JSON.parse(authStorage);
        token = parsed?.state?.token || '';
      } else {
        token = localStorage.getItem('token') || '';
      }
    } catch (e) {
      console.error('Error reading token from localStorage', e);
    }
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...fetchOptions.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'خطای سرور' }));
    throw new Error(error.message || 'خطا در ارتباط با سرور');
  }

  return response.json();
}

export const api = {
  // ورود بیمار با کد یکبار مصرف
  sendOTP: (phone: string) => 
    fetchAPI<{ success: boolean; message: string }>('/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({ phone }),
    }),
  
  verifyOTP: (phone: string, code: string) =>
    fetchAPI<{ token: string; user: any }>('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ phone, code }),
    }),

  // دریافت لیست پزشکان
  getDoctors: () =>
    fetchAPI<{ success: boolean; count: number; doctors: any[] }>('/doctors/list'),

  // رزرو نوبت با اسلات آی‌دی
  createBooking: (slotId: string) =>
    fetchAPI<{ success: boolean; message: string; appointment: any }>('/appointments/book', {
      method: 'POST',
      body: JSON.stringify({ slotId }),
    }),
};

export default api;