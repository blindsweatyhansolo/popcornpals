import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className='d-flex flex-column align-items-center text-center'>
      <h1>
        Welcome to Popcorn Pals!
      </h1>

      <p>
        Share movies with your friends!
      </p>

      <div className=''>
        <Link to='/home'>
          Check it out!
        </Link>
      </div>
    </div>
  );
};

export default Landing;