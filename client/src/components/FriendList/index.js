import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';

const FriendList = ({ friendCount, username, friends }) => {

  if (!friends || !friends.length) {
    return (
      <Accordion>
        <Accordion.Header>
          {friendCount === 1 ? `Friend (${friendCount})` : `Friends (${friendCount})`}
        </Accordion.Header>
        <Accordion.Body>
          <ListGroup>
              <ListGroup.Item className="text-center">
                <i className="bi bi-emoji-frown"></i> Aw geez, no Pals <i className="bi bi-emoji-frown"></i>
                <p>Go find some friends, {username}!</p>
              </ListGroup.Item>
          </ListGroup>
        </Accordion.Body>
      </Accordion>
  )}

  return (
    <Accordion>
      <Accordion.Header>
        {friendCount === 1 ? `Friend (${friendCount})` : `Friends (${friendCount})`}
      </Accordion.Header>
      <Accordion.Body>
        <ListGroup>
          {friends.map(friend => (
            <ListGroup.Item key={friend._id}>
              <div>
                <Link to={`/profile/${friend.username}`}>
                    {friend.username}
                </Link>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Accordion.Body>
    </Accordion>
  );
};

export default FriendList;