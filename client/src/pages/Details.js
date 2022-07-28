// PAGE FOR SINGLE MOVIE DETAILS, WILL ALSO CONTAIN: 
// RATINGLIST - displays all possible ratings for single movie based on imdbID if available
// RATEFORM / SUGGESTFORM - hidden if user is not logged in
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SuggestionForm from "../components/SuggestForm";
import RateForm from "../components/RateForm";
import RatingList from "../components/RatingList";
import Button from 'react-bootstrap/Button';

import Auth from '../utils/auth';
import BackButton from "../components/BackButton";
const noPoster = require('../assets/images/noposter.png');

const Details = () => {
  const { imdbID } = useParams();

  // state variable for request
  const [movie, setMovie] = useState([]);
  const [poster, setPoster] = useState([]);

  // function to hanlde search requests from OMDb API based on imdbID
  const getMovieRequest = async (imdbID) => {
    const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=b389d5bc`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson) {
      setMovie(responseJson);
    };

    if (responseJson.Poster === 'N/A') {
      setPoster(noPoster);
    } else {
      setPoster(responseJson.Poster)
    }
  };
  
  // run getMovieRequest with the passed in imdbID on load
  useEffect(() => {
    getMovieRequest(imdbID);
  }, []);

  // get the logged in user's username for use in child components
  const loggedIn = Auth.loggedIn();

  const navigate = useNavigate();

  // console.log(movie);

  return (
    <>
      <div className='p-4'>
        <BackButton />

        <div className='d-flex flex-wrap justify-content-center pb-2'>

          
        
          <div>
            <a href={`https://www.imdb.com/title/${movie.imdbID}/`} target="_blank" rel="noreferrer">
              <img src={poster} alt={`Poster for ${movie.Title}`} className='pb-2' />
            </a>
          </div>
          <div className="col-12 col-md-6 col-lg-4 px-4">
            <h1>{movie.Title} ({movie.Year})</h1>
            <p>{movie.Genre}</p>
            <p>{movie.Plot}</p>
          </div>
          
        </div>

      <div className="d-flex flex-wrap justify-content-center">
        <div className="col-12 col-md-8 col-lg-8 py-2">
          <RatingList imdbID={imdbID} />
        </div>
        {/* FORMS ONLY RENDER WHEN LOGGED IN */}
        {loggedIn && (
          <>
            <div className="col-12 col-md-8 col-lg-8 py-2">
              <SuggestionForm 
              movie={movie}
              imdbID={imdbID}/>
            </div>
            
            <div className="col-12 col-md-8 col-lg-8 py-2">
              <RateForm 
                movie={movie}
                imdbID={imdbID}
               />
            </div>

          </>
        )}
        </div>
      </div>
    </>
  )
};

export default Details;