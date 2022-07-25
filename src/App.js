import Movie from "./components/Movie";
import MovieList from "./components/MovieList";
import Search from "./components/Search";
import React, { useEffect, useState, useRef } from "react";

const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?api_key=0dd1f6130aeb52d239896d571a9aa9aa&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate";
const IMG_API = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=0dd1f6130aeb52d239896d571a9aa9aa&language=en-US&page=1&include_adult=false&query=";

function App() {
  const searchValue = React.useRef("");
  const [movieList, setMovieList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const exampleInput = useRef();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm);
      setSearchTerm("");
    }
  };

  const handleOnChange = () => {
    setSearchTerm(exampleInput.current.value);
    console.log(searchTerm);
  };

  async function getMovies(API) {
    try {
      const response = await fetch(API);
      const data = await response.json();
      setMovieList(data.results);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            ref={exampleInput}
            onChange={handleOnChange}
          />
        </form>
      </header>
      <div className="movie-container">
        {movieList.map((movie) => {
          return <Movie key={movie.id} {...movie} />;
        })}
      </div>
    </>
  );
}

export default App;
