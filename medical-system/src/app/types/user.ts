// src/types/user.ts
export interface User {
  _id: string;
  phone: string;
  name?: string;
  avatar?: string;
  role: 'user' | 'doctor' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}