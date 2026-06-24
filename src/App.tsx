import { HelmetProvider } from 'react-helmet-async'
import { HomePage } from '@/pages/HomePage'
import { SeoHead } from '@/components/brand/SeoHead'
import { ErrorBoundary } from '@/components/brand/ErrorBoundary'

export default function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <SeoHead />
        <HomePage />
      </ErrorBoundary>
    </HelmetProvider>
  )
}

