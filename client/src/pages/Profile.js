import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import FriendList from "../components/FriendList";
import RatedTitlesList from "../components/RatedTitlesList";
import SuggestedTitlesList from "../components/SuggestedTitlesList";
import Accordion from "react-bootstrap/Accordion";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME_BASIC, QUERY_USER } from "../utils/queries";
import { ADD_FRIEND } from "../utils/mutations";

import Auth from "../utils/auth";
const userNotFound = require('../assets/images/404user.png');

const Profile = (props) => {
  // destructure params for username of current profile
  const { username: userParam } = useParams();

  // state variables for modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [addFriend] = useMutation(ADD_FRIEND, {
    refetchQueries: [
      {query: QUERY_ME_BASIC},
      {query: QUERY_USER, variables: { username: userParam }}
    ]
  });

  // data will either be for the hardcoded user, or logged in user
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME_BASIC, {
    variables: { username: userParam }
  });
  const user = data?.me || data?.user || 'null';

  // drop username in URL, navigate to personal profile if username matched logged in user 
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to='/profile' />;
  };

  if (loading) {
    return <div>Loading . . .</div>;
  };

  // if on someone else's profile, handle clicking 'Add Friend' button
  const handleClick = async () => {
    try {
      await addFriend({
        variables: { id: user._id }
      });

      handleShow();
    } catch (e) {
      console.error(e);
    }
  };
  
  // if non-logged in user tries to navigate to a profile
  const loggedIn = Auth.loggedIn();
  if (!loggedIn) { 
    return (
      <div className="my-4 text-center">
        You must first login or sign up to access user profiles. Use the navigation links above!
      </div>
    )
  }

  if (user === 'null') {
    return (
      <>
      <div className="my-4 text-center">
        <p>Looks like you're trying to find a user that doesn't exist. Please try again.</p>
      <img src={userNotFound} alt='404: User not found' className="notFound"/>
      </div>
      </>
    )
  }

  return (
    <>
      <div className='d-flex justify-content-center'>
        <h3 className="m-2">
          Viewing { userParam ? `${user.username}'s` : 'your'} profile. { userParam ? '' : `Hi ${user.username}!`}
        </h3>
      </div>

      {userParam ? (
        <>
        <div className='d-flex justify-content-center'>
          <button className='btn btn-primary m-2 col-12 col-md-8 col-lg-4' onClick={handleClick}>
          Add Friend
          </button>
        </div>

        <Modal centered show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="text-dark">Friend Added</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className='text-dark'>
              Awesome, you and {user.username} are friends! You can now suggest titles to them!
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        </>
      ) : (
        <div className='d-flex justify-content-center'>
          <div className="col-12 col-md-6 col-lg-4">
            <Accordion>
              <Accordion.Header>
                Account Details And Options
              </Accordion.Header>
              <Accordion.Body>
                  <div className='card text-dark'>
                    <div className='card-body'>
                      <p>Username: {user.username}</p>
                      <p>E-mail: {user.email}</p>
                      <p>Friends: {user.friendCount}</p>
                    </div>
                </div>
              </Accordion.Body>
            </Accordion>
          </div>
        </div>
        )}
      <div className="d-flex justify-content-center">
        <div className='py-3 col-12 col-md-6 col-lg-4'>
          <FriendList 
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
            />
        </div>
      </div>

      <div className="d-flex justify-content-center flex-wrap">
      
        {userParam ? ('') : (
          <div className='py-3 px-1 col-12 col-md-6 col-lg-5'>
            <h4>Your Suggested Titles</h4>
            <SuggestedTitlesList />
          </div>
        )} 

      <div className='py-3 px-1 col-12 col-md-6 col-lg-5'>
        <h4>{ userParam ? `${user.username}'s` : 'Your'} Rated Titles</h4>
          <RatedTitlesList user={user.username}/>
      </div>

      </div>

    </>
    
  )
};

export default Profile;