import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SuggestionList = (props) => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(()=> {
    // grab the imdbID from passed in props for the fetch request
    let searchValue = props.movies.map((movie) => movie.imdbID);

    setSearchValue(searchValue);
    getSuggestedMovieRequest(searchValue);
    // set [props] so useEffect doesn't run before props passed in from parent
  }, [props]);


    // function to handle suggestions requests from OMDb API
  const getSuggestedMovieRequest = async (searchValue) => {
    const suggestedMovies = await Promise.all(
      searchValue.map(async (value) => {
        const imdbID = value;

        const url = `http://www.omdbapi.com/?i=${imdbID}&apikey=b389d5bc`;

        const suggestionResponse = await fetch(url);
        const suggestionResponseJson = await suggestionResponse.json();

        return suggestionResponseJson;
      })
    );

    if (suggestedMovies) {
      setMovies(suggestedMovies);
    }

    return suggestedMovies;
  };

  if (!movies.length) {
    return (
      <>
        <h3 className='text-muted'>No Suggestions Yet!</h3>
      </>
    )
  }

  return (
    <>
      {movies.map((suggestion)=> 
          <Link to={`/details/${suggestion.imdbID}`} key={suggestion.Title}>
            <div>
              <img src={suggestion.Poster} alt=''/>
            </div>
          </Link>
      )}
    </>
  );
};

export default SuggestionList;