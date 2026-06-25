export interface User {
  _id: string;
  phone: string;
  name?: string;
  role: 'user' | 'doctor';
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}