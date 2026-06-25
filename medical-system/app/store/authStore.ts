import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types/user'; // 👈 ایمپورت تایپی که در گام اول ساختیم

interface AuthState {
  token: string | null;
  user: User | null; // 👈 تغییر از any به User برای امنیت تایپ‌ها
  setAuth: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
      isAuthenticated: () => !!get().token,
    }),
    {
      name: 'auth-storage', // ذخیره خودکار در LocalStorage با این کلید
    }
  )
);