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

## Project Structure

```
src/
├── pages/                   # Page components
│   ├── Dashboard.tsx       # Main dashboard
│   ├── Portfolio.tsx       # Portfolio management
│   └── Alerts.tsx          # Price alerts
├── components/             # Reusable components
│   ├── Navbar.tsx
│   ├── PriceCard.tsx
│   ├── Chart.tsx
│   ├── MarketTrends.tsx
│   ├── PortfolioForm.tsx
│   ├── PortfolioList.tsx
│   ├── AlertForm.tsx
│   └── AlertList.tsx
├── api/                    # API clients
│   └── cryptoApi.ts       # CoinGecko API integration
├── store/                  # Zustand stores
│   ├── portfolioStore.ts
│   └── alertStore.ts
├── App.tsx                 # Main app component with routing
├── main.tsx                # Entry point
└── index.css               # Global styles
```

## Environment Variables

No environment variables needed! The CoinGecko API is free and doesn't require authentication.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Data Persistence

- **Portfolio**: Stored in browser's localStorage using Zustand
- **Alerts**: Stored in browser's localStorage using Zustand
- **Prices**: Fetched in real-time from CoinGecko API and updated every minute

## Performance

- Vite provides instant hot reloading during development
- Optimized production builds with chunking
- Auto-updates crypto prices every 60 seconds
- Lazy loading of chart data
- Optimized re-renders with React hooks
- Responsive design for all screen sizes

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## API References

- [CoinGecko API](https://www.coingecko.com/en/api) - Free cryptocurrency data API
- [Recharts](https://recharts.org/) - React charting library
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vite](https://vitejs.dev/) - Next generation frontend tooling

## Troubleshooting

### Charts not loading?
- Check browser console for API errors
- Ensure internet connection is active
- Clear browser cache and reload

### Portfolio data not saving?
- Check if localStorage is enabled in browser
- Clear browser cache if data seems corrupted
- Data is stored locally in your browser

### Price data not updating?
- The app fetches new data every minute automatically
- Try refreshing the page
- Check if CoinGecko API is experiencing downtime

## Future Enhancements

- [ ] Authentication and cloud sync
- [ ] More chart indicators and analysis tools
- [ ] Export portfolio to CSV/PDF
- [ ] Mobile app version
- [ ] Push notifications for alerts
- [ ] Advanced portfolio analytics
- [ ] Multi-currency support
- [ ] Historical portfolio tracking

## License

MIT License - feel free to use this project

## Support

For issues or questions, please check the troubleshooting section or consult:
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [CoinGecko API Documentation](https://www.coingecko.com/en/api/documentation)

## Contributing

Contributions are welcome! Feel free to fork and submit pull requests.

---

**Happy trading! 🚀**
