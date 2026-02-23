'use client';

import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Users, Calendar, UserCog, DollarSign, 
  FileText, Settings, LogOut, Menu, X, Activity, Clock, User,
  TrendingUp
} from 'lucide-react';
import { useState } from 'react';

export default function Sidebar({ role, userName, userRole }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    router.push('/');
  };

  const adminMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
    { id: 'appointments', label: 'All Appointments', icon: Calendar, href: '/admin/appointments' },
    { id: 'patients', label: 'All Patients', icon: Users, href: '/admin/patients' },
    { id: 'providers', label: 'Provider Management', icon: UserCog, href: '/admin/providers' },
    { id: 'billing', label: 'Billing', icon: DollarSign, href: '/admin/billing' },
    { id: 'insurance', label: 'Insurance', icon: FileText, href: '/admin/insurance' },
    { id: 'reports', label: 'Reports', icon: TrendingUp, href: '/admin/reports' },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/admin/settings' }
  ];

  const doctorMenuItems = [
    { id: 'dashboard', label: 'My Dashboard', icon: LayoutDashboard, href: '/doctor/dashboard' },
    { id: 'appointments', label: 'My Appointments', icon: Calendar, href: '/doctor/appointments' },
    { id: 'patients', label: 'My Patients', icon: Users, href: '/doctor/patients' },
    { id: 'schedule', label: 'My Schedule', icon: Clock, href: '/doctor/schedule' },
    { id: 'profile', label: 'My Profile', icon: User, href: '/doctor/profile' },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/doctor/settings' }
  ];

  const menuItems = role === 'admin' ? adminMenuItems : doctorMenuItems;

  return (
    <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col h-screen sticky top-0`}>
      {/* Logo */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {sidebarOpen && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Activity className="text-white" size={20} />
            </div>
            <span className="font-bold text-lg">HealthCare OS</span>
          </div>
        )}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <button
              key={item.id}
              onClick={() => router.push(item.href)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg mb-2 transition-all ${
                isActive 
                  ? 'bg-teal-50 text-teal-600 font-medium shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* User Profile */}
      {sidebarOpen && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
              {userName ? userName.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm truncate">{userName || 'User'}</div>
              <div className="text-xs text-gray-500">{userRole || role}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-red-600 hover:bg-red-50 p-2 rounded-lg text-sm font-medium transition-colors"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
