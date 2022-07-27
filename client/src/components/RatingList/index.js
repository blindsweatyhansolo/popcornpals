// COMPONENT FOR LIST OF RATINGS ON DETAILS PAGE
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_RATINGS } from "../../utils/queries";
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
// const dislikeIcon = require('../../assets/icons/icon-dislike.png');
// const likeIcon = require('../../assets/icons/icon-like.png');
// const mustseeIcon = require('../../assets/icons/icon-mustsee.png');

const RatingList = (props) => {
  const { imdbID } = props;

  const { loading, data } = useQuery(QUERY_ALL_RATINGS, {
    variables: { imdbID }
  });
  const ratings = data?.allRatings;
  // console.log(ratings);

  if (loading) {
    return <p>'Loading...'</p>
  }

  if (!ratings.length) {
    return (
      <>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              See Pal Ratings for This Title:
            </Accordion.Header>
            
            <Accordion.Body>
              No ratings for this title yet. Tell us what you think!
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </>
      )
  }
  
  return (
    <>
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          See Pal Ratings for This Title:
        </Accordion.Header>
        
        <Accordion.Body>
          <ListGroup variant="flush">
          {ratings.map((rating) => (
            <ListGroup.Item key={rating._id}>
              <div className='text-dark'>
                <div>
                  <Link to={`/profile/${rating.user}`}>
                    <p><i className="bi bi-person-video2"></i> {rating.user}</p>
                  </Link>
                    <p>Rating: {rating.rating}</p>
                  <p className="col-12">{rating.reviewBody}</p>
                </div>
              </div>
            </ListGroup.Item>
          ))}
          </ListGroup>
        </Accordion.Body>
      
      </Accordion.Item>
    </Accordion>
    </>
  )
};

export default RatingList;