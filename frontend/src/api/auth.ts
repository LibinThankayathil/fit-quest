import type { AuthResponse, LoginPayload, RegisterPayload, User } from '../types/auth';

const API_BASE = '/api/auth';

export class AuthError extends Error {
  public fieldErrors?: Record<string, string>;
  
  constructor(message: string, fieldErrors?: Record<string, string>) {
    super(message);
    this.name = 'AuthError';
    this.fieldErrors = fieldErrors;
  }
}

export const authApi = {
  async register(payload: RegisterPayload): Promise<User> {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    });

    const data: AuthResponse = await res.json().catch(() => ({
      success: false,
      message: 'Network error or invalid server response',
    }));

    if (!res.ok || !data.success || !data.data?.user) {
      const fieldErrors: Record<string, string> = {};
      if (data.errors) {
        data.errors.forEach((err) => {
          fieldErrors[err.field] = err.message;
        });
      }
      throw new AuthError(data.message || 'Registration failed', fieldErrors);
    }

    return data.data.user;
  },

  async login(payload: LoginPayload): Promise<User> {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    });

    const data: AuthResponse = await res.json().catch(() => ({
      success: false,
      message: 'Network error or invalid server response',
    }));

    if (!res.ok || !data.success || !data.data?.user) {
      const fieldErrors: Record<string, string> = {};
      if (data.errors) {
        data.errors.forEach((err) => {
          fieldErrors[err.field] = err.message;
        });
      }
      throw new AuthError(data.message || 'Invalid email or password', fieldErrors);
    }

    return data.data.user;
  },

  async getMe(): Promise<User | null> {
    try {
      const res = await fetch(`${API_BASE}/me`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!res.ok) return null;

      const data: AuthResponse = await res.json();
      if (data.success && data.data?.user) {
        return data.data.user;
      }
      return null;
    } catch {
      return null;
    }
  },
};
