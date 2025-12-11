# 🚀 Quick Setup Guide

## Prerequisites

- Node.js 18+ installed
- Get these API keys ready:
  1. OpenAI API Key: https://platform.openai.com/api-keys
  2. Mapbox Token (optional): https://account.mapbox.com/access-tokens/

## Installation (5 minutes)

### Step 1: Install Dependencies

```powershell
# Install all dependencies
npm install
```

### Step 2: Setup Environment Variables

**Server (.env):**

```powershell
cd server
Copy-Item .env.example .env
# Edit server/.env and add your OpenAI API key
```

**Client (.env.local):**

```powershell
cd ../client
Copy-Item .env.example .env.local
# Edit client/.env.local and add your Mapbox token (optional)
```

### Step 3: Run the Application

```powershell
# Go back to root directory
cd ..

# Start both server and client
npm run dev
```

**Server will start on:** http://localhost:3001
**Client will start on:** http://localhost:3000

## Using the Application

1. **Open** http://localhost:3000 in your browser
2. **Enter Route:** Origin (e.g., Shanghai) → Destination (e.g., Hamburg)
3. **Choose Priority:** Cost, Time, or Balanced
4. **Click "Optimize Route"** - See top 3 route options with costs/times
5. **Simulate Disruption:** Click "Red Sea Attack" or other news events
6. **Watch AI Agent:** See real-time analysis and alternative route suggestions

## Demo Flow (6 minutes)

1. **Calculate a route** (Shanghai → Hamburg)
2. **Show the map** with multiple route options
3. **Click "Simulate Red Sea Attack"**
4. **AI agent analyzes** the disruption in real-time
5. **Dashboard shows** cost savings and impact

## Troubleshooting

**Issue: "Cannot find module" errors**

```powershell
# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules, client/node_modules, server/node_modules
npm install
```

**Issue: Server won't start**

- Check if port 3001 is available
- Verify OpenAI API key is set in `server/.env`

**Issue: Map not showing**

- Mapbox token is optional for demo
- System will show placeholder if token is missing
- Get free token at https://account.mapbox.com/access-tokens/

**Issue: AI analysis not working**

- Verify OpenAI API key is valid
- System will use mock analysis as fallback

## Project Structure

```
bcone-ai/
├── client/           # Next.js frontend (Port 3000)
├── server/           # Hono backend (Port 3001)
├── package.json      # Root workspace config
└── README.md         # Full documentation
```

## What's Working

✅ Multi-modal route optimization (Sea, Air, Rail, Truck)
✅ Cost vs Time vs Balanced priority selection
✅ Interactive map visualization (with Mapbox)
✅ AI-powered news analysis (OpenAI GPT-4)
✅ Real-time disruption simulation
✅ Risk scoring and recommendations
✅ Performance dashboard with metrics
✅ Beautiful, responsive UI

## Next Steps for Demo

1. Test the full flow end-to-end
2. Record a 5-6 minute demo video showing:
   - Route calculation
   - Multiple route options
   - Disruption simulation
   - AI analysis streaming
   - Alternative route suggestions
3. Prepare 1-minute intro about the problem
4. Have backup screenshots ready

## Support

For issues, check:

- Server logs in the terminal running `npm run dev`
- Browser console (F12) for frontend errors
- Ensure all dependencies are installed correctly

---

Good luck with the hackathon! 🎉
