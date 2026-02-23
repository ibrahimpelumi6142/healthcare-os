'use client';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 p-4 mt-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
        <div>
          © 2026 HealthCare OS. Open Source under MIT License.
        </div>
        <div className="flex items-center gap-6">
          <a 
            href="https://github.com/ibrahimpelumi6142/healthcare-os" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-teal-600 transition-colors"
          >
            GitHub
          </a>
          <a 
            href="#" 
            className="hover:text-teal-600 transition-colors"
          >
            Documentation
          </a>
          <a 
            href="#" 
            className="hover:text-teal-600 transition-colors"
          >
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
