import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

import './App.css';
import SearchIcon from './search.svg';

// const DATA_API_URL = 'http://www.omdbapi.com/?apikey=c14e3faa';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchWithMovie, setSearchWithMovie] = useState("Superman");

    const searchMovies = async (title) => {
        // const response = await fetch(`${DATA_API_URL}&s=${title}`);
        // const data = await response.json();

        const response2 = await fetch(`http://localhost:8081/Movies?title=${title}`);
        const dataFromDb = await response2.json();

        setMovies(dataFromDb);
    }

    useEffect(() => {
        searchMovies("Superman");
    }, []);

    return (
       <div className='app'>
        <h1>Movie Bucket</h1>
        <div className='search'>
            <input 
                placeholder="Search for movies"
                value = {searchWithMovie}
                onChange={(e) => setSearchWithMovie(e.target.value)}
            />
            <img
                src={SearchIcon}
                alt="search"
                onClick={() => searchMovies(searchWithMovie)}
            />
        </div>

        {
            movies?.length > 0 ? (
                <div className="container">
                    {movies.map((item) => (
                        <MovieCard movie={item} />
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
            )
        }
       </div>
    );
}

export default App;