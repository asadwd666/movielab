import axios from "axios";
import { useEffect, useState } from "react";
import "./app.css";
import MovieCard from "./MovieCard";
import SearchSvg from "./search.svg";
const API_URL = "http://www.omdbapi.com?apikey=df701faf";
// const Movie1={
//     "Title": "Reign of Judges: Title of Liberty - Concept Short",
//     "Year": "2018",
//     "imdbID": "tt4275958",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BYWM0MDI1ZmItZTYzNi00ZWVlLTg5MTctNzllNjY2ZTI3NDhhXkEyXkFqcGdeQXVyNDk5MjA2MQ@@._V1_SX300.jpg"
// }
const App = () => {
  const [Movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (params={s:"batman"}) => {
    // const response = await fetch(`${API_URL}&s=${title}`);    
    // const data = await response.json();
    // setMovies(data.Search);
    const {data}=await axios.get(API_URL,{params})
    setMovies(data.Search)
    
    
  };
  useEffect(() => {
    searchMovies();
  }, []);

  return (
    <div className="app">
      <h1>Movie Land</h1>
      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchSvg}
          alt='search'
          onClick={() => {
            if(searchTerm){
              searchMovies({s:searchTerm})
            }else{
              searchMovies()
            }
          }}
        />
      </div>
      {Movies?.length > 0 ? (
        <div className="container">
          {Movies?.map((movie) => (
            <MovieCard movie={movie} />
          ))}
          {/* <MovieCard Movie1={Movie1}/> */}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
};
export default App;
