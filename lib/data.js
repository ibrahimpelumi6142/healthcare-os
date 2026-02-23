// Sample database - In production, this would be a real database
export const users = [
  {
    id: 1,
    email: 'admin@healthcare.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User',
    phone: '(555) 000-0000'
  },
  {
    id: 2,
    email: 'dr.johnson@healthcare.com',
    password: 'doctor123',
    role: 'doctor',
    name: 'Dr. Sarah Johnson',
    specialty: 'General Practice',
    phone: '(555) 100-1001',
    licenseNumber: 'GP-12345',
    providerId: 1
  },
  {
    id: 3,
    email: 'dr.chen@healthcare.com',
    password: 'doctor123',
    role: 'doctor',
    name: 'Dr. Michael Chen',
    specialty: 'Cardiology',
    phone: '(555) 100-1002',
    licenseNumber: 'CARD-67890',
    providerId: 2
  }
];

export const providers = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    email: 'dr.johnson@healthcare.com',
    phone: '(555) 100-1001',
    specialty: 'General Practice',
    licenseNumber: 'GP-12345',
    address: '123 Medical Center, Sheffield, UK',
    status: 'active',
    joinDate: '2020-01-15',
    patients: 342,
    rating: 4.8,
    appointmentsToday: 8,
    bio: 'Board-certified general practitioner with 15 years of experience',
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    workingHours: '9:00 AM - 5:00 PM',
    hourlyRate: '$150',
    userId: 2
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    email: 'dr.chen@healthcare.com',
    phone: '(555) 100-1002',
    specialty: 'Cardiology',
    licenseNumber: 'CARD-67890',
    address: '123 Medical Center, Sheffield, UK',
    status: 'active',
    joinDate: '2019-06-20',
    patients: 256,
    rating: 4.9,
    appointmentsToday: 6,
    bio: 'Specialized in cardiovascular diseases with advanced training',
    workingDays: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
    workingHours: '10:00 AM - 6:00 PM',
    hourlyRate: '$200',
    userId: 3
  },
  {
    id: 3,
    name: 'Dr. Emily Davis',
    email: 'emily.davis@healthcare.com',
    phone: '(555) 100-1003',
    specialty: 'Pediatrics',
    licenseNumber: 'PED-11223',
    address: '123 Medical Center, Sheffield, UK',
    status: 'active',
    joinDate: '2021-03-10',
    patients: 428,
    rating: 5.0,
    appointmentsToday: 12,
    bio: 'Passionate about children\'s health and development',
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    workingHours: '8:00 AM - 4:00 PM',
    hourlyRate: '$175',
    userId: null // No login yet
  }
];

export const patients = [
  {
    id: 1,
    name: 'James Anderson',
    age: 45,
    gender: 'Male',
    phone: '(555) 123-4567',
    email: 'james.anderson@email.com',
    address: '123 Main St, Sheffield, UK',
    lastVisit: '2024-01-28',
    nextAppointment: '2024-02-15',
    status: 'Active',
    assignedDoctorId: 1,
    bloodType: 'O+',
    allergies: ['Penicillin', 'Peanuts'],
    conditions: ['Diabetes Type 2', 'Hypertension'],
    medications: ['Metformin 500mg', 'Lisinopril 10mg'],
    visits: 12,
    balance: '$0'
  },
  {
    id: 2,
    name: 'Maria Garcia',
    age: 32,
    gender: 'Female',
    phone: '(555) 234-5678',
    email: 'maria.garcia@email.com',
    address: '456 Oak Ave, Sheffield, UK',
    lastVisit: '2024-01-25',
    nextAppointment: '2024-02-10',
    status: 'Active',
    assignedDoctorId: 2,
    bloodType: 'A+',
    allergies: ['None'],
    conditions: ['Asthma'],
    medications: ['Albuterol Inhaler'],
    visits: 8,
    balance: '$150'
  },
  {
    id: 3,
    name: 'Robert Johnson',
    age: 58,
    gender: 'Male',
    phone: '(555) 345-6789',
    email: 'robert.j@email.com',
    address: '789 Pine Rd, Sheffield, UK',
    lastVisit: '2024-01-20',
    nextAppointment: '2024-03-05',
    status: 'Active',
    assignedDoctorId: 1,
    bloodType: 'B+',
    allergies: ['Sulfa drugs'],
    conditions: ['High Cholesterol', 'Arthritis'],
    medications: ['Atorvastatin 20mg', 'Ibuprofen 400mg'],
    visits: 24,
    balance: '$0'
  },
  {
    id: 4,
    name: 'Emily Thompson',
    age: 28,
    gender: 'Female',
    phone: '(555) 456-7890',
    email: 'emily.t@email.com',
    address: '321 Elm St, Sheffield, UK',
    lastVisit: '2024-01-15',
    nextAppointment: '2024-02-20',
    status: 'Active',
    assignedDoctorId: 2,
    bloodType: 'AB+',
    allergies: ['Latex'],
    conditions: ['Migraines'],
    medications: ['Sumatriptan 50mg'],
    visits: 5,
    balance: '$0'
  }
];

export const appointments = [
  {
    id: 1,
    patientId: 1,
    patientName: 'James Anderson',
    doctorId: 1,
    doctorName: 'Dr. Sarah Johnson',
    date: '2026-02-05',
    time: '09:00 AM',
    duration: 30,
    type: 'New Patient Consultation',
    status: 'confirmed',
    notes: 'Diabetes follow-up and medication review',
    paymentStatus: 'paid'
  },
  {
    id: 2,
    patientId: 2,
    patientName: 'Maria Garcia',
    doctorId: 2,
    doctorName: 'Dr. Michael Chen',
    date: '2026-02-05',
    time: '10:00 AM',
    duration: 45,
    type: 'Follow-Up Visit',
    status: 'scheduled',
    notes: 'Asthma checkup',
    paymentStatus: 'pending'
  },
  {
    id: 3,
    patientId: 3,
    patientName: 'Robert Johnson',
    doctorId: 1,
    doctorName: 'Dr. Sarah Johnson',
    date: '2026-02-05',
    time: '11:30 AM',
    duration: 30,
    type: 'Annual Physical',
    status: 'confirmed',
    notes: 'Annual checkup',
    paymentStatus: 'paid'
  },
  {
    id: 4,
    patientId: 4,
    patientName: 'Emily Thompson',
    doctorId: 2,
    doctorName: 'Dr. Michael Chen',
    date: '2026-02-05',
    time: '02:00 PM',
    duration: 30,
    type: 'Lab Review',
    status: 'scheduled',
    notes: 'Review blood test results',
    paymentStatus: 'pending'
  }
];

// Helper functions
export function authenticateUser(email, password) {
  return users.find(u => u.email === email && u.password === password);
}

export function getProviderByUserId(userId) {
  return providers.find(p => p.userId === userId);
}

export function getPatientsByDoctor(doctorId) {
  return patients.filter(p => p.assignedDoctorId === doctorId);
}

export function getAppointmentsByDoctor(doctorId) {
  return appointments.filter(a => a.doctorId === doctorId);
}

export function addNewProvider(providerData) {
  const newId = Math.max(...providers.map(p => p.id)) + 1;
  const newProvider = {
    id: newId,
    ...providerData,
    joinDate: new Date().toISOString().split('T')[0],
    patients: 0,
    rating: 0,
    appointmentsToday: 0,
    status: 'active'
  };
  providers.push(newProvider);
  
  // Also create user account
  const newUserId = Math.max(...users.map(u => u.id)) + 1;
  const newUser = {
    id: newUserId,
    email: providerData.email,
    password: providerData.password || 'changeme123',
    role: 'doctor',
    name: providerData.name,
    specialty: providerData.specialty,
    phone: providerData.phone,
    licenseNumber: providerData.licenseNumber,
    providerId: newId
  };
  users.push(newUser);
  
  newProvider.userId = newUserId;
  return newProvider;
}
