import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage.jsx'
import HPHDetailPage from './pages/HPHDetailPage.jsx'
import PEFDetailPage from './pages/PEFDetailPage.jsx'
import ScrollToTop from './components/common/ScrollToTop.jsx'

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