
import React, { useEffect, useState } from 'react';

const stockList = ["SPY", "AAPL", "NVDA", "QQQ", "ARM", "AMZN", "GOOGL", "TSLA", "MSFT", "META", "BABA"];
const API_KEY = "d2adej1r01qoad6pasb0d2adej1r01qoad6pasbg";

function App() {
  const [stockData, setStockData] = useState({});
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    async function fetchStockData() {
      const data = {};
      for (let symbol of stockList) {
        const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`);
        const json = await res.json();
        data[symbol] = json;
      }
      setStockData(data);
    }

    async function fetchNews() {
      try {
        const res = await fetch('https://www.cnbc.com/id/100003114/device/rss/rss.html');
        const text = await res.text();
        setNewsData([{ title: 'CNBC RSS Feed Loaded', link: 'https://www.cnbc.com/world/?region=world' }]);
      } catch (err) {
        setNewsData([{ title: 'Failed to load CNBC News', link: '#' }]);
      }
    }

    fetchStockData();
    fetchNews();
  }, []);

  return (
    <div style={ padding: '20px' }>
      <h1>📈 Stock Dashboard</h1>
      <div style={ display: 'flex', flexWrap: 'wrap', gap: '20px' }>
        {
          stockList.map(symbol => (
            <div key={symbol} style={ border: '1px solid #ccc', borderRadius: '10px', padding: '10px', width: '250px' }>
              <h2>{symbol}</h2>
              {
                stockData[symbol] ? (
                  <>
                    <p>Price: ${stockData[symbol].c}</p>
                    <p>Open: ${stockData[symbol].o}</p>
                    <p>High: ${stockData[symbol].h}</p>
                    <p>Low: ${stockData[symbol].l}</p>
                    <p>Prev Close: ${stockData[symbol].pc}</p>
                  </>
                ) : <p>Loading...</p>
              }
            </div>
          ))
        }
      </div>
      <div style={ marginTop: '40px' }>
        <h2>📰 CNBC News</h2>
        {
          newsData.map((news, idx) => (
            <p key={idx}><a href={news.link} target="_blank" rel="noopener noreferrer">{news.title}</a></p>
          ))
        }
      </div>
    </div>
  );
}

export default App;
