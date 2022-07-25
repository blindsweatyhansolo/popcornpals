import { Link } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SUGGESTIONS } from '../../utils/queries';
import { REMOVE_SUGGESTION } from '../../utils/mutations';


const SuggestedTitlesList = () => {

  const [removeSuggestion] = useMutation(REMOVE_SUGGESTION);
  // const [removeSuggestion] = useMutation(REMOVE_SUGGESTION, {
  //   refetchQueries: [
  //     {query: QUERY_SUGGESTIONS}
  //   ]
  // })

  const { loading, data } = useQuery(QUERY_SUGGESTIONS);
  const movies = data?.suggestedMovies || {};

  if (loading) {
    return <p>Loading . . .</p>
  }

  if (!movies.length) {
    return <p>No suggested titles yet!</p>
  }

  const handleClick= async (event) => {
    event.preventDefault();
    console.log(event.target.value);

    try {
      const suggestion = await removeSuggestion({
        variables: {
          suggestionId: event.target.value
        }
      });

      return suggestion;
    } catch (e) {
      console.error(e);
    }

  }

  return (
    <>
      <div className='list-group'>

        {movies.map(movie => (
          <div key={movie._id}>
            <div>
              <Link to={`/details/${movie.imdbID}`} >
                <p>{movie.title} {movie._id}</p>
              </Link>
            </div>
            <div key={movie.suggestedBy}>
              <p> From: 
              <Link to={`/profile/${movie.suggestedBy}`} >
                {movie.suggestedBy}
              </Link>
              </p>
            </div>
            <button 
              className='btn btn-danger'
              value={movie._id} 
              onClick={handleClick}>X</button>

          </div>
        ))}
      </div>
    </>
  )

};

export default SuggestedTitlesList;