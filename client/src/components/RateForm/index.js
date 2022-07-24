// COMPONENT FOR RATINGFORM ON DETAILS PAGE
import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { RATE_MOVIE, ADD_MOVIE } from '../../utils/mutations';

const RateForm = (props) => {
  const { movie } = props;
  const imdbID = movie.imdbID;

  const [addMovie, { loading, error }] = useMutation(ADD_MOVIE);
  const [rateMovie] = useMutation(RATE_MOVIE);

  const [userRating, setUserRating] = useState('');
  const [userReview, setUserReview] = useState('');

  if (loading) {
    return 'Submitting...';
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const ratedMovie = await addMovie({
        variables: {
          imdbID: imdbID,
          title: movie.Title,
          year: movie.Year,
          poster: movie.Poster
        }
      });

      const newRating = await rateMovie({
          variables: {
            imdbID: movie.imdbID,
            rating: userRating,
            reviewBody: userReview
          }
        });

      setUserRating('');
      setUserReview('');
      return newRating;
     } catch (e) {
      console.error(e);
    }
  };
  
  return (
    <>
      <div className='card text-dark shadow'>
        <div className='card-header text-center'>
          Rate and Review: <span className='movieTitle'>{movie.Title}</span>
        </div>
     
        <div className='card-body text-dark'>
          <form onSubmit={handleFormSubmit} className='row'>
            <div className=''>
              <div className='form-check form-check-inline'>
                <input 
                  type='radio' 
                  checked={userRating === "DISLIKE"} 
                  value='DISLIKE' 
                  onChange={(event)=> { setUserRating(event.target.value)}}/>
                <label>DISLIKE</label>
              </div>
              <div className='form-check form-check-inline'>
                <input 
                  type='radio' 
                  checked={userRating === "LIKE"} 
                  value='LIKE' 
                  onChange={(event)=> { setUserRating(event.target.value)}}/>
                <label>LIKE</label>
              </div>
              <div className='form-check form-check-inline'>
                <input 
                  type='radio' 
                  checked={userRating === "MUST SEE"} 
                  value='MUST SEE' 
                  onChange={(event)=> { setUserRating(event.target.value)}}/>
                <label>MUST SEE</label>
              </div>
            </div>
            
            <div className=''>
              <textarea
                placeholder='Please leave a review...'
                value={userReview}
                onChange={(event) => { setUserReview(event.target.value)}}
              ></textarea>
            </div>
            <div className='col-12'>
              <button className='btn btn-primary'> Rate!</button>
            </div>
          </form>

        </div>

      </div>
    </>
  );
};

export default RateForm;