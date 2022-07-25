// PAGE FOR SINGLE MOVIE DETAILS, WILL ALSO CONTAIN: 
// RATINGLIST - displays all possible ratings for single movie based on imdbID if available
// RATEFORM / SUGGESTFORM - hidden if user is not logged in
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SuggestionForm from "../components/SuggestForm";
import RateForm from "../components/RateForm";
import RatingList from "../components/RatingList";

import Auth from '../utils/auth';
// const imdbLogo = require('../assets/icons/imdb-icon.png');

const Details = () => {
  const { imdbID } = useParams();

  // state variable for request
  const [movie, setMovie] = useState([]);

  // function to hanlde search requests from OMDb API based on imdbID
  const getMovieRequest = async (imdbID) => {
    const url = `http://www.omdbapi.com/?i=${imdbID}&apikey=b389d5bc`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson) {
      setMovie(responseJson);
    };
  };
  
  // run getMovieRequest with the passed in imdbID on load
  useEffect(() => {
    getMovieRequest(imdbID);
  });

  // get the logged in user's username for use in child components
  const loggedIn = Auth.loggedIn();
  const userData = Auth.getProfile();
  const username = userData.data.username;
  // console.log(username);

  return (
    <>
      <div className='p-4 d-flex flex-wrap'>
        <div className='col-12'>
          <img src={movie.Poster} alt={`Poster for ${movie.Title}`} className='detailsPoster' />
          <h1>{movie.Title} ({movie.Year})</h1>
          <p>{movie.Genre}</p>
          <p>{movie.Plot}</p>
            {/* <a href={`https://www.imdb.com/title/${imdbID}/`} target="_blank" rel="noreferrer">
              <img src={imdbLogo} alt='IMDb Logo'/>
              <p>{movie.imdbRating}</p>
            </a> */}
        </div>

        <div>
          <RatingList imdbID={imdbID} />
        </div>
        {/* FORMS ONLY RENDER WHEN LOGGED IN */}
        {loggedIn && (
          <>
          <div className="col-12">
            <div className="">
              <SuggestionForm 
              movie={movie}
              imdbID={imdbID}/>
            </div>
            <div className="pt-2">
              <RateForm 
                movie={movie}
                imdbID={imdbID}
                user={username}
               />
            </div>
          </div>
          </>
        )}
      </div>
    </>
  )
};

export default Details;