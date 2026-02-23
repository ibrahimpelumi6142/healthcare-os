'use client';

import { useEffect, useState } from 'react';
import { Mail, Phone } from 'lucide-react';
import { getProviderByUserId } from '@/lib/data';

export default function DoctorProfile() {
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
      <div className="flex items-center gap-6 mb-6">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-3xl">
          {provider.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{provider.name}</h2>
          <p className="text-gray-600">{provider.specialty}</p>
          <p className="text-sm text-gray-500 mt-1">License: {provider.licenseNumber}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Contact Information</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-700">
              <Mail size={16} />
              {provider.email}
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Phone size={16} />
              {provider.phone}
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Statistics</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Patients</span>
              <span className="font-bold">{provider.patients}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Rating</span>
              <span className="font-bold">{provider.rating} ⭐</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Join Date</span>
              <span className="font-bold">{provider.joinDate}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-gray-800 mb-3">Biography</h3>
        <p className="text-gray-700">{provider.bio}</p>
      </div>
    </div>
  );
}
