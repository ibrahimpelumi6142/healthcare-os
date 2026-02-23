'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Activity, Mail, Lock, AlertCircle } from 'lucide-react';
import { authenticateUser } from '../lib/data';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate network delay
    setTimeout(() => {
      const user = authenticateUser(email, password);
      
      if (user) {
        // Store user data in sessionStorage
        sessionStorage.setItem('user', JSON.stringify(user));
        
        // Redirect based on role
        if (user.role === 'admin') {
          router.push('/admin');
        } else if (user.role === 'doctor') {
          router.push('/doctor');
        }
      } else {
        setError('Invalid email or password');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/login-bg.jpg)',
          filter: 'brightness(0.4)'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900/80 via-blue-900/80 to-purple-900/80" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Glass Effect Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
              <Activity className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              HealthCare OS
            </h1>
            <p className="text-gray-600">Practice Management System</p>
          </div>

          {/* Demo Credentials Info */}
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-6">
            <p className="text-blue-900 font-semibold text-sm mb-2">
              Demo Credentials
            </p>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-700">Admin:</span>
                <span className="text-blue-900 font-mono">admin@healthcare.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Doctor:</span>
                <span className="text-blue-900 font-mono">dr.johnson@healthcare.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Password:</span>
                <span className="text-blue-900 font-mono">admin123 / doctor123</span>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@healthcare.com"
                  required
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2 text-red-700">
                <AlertCircle size={18} />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white py-3 rounded-lg hover:from-teal-600 hover:to-blue-700 font-medium transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                'Sign In to Dashboard'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center space-y-2">
            <p className="text-sm text-gray-500">
              Open Source Healthcare Management
            </p>
            <a 
              href="https://github.com/ibrahimpelumi6142/healthcare-os" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm text-teal-600 hover:text-teal-700 font-medium"
            >
              View on GitHub →
            </a>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center text-white/80 text-sm">
          <p>© 2026 HealthCare OS. Open Source under MIT License.</p>
        </div>
      </div>
    </div>
  );
}
