import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import ScrollToTop from './components/common/ScrollToTop.jsx'

// Lazy-loaded components for code splitting
const MainPage = lazy(() => import('./pages/MainPage.jsx'))
const HPHDetailPage = lazy(() => import('./pages/HPHDetailPage.jsx'))
const PEFDetailPage = lazy(() => import('./pages/PEFDetailPage.jsx'))

// Loading component
const LoadingSpinner = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#2a2a2c',
    color: '#ffffff',
    fontSize: '1.2rem'
  }}>
    Loading...
  </div>
)

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/tech/hph" element={<HPHDetailPage />} />
          <Route path="/tech/pef" element={<PEFDetailPage />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App