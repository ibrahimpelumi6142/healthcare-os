'use client';

import { useEffect, useState } from 'react';
import { Phone, Mail, Calendar } from 'lucide-react';
import { getProviderByUserId, getPatientsByDoctor } from '@/lib/data';

export default function DoctorPatients() {
  const [myPatients, setMyPatients] = useState([]);

  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      const providerData = getProviderByUserId(parsedUser.id);
      
      if (providerData) {
        setMyPatients(getPatientsByDoctor(providerData.id));
      }
    }
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Total Patients</p>
          <h3 className="text-2xl font-bold text-gray-800">{myPatients.length}</h3>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Active</p>
          <h3 className="text-2xl font-bold text-green-600">{myPatients.length}</h3>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Visits This Week</p>
          <h3 className="text-2xl font-bold text-purple-600">8</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {myPatients.map((patient) => (
          <div key={patient.id} className="bg-white border rounded-lg p-4 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{patient.name}</h3>
                  <p className="text-sm text-gray-500">{patient.age}y • {patient.gender}</p>
                </div>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                {patient.status}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Phone size={14} />
                {patient.phone}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail size={14} />
                <span className="truncate">{patient.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar size={14} />
                Last visit: {patient.lastVisit}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
