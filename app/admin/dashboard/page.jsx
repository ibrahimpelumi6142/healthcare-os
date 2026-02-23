'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Users, UserCog, DollarSign, Star } from 'lucide-react';
import { providers, patients, appointments } from '../../../lib/data';

export default function AdminDashboardPage() {
  const router = useRouter();
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

  if (!user) return null;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Good morning, {user.name}</h2>
        <p className="text-gray-500">Here&apos;s your practice overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-gradient-to-br from-teal-400 to-teal-500 p-6 rounded-xl text-white shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm opacity-90">Total Appointments</p>
              <h3 className="text-3xl font-bold mt-2">{appointments.length}</h3>
            </div>
            <Calendar className="opacity-80" size={24} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-400 to-blue-500 p-6 rounded-xl text-white shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm opacity-90">Total Patients</p>
              <h3 className="text-3xl font-bold mt-2">{patients.length}</h3>
            </div>
            <Users className="opacity-80" size={24} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-400 to-purple-500 p-6 rounded-xl text-white shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm opacity-90">Active Providers</p>
              <h3 className="text-3xl font-bold mt-2">{providers.length}</h3>
            </div>
            <UserCog className="opacity-80" size={24} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-400 to-green-500 p-6 rounded-xl text-white shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm opacity-90">Monthly Revenue</p>
              <h3 className="text-3xl font-bold mt-2">$12,500</h3>
            </div>
            <DollarSign className="opacity-80" size={24} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-bold mb-4">Recent Appointments</h3>
          <div className="space-y-3">
            {appointments.slice(0, 5).map((apt) => (
              <div key={apt.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{apt.patientName}</p>
                  <p className="text-sm text-gray-500">{apt.doctorName} • {apt.time}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    apt.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {apt.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-bold mb-4">Top Providers</h3>
          <div className="space-y-3">
            {providers.map((provider) => (
              <div key={provider.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {provider.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{provider.name}</p>
                    <p className="text-sm text-gray-500">{provider.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-400 fill-yellow-400" size={14} />
                  <span className="text-sm font-medium">{provider.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
