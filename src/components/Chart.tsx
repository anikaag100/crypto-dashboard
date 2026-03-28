import { useEffect, useState } from 'react'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts'
import { getCryptoPriceHistory, CryptoData } from '../api/cryptoApi'

interface ChartProps {
  crypto: CryptoData | undefined
  title: string
}

interface ChartData {
  date: string
  price: number
}

export default function Chart({ crypto, title }: ChartProps) {
  const [data, setData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)
  const [days, setDays] = useState(30)

  useEffect(() => {
    if (!crypto) return

    const fetchChartData = async () => {
      try {
        const historicalData = await getCryptoPriceHistory(crypto.id, days)
        const chartData = historicalData.prices.map((price) => ({
          date: new Date(price[0]).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          }),
          price: Math.round(price[1] * 100) / 100,
        }))
        setData(chartData)
      } catch (error) {
        console.error('Error fetching chart data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchChartData()
  }, [crypto, days])

  if (!crypto) return null

  const isPositive = crypto.price_change_percentage_24h >= 0
  const minPrice = Math.min(...data.map((d) => d.price))
  const maxPrice = Math.max(...data.map((d) => d.price))

  return (
    <div className="bg-primary bg-opacity-50 backdrop-blur-md rounded-lg p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-bold text-white">{title} Price</h3>
          <p className="text-sm text-gray-400">{days} day chart</p>
        </div>
        <div className="flex gap-2">
          {[7, 30, 90, 365].map((d) => (
            <button
              key={d}
              onClick={() => {
                setLoading(true)
                setDays(d)
              }}
              className={`px-3 py-1 rounded text-sm transition-all ${
                days === d
                  ? 'bg-accent text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {d}D
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-80">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent"></div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">
              Low: <span className="text-white font-semibold">${minPrice.toFixed(2)}</span>
            </span>
            <span className={`font-semibold ${isPositive ? 'text-success' : 'text-danger'}`}>
              {isPositive ? '+' : ''}{crypto.price_change_percentage_24h.toFixed(2)}%
            </span>
            <span className="text-gray-400">
              High: <span className="text-white font-semibold">${maxPrice.toFixed(2)}</span>
            </span>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={isPositive ? '#10b981' : '#ef4444'}
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor={isPositive ? '#10b981' : '#ef4444'}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="date"
                stroke="#9ca3af"
                style={{ fontSize: '12px' }}
              />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '0.5rem',
                }}
                labelStyle={{ color: '#f3f4f6' }}
                formatter={(value) => `$${(value as number).toFixed(2)}`}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke={isPositive ? '#10b981' : '#ef4444'}
                fillOpacity={1}
                fill="url(#colorPrice)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
