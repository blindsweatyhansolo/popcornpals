// COMPONENT FOR SUGGESTIONFORM ON DETAILS PAGE
import { useEffect, useState } from "react";
// querires and mutations
import { QUERY_ME_BASIC } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import { SUGGEST_MOVIE } from "../../utils/mutations";
import { useParams } from "react-router-dom";

const SuggestionForm = () => {
  const { imdbID } = useParams();
  // console.log(imdbID);

  const [suggestMovie, { error }] = useMutation(SUGGEST_MOVIE);
  const [buttonText, setButtonText] = useState("Submit");

  const [friendValue, setFriendValue] = useState("");

  const { loading, data } = useQuery(QUERY_ME_BASIC);
  const user = data?.me;
  if (loading) {
    return <p>LOADING . . .</p>
  }
  
  // change friend value to selected friend, reset button text
  const handleFormChange = (event) => {
    setFriendValue({ value: event.target.value });
    setButtonText("Submit");
  };
  
  // handle suggestion mutation with selected friend
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    try {
      await suggestMovie({
        variables: {
          imdbID: imdbID,
          friendId: friendValue.value
        }
      });
      setButtonText("Suggestion Successful!")
    } catch (e) {
      console.error(e);
    }
  };


  return (
    <div className='card text-dark shadow'>
      <div className='card-header text-center'>
        Suggest this movie to your pals!
      </div>
      <div className='card-body'>
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

          <div className="d-flex justify-content-center">
            <button className='btn btn-primary mt-1 col-10'>
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SuggestionForm;