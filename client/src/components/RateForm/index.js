// COMPONENT FOR RATINGFORM ON DETAILS PAGE
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { RATE_MOVIE, ADD_MOVIE } from '../../utils/mutations';
import { QUERY_MY_RATING, QUERY_ALL_RATINGS } from '../../utils/queries';

const RateForm = (props) => {
  const { movie } = props;
  const imdbID = movie.imdbID;

  const [userRating, setUserRating] = useState('');
  const [userReview, setUserReview] = useState('');

  const { loading, data } = useQuery(QUERY_MY_RATING, {
    variables: { imdbID }
  });
  const user = data?.myRating;

  const [addMovie] = useMutation(ADD_MOVIE);
  const [rateMovie] = useMutation(RATE_MOVIE);

  if (loading) {
    return <p>'Loading...'</p>;
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const ratedMovie = await addMovie({
        variables: {
          imdbID: movie.imdbID,
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

        {user && (
          <>
          <div className='card-subtitle text-muted text-center pt-2'><em>Your Current Rating:</em> {user.rating}</div>
          </>
        )}
     
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
                placeholder={user ? user.reviewBody : 'Please leave a review...'}
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