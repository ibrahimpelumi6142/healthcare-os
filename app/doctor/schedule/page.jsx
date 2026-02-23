'use client';

import { useEffect, useState } from 'react';
import { getProviderByUserId } from '@/lib/data';

export default function DoctorSchedule() {
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      const providerData = getProviderByUserId(parsedUser.id);
      setProvider(providerData);
    }
  }, []);

  if (!provider) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h3 className="text-lg font-bold mb-4">My Working Schedule</h3>
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500 mb-2">Working Days</p>
          <div className="flex flex-wrap gap-2">
            {provider.workingDays.map(day => (
              <span key={day} className="px-3 py-1 bg-teal-100 text-teal-700 rounded-lg text-sm font-medium">
                {day}
              </span>
            ))}
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500 mb-2">Working Hours</p>
          <p className="font-medium text-gray-800">{provider.workingHours}</p>
        </div>
      </div>
    </div>
  );
}
