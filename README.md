# AI-Powered Supply Chain Risk Intelligence Platform

🚀 **Hackathon Project for Bristlecone's Got AI Talent**

## Problem Statement

Transform supply chain management from **reactive crisis response** to **proactive risk mitigation** using AI-powered geopolitical intelligence.

## Features

- 🌍 **Multi-Modal Route Optimization** - Optimize across Sea, Air, Rail, and Truck
- 🤖 **AI Risk Analysis Agent** - Real-time news monitoring with Mistral AI intelligence
- 📊 **Interactive Dashboard** - Visual control tower with live updates
- 🗺️ **Risk-Aware Routing** - Auto-suggests alternatives when disruptions detected
- ⚡ **Real-Time Simulation** - Demo geopolitical events and see instant response

## Tech Stack

**Frontend:**

- Next.js 14 (TypeScript)
- shadcn/ui + Tailwind CSS
- Mapbox GL JS
- tRPC Client

**Backend:**

- Node.js + Hono
- tRPC Server
- Mistral AI (mistral-large-latest)
- TypeScript

## Quick Start

### Prerequisites

- Node.js 18+ or Bun
- Mistral AI API Key
- Mapbox Access Token

### Installation

```bash
# Install dependencies
npm install

# Setup environment variables
cp server/.env.example server/.env
cp client/.env.example client/.env.local

# Add your API keys to the .env files
```

### Development

```bash
# Run both client and server
npm run dev

# Or run separately
npm run dev:server  # Server on http://localhost:3001
npm run dev:client  # Client on http://localhost:3000
```

## Environment Variables

### Server (.env)

```
MISTRAL_API_KEY=your_mistral_api_key_here
PORT=3001
```

### Client (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```

## Demo Flow (6 Minutes)

1. **Open Route Optimizer** - Enter origin/destination
2. **View Optimized Routes** - See cost/time/mode options on map
3. **Simulate Disruption** - Click "Red Sea Attack" scenario
4. **Watch AI Respond** - Real-time analysis and rerouting
5. **See Impact** - Cost savings and alternative routes

## Project Structure

```
bcone-ai/
├── client/                 # Next.js frontend
│   ├── src/
│   │   ├── app/           # App router pages
│   │   ├── components/    # UI components
│   │   ├── lib/           # Utilities
│   │   └── types/         # TypeScript types
│   └── package.json
├── server/                 # Hono backend
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── data/          # Mock data
│   │   └── index.ts       # Server entry
│   └── package.json
└── package.json            # Root workspace

```

## Business Impact

- **For Bristlecone:** Competitive differentiation, premium pricing, 30-40% better client retention
- **For Clients:** $2-8M annual savings, 60% faster disruption response, 40% better on-time delivery

## License

MIT

---

Built with ❤️ for Bristlecone's Got AI Talent Hackathon 2025
