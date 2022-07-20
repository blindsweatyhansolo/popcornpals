// COMPILED LIST OF MOVIES FROM SEARCH
import { Link } from 'react-router-dom';

const MovieList = (props) => {
  return (
    <>
      {props.movies.map((movie, index) => 
          <div className='d-flex justify-content-start m-3'>
            <img src={movie.Poster} alt='movie poster'/>
          </div>
      )}
    </>
  )
};

export default MovieList;