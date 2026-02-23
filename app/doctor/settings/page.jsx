'use client';

import { Settings } from 'lucide-react';

export default function DoctorSettings() {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
      <Settings className="mx-auto mb-4 text-gray-400" size={64} />
      <h3 className="text-2xl font-bold text-gray-800 mb-2">Settings</h3>
      <p className="text-gray-600">Configure your personal settings</p>
    </div>
  );
}
