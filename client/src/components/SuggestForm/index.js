// COMPONENT FOR SUGGESTIONFORM ON DETAILS PAGE
import { useEffect, useState } from "react";
// querires and mutations
import { QUERY_ME_BASIC, QUERY_SINGLE_MOVIE } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import { SUGGEST_MOVIE, ADD_MOVIE } from "../../utils/mutations";
import { useParams } from "react-router-dom";

const SuggestionForm = () => {
  const { imdbID } = useParams();
  // console.log(imdbID);

  const [movieStatus, setMovieStatus] = useState();
  const findMovie = useQuery(QUERY_SINGLE_MOVIE, {
    variables: { imdbID: imdbID },
  });


  // useEffect(() => {
  //   if (!findMovie.data.singleMovie) {
  //     setMovieStatus(false);
  //   } else {
  //     setMovieStatus(true);
  //   };
  // });

  const { loading, data } = useQuery(QUERY_ME_BASIC);
  const user = data?.me;
  if (loading) {
    return <p>LOADING . . .</p>
  }
  
  const handleFormSubmit = (event) => {
    event.preventDefault();
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
            <select className='form-control'>
              {user.friends.map((friend) => {
                return (
                  <option>{friend.username}</option>
                )
                }
              )}
            </select>
          </div>

          <div className="d-flex justify-content-center">
            <button className='btn btn-primary mt-1 col-10'>Suggest Title</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SuggestionForm;