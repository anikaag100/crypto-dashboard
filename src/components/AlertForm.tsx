import { useState } from 'react'
import { useAlertStore, PriceAlert } from '../store/alertStore'

const generateId = () => Math.random().toString(36).substr(2, 9)

export default function AlertForm() {
  const { addAlert } = useAlertStore()
  const [symbol, setSymbol] = useState('')
  const [name, setName] = useState('')
  const [targetPrice, setTargetPrice] = useState('')
  const [condition, setCondition] = useState<'above' | 'below'>('above')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!symbol || !name || !targetPrice) {
      window.alert('Please fill in all fields')
      return
    }

    const alert: PriceAlert = {
      id: generateId(),
      symbol: symbol.toUpperCase(),
      name,
      targetPrice: parseFloat(targetPrice),
      condition,
      active: true,
      createdAt: Date.now(),
    }

    addAlert(alert)

    // Reset form
    setSymbol('')
    setName('')
    setTargetPrice('')
    setCondition('above')

    window.alert('Alert created successfully!')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Cryptocurrency Symbol
          </label>
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="e.g., BTC, ETH"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Bitcoin"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Target Price
          </label>
          <input
            type="number"
            value={targetPrice}
            onChange={(e) => setTargetPrice(e.target.value)}
            placeholder="35000"
            step="0.01"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Alert Condition
          </label>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value as 'above' | 'below')}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-accent"
          >
            <option value="above">Price rises above</option>
            <option value="below">Price falls below</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-accent hover:bg-blue-600 text-white font-semibold rounded-lg transition-all"
      >
        Create Alert
      </button>
    </form>
  )
}
