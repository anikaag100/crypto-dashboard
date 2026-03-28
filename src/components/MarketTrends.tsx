import { CryptoData } from '../api/cryptoApi'

interface MarketTrendsProps {
  cryptoData: CryptoData[]
}

export default function MarketTrends({ cryptoData }: MarketTrendsProps) {
  const gainers = [...cryptoData]
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    .slice(0, 3)

  const losers = [...cryptoData]
    .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
    .slice(0, 3)

  const totalMarketCap = cryptoData.reduce((sum, c) => sum + c.market_cap, 0)
  const totalVolume = cryptoData.reduce((sum, c) => sum + c.total_volume, 0)
  const avgChange = cryptoData.length > 0
    ? cryptoData.reduce((sum, c) => sum + c.price_change_percentage_24h, 0) / cryptoData.length
    : 0

  return (
    <div className="space-y-6">
      {/* Market Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-primary bg-opacity-50 backdrop-blur-md rounded-lg p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Total Market Cap</p>
          <p className="text-2xl font-bold text-white">${(totalMarketCap / 1e12).toFixed(2)}T</p>
          <p className="text-xs text-gray-500 mt-2">Across top 20 cryptos</p>
        </div>
        <div className="bg-primary bg-opacity-50 backdrop-blur-md rounded-lg p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">24h Volume</p>
          <p className="text-2xl font-bold text-white">${(totalVolume / 1e9).toFixed(2)}B</p>
          <p className="text-xs text-gray-500 mt-2">Trading activity</p>
        </div>
        <div className="bg-primary bg-opacity-50 backdrop-blur-md rounded-lg p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Avg 24h Change</p>
          <p className={`text-2xl font-bold ${avgChange >= 0 ? 'text-success' : 'text-danger'}`}>
            {avgChange >= 0 ? '+' : ''}{avgChange.toFixed(2)}%
          </p>
          <p className="text-xs text-gray-500 mt-2">Market sentiment</p>
        </div>
      </div>

      {/* Top Gainers and Losers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Gainers */}
        <div className="bg-primary bg-opacity-50 backdrop-blur-md rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-4">🚀 Top Gainers</h3>
          <div className="space-y-3">
            {gainers.map((crypto, index) => (
              <div
                key={crypto.id}
                className="flex justify-between items-center p-3 rounded-lg bg-gray-800 bg-opacity-50 hover:bg-opacity-75 transition-all"
              >
                <div>
                  <p className="text-white font-semibold">{index + 1}. {crypto.symbol.toUpperCase()}</p>
                  <p className="text-xs text-gray-400">${crypto.current_price.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
                </div>
                <span className="text-success font-bold">+{crypto.price_change_percentage_24h.toFixed(2)}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Losers */}
        <div className="bg-primary bg-opacity-50 backdrop-blur-md rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-4">📉 Top Losers</h3>
          <div className="space-y-3">
            {losers.map((crypto, index) => (
              <div
                key={crypto.id}
                className="flex justify-between items-center p-3 rounded-lg bg-gray-800 bg-opacity-50 hover:bg-opacity-75 transition-all"
              >
                <div>
                  <p className="text-white font-semibold">{index + 1}. {crypto.symbol.toUpperCase()}</p>
                  <p className="text-xs text-gray-400">${crypto.current_price.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
                </div>
                <span className="text-danger font-bold">{crypto.price_change_percentage_24h.toFixed(2)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
