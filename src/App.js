import { useState} from 'react';
import useSWR from 'swr';
import './App.css';

function App() {
  const [gameTitle, setGameTitle] = useState("");
  const [searchedGames, setSearchedGames] = useState([])
  

  const fetcher = (...args) => fetch(...args).then(response => response.json())

  const {gameDeals, error} = useSWR('https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=20&pageSize=3', fetcher)

  const searchGame = () => {
    fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=3`)
    .then(response => response.json())
    .then(
      data => {
        setSearchedGames(data)
      }
    )
  }



  return (
    <div className="App">
     <div className="searchSection">
      <h1>Search For a Game</h1>
      <input type="text" placeholder="Minecraft" onChange={event => {setGameTitle(event.target.value);}}></input>
      <button onClick={searchGame}>Search Game Title</button>
      <div className='games'>
        {
          searchedGames.map((game, key) => {
            return(
              <div className='game' key={key}>
                {game.external}
                <img src={game.thumb} alt={game.external}></img>
                {game.cheapest}
              </div>
            )
          })
        }
      </div>
     </div>
     <div className="dealSection">
      <h1>Latest Deals</h1>
      <div className='games'>
        {gameDeals &&
          gameDeals.map((game, key) => {
            return(
              <div className='game'id='deals' key={key}>
                <h3>{game.title}</h3>
                <p>Normal Price : {game.normalPrice}</p>
                <p>Deal Price : {game.salePrice}</p>
                <p>Save : {game.savings.substring(0,2)}%</p>
              </div>
            )
          })
        }
      </div>
      
     </div>
    </div>
  );
}

export default App;
