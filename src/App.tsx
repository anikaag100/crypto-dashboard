import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Portfolio from './pages/Portfolio'
import Alerts from './pages/Alerts'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-secondary to-primary">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/alerts" element={<Alerts />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
