'use client';

import { useState } from 'react';
import { Clock, Plus, User } from 'lucide-react';
import { providers, patients, appointments } from '../../../lib/data';

export default function AdminAppointmentsPage() {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patientId: '',
    doctorId: '',
    date: '',
    time: '',
    type: '',
    notes: ''
  });

  const handleScheduleAppointment = (e) => {
    e.preventDefault();
    alert('Appointment scheduled successfully!');
    setShowScheduleModal(false);
    setNewAppointment({ patientId: '', doctorId: '', date: '', time: '', type: '', notes: '' });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Appointment Management</h2>
          <p className="text-gray-500">Manage all appointments across providers</p>
        </div>

        <button
          onClick={() => setShowScheduleModal(true)}
          className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 flex items-center gap-2 shadow-lg"
        >
          <Plus size={20} />
          Schedule Appointment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Total</p>
          <h3 className="text-2xl font-bold text-gray-800">{appointments.length}</h3>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Confirmed</p>
          <h3 className="text-2xl font-bold text-green-600">
            {appointments.filter(a => a.status === 'confirmed').length}
          </h3>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Scheduled</p>
          <h3 className="text-2xl font-bold text-yellow-600">
            {appointments.filter(a => a.status === 'scheduled').length}
          </h3>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-500">Today</p>
          <h3 className="text-2xl font-bold text-blue-600">{appointments.length}</h3>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-bold mb-4">All Appointments</h3>
        <div className="space-y-3">
          {appointments.map((apt) => (
            <div key={apt.id} className="border rounded-lg p-4 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-gray-800">{apt.patientName}</h4>
                  <p className="text-sm text-gray-600">{apt.type}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    apt.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {apt.status}
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {apt.date} at {apt.time}
                </span>
                <span className="flex items-center gap-1">
                  <User size={14} />
                  {apt.doctorName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Schedule Appointment</h2>
                  <p className="text-teal-100">Book a new appointment</p>
                </div>
                <button onClick={() => setShowScheduleModal(false)} className="p-2 hover:bg-white/20 rounded-lg">
                  ✕
                </button>
              </div>
            </div>

            <form onSubmit={handleScheduleAppointment} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Patient *</label>
                  <select
                    required
                    value={newAppointment.patientId}
                    onChange={(e) => setNewAppointment({ ...newAppointment, patientId: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Select Patient</option>
                    {patients.map(patient => (
                      <option key={patient.id} value={patient.id}>{patient.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Doctor *</label>
                  <select
                    required
                    value={newAppointment.doctorId}
                    onChange={(e) => setNewAppointment({ ...newAppointment, doctorId: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Select Doctor</option>
                    {providers.map(provider => (
                      <option key={provider.id} value={provider.id}>{provider.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                  <input
                    type="date"
                    required
                    value={newAppointment.date}
                    onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
                  <input
                    type="time"
                    required
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Type *</label>
                  <select
                    required
                    value={newAppointment.type}
                    onChange={(e) => setNewAppointment({ ...newAppointment, type: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Select Type</option>
                    <option value="New Patient Consultation">New Patient Consultation</option>
                    <option value="Follow-Up Visit">Follow-Up Visit</option>
                    <option value="Annual Physical">Annual Physical</option>
                    <option value="Lab Review">Lab Review</option>
                    <option value="Urgent Care">Urgent Care</option>
                    <option value="Telehealth">Telehealth</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    value={newAppointment.notes}
                    onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                    rows={3}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1 py-3 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 font-medium"
                >
                  Schedule Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
