import { useState, useEffect } from 'react'
import { usePortfolioStore } from '../store/portfolioStore'
import PortfolioForm from '../components/PortfolioForm'
import PortfolioList from '../components/PortfolioList'

export default function Portfolio() {
  const { portfolio } = usePortfolioStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const totalValue = portfolio.reduce((sum, asset) => sum + asset.totalValue, 0)
  const totalCost = portfolio.reduce((sum, asset) => sum + asset.costBasis, 0)
  const profit = totalValue - totalCost
  const profitPercentage = totalCost > 0 ? Number(((profit / totalCost) * 100).toFixed(2)) : 0

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-white">Portfolio</h1>
        <p className="text-gray-400">Manage and track your cryptocurrency holdings</p>
      </div>

      {mounted && (
        <div className="space-y-8">
          {/* Portfolio Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-primary bg-opacity-50 backdrop-blur-md rounded-lg p-6 border border-gray-700">
              <p className="text-gray-400 text-sm mb-2">Total Value</p>
              <p className="text-2xl font-bold text-white">${totalValue.toFixed(2)}</p>
            </div>
            <div className="bg-primary bg-opacity-50 backdrop-blur-md rounded-lg p-6 border border-gray-700">
              <p className="text-gray-400 text-sm mb-2">Total Cost</p>
              <p className="text-2xl font-bold text-white">${totalCost.toFixed(2)}</p>
            </div>
            <div className="bg-primary bg-opacity-50 backdrop-blur-md rounded-lg p-6 border border-gray-700">
              <p className="text-gray-400 text-sm mb-2">Total Profit/Loss</p>
              <p className={`text-2xl font-bold ${profit >= 0 ? 'text-success' : 'text-danger'}`}>
                ${Math.abs(profit).toFixed(2)}
              </p>
            </div>
            <div className="bg-primary bg-opacity-50 backdrop-blur-md rounded-lg p-6 border border-gray-700">
              <p className="text-gray-400 text-sm mb-2">ROI</p>
              <p className={`text-2xl font-bold ${profitPercentage >= 0 ? 'text-success' : 'text-danger'}`}>
                {profitPercentage}%
              </p>
            </div>
          </div>

          {/* Add Asset Form */}
          <div className="bg-primary bg-opacity-50 backdrop-blur-md rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">Add Asset</h2>
            <PortfolioForm />
          </div>

          {/* Portfolio List */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Your Holdings</h2>
            {portfolio.length === 0 ? (
              <div className="bg-primary bg-opacity-50 backdrop-blur-md rounded-lg p-8 border border-gray-700 text-center">
                <p className="text-gray-400">No holdings yet. Add your first cryptocurrency to get started!</p>
              </div>
            ) : (
              <PortfolioList />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
