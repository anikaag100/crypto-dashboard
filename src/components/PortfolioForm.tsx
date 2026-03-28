import { useState } from 'react'
import { usePortfolioStore, PortfolioAsset } from '../store/portfolioStore'

const generateId = () => Math.random().toString(36).substr(2, 9)

export default function PortfolioForm() {
  const { addAsset } = usePortfolioStore()
  const [symbol, setSymbol] = useState('')
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [costBasis, setCostBasis] = useState('')
  const [currentPrice, setCurrentPrice] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!symbol || !name || !quantity || !costBasis || !currentPrice) {
      window.alert('Please fill in all fields')
      return
    }

    const qty = parseFloat(quantity)
    const cost = parseFloat(costBasis)
    const price = parseFloat(currentPrice)

    const asset: PortfolioAsset = {
      id: generateId(),
      symbol: symbol.toUpperCase(),
      name,
      quantity: qty,
      costBasis: cost * qty,
      currentPrice: price,
      totalValue: price * qty,
      timestamp: Date.now(),
    }

    addAsset(asset)
    
    // Reset form
    setSymbol('')
    setName('')
    setQuantity('')
    setCostBasis('')
    setCurrentPrice('')
    
    window.alert('Asset added successfully!')
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="1.5"
            step="0.000001"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Cost Basis (per unit)
          </label>
          <input
            type="number"
            value={costBasis}
            onChange={(e) => setCostBasis(e.target.value)}
            placeholder="29000"
            step="0.01"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Current Price (per unit)
          </label>
          <input
            type="number"
            value={currentPrice}
            onChange={(e) => setCurrentPrice(e.target.value)}
            placeholder="31000"
            step="0.01"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-accent hover:bg-blue-600 text-white font-semibold rounded-lg transition-all"
      >
        Add to Portfolio
      </button>
    </form>
  )
}
