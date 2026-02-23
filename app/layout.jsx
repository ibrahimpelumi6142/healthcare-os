import './globals.css'

export const metadata = {
  title: 'HealthCare OS - Practice Management System',
  description: 'Open-source practice management for small healthcare providers',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
