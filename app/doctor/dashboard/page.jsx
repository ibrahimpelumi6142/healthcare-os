'use client';

import { useEffect, useState } from 'react';
import { Calendar, Users, Clock, CheckCircle, Activity } from 'lucide-react';
import { getProviderByUserId, getPatientsByDoctor, getAppointmentsByDoctor } from '@/lib/data';

export default function DoctorDashboard() {
  const [user, setUser] = useState(null);
  const [provider, setProvider] = useState(null);
  const [myPatients, setMyPatients] = useState([]);
  const [myAppointments, setMyAppointments] = useState([]);

  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      const providerData = getProviderByUserId(parsedUser.id);
      setProvider(providerData);
      
      if (providerData) {
        setMyPatients(getPatientsByDoctor(providerData.id));
        setMyAppointments(getAppointmentsByDoctor(providerData.id));
      }
    }
  }, []);

  if (!user || !provider) return null;

  const todaysAppointments = myAppointments.filter(a => a.date === '2026-02-05');

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Good morning, {user.name}</h2>
        <p className="text-gray-500">Here's your schedule for today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-gradient-to-br from-teal-400 to-teal-500 p-6 rounded-xl text-white shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm opacity-90">Today's Appointments</p>
              <h3 className="text-3xl font-bold mt-2">{todaysAppointments.length}</h3>
            </div>
            <Calendar className="opacity-80" size={24} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-400 to-blue-500 p-6 rounded-xl text-white shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm opacity-90">My Patients</p>
              <h3 className="text-3xl font-bold mt-2">{myPatients.length}</h3>
            </div>
            <Users className="opacity-80" size={24} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-400 to-purple-500 p-6 rounded-xl text-white shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm opacity-90">Completed Today</p>
              <h3 className="text-3xl font-bold mt-2">0</h3>
            </div>
            <CheckCircle className="opacity-80" size={24} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-400 to-green-500 p-6 rounded-xl text-white shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm opacity-90">Rating</p>
              <h3 className="text-3xl font-bold mt-2">{provider.rating}</h3>
            </div>
            <Activity className="opacity-80" size={24} />
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-bold mb-4">Today's Schedule</h3>
        <div className="space-y-3">
          {todaysAppointments.map((apt) => (
            <div key={apt.id} className={`border-l-4 p-4 rounded-lg ${
              apt.status === 'confirmed' ? 'bg-green-50 border-green-500' : 'bg-yellow-50 border-yellow-500'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-800">{apt.patientName}</h4>
                  <p className="text-sm text-gray-600">{apt.type}</p>
                  <p className="text-xs text-gray-500 mt-1">{apt.time} • {apt.duration} min</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs ${
                  apt.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {apt.status}
                </span>
              </div>
              {apt.notes && (
                <p className="text-sm text-gray-600 mt-2 italic">{apt.notes}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
