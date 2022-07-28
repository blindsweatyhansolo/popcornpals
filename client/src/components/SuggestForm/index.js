// COMPONENT FOR SUGGESTIONFORM ON DETAILS PAGE
import { useState } from "react";
// querires and mutations
import { QUERY_ME_BASIC, QUERY_SUGGESTIONS } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import { SUGGEST_MOVIE } from "../../utils/mutations";
import { useParams } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


const SuggestionForm = (props) => {
  const movie = props.movie;
  // console.log(movie.Title);
  const { imdbID } = useParams();

   // state variables for modal
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

  const [suggestMovie] = useMutation(SUGGEST_MOVIE, {
    refetchQueries: [
      {query: QUERY_SUGGESTIONS},
      {query: QUERY_ME_BASIC},
    ]
  });

  const [friendValue, setFriendValue] = useState("");
  const [error, setError] = useState(false);

  const { loading, data } = useQuery(QUERY_ME_BASIC);
  const user = data?.me;
  if (loading) {
    return <p>LOADING . . .</p>
  }
  
  // change friend value to selected friend, reset button text
  const handleFormChange = (event) => {
    setFriendValue({ value: event.target.value });
    setError(false);
  };
  
  // handle suggestion mutation with selected friend
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!friendValue.value || friendValue.value === null || friendValue.value === 'null') {
      setError(true);
      return;
    } else {
      try {
        await suggestMovie({
          variables: {
            imdbID: imdbID,
            title: movie.Title,
            friendId: friendValue.value,
          }
        });

        handleShow();
      } catch (e) {
        console.error(e);
      }
    };
  };


  return (
    <>
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          Suggest this movie to your pals!
        </Accordion.Header>

        <Accordion.Body>
          <form onSubmit={handleFormSubmit}>
            <div className='form-group'>
              <label htmlFor='friendSelect' className='pb-1'>Suggest to which friend?</label>
              <select className='form-control' onChange={handleFormChange} >
                <option value='null'>Pick a pal!</option>
                {user.friends.map((friend) => {
                  return (
                    <option value={friend._id} key={friend.username}>{friend.username}</option>
                  )
                  }
                )}
              </select>
            </div>
            {error && 
            <div className='text-center'>
              <span className='text-danger'>Error: Please select a friend.</span>
            </div>}
            

            

            <div className="d-flex justify-content-center">
              <button className='btn btn-primary mt-1 col-10'>
                Suggest Title
              </button>
            </div>
          </form>
        </Accordion.Body>
      </Accordion.Item>

    </Accordion>
    
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="text-dark"> Movie Suggested!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='text-dark'>
          Awesome, suggestion sent! Select another friend to make a new suggestion.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default SuggestionForm;