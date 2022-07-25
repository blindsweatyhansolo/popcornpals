import { Link } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import { QUERY_RATED_MOVIES } from "../../utils/queries";

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
      <div className='list-group'>
      
        {movies.map(movie => (
          <Link to={`/details/${movie.imdbID}`} key={movie._id}>
          <p >
            {movie.title} | {movie.rating}
          </p>
          </Link>
        ))}

      </div>
    </>
  )
};

export default RatedTitlesList;
