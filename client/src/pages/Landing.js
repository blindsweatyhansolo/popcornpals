import { Link } from 'react-router-dom';
const searchIcon = require('../assets/icons/search.png');
const rateIcon = require('../assets/icons/rateandreview.png');
const shareIcon = require('../assets/icons/suggest.png');

const Landing = () => {
  return (
    <div className='d-flex flex-column align-items-center text-center mt-4'>

      <p className='fs-2 my-0'>Welcome to</p> 
      <span className='fs-1 popcornText'>Popcorn Pals!</span>

      <div className='fs-3 d-flex flex-column align-items-center pt-4'>
        <img src={searchIcon} alt='' className='py-2 grow splashIcon' /> 
        Search for Titles
      </div>
      <div className='fs-3 d-flex flex-column align-items-center pt-4'>
        <img src={rateIcon} alt='' className='py-2 grow splashIcon'/> 
        Rate and Review
      </div>
      <div className='fs-3 d-flex flex-column align-items-center py-4'>
        <img src={shareIcon} alt='' className='py-2 grow splashIcon'/> 
        Suggest Them to your Pals!
      </div>


      <div className='mt-4'>
        <Link to='/home' >
          <h3 className='grow'>Check it Out!</h3>
        </Link>
      </div>
    </div>
  );
};

export default Landing;