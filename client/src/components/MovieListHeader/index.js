// re-usable header for either MOVIES / RATED MOVIES / SUGGESTIONS
const MovieListHeader = (props) => {
  return (
    <div className='col'>
      <h1>{props.heading}</h1>
    </div>
  );
};

export default MovieListHeader;