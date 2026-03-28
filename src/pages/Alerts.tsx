import { useState, useEffect } from 'react'
import { useAlertStore } from '../store/alertStore'
import AlertForm from '../components/AlertForm'
import AlertList from '../components/AlertList'

export default function Alerts() {
  const { alerts } = useAlertStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-white">Price Alerts</h1>
        <p className="text-gray-400">Set up alerts for cryptocurrency price movements</p>
      </div>

      <div className="space-y-8">
        {/* Create Alert Form */}
        <div className="bg-primary bg-opacity-50 backdrop-blur-md rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Create New Alert</h2>
          <AlertForm />
        </div>

        {/* Active Alerts */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">
            Active Alerts ({alerts.filter(a => a.active).length})
          </h2>
          {alerts.filter(a => a.active).length === 0 ? (
            <div className="bg-primary bg-opacity-50 backdrop-blur-md rounded-lg p-8 border border-gray-700 text-center">
              <p className="text-gray-400">No active alerts. Create one to get started!</p>
            </div>
          ) : (
            <AlertList alerts={alerts.filter(a => a.active)} />
          )}
        </div>

        {/* Triggered Alerts */}
        {alerts.filter(a => !a.active).length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-white mb-4">
              Triggered Alerts ({alerts.filter(a => !a.active).length})
            </h2>
            <AlertList alerts={alerts.filter(a => !a.active)} triggered />
          </div>
        )}
      </div>
    </div>
  )
}
