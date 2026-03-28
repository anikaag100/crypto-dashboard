import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="sticky top-0 z-50 bg-secondary bg-opacity-95 backdrop-blur-md border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-accent to-blue-600 rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-accent/50 transition-all">
              <span className="text-white font-bold">₿</span>
            </div>
            <span className="text-xl font-bold text-white hidden sm:inline">Crypto Dashboard</span>
          </Link>

          <div className="flex items-center gap-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg transition-all ${
                isActive('/')
                  ? 'bg-accent text-white'
                  : 'text-gray-400 hover:text-white hover:bg-primary'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/portfolio"
              className={`px-3 py-2 rounded-lg transition-all ${
                isActive('/portfolio')
                  ? 'bg-accent text-white'
                  : 'text-gray-400 hover:text-white hover:bg-primary'
              }`}
            >
              Portfolio
            </Link>
            <Link
              to="/alerts"
              className={`px-3 py-2 rounded-lg transition-all ${
                isActive('/alerts')
                  ? 'bg-accent text-white'
                  : 'text-gray-400 hover:text-white hover:bg-primary'
              }`}
            >
              Alerts
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
