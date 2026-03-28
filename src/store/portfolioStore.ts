import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface PortfolioAsset {
  id: string
  symbol: string
  name: string
  quantity: number
  costBasis: number
  currentPrice: number
  totalValue: number
  timestamp: number
}

interface PortfolioStore {
  portfolio: PortfolioAsset[]
  addAsset: (asset: PortfolioAsset) => void
  removeAsset: (id: string) => void
  updateAsset: (id: string, asset: Partial<PortfolioAsset>) => void
  getAsset: (id: string) => PortfolioAsset | undefined
}

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set, get) => ({
      portfolio: [],
      addAsset: (asset) =>
        set((state) => ({
          portfolio: [...state.portfolio, asset],
        })),
      removeAsset: (id) =>
        set((state) => ({
          portfolio: state.portfolio.filter((asset) => asset.id !== id),
        })),
      updateAsset: (id, updatedAsset) =>
        set((state) => ({
          portfolio: state.portfolio.map((asset) =>
            asset.id === id ? { ...asset, ...updatedAsset } : asset
          ),
        })),
      getAsset: (id) => get().portfolio.find((asset) => asset.id === id),
    }),
    {
      name: 'portfolio-storage',
    }
  )
)
