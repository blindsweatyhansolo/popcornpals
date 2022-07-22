import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { QUERY_SUGGESTIONS } from '../../utils/queries';
import { Link } from 'react-router-dom';

const SuggestionList = () => {
  const [suggestedMovies, setSuggestedMovies] = useState([]);
  const [getSuggestions, { loading, data }] = useLazyQuery(QUERY_SUGGESTIONS);
  
  useEffect(() => {
    fetchSuggestedMovies();
  }, []);


  if (loading) {
    return <p>LOADING . . .</p>
  };

  
  const fetchSuggestedMovies = async () => {
    const suggestions = await getSuggestions();
    const suggestedData = suggestions.data.suggestedMovies;

    // console.log(suggestedData);

    if (suggestedData) {
      setSuggestedMovies(suggestedData);
    }

    return suggestedData;

  };

  // console.log(suggestedMovies);


  return (
    <>
      {suggestedMovies.map((suggestion, index) => 
          <Link to={`/details/${suggestion.movie[0].imdbID}`}>
            <div className='d-flex justify-content-center'>
              <img src={suggestion.movie[0].poster} alt=''/>
              <div>
              {/* <p className='text-light'>{suggestion.movie[0].title}</p> */}
                <p>Suggested by: {suggestion.suggestedBy}</p>
              </div>
            </div>
          </Link>
        )}
    </>

  )
};

export default SuggestionList;