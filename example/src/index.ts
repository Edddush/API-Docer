import axios from 'axios';

interface StockQuote {
  symbol: string;
  displayName: string;
  regularMarketPrice: number;
  currency: string;
  marketCap: number;
  regularMarketChange: number;
  regularMarketChangePercent: number;
}

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

// Fetch stock quotes from local API
async function getStockQuotes(symbols: string[]): Promise<StockQuote[]> {
  try {
    const symbolsQuery = symbols.join(',');
    
    const response = await axios.get<{ data: StockQuote[] }>(`${API_BASE_URL}/stocks`, {
      params: { symbols: symbolsQuery }
    });

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Error fetching stock quotes: ${error.message}`);
      if (error.code === 'ECONNREFUSED') {
        console.error(`\n⚠️  Could not connect to ${API_BASE_URL}`);
        console.error('Make sure to start the server first:');
        console.error('  npm run server\n');
      }
    }
    throw error;
  }
}

// Format market cap to readable format
function formatMarketCap(marketCap: number): string {
  if (marketCap >= 1e12) {
    return `$${(marketCap / 1e12).toFixed(2)}T`;
  } else if (marketCap >= 1e9) {
    return `$${(marketCap / 1e9).toFixed(2)}B`;
  } else if (marketCap >= 1e6) {
    return `$${(marketCap / 1e6).toFixed(2)}M`;
  }
  return `$${marketCap}`;
}

// Display stock data in a formatted table
function displayStocks(quotes: StockQuote[]): void {
  console.log('\n📈 Stock Market Data\n');
  console.log('─'.repeat(100));
  console.log(
    'Symbol'.padEnd(10) +
    'Name'.padEnd(30) +
    'Price'.padEnd(15) +
    'Change'.padEnd(15) +
    'Change %'.padEnd(12) +
    'Market Cap'
  );
  console.log('─'.repeat(100));

  quotes.forEach(quote => {
    const symbol = quote.regularMarketChange >= 0 ? '↑' : '↓';
    const color = quote.regularMarketChange >= 0 ? '\x1b[32m' : '\x1b[31m';
    const reset = '\x1b[0m';

    console.log(
      quote.symbol.padEnd(10) +
      quote.displayName.slice(0, 28).padEnd(30) +
      `${quote.currency} ${quote.regularMarketPrice.toFixed(2)}`.padEnd(15) +
      `${color}${symbol} ${quote.regularMarketChange.toFixed(2)}${reset}`.padEnd(30) +
      `${quote.regularMarketChangePercent.toFixed(2)}%`.padEnd(12) +
      formatMarketCap(quote.marketCap)
    );
  });

  console.log('─'.repeat(100) + '\n');
}

// Main execution
async function main(): Promise<void> {
  const tickers = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'META', 'NVDA', 'AMD'];

  console.log(`Fetching stock data from ${API_BASE_URL}...\n`);

  try {
    const quotes = await getStockQuotes(tickers);
    displayStocks(quotes);
  } catch (error) {
    console.error('Failed to fetch stock data');
    process.exit(1);
  }
}

main();
