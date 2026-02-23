'use client';

import { useState } from 'react';
import { Mail, Phone, Plus, X } from 'lucide-react';
import { patients, providers } from '../../../lib/data';

export default function AdminPatientsPage() {
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    bloodType: '',
    allergies: '',
    conditions: '',
    assignedDoctorId: ''
  });

  const handleAddPatient = (e) => {
    e.preventDefault();
    alert('Patient added successfully!');
    setShowAddPatientModal(false);
    setNewPatient({
      name: '',
      age: '',
      gender: '',
      phone: '',
      email: '',
      address: '',
      bloodType: '',
      allergies: '',
      conditions: '',
      assignedDoctorId: ''
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Patient Management</h2>
          <p className="text-gray-500">Manage all patients in your practice</p>
        </div>

        <button
          onClick={() => setShowAddPatientModal(true)}
          className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 flex items-center gap-2 shadow-lg"
        >
          <Plus size={20} />
          Add New Patient
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Total Patients</p>
          <h3 className="text-2xl font-bold text-gray-800">{patients.length}</h3>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Active</p>
          <h3 className="text-2xl font-bold text-green-600">{patients.length}</h3>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">New This Month</p>
          <h3 className="text-2xl font-bold text-purple-600">2</h3>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Upcoming Visits</p>
          <h3 className="text-2xl font-bold text-orange-600">12</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patients.map((patient) => (
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
            </div>
          </div>
        ))}
      </div>

      {showAddPatientModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Add New Patient</h2>
                  <p className="text-teal-100">Register a new patient in the system</p>
                </div>
                <button onClick={() => setShowAddPatientModal(false)} className="p-2 hover:bg-white/20 rounded-lg">
                  <X size={24} />
                </button>
              </div>
            </div>

            <form onSubmit={handleAddPatient} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
                  <input
                    type="number"
                    required
                    value={newPatient.age}
                    onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                  <select
                    required
                    value={newPatient.gender}
                    onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={newPatient.phone}
                    onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={newPatient.email}
                    onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assign to Doctor *</label>
                  <select
                    required
                    value={newPatient.assignedDoctorId}
                    onChange={(e) => setNewPatient({ ...newPatient, assignedDoctorId: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Select Doctor</option>
                    {providers.map(provider => (
                      <option key={provider.id} value={provider.id}>{provider.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddPatientModal(false)}
                  className="flex-1 py-3 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 font-medium"
                >
                  Add Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
