import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface PriceAlert {
  id: string
  symbol: string
  name: string
  targetPrice: number
  condition: 'above' | 'below'
  active: boolean
  createdAt: number
  triggeredAt?: number
}

interface AlertStore {
  alerts: PriceAlert[]
  addAlert: (alert: PriceAlert) => void
  removeAlert: (id: string) => void
  updateAlert: (id: string, alert: Partial<PriceAlert>) => void
  toggleAlert: (id: string) => void
  triggerAlert: (id: string) => void
  getAlert: (id: string) => PriceAlert | undefined
}

export const useAlertStore = create<AlertStore>()(
  persist(
    (set, get) => ({
      alerts: [],
      addAlert: (alert) =>
        set((state) => ({
          alerts: [...state.alerts, alert],
        })),
      removeAlert: (id) =>
        set((state) => ({
          alerts: state.alerts.filter((alert) => alert.id !== id),
        })),
      updateAlert: (id, updatedAlert) =>
        set((state) => ({
          alerts: state.alerts.map((alert) =>
            alert.id === id ? { ...alert, ...updatedAlert } : alert
          ),
        })),
      toggleAlert: (id) =>
        set((state) => ({
          alerts: state.alerts.map((alert) =>
            alert.id === id ? { ...alert, active: !alert.active } : alert
          ),
        })),
      triggerAlert: (id) =>
        set((state) => ({
          alerts: state.alerts.map((alert) =>
            alert.id === id
              ? { ...alert, active: false, triggeredAt: Date.now() }
              : alert
          ),
        })),
      getAlert: (id) => get().alerts.find((alert) => alert.id === id),
    }),
    {
      name: 'alert-storage',
    }
  )
)
