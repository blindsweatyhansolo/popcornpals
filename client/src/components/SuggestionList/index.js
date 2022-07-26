import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
const noPoster = require('../../assets/images/noposter.png');

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
      <div className="d-flex justify-content-center">
        <Carousel fade className="col-12 col-md-6 col-lg-2">
          {movies.map((suggestion)=> {

            if (suggestion.Poster === 'N/A') {
              return (
                <Carousel.Item key={suggestion.Title}>
                  <Link to={`/details/${suggestion.imdbID}`} >
                    <Carousel.Caption>
                      <h3>{suggestion.Title}</h3>
                    </Carousel.Caption>
                    <img src={noPoster} alt='poster' className="d-block w-100"/>
                  </Link>
                </Carousel.Item>
              )

            } else {
              return (
                <Carousel.Item key={suggestion.Title}>
                  <Link to={`/details/${suggestion.imdbID}`} >
                    <img src={suggestion.Poster} alt='poster' className="d-block w-100"/>
                  </Link>
                </Carousel.Item>
              )
            };
          })}
        </Carousel>
      </div>
    </>
  );
};

export default SuggestionList;