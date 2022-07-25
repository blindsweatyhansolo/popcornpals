// COMPONENT FOR RATINGFORM ON DETAILS PAGE
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { RATE_MOVIE, ADD_MOVIE } from '../../utils/mutations';
import { QUERY_ALL_RATINGS, QUERY_MY_RATING, QUERY_RATED_MOVIES } from '../../utils/queries';

const RateForm = (props) => {
  // destructure props
  const movie = props.movie;
  const imdbID = props.imdbID;
  const username = props.user;
  // console.log(username);

  // state variables for logged in users review and rating
  const [userRating, setUserRating] = useState('');
  const [userReview, setUserReview] = useState('');

  // query to get logged in users rating data for this title
  const { loading, data } = useQuery(QUERY_MY_RATING, {
    variables: { imdbID }
  });
  const user = data?.myRating;

  // addMovie mutation needed for condition if movie doesn't exist before rating
  const [addMovie] = useMutation(ADD_MOVIE);
  // refetch all queries related to rating data, so that the ratings list is updated
  // with the newly created rating data, and a user's profile rated list is updated
  const [rateMovie] = useMutation(RATE_MOVIE, {
    refetchQueries: [
      {query: QUERY_ALL_RATINGS, variables: { imdbID: imdbID }},
      {query: QUERY_MY_RATING, variables: { imdbID: imdbID }},
      {query: QUERY_RATED_MOVIES, variables: { user: username }},
    ]
  });

  if (loading) {
    return <p>'Loading...'</p>;
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // try: adding a movie to database, mutation on backend handles if title
    // already exists & create new rating for title, mutation on backend handles
    // updating rating if user has already rated this title
    try {
      const ratedMovie = await addMovie({
        variables: {
          imdbID: imdbID,
          title: movie.Title,
          year: movie.Year,
          poster: movie.Poster
        }
      });
      console.log(ratedMovie);

      const newRating = await rateMovie({
          variables: {
            imdbID: imdbID,
            title: movie.Title,
            rating: userRating,
            reviewBody: userReview
          }
        });
      
      // reset the state, with refetch the textarea placeholder gets replaced
      // with the current reviewBody, and the conditional 'Current Rating' element
      // is updated with newest rating data
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
          Rate and Review: <span className='movieTitle'>
            {movie.Title}
            </span>
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