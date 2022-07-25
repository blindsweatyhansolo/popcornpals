import { Link } from 'react-router-dom';

const FriendList = ({ friendCount, username, friends }) => {

  // const [removeFriend] = useMutation(REMOVE_FRIEND, {
  //   refetchQueries: [
  //     {query: QUERY_ME_BASIC}
  //   ]
  // });

  if (!friends || !friends.length) {
    return <p className="bg-dark text-light p-3">{username}, make some friends!</p>;
  }

  return (
    <div className='bg-light'>
      <h5 className='p-2 text-center text-dark'>
         {friendCount === 1 ? `Friend (${friendCount})` : `Friends (${friendCount})`}
      </h5>
      {friends.map(friend => (
        <Link to={`/profile/${friend.username}`}>
          <button className="btn w-50 display-block mb-2" key={friend._id}>
            {friend.username}
          </button>
        </Link>

      ))}
    </div>
  );
};

export default FriendList;