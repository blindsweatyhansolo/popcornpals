// COMPILED LIST OF MOVIES FROM SEARCH
import { Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
const noPoster = require('../../assets/images/noposter.png');

const MovieList = (props) => {
  // console.log(props);

  return (
    <>
      <div className="d-flex justify-content-center">
        <Carousel fade className="col-12 col-md-6 col-lg-4">
        {props.movies.map((movie) => {

          if (movie.Poster === 'N/A') {
            return (
              <Carousel.Item key={movie.imdbID}>
                <Link to={`/details/${movie.imdbID}`} >
                  <Carousel.Caption>
                    <h3>{movie.Title}</h3>
                  </Carousel.Caption>
                  <img src={noPoster} alt="No Poster Found" className="d-block w-100" />
                </Link>
              </Carousel.Item>
            )
          } else {
            return (
              <Carousel.Item key={movie.imdbID}>
                <Link to={`/details/${movie.imdbID}`} >
                  <img src={movie.Poster} alt="Poster" className="d-block w-100"/>
                </Link>
              </Carousel.Item>
            );
          }

        })}
        </Carousel>
      </div>
    </>
  );
};

export default MovieList;