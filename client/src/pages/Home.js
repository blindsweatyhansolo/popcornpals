import { useEffect, useState } from 'react';
import SearchBox from '../components/SearchBox';
import MovieListHeader from '../components/MovieListHeader';
import MovieList from '../components/MovieList';
// import SuggestionList from '../components/SuggestionList';

// // queries
// import { useQuery } from '@apollo/client';
// import { QUERY_SUGGESTIONS } from '../utils/queries';

const Home = () => {
  // query request for logged in user's suggestion list
  // const { loading, data } = useQuery(QUERY_SUGGESTIONS);
  // const suggestedMovies = data?.suggestedMovies || [];
  // console.log(suggestedMovies);

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
      <div className='row d-flex align-items-center my-4'>
        <MovieListHeader heading='Suggestions' />
      </div>
      <div>
        {/* <SuggestionList movies={suggestedMovies} /> */}
      </div>

    </div>
  );
};

export default Home;