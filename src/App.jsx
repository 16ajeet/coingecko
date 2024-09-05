import React, { useEffect, useState } from "react";

const App = () => {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')

          const data = await response.json();
          setCoins(data);
        
      }
  
      catch (error) {
        setError(error.message)
      }
  
    }
  
    fetchData();
  }, [])

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSort = (key) => {
    const sortedCoins = [...coins].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[key] > b[key] ? 1 : -1;
      } else {
        return a[key] < b[key] ? 1 : -1;
      }
    });
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setCoins(sortedCoins);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );




  return (
    <div className= " h-[120vh] w-full text-white flex justify-center items-center">

      <div className="h-5/6 w-5/6 ">

      <input
        className="p-2 w-[68%] bg-black text-slate-100 border border-slate-100 focus:outline-none focus-within:placeholder:text-transparent"
        placeholder=" Search By Name or Symbol " value={search}
        onChange={handleSearch}
      ></input>

      <button type="button" className="mx-3 px-3 py-2 border border-slate-100" onClick={() => handleSort('market_cap')}>
        Sort By Mkt Cap
      </button>

      <button type="button" className="mx-2 px-3 py-2 border border-slate-100" onClick={() => handleSort('price_change_percentage_24h')}>
        Sort by Percentage
      </button>

      <table className="w-full text-end mt-5 mb-10">
      <tbody>
          {filteredCoins.map((coin) => (
            <tr key={coin.id} className="border-b-2 border-slate-50">
              <td className="flex items-center justify-start"><img src={coin.image} alt={coin.name} width="30" />
                <span className="px-4">{coin.name}</span>
              
              </td>
              <td>{coin.symbol.toUpperCase()}</td>
              <td>${coin.current_price.toLocaleString()}</td>
              <td>${coin.total_volume.toLocaleString()}</td>
              <td>${coin.market_cap.toLocaleString()}</td>
              <td
                style={{
                  color: coin.price_change_percentage_24h > 0 ? 'green' : 'red',
                }}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

      </div>

  );
};

export default App;



