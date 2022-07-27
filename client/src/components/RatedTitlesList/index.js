import { Link } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import { QUERY_RATED_MOVIES } from "../../utils/queries";
import ListGroup from 'react-bootstrap/ListGroup';


const RatedTitlesList = ({ user }) => {
  const { loading, data } = useQuery(QUERY_RATED_MOVIES, {
    variables: { user: user }
  });
  const movies = data?.ratedMovies || {};

  if (!movies.length) {
    return <p>No rated titles yet, get to watching!</p>
  }

  return (
    <>
      <ListGroup>
        {movies.map(movie => (
          <ListGroup.Item key={movie._id} className="d-flex justify-content-between align-items-start">
            <Link to={`/details/${movie.imdbID}`} >
              <div className="fw-bold"><i className="bi bi-film"></i> {movie.title}</div>
            </Link>
            {movie.rating}
          </ListGroup.Item>
        ))}

      </ListGroup>
    </>
  )
};

export default RatedTitlesList;
