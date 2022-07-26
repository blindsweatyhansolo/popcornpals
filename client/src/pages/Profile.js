// import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import FriendList from "../components/FriendList";
import RatedTitlesList from "../components/RatedTitlesList";
import SuggestedTitlesList from "../components/SuggestedTitlesList";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME_BASIC, QUERY_USER } from "../utils/queries";
import { ADD_FRIEND } from "../utils/mutations";

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

  // const [deleteBtnText, setDeleteBtnText] = useState('Delete Account');

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

  const handleDeleteClick = async (event) => {
    event.preventDefault();
  };
  
  // if non-logged in user tries to navigate to a profile
  const loggedIn = Auth.loggedIn();
  if (!loggedIn) { 
    return (
      <p>
        You must first login or sign up to access user profiles. Use the navigation links above!
      </p>
    )
  }

  return (
    <>
      <div className='userInfo'>
        <h3>
          Viewing { userParam ? `${user.username}'s` : 'your'} profile.
        </h3>
        {userParam ? (
          <button className='btn btn-primary ml-auto' onClick={handleClick}>
            Add Friend
          </button>
        ) : (
          <div className='card text-dark'>
            <div className='card-header'>
              <p>Account Details:</p>
            </div>
            <div className='card-body'>
              <p>{user.username}</p>
              <p>{user.email}</p>
            </div>
            <div className='card-subtitle text-center text-muted'>
              <p>Warning! This action cannot be undone.</p>
            </div>
            <div className='d-flex justify-content-center pb-2'>
              <button className='btn btn-danger col-5' onClick={handleDeleteClick}>
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
      <div className='friendList'>
        <FriendList 
          username={user.username}
          friendCount={user.friendCount}
          friends={user.friends}
        />
      </div>

      {userParam ? ('') : (
        <div className='suggestedMoviesList'>
          <h4>Your Suggested Titles</h4>
          <SuggestedTitlesList />
        </div>
      )} 

      <div className='ratedMoviesList'>
        <h4>{ userParam ? `${user.username}'s` : 'Your'} Rated Titles</h4>
          <RatedTitlesList user={user.username}/>
      </div>

    </>
    
  )
};

export default Profile;