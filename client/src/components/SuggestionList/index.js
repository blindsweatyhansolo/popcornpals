const SuggestionList = (props) => {
  return (
    <>
      {props.movies.map((movie, index) => 
        <div className='d-flex justify-content-start m-3'>
          <img src={movie.Poster} alt='movie poster'/>
          <p>Suggested by: {movie.suggestedBy.username}</p>
        </div>
      )}
    </>
  )
};

export default SuggestionList;