'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  Users,
  UserCog,
  DollarSign,
  FileText,
  TrendingUp,
  Settings,
  LogOut,
  Menu,
  X,
  Activity
} from 'lucide-react';

const menuItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/appointments', label: 'All Appointments', icon: Calendar },
  { href: '/admin/patients', label: 'All Patients', icon: Users },
  { href: '/admin/providers', label: 'Provider Management', icon: UserCog },
  { href: '/admin/billing', label: 'Billing', icon: DollarSign },
  { href: '/admin/insurance', label: 'Insurance', icon: FileText },
  { href: '/admin/reports', label: 'Reports', icon: TrendingUp },
  { href: '/admin/settings', label: 'Settings', icon: Settings }
];

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (!userData) {
      router.push('/');
      return;
    }
    const parsed = JSON.parse(userData);
    if (parsed?.role !== 'admin') {
      router.push('/');
      return;
    }
    setUser(parsed);
  }, [router]);

  const activeLabel = useMemo(() => {
    const item = menuItems.find(m => pathname?.startsWith(m.href));
    return item?.label ?? 'Admin';
  }, [pathname]);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    router.push('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside
        className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 border-b flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Activity className="text-white" size={20} />
              </div>
              <span className="font-bold text-lg">HealthCare OS</span>
            </div>
          )}

          <button
            onClick={() => setSidebarOpen(v => !v)}
            className="p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4">
          {menuItems.map((item) => {
            const active = pathname === item.href || pathname?.startsWith(item.href + '/');
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`w-full flex items-center gap-3 p-3 rounded-lg mb-2 transition-colors ${
                  active ? 'bg-teal-50 text-teal-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {sidebarOpen && (
          <div className="p-4 border-t">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">{user?.name}</div>
                <div className="text-xs text-gray-500">Administrator</div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 text-red-600 hover:bg-red-50 p-2 rounded-lg text-sm font-medium"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        )}
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800">{activeLabel}</h1>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
