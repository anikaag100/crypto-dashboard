import { useEffect, useState } from 'react'
import PriceCard from '../components/PriceCard'
import Chart from '../components/Chart'
import MarketTrends from '../components/MarketTrends'
import { getCryptoData, CryptoData } from '../api/cryptoApi'

export default function Dashboard() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCryptoData()
        setCryptoData(data)
      } catch (error) {
        console.error('Failed to fetch crypto data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-white">Crypto Dashboard</h1>
        <p className="text-gray-400">Real-time cryptocurrency data and portfolio tracking</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Top Cryptocurrencies */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-white">Top Cryptocurrencies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {cryptoData.slice(0, 4).map((crypto) => (
                <PriceCard key={crypto.id} crypto={crypto} />
              ))}
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Chart crypto={cryptoData[0]} title={cryptoData[0]?.name || 'Bitcoin Price'} />
            <Chart crypto={cryptoData[1]} title={cryptoData[1]?.name || 'Ethereum Price'} />
          </div>

          {/* Market Trends */}
          <MarketTrends cryptoData={cryptoData} />

          {/* All Cryptocurrencies */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-white">All Cryptocurrencies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {cryptoData.map((crypto) => (
                <PriceCard key={crypto.id} crypto={crypto} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
