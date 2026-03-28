import axios from 'axios'

const COINGECKO_API = 'https://api.coingecko.com/api/v3'

export interface CryptoData {
  id: string
  name: string
  symbol: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
  high_24h: number
  low_24h: number
  image: string
}

export interface HistoricalData {
  prices: [number, number][]
  market_caps: [number, number][]
  volumes: [number, number][]
}

export async function getCryptoData(): Promise<CryptoData[]> {
  try {
    const response = await axios.get(`${COINGECKO_API}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 20,
        page: 1,
        sparkline: false,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching crypto data:', error)
    throw error
  }
}

export async function getCryptoPriceHistory(
  coinId: string,
  days: number = 30
): Promise<HistoricalData> {
  try {
    const response = await axios.get(
      `${COINGECKO_API}/coins/${coinId}/market_chart`,
      {
        params: {
          vs_currency: 'usd',
          days: days,
          interval: 'daily',
        },
      }
    )
    return response.data
  } catch (error) {
    console.error(`Error fetching price history for ${coinId}:`, error)
    throw error
  }
}

export async function searchCrypto(query: string): Promise<any[]> {
  try {
    const response = await axios.get(`${COINGECKO_API}/search`, {
      params: {
        query: query,
      },
    })
    return response.data.coins || []
  } catch (error) {
    console.error('Error searching crypto:', error)
    throw error
  }
}

export async function getCryptoById(coinId: string): Promise<CryptoData> {
  try {
    const response = await axios.get(`${COINGECKO_API}/coins/${coinId}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
      },
    })
    const data = response.data
    return {
      id: data.id,
      name: data.name,
      symbol: data.symbol.toUpperCase(),
      current_price: data.market_data.current_price.usd,
      price_change_percentage_24h: data.market_data.price_change_percentage_24h,
      market_cap: data.market_data.market_cap.usd,
      total_volume: data.market_data.total_volume.usd,
      high_24h: data.market_data.high_24h.usd,
      low_24h: data.market_data.low_24h.usd,
      image: data.image.large,
    }
  } catch (error) {
    console.error(`Error fetching crypto ${coinId}:`, error)
    throw error
  }
}
