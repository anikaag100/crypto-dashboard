import { PriceAlert, useAlertStore } from '../store/alertStore'

interface AlertListProps {
  alerts: PriceAlert[]
  triggered?: boolean
}

export default function AlertList({ alerts, triggered = false }: AlertListProps) {
  const { removeAlert, toggleAlert } = useAlertStore()

  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className="bg-primary bg-opacity-50 backdrop-blur-md rounded-lg p-4 border border-gray-700 hover:border-accent transition-all"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white">{alert.symbol}</h3>
              <p className="text-sm text-gray-400">{alert.name}</p>
            </div>
            <div className="flex gap-2">
              {!triggered && (
                <button
                  onClick={() => toggleAlert(alert.id)}
                  className={`px-3 py-1 rounded-lg text-sm transition-all font-semibold ${
                    alert.active
                      ? 'bg-success bg-opacity-20 text-success hover:bg-opacity-40'
                      : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                  }`}
                >
                  {alert.active ? 'Active' : 'Inactive'}
                </button>
              )}
              <button
                onClick={() => {
                  if (confirm('Delete this alert?')) {
                    removeAlert(alert.id)
                  }
                }}
                className="px-3 py-1 bg-danger bg-opacity-20 text-danger hover:bg-opacity-40 rounded-lg text-sm transition-all"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-gray-700">
            <div className="space-y-1 text-sm">
              <p className="text-gray-400">
                Alert when price goes{' '}
                <span className={alert.condition === 'above' ? 'text-success' : 'text-danger'}>
                  {alert.condition === 'above' ? 'above' : 'below'}
                </span>{' '}
                <span className="text-white font-semibold">${alert.targetPrice.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
              </p>
              <p className="text-gray-500 text-xs">
                Created: {new Date(alert.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
              {triggered && alert.triggeredAt && (
                <p className="text-success text-xs font-semibold">
                  ✓ Triggered: {new Date(alert.triggeredAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
