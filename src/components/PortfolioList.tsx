import { usePortfolioStore } from '../store/portfolioStore'

export default function PortfolioList() {
  const { portfolio, removeAsset, updateAsset } = usePortfolioStore()

  return (
    <div className="space-y-4">
      {portfolio.map((asset) => {
        const profit = asset.totalValue - asset.costBasis
        const profitPercentage = asset.costBasis > 0 ? (profit / asset.costBasis) * 100 : 0
        const isProfit = profit >= 0

        return (
          <div
            key={asset.id}
            className="bg-primary bg-opacity-50 backdrop-blur-md rounded-lg p-6 border border-gray-700 hover:border-accent hover:shadow-lg transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{asset.symbol}</h3>
                <p className="text-sm text-gray-400">{asset.name}</p>
              </div>
              <button
                onClick={() => {
                  if (confirm('Remove this asset from your portfolio?')) {
                    removeAsset(asset.id)
                  }
                }}
                className="px-3 py-1 bg-danger bg-opacity-20 text-danger hover:bg-opacity-40 rounded-lg text-sm transition-all"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Quantity</p>
                <p className="text-lg font-bold text-white">{asset.quantity.toLocaleString('en-US', { maximumFractionDigits: 6 })}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Cost Basis</p>
                <p className="text-lg font-bold text-white">${asset.costBasis.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Current Value</p>
                <p className="text-lg font-bold text-white">${asset.totalValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Price/Unit</p>
                <p className="text-lg font-bold text-white">${asset.currentPrice.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-700">
              <div>
                <span className={`text-sm font-semibold ${isProfit ? 'text-success' : 'text-danger'}`}>
                  {isProfit ? '+' : ''}{profit.toLocaleString('en-US', { maximumFractionDigits: 2 })} ({isProfit ? '+' : ''}{profitPercentage.toFixed(2)}%)
                </span>
              </div>
              <button
                onClick={() => {
                  const newPrice = prompt('Enter new current price:', asset.currentPrice.toString())
                  if (newPrice) {
                    const price = parseFloat(newPrice)
                    if (!isNaN(price)) {
                      updateAsset(asset.id, {
                        currentPrice: price,
                        totalValue: price * asset.quantity,
                      })
                    }
                  }
                }}
                className="px-3 py-1 bg-accent bg-opacity-20 text-accent hover:bg-opacity-40 rounded-lg text-sm transition-all"
              >
                Update Price
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
