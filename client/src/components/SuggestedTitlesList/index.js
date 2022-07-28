import { Link } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SUGGESTIONS } from '../../utils/queries';
import { REMOVE_SUGGESTION } from '../../utils/mutations';
import ListGroup from 'react-bootstrap/ListGroup';

const SuggestedTitlesList = () => {

  // const [removeSuggestion] = useMutation(REMOVE_SUGGESTION);
  const [removeSuggestion] = useMutation(REMOVE_SUGGESTION, {
    refetchQueries: [
      {query: QUERY_SUGGESTIONS}
    ]
  });

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
      <ListGroup>
        {movies.map(movie => (
          <ListGroup.Item 
            key={movie._id} 
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <Link to={`/details/${movie.imdbID}`} >
                <div className="fw-bold"><i className="bi bi-film"></i> {movie.title}</div>
              </Link>
                <Link to={`/profile/${movie.suggestedBy}`} >
                <i className='bi bi-person-video2'></i> {movie.suggestedBy}
                </Link>
            </div>
            <button 
              className='btn btn-danger'
              value={movie._id}
              onClick={handleClick}
            >
              Remove
            </button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  )

};

export default SuggestedTitlesList;