// ساختار اطلاعات کاربر در سیستم
export interface User {
  id: string;
  name: string;
  avatar?: string;
  token?: string;
}

// کلید ذخیره‌سازی در LocalStorage
const AUTH_KEY = 'dr_reserve_user';

/**
 * ذخیره اطلاعات کاربر پس از لاگین موفق
 */
export const login = (user: User): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  }
};

/**
 * خروج کاربر و پاکسازی اطلاعات از حافظه مرورگر
 */
export const logout = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_KEY);
  }
};

/**
 * دریافت اطلاعات کاربر فعلی سیستم
 */
export const getUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  
  const storedUser = localStorage.getItem(AUTH_KEY);
  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser) as User;
  } catch (error) {
    console.error("Error parsing user data from localStorage", error);
    return null;
  }
};

/**
 * بررسی اینکه آیا کاربر لاگین هست یا خیر
 */
export const isAuthenticated = (): boolean => {
  return getUser() !== null;
};