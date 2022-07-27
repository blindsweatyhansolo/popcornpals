import { Link } from 'react-router-dom';
const searchIcon = require('../assets/icons/searchmovie.png');
const rateIcon = require('../assets/icons/ratereview.png');
const shareIcon = require('../assets/icons/suggest.png');

const Landing = () => {
  return (
    <div className='d-flex flex-column align-items-center text-center mt-4'>

      <h1>
        Welcome to Popcorn Pals!
      </h1>

      <img src={searchIcon} alt='' className='py-2'/> Search for Titles
      <img src={rateIcon} alt='' className='py-2'/> Rate and Review
      <img src={shareIcon} alt='' className='py-2'/> Suggest Them to your Pals!


      <div className='mt-4'>
        <Link to='/home'>
          <h3>Check it Out!</h3>
        </Link>
      </div>
    </div>
  );
};

export default Landing;