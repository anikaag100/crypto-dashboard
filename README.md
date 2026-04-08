# Crypto Dashboard

A comprehensive cryptocurrency dashboard built with React + Vite, featuring real-time price tracking, portfolio management, price alerts, and market analysis.

![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-purple?style=flat-square&logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-06B6D4?style=flat-square&logo=tailwindcss)

## Features

- **📊 Real-time Price Tracking**: Live cryptocurrency prices using CoinGecko API
- **📈 Interactive Charts**: Beautiful price history charts with Recharts
- **💼 Portfolio Management**: Track your cryptocurrency holdings and calculate gains/losses
- **🔔 Price Alerts**: Set up custom price alerts for your favorite cryptocurrencies
- **📉 Market Trends**: View top gainers, losers, and market statistics
- **🎨 Beautiful UI**: Modern, responsive design with Tailwind CSS
- **🌙 Dark Theme**: Easy on the eyes with a dark theme optimized for crypto traders

## Tech Stack

- **Framework**: React 18 with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Charts**: Recharts
- **State Management**: Zustand
- **API**: CoinGecko API (free, no authentication required)
- **HTTP Client**: Axios

## Installation

### Prerequisites
- Node.js 16+ and npm

### Steps

1. Navigate to the project directory
```bash
cd "crypto dashboard"
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Dashboard Page
- View top 20 cryptocurrencies by market cap
- Check real-time prices and 24-hour price changes
- See interactive price charts for major cryptocurrencies
- View market trends with top gainers and losers

### Portfolio Page
- Add cryptocurrencies to your portfolio
- Track your holdings and investment cost basis
- Calculate total portfolio value and ROI
- Update prices and manage your assets
- View profit/loss for each holding

### Alerts Page
- Create price alerts for specific cryptocurrencies
- Set target price and alert condition (above/below)
- Toggle alerts on and off
- Track triggered alerts
- Manage multiple alerts simultaneously

## Performance

- Vite provides instant hot reloading during development
- Optimized production builds with chunking
- Auto-updates crypto prices every 60 seconds
- Lazy loading of chart data
- Optimized re-renders with React hooks
- Responsive design for all screen sizes


## API References

- [CoinGecko API](https://www.coingecko.com/en/api) - Free cryptocurrency data API
- [Recharts](https://recharts.org/) - React charting library
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vite](https://vitejs.dev/) - Next generation frontend tooling



## Future Enhancements

- [ ] Authentication and cloud sync
- [ ] More chart indicators and analysis tools
- [ ] Export portfolio to CSV/PDF
- [ ] Mobile app version
- [ ] Push notifications for alerts
- [ ] Advanced portfolio analytics
- [ ] Multi-currency support
- [ ] Historical portfolio tracking



