### Prerequisites

- Node.js >= 18
- npm

## Installation

```bash
npm install
```

## Running the Example

Open **two terminals**:

**Terminal 1: Start the API server**
```bash
npm run server
```

Output:
```
📊 Stock API server running at http://localhost:3000
   - Health check: GET /health
   - Get stocks: GET /stocks?symbols=AAPL,GOOGL,MSFT
   - Get one: GET /stocks/AAPL
```

**Terminal 2: Run the client**
```bash
npm start
```

Output:
```
Fetching stock data from http://localhost:3000...

📈 Stock Market Data

────────────────────────────────────────────────────────────────────────────────────────────────────
Symbol    Name                          Price           Change          Change %        Market Cap
────────────────────────────────────────────────────────────────────────────────────────────────────
AAPL      Apple Inc.                    USD 195.35      ↑ 2.15          1.11%           $3.02T
GOOGL     Alphabet Inc.                 USD 142.80      ↑ 1.25          0.88%           $1.78T
```

## Using with API Docer

To capture HTTP traffic with api-docer:

> API CALL

<img width="1026" height="595" alt="Screen Shot 2026-02-22 at 23 04 59" src="https://github.com/user-attachments/assets/e15a17d0-7282-45b2-9014-eeb6aa5aa406" />

> Docer Listener

<img width="868" height="108" alt="Screen Shot 2026-02-22 at 23 57 45" src="https://github.com/user-attachments/assets/274d64e1-2afe-4d3b-abb8-24ed3d382f9c" />



**Terminal 1: Start the API server**
```bash
npm run server
```

**Terminal 2: Start api-docer proxy** (from the api-docer folder)
```bash
cd /path/to/api-docer
npx api-docer proxy --port 8765
```

**Terminal 3: Run the client with proxy**
```bash
HTTP_PROXY=http://127.0.0.1:8765 npm start
```

api-docer will capture:
- GET /health
- GET /stocks (with query parameters)
- GET /stocks/:symbol (path parameters)
- Response bodies and status codes

Generated documentation will be saved to your configured output directory (default: `docs/api/`).

## API Endpoints

### Health Check
```bash
curl http://localhost:3000/health
```
Response: `{ "status": "ok" }`

### Get Multiple Stocks
```bash
curl "http://localhost:3000/stocks?symbols=AAPL,GOOGL,MSFT"
```

### Get Single Stock
```bash
curl http://localhost:3000/stocks/AAPL
```

## Configuration

Set `API_BASE_URL` environment variable to point to a different server:
```bash
API_BASE_URL=http://other-server:3000 npm start
```

## Project Structure

```
src/
├── server.ts    # Express API server with mock data
└── index.ts     # Client application (makes HTTP requests)
```
