import { HelmetProvider } from 'react-helmet-async'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'
import { AdminDashboard } from '@/pages/AdminDashboard'
import { SeoHead } from '@/components/brand/SeoHead'
import { ErrorBoundary } from '@/components/brand/ErrorBoundary'

export default function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <SeoHead />
        <HashRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </HashRouter>
      </ErrorBoundary>
    </HelmetProvider>
  )
}

