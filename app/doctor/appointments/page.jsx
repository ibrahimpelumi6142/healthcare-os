'use client';

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { getProviderByUserId, getAppointmentsByDoctor } from '@/lib/data';

export default function DoctorAppointments() {
  const [provider, setProvider] = useState(null);
  const [myAppointments, setMyAppointments] = useState([]);

  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      const providerData = getProviderByUserId(parsedUser.id);
      setProvider(providerData);
      
      if (providerData) {
        setMyAppointments(getAppointmentsByDoctor(providerData.id));
      }
    }
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Total</p>
          <h3 className="text-2xl font-bold text-gray-800">{myAppointments.length}</h3>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Today</p>
          <h3 className="text-2xl font-bold text-green-600">
            {myAppointments.filter(a => a.date === '2026-02-05').length}
          </h3>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Confirmed</p>
          <h3 className="text-2xl font-bold text-blue-600">
            {myAppointments.filter(a => a.status === 'confirmed').length}
          </h3>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-bold mb-4">My Appointments</h3>
        <div className="space-y-3">
          {myAppointments.map((apt) => (
            <div key={apt.id} className="border rounded-lg p-4 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-gray-800">{apt.patientName}</h4>
                  <p className="text-sm text-gray-600">{apt.type}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs ${
                  apt.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {apt.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {apt.date} at {apt.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
