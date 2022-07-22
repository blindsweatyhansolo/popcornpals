// COMPILED LIST OF MOVIES FROM SEARCH
import { Link } from "react-router-dom";

const MovieList = (props) => {
  return (
    <>
      {props.movies.map((movie) => {
        return (
          <Link to={`/details/${movie.imdbID}`} key={movie.Title}>
            <div className="d-flex justify-content-center">
              <img src={movie.Poster} alt="movie poster" />
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default MovieList;