'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard, Users, Calendar, User, LogOut, Menu, X, Bell, Search,
  Activity, Phone, Mail, Clock, CheckCircle, FileText, Settings
} from 'lucide-react';
import { getProviderByUserId, getPatientsByDoctor, getAppointmentsByDoctor } from '../../lib/data';

export default function DoctorDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [provider, setProvider] = useState(null);
  const [myPatients, setMyPatients] = useState([]);
  const [myAppointments, setMyAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (!userData) {
      router.push('/');
      return;
    }
    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'doctor') {
      router.push('/');
      return;
    }
    setUser(parsedUser);
    
    // Get provider details
    const providerData = getProviderByUserId(parsedUser.id);
    setProvider(providerData);
    
    if (providerData) {
      // Get only this doctor's patients and appointments
      setMyPatients(getPatientsByDoctor(providerData.id));
      setMyAppointments(getAppointmentsByDoctor(providerData.id));
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    router.push('/');
  };

  const menuItems = [
    { id: 'dashboard', label: 'My Dashboard', icon: LayoutDashboard },
    { id: 'appointments', label: 'My Appointments', icon: Calendar },
    { id: 'patients', label: 'My Patients', icon: Users },
    { id: 'schedule', label: 'My Schedule', icon: Clock },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  if (!user || !provider) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Activity className="text-white" size={20} />
              </div>
              <span className="font-bold text-lg">HealthCare OS</span>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg mb-2 transition-colors ${
                currentPage === item.id ? 'bg-teal-50 text-teal-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        {sidebarOpen && (
          <div className="p-4 border-t">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">{user.name}</div>
                <div className="text-xs text-gray-500">{provider.specialty}</div>
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
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800">
              {menuItems.find(m => m.id === currentPage)?.label}
            </h1>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          {/* Dashboard */}
          {currentPage === 'dashboard' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Good morning, {user.name}</h2>
                <p className="text-gray-500">Here's your schedule for today</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="bg-gradient-to-br from-teal-400 to-teal-500 p-6 rounded-xl text-white shadow-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm opacity-90">Today's Appointments</p>
                      <h3 className="text-3xl font-bold mt-2">{myAppointments.filter(a => a.date === '2026-02-05').length}</h3>
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

              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-bold mb-4">Today's Schedule</h3>
                <div className="space-y-3">
                  {myAppointments.filter(a => a.date === '2026-02-05').map((apt) => (
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
          )}

          {/* My Appointments */}
          {currentPage === 'appointments' && (
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
          )}

          {/* My Patients */}
          {currentPage === 'patients' && (
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
          )}

          {/* My Schedule */}
          {currentPage === 'schedule' && (
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
          )}

          {/* My Profile */}
          {currentPage === 'profile' && (
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
          )}

          {/* Settings */}
          {currentPage === 'settings' && (
            <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
              <Settings className="mx-auto mb-4 text-gray-400" size={64} />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Settings</h3>
              <p className="text-gray-600">Configure your personal settings</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
