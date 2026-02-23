'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getProviderByUserId } from '@/lib/data';

export default function DoctorLayout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);

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

    const providerData = getProviderByUserId(parsedUser.id);
    
    setUser(parsedUser);
    setProvider(providerData);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        role="doctor" 
        userName={user.name}
        userRole={provider?.specialty || 'Doctor'}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
