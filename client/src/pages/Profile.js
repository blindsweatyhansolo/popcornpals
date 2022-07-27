// import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import FriendList from "../components/FriendList";
import RatedTitlesList from "../components/RatedTitlesList";
import SuggestedTitlesList from "../components/SuggestedTitlesList";
import Accordion from "react-bootstrap/Accordion";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME_BASIC, QUERY_USER } from "../utils/queries";
import { ADD_FRIEND } from "../utils/mutations";
// import { REMOVE_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Profile = (props) => {
  // destructure params for username of current profile
  const { username: userParam } = useParams();


  const [addFriend] = useMutation(ADD_FRIEND, {
    refetchQueries: [
      {query: QUERY_ME_BASIC},
      {query: QUERY_USER, variables: { username: userParam }}
    ]
  });
  
  // const [removeUser] = useMutation(REMOVE_USER);

  // data will either be for the hardcoded user, or logged in user
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME_BASIC, {
    variables: { username: userParam }
  });
  const user = data?.me || data?.user || {};

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
    } catch (e) {
      console.error(e);
    }
  };

  // const handleDeleteClick = async (event) => {
  //   event.preventDefault();
  //   try {
  //     await removeUser();

  //   } catch (e) {
  //     console.error(e);
  //   }
  // };
  
  // if non-logged in user tries to navigate to a profile
  const loggedIn = Auth.loggedIn();
  if (!loggedIn) { 
    return (
      <div className="my-4 text-center">
        You must first login or sign up to access user profiles. Use the navigation links above!
      </div>
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
        <div className='d-flex justify-content-center'>
          <button className='btn btn-primary m-2 col-12 col-md-8 col-lg-4' onClick={handleClick}>
          Add Friend
          </button>
        </div>
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
             
                  {/* <div className='d-flex justify-content-center pb-2'>
                    <button className='btn btn-danger col-6' onClick={handleDeleteClick}>
                      <i className="bi bi-trash"></i> Delete Account
                    </button>
                  </div> 
                  <div className='card-subtitle text-center text-muted'>
                    <p>Warning! This action cannot be undone.</p>
                  </div>*/}
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