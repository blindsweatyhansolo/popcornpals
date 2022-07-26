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
          <p>Already a Popcorn Pal?</p> 
        <Link to='/login'>
          Login!
        </Link>
      </div>
      
      <div>
        <p>Not a pal yet?</p>
        <Link to='/signup'>
          Sign up!
        </Link>
      </div>
    </div>
  );
};

export default Landing;