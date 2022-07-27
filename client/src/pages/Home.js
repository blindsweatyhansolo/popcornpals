import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { QUERY_SUGGESTIONS } from '../utils/queries';
// components
import SearchBox from '../components/SearchBox';
import MovieListHeader from '../components/MovieListHeader';
import MovieList from '../components/MovieList';
import SuggestionList from '../components/SuggestionList';

import Auth from '../utils/auth';

const Home = () => {
  // state variables for search requests
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  // state variables for suggestions
  const [suggestedMovies, setSuggestedMovies] = useState([]);
  const [getSuggestions, { loading }] = useLazyQuery(QUERY_SUGGESTIONS);
  
  // function to handle search requests from OMDb API
  const getMovieRequest = async (searchValue) => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=b389d5bc`;

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

  // call fetchSuggestedMovies on load if loggedIn is true
  useEffect(() => {
    if (loggedIn) {
      fetchSuggestedMovies();
    }
  }, []);

  if (loading) {
    return <p>LOADING . . .</p>
  };

  // function to handle getting suggestions from logged in user
  const fetchSuggestedMovies = async () => {
    const suggestions = await getSuggestions();
    const suggestedData = suggestions.data.suggestedMovies;

    if (suggestedData) {
      setSuggestedMovies(suggestedData);
    }

    return suggestedData;
  };

  const loggedIn = Auth.loggedIn();

  return (
    <div className='container-fluid movie-app'>
      
      <div className='row d-flex align-items-center my-4'>
        <MovieListHeader heading='Find Movies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>

      <div className='row'>
        <MovieList movies={movies} />
      </div>

      {/* RENDER SUGGESTIONS SECTION ONLY IF LOGGED IN */}
      {loggedIn && (
        <>
        <div className='row d-flex align-items-center my-4'>
          <MovieListHeader heading='My Suggestions' />
        </div>
        
        <div className='row'>
          <SuggestionList movies={suggestedMovies} />
        </div>
        </>
      )}

    </div>
  );
};

export default Home;