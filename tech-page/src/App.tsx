import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import HPHDetailPage from './pages/HPHDetailPage'
import PEFDetailPage from './pages/PEFDetailPage'
import ScrollToTop from './components/common/ScrollToTop'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/tech/hph" element={<HPHDetailPage />} />
        <Route path="/tech/pef" element={<PEFDetailPage />} />
      </Routes>
    </>
  )
}

export default App