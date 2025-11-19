import { apiClient } from './client';
import type { AdminUser } from '../types';

export interface UsersResponse {
  users: AdminUser[];
  total: number;
  page: number;
  limit: number;
}

export interface UserStatsResponse {
  totalUsers: number;
  activeUsers: number;
  adminUsers: number;
  pendingApproval: number;
}

class UsersAPI {
  // Get all users with pagination and filters
  async getUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    status?: string;
  }) {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.role) queryParams.append('role', params.role);
    if (params?.status) queryParams.append('status', params.status);

    const query = queryParams.toString();
    const endpoint = `/users${query ? `?${query}` : ''}`;
    
    return apiClient.get<UsersResponse>(endpoint);
  }

  // Get user statistics
  async getUserStats() {
    return apiClient.get<UserStatsResponse>('/users/stats');
  }
}

export const usersAPI = new UsersAPI();
export default usersAPI;