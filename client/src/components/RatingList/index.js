// COMPONENT FOR LIST OF RATINGS ON DETAILS PAGE
import { useQuery } from "@apollo/client";
import { QUERY_ALL_RATINGS } from "../../utils/queries";

const RatingList = (props) => {
  const { imdbID } = props;

  const { loading, data } = useQuery(QUERY_ALL_RATINGS, {
    variables: { imdbID }
  });
  const ratings = data?.allRatings;

  console.log(ratings);

  if (loading) {
    return <p>'Loading...'</p>
  }

  if (!ratings.length) {
    return (
      <>
      <div className='card text-muted'>
        <p>No ratings yet, be the first to tell us what you think!</p>
      </div>
      </>
      )
  }
  
  return (
    <>
      <section className='ratingContainer'>
      {ratings.map((rating) => (
        <div key={rating._id} className='ratingCard card text-dark'>
          <div className='card-body'>
            <div>
              <p>Rating: {rating.rating}</p>
            </div>
            <div>
              <p>{rating.user}</p>
            </div>
            <div>
              <p>{rating.reviewBody}</p>
            </div>
          </div>
        </div>
      ))}
      </section>
    </>
  )
};

export default RatingList;