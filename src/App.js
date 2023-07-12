import axios from "axios";
import './App.css';
import React, { useState, useEffect } from "react";
import Coin from "./Coin";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en")
      .then(res => {
        setCoins(res.data);
      }).catch(error => alert(error))
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  }


  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input type="text" placeholder="Search" className="coin-input" onChange={handleChange} />
        </form>
      </div>
      {filteredCoins.map(coin => {
        return (<Coin key={coin.id}
          name={coin.name}
          image={coin.image}
          symbol={coin.symbol}
          price={coin.current_price}
          volume ={coin.total_volume} 
          priceChange={coin.price_change_percentage_24h}
          marketcap={coin.market_cap}
          />)
      })}
    </div>
  );
}

export default App;
