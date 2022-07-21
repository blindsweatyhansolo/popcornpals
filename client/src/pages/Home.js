import { useEffect, useState } from 'react';
// components
import SearchBox from '../components/SearchBox';
import MovieListHeader from '../components/MovieListHeader';
import MovieList from '../components/MovieList';
import SuggestionList from '../components/SuggestionList';
// // queries
import Auth from '../utils/auth';

const Home = () => {
  // state variables for search requests
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  // function to handle search requests from OMDb API
  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=b389d5bc`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    };
  };

  // call getMovieRequest function
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  const loggedIn = Auth.loggedIn();

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center my-4'>
        <MovieListHeader heading='Movies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='row'>
        <MovieList movies={movies} />
      </div>
      {/* RENDER SUGGESTIONS SECTION IF LOGGED IN */}
      {loggedIn && (
        <>
        <div className='row d-flex align-items-center my-4'>
          <MovieListHeader heading='Suggestions' />
        </div>
        
        <div className=''>
          <SuggestionList />
        </div>
        </>
      )}

    </div>
  );
};

export default Home;