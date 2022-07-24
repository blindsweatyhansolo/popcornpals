// PAGE FOR SINGLE MOVIE DETAILS, WILL ALSO CONTAIN: 
// RATINGLIST - displays all possible ratings for single movie based on imdbID if available
// RATEFORM / SUGGESTFORM - hidden if user is not logged in
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SuggestionForm from "../components/SuggestForm";
import RateForm from "../components/RateForm";
import Auth from '../utils/auth';

const imdbLogo = require('../assets/icons/imdb-icon.png');

const Details = () => {
  const { imdbID } = useParams();
  // console.log(imdbID);

  // state variable for request
  const [movie, setMovie] = useState([]);

  // function to hanlde search requests from OMDb API based on imdbID
  const getMovieRequest = async (imdbID) => {
    const url = `http://www.omdbapi.com/?i=${imdbID}&apikey=b389d5bc`;

    const response = await fetch(url);
    const responseJson = await response.json();

    // console.log(responseJson);

    if (responseJson) {
      setMovie(responseJson);
    };
  };

  useEffect(() => {
    getMovieRequest(imdbID);
  }, []);

  const loggedIn = Auth.loggedIn();

  return (
    <>
      <div className='p-4 d-flex flex-wrap'>
        <div className='col-12'>
          <img src={movie.Poster} alt={`Poster for ${movie.Title}`} className='detailsPoster' />
          <h1>{movie.Title} ({movie.Year})</h1>
          <p>{movie.Genre}</p>
          <p>{movie.Plot}</p>
          <div>
            <a href={`https://www.imdb.com/title/${imdbID}/`} target="_blank" rel="noreferrer">
              <img src={imdbLogo} alt='IMDb Logo'/>
              <p>{movie.imdbRating}</p>
            </a>
          </div>
        </div>
        {/* FORMS ONLY RENDER WHEN LOGGED IN */}
        {loggedIn && (
          <>
          <div className="col-12">
            <div className="">
              <SuggestionForm imdbID={imdbID}/>
            </div>
            <div className="pt-2">
              <RateForm movie={movie} />
            </div>

          </div>
          </>
        )}
      </div>
    </>
  )
};

export default Details;