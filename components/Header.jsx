'use client';

import { Bell, Search } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  
  const getPageTitle = () => {
    const segments = pathname.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    
    const titles = {
      'dashboard': 'Dashboard',
      'appointments': 'Appointments',
      'patients': 'Patients',
      'providers': 'Provider Management',
      'billing': 'Billing',
      'insurance': 'Insurance Claims',
      'reports': 'Reports & Analytics',
      'settings': 'Settings',
      'schedule': 'My Schedule',
      'profile': 'My Profile'
    };
    
    return titles[lastSegment] || 'Dashboard';
  };

  return (
    <header className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <h1 className="text-2xl font-bold text-gray-800">
            {getPageTitle()}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
            <Search size={18} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent outline-none w-64 text-sm"
            />
          </div>

          {/* Notifications */}
          <button className="p-2 hover:bg-gray-100 rounded-lg relative transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
