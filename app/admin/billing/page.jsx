'use client';

export default function Page() {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        This page is available in the Dashboard
      </h2>
      <p className="text-gray-600 mb-6">
        Click "Dashboard" in the sidebar to access all features including this one.
      </p>
      <a 
        href="/admin/dashboard"
        className="inline-block bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600"
      >
        Go to Dashboard
      </a>
    </div>
  );
}
