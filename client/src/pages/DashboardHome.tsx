import { useState, useEffect } from 'react';
import { usersAPI } from '../api/users';
import type { AdminUser } from '../types';

interface DashboardStats {
  totalUsers: number;
  totalMinutes: number;
  activeClients: number;
  remainingClientMinutes: number;
  totalActiveBots: number;
  totalBots: number;
}

interface User extends AdminUser {
  minutesUsed?: number;
  minutesRemaining?: number;
  lastActive?: string;
  plan?: string;
  status?: 'active' | 'inactive' | 'suspended';
}

export default function DashboardHome() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalMinutes: 125463,
    activeClients: 0,
    remainingClientMinutes: 47592,
    totalActiveBots: 23,
    totalBots: 45
  });

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load dashboard data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Load user statistics
        const statsResponse = await usersAPI.getUserStats();
        if (statsResponse.success && statsResponse.data) {
          setStats(prev => ({
            ...prev,
            totalUsers: statsResponse.data!.totalUsers,
            activeClients: statsResponse.data!.activeUsers,
          }));
        }

        // Load users for the table
        const usersResponse = await usersAPI.getUsers({ limit: 10 });
        if (usersResponse.success && usersResponse.data) {
          setUsers(usersResponse.data.users);
        }
      } catch (err) {
        console.error('Error loading dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Get user status based on AdminUser properties
  const getUserStatus = (user: User): 'active' | 'inactive' | 'suspended' => {
    if (!user.isActive) return 'inactive';
    if (!user.isApproved) return 'suspended';
    return 'active';
  };

  const getStatusBadge = (status: 'active' | 'inactive' | 'suspended') => {
    const statusStyles = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      suspended: 'bg-red-100 text-red-800'
    };
    return statusStyles[status];
  };

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  // Generate a user ID for display purposes
  const getUserId = (user: User) => {
    return user._id || `user-${user.email}`;
  };

  // Calculate dummy minutes for display
  const getMinutesUsed = (user: User) => {
    return user.minutesUsed || Math.floor(Math.random() * 1000);
  };

  const getMinutesRemaining = (user: User) => {
    return user.minutesRemaining || Math.floor(Math.random() * 2000 + 500);
  };

  const getUserPlan = (user: User) => {
    return user.plan || (user.role === 'admin' ? 'Admin' : user.role === 'super_admin' ? 'Super Admin' : 'Basic');
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
          Admin Dashboard
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl">
          Monitor your calling agent platform with real-time metrics and user management
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {/* Total Users */}
        <div className="bg-linear-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200/50 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Total Clients</h3>
              <p className="text-2xl font-bold text-blue-900 mt-2">{stats.totalUsers.toLocaleString()}</p>
              <p className="text-sm text-blue-600 mt-1 font-medium">All registered</p>
            </div>
            <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-1a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Minutes */}
        <div className="bg-linear-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl border border-emerald-200/50 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">Total Minutes</h3>
              <p className="text-2xl font-bold text-emerald-900 mt-2">{stats.totalMinutes.toLocaleString()}</p>
              <p className="text-sm text-emerald-600 mt-1 font-medium">All time usage</p>
            </div>
            <div className="p-3 bg-emerald-500 rounded-xl shadow-lg">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Active Clients */}
        <div className="bg-linear-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200/50 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-purple-600 uppercase tracking-wider">Active Clients</h3>
              <p className="text-2xl font-bold text-purple-900 mt-2">{stats.activeClients}</p>
              <p className="text-sm text-purple-600 mt-1 font-medium">Currently online</p>
            </div>
            <div className="p-3 bg-purple-500 rounded-xl shadow-lg">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Remaining Client Minutes */}
        <div className="bg-linear-to-br from-amber-50 to-amber-100 p-6 rounded-xl border border-amber-200/50 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-amber-600 uppercase tracking-wider">Remaining Minutes</h3>
              <p className="text-2xl font-bold text-amber-900 mt-2">{stats.remainingClientMinutes.toLocaleString()}</p>
              <p className="text-sm text-amber-600 mt-1 font-medium">Available balance</p>
            </div>
            <div className="p-3 bg-amber-500 rounded-xl shadow-lg">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Active Bots */}
        <div className="bg-linear-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl border border-indigo-200/50 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">Active Bots</h3>
              <p className="text-2xl font-bold text-indigo-900 mt-2">{stats.totalActiveBots}</p>
              <p className="text-sm text-indigo-600 mt-1 font-medium">Currently running</p>
            </div>
            <div className="p-3 bg-indigo-500 rounded-xl shadow-lg">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Bots */}
        <div className="bg-linear-to-br from-rose-50 to-rose-100 p-6 rounded-xl border border-rose-200/50 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-rose-600 uppercase tracking-wider">Total Bots</h3>
              <p className="text-2xl font-bold text-rose-900 mt-2">{stats.totalBots}</p>
              <p className="text-sm text-rose-600 mt-1 font-medium">All configured</p>
            </div>
            <div className="p-3 bg-rose-500 rounded-xl shadow-lg">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Loading and Error States */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading dashboard data...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="text-red-400">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading data</h3>
              <p className="text-sm text-red-600 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Users Table */}
      {!loading && !error && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">User Management</h3>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search users..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Add User
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Minutes Used
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Minutes Remaining
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => {
                const userStatus = getUserStatus(user);
                return (
                  <tr key={getUserId(user)} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center">
                          <span className="text-sm font-medium text-white">
                            {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(userStatus)}`}>
                        {userStatus.charAt(0).toUpperCase() + userStatus.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getUserPlan(user)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getMinutesUsed(user).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getMinutesRemaining(user).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDateTime(user.updatedAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <span className="text-gray-400 text-xs">View Only</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
                <span className="font-medium">{users.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}