'use client';

import { useState } from 'react';
import { Mail, Phone, Plus, Star, X, Send, User, Lock, Briefcase, Clock } from 'lucide-react';
import { providers, addNewProvider } from '../../../lib/data';

export default function AdminProvidersPage() {
  const [showAddDoctorModal, setShowAddDoctorModal] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    specialty: '',
    licenseNumber: '',
    address: '',
    bio: '',
    hourlyRate: '',
    workingDays: [],
    workingHours: '9:00 AM - 5:00 PM'
  });

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const specialties = ['General Practice', 'Cardiology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'Psychiatry'];

  const toggleWorkingDay = (day) => {
    setNewDoctor(prev => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter(d => d !== day)
        : [...prev.workingDays, day]
    }));
  };

  const handleAddDoctor = (e) => {
    e.preventDefault();
    addNewProvider(newDoctor);

    alert(
      `Doctor added successfully!\n\nLogin Credentials:\nEmail: ${newDoctor.email}\nPassword: ${newDoctor.password}\n\nPlease share these credentials with the doctor.`
    );

    setShowAddDoctorModal(false);
    setNewDoctor({
      name: '',
      email: '',
      password: '',
      phone: '',
      specialty: '',
      licenseNumber: '',
      address: '',
      bio: '',
      hourlyRate: '',
      workingDays: [],
      workingHours: '9:00 AM - 5:00 PM'
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Provider Management</h2>
          <p className="text-gray-500">Manage your medical staff and onboard new doctors</p>
        </div>

        <button
          onClick={() => setShowAddDoctorModal(true)}
          className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 flex items-center gap-2 shadow-lg"
        >
          <Plus size={20} />
          Add New Doctor
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Total Providers</p>
          <h3 className="text-2xl font-bold text-gray-800">{providers.length}</h3>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Active</p>
          <h3 className="text-2xl font-bold text-green-600">{providers.length}</h3>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Specialties</p>
          <h3 className="text-2xl font-bold text-purple-600">
            {new Set(providers.map(p => p.specialty)).size}
          </h3>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Avg Rating</p>
          <h3 className="text-2xl font-bold text-yellow-600">4.9</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map((provider) => (
          <div key={provider.id} className="bg-white border rounded-lg p-6 hover:shadow-lg transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {provider.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{provider.name}</h3>
                <p className="text-sm text-gray-600">{provider.specialty}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="text-yellow-400 fill-yellow-400" size={14} />
                  <span className="text-sm font-medium">{provider.rating}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail size={14} />
                {provider.email}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone size={14} />
                {provider.phone}
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Total Patients</span>
                <span className="font-bold text-gray-800">{provider.patients}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddDoctorModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full my-8">
            <div className="sticky top-0 bg-gradient-to-r from-teal-500 to-blue-500 text-white p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Add New Doctor</h2>
                  <p className="text-teal-100">Onboard a new healthcare provider</p>
                </div>
                <button onClick={() => setShowAddDoctorModal(false)} className="p-2 hover:bg-white/20 rounded-lg">
                  <X size={24} />
                </button>
              </div>
            </div>

            <form onSubmit={handleAddDoctor} className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <User size={20} className="text-teal-600" />
                  Personal Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={newDoctor.name}
                      onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={newDoctor.phone}
                      onChange={(e) => setNewDoctor({ ...newDoctor, phone: e.target.value })}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Lock size={20} className="text-yellow-600" />
                  Login Credentials
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={newDoctor.email}
                      onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                    <input
                      type="text"
                      required
                      value={newDoctor.password}
                      onChange={(e) => setNewDoctor({ ...newDoctor, password: e.target.value })}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Briefcase size={20} className="text-teal-600" />
                  Professional Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Specialty *</label>
                    <select
                      required
                      value={newDoctor.specialty}
                      onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
                      className="input-field"
                    >
                      <option value="">Select Specialty</option>
                      {specialties.map(spec => (
                        <option key={spec} value={spec}>{spec}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">License Number *</label>
                    <input
                      type="text"
                      required
                      value={newDoctor.licenseNumber}
                      onChange={(e) => setNewDoctor({ ...newDoctor, licenseNumber: e.target.value })}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Clock size={20} className="text-teal-600" />
                  Working Schedule
                </h3>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Working Days *</label>
                  <div className="flex flex-wrap gap-2">
                    {weekDays.map(day => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleWorkingDay(day)}
                        className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                          newDoctor.workingDays.includes(day)
                            ? 'bg-teal-500 text-white border-teal-500'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {day.substring(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Working Hours</label>
                  <input
                    type="text"
                    value={newDoctor.workingHours}
                    onChange={(e) => setNewDoctor({ ...newDoctor, workingHours: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddDoctorModal(false)}
                  className="flex-1 py-3 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 font-medium flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Add Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
