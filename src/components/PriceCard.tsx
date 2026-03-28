import { CryptoData } from '../api/cryptoApi'

interface PriceCardProps {
  crypto: CryptoData
}

export default function PriceCard({ crypto }: PriceCardProps) {
  const isPositive = crypto.price_change_percentage_24h >= 0
  const formattedChange = crypto.price_change_percentage_24h.toFixed(2)

  return (
    <div className="bg-primary bg-opacity-50 backdrop-blur-md rounded-lg p-4 border border-gray-700 hover:border-accent hover:shadow-lg hover:shadow-accent/20 transition-all cursor-pointer hover:scale-105 transform duration-200">
      <div className="flex items-center gap-3 mb-3">
        <img
          src={crypto.image}
          alt={crypto.name}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-white">{crypto.symbol.toUpperCase()}</h3>
          <p className="text-xs text-gray-400">{crypto.name}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <p className="text-xs text-gray-400 mb-1">Price</p>
          <p className="text-xl font-bold text-white">${crypto.current_price.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-gray-700">
          <span className={`text-sm font-semibold ${isPositive ? 'text-success' : 'text-danger'}`}>
            {isPositive ? '+' : ''}{formattedChange}%
          </span>
          <span className="text-xs text-gray-400">
            ${(crypto.market_cap / 1e9).toFixed(1)}B Market Cap
          </span>
        </div>
      </div>
    </div>
  )
}
