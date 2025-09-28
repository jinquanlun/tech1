import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import CategoryDetailPage from './pages/CategoryDetailPage'
import HPHDetailPage from './pages/HPHDetailPage'
import PEFDetailPage from './pages/PEFDetailPage'
import HPHVideoPage from './pages/HPHVideoPage'
import PEFVideoPage from './pages/PEFVideoPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/:techType/:categoryId" element={<CategoryDetailPage />} />
      <Route path="/tech/hph" element={<HPHDetailPage />} />
      <Route path="/tech/pef" element={<PEFDetailPage />} />
      <Route path="/video/hph" element={<HPHVideoPage />} />
      <Route path="/video/pef" element={<PEFVideoPage />} />
    </Routes>
  )
}

export default App