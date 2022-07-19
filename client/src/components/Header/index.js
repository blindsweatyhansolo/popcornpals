import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header className='bg-dark mb-4 py-2 flew-row justify-content-between'>
      <nav className='navbar navbar-expand-lg'>
        <Link to= '/home'>
            <h1>Popcorn Pals</h1>
            <span className='navbar-text'>Share movies with your friends!</span>
        </Link>

        <form className='form'>
          <input className='form-control mr-sm-2' type='search' placeholder='Search titles...' />
          <button type='submit'>Search</button>
        </form>
        {/* USE AUTH TO EITHER SHOW LOGIN/SIGNUP OR ACCOUNT/LOGOUT */}
        <Link to='/login'>LOGIN/SIGNUP</Link>
      </nav>
    </header>
  );
};

export default Header;