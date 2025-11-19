// Application configuration
export const config = {
  app: {
    name: 'Admin Panel',
    version: '1.0.0',
  },
  api: {
    baseURL: import.meta.env.VITE_API_URL || '/api',
    timeout: 10000,
  },
  auth: {
    tokenKey: 'authToken',
    userDataKey: 'userData',
  },
  routes: {
    public: ['/', '/login'],
    protected: ['/dashboard', '/dashboard/settings', '/dashboard/analytics'],
    redirectAfterLogin: '/dashboard',
  },
} as const;