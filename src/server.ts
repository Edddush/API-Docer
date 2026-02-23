import express from 'express';

const app = express();
const PORT = 3000;

// Mock stock data
const stockData: Record<string, any> = {
  AAPL: { symbol: 'AAPL', displayName: 'Apple Inc.', regularMarketPrice: 195.35, currency: 'USD', marketCap: 3.02e12, regularMarketChange: 2.15, regularMarketChangePercent: 1.11 },
  GOOGL: { symbol: 'GOOGL', displayName: 'Alphabet Inc.', regularMarketPrice: 142.80, currency: 'USD', marketCap: 1.78e12, regularMarketChange: 1.25, regularMarketChangePercent: 0.88 },
  MSFT: { symbol: 'MSFT', displayName: 'Microsoft Corporation', regularMarketPrice: 423.50, currency: 'USD', marketCap: 3.15e12, regularMarketChange: 3.45, regularMarketChangePercent: 0.82 },
  AMZN: { symbol: 'AMZN', displayName: 'Amazon.com Inc.', regularMarketPrice: 180.75, currency: 'USD', marketCap: 1.88e12, regularMarketChange: 2.30, regularMarketChangePercent: 1.28 },
  TSLA: { symbol: 'TSLA', displayName: 'Tesla Inc.', regularMarketPrice: 238.90, currency: 'USD', marketCap: 756e9, regularMarketChange: -1.50, regularMarketChangePercent: -0.62 },
  META: { symbol: 'META', displayName: 'Meta Platforms Inc.', regularMarketPrice: 485.20, currency: 'USD', marketCap: 1.24e12, regularMarketChange: 5.10, regularMarketChangePercent: 1.06 },
  NVDA: { symbol: 'NVDA', displayName: 'NVIDIA Corporation', regularMarketPrice: 874.35, currency: 'USD', marketCap: 2.15e12, regularMarketChange: 12.45, regularMarketChangePercent: 1.44 },
  AMD: { symbol: 'AMD', displayName: 'Advanced Micro Devices', regularMarketPrice: 167.50, currency: 'USD', marketCap: 271e9, regularMarketChange: -2.30, regularMarketChangePercent: -1.35 }
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Get stock data by symbols
app.get('/stocks', (req, res) => {
  const symbols = (req.query.symbols as string)?.split(',') || [];
  
  const quotes = symbols
    .map(s => s.toUpperCase().trim())
    .filter(symbol => stockData[symbol])
    .map(symbol => stockData[symbol]);

  res.json({
    data: quotes,
    count: quotes.length,
    timestamp: new Date().toISOString()
  });
});

// Get single stock by symbol
app.get('/stocks/:symbol', (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  const stock = stockData[symbol];

  if (!stock) {
    return res.status(404).json({ error: `Symbol ${symbol} not found` });
  }

  res.json({ data: stock });
});

app.listen(PORT, () => {
  console.log(`\n📊 Stock API server running at http://localhost:${PORT}`);
  console.log(`   - Health check: GET /health`);
  console.log(`   - Get stocks: GET /stocks?symbols=AAPL,GOOGL,MSFT`);
  console.log(`   - Get one: GET /stocks/AAPL\n`);
});
