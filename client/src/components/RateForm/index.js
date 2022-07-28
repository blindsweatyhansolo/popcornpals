// COMPONENT FOR RATINGFORM ON DETAILS PAGE
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { RATE_MOVIE, ADD_MOVIE } from '../../utils/mutations';
import { QUERY_ALL_RATINGS, QUERY_MY_RATING, QUERY_RATED_MOVIES } from '../../utils/queries';
import Accordion from 'react-bootstrap/Accordion';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Modal from 'react-bootstrap/Modal';


import Auth from '../../utils/auth';

const RateForm = (props) => {
  // destructure props
  const movie = props.movie;
  const imdbID = props.imdbID;
  const userData = Auth.getProfile();
  const username = userData.data.username;
  // const username = props.user;
  // console.log(username);

  // state variables for logged in users review, rating and review character count
  const [userRating, setUserRating] = useState('');
  const [userReview, setUserReview] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  // state variables for modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  // handle submission of rating form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // if a user tries to submit without a rating or review, show modal error
    if (!userRating || !userReview) {
      handleShow();
      return;
    } else {
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
        // console.log(ratedMovie);
  
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
        setCharacterCount(0);
  
        // console.log(newRating);
  
        return newRating;
       } catch (e) {
        console.error(e);
      }
    }
  };

  // handle changes to review textarea for live character count
  const handleChange = async (event) => {
    if (event.target.value.length <= 280) {
      setUserReview(event.target.value);
      setCharacterCount(event.target.value.length);
      
      // console.log(userReview);
    }
  };

  // handle toggling rating choice buttons
  const handleRatingChange = async (event) => {
    event.preventDefault();
    // console.log(event.target.value);
    setUserRating(event.target.value);
  };

  return (
    <>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            Rate and Review: {movie.Title}
          </Accordion.Header>
          <Accordion.Body>
          {user && (
            <>
            <p className='card-subtitle text-muted text-center mb-1'><em>Your Current Rating:</em> {user.rating}</p>
            </>
          )}

          <form onSubmit={handleFormSubmit} className='row'>
              <ButtonGroup>
                <ToggleButton 
                  id='DISLIKE-radio'
                  type='radio'
                  name='radio'
                  value='DISLIKE'
                  variant={userRating === 'DISLIKE' ? 'secondary' : 'outline-secondary'}
                  checked={userRating === 'DISLIKE'}
                  onChange={handleRatingChange}
                  >
                  DISLIKE
                </ToggleButton>

                <ToggleButton 
                  id='LIKE-radio'
                  type='radio'
                  name='radio'
                  value='LIKE'
                  variant={userRating === 'LIKE' ? 'info' : 'outline-info'}
                  checked={userRating === 'LIKE'}
                  onChange={handleRatingChange}
                  >
                  LIKE
                </ToggleButton>

                <ToggleButton 
                  id='MUSTSEE-radio'
                  type='radio'
                  name='radio'
                  value='MUST SEE'
                  variant={userRating === 'MUST SEE' ? 'success' : 'outline-success'}
                  checked={userRating === 'MUST SEE'}
                  onChange={handleRatingChange}
                  >
                  MUST SEE
                </ToggleButton> 

              </ButtonGroup>
            
              <textarea
                className='mt-2'
                placeholder={user ? user.reviewBody : 'Please leave a review...'}
                value={userReview}
                onChange={handleChange}
              ></textarea>
              <p className={`m-0 ${characterCount === 280 ? 'text-danger' : ''}`}>
              <i className="bi bi-chat-right-text"></i> {characterCount}/280
              </p>

              <button className='btn btn-primary col-12 my-2'> Rate!</button>
          </form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Modal centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="text-dark">Rate and Review Error:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='text-dark'>
          Looks like you tried to submit without choosing a rating or writing a review. The pals want to know what you think! Please fill in the fields and try again.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Okay
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default RateForm;