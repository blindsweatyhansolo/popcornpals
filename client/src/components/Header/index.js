import { Link } from 'react-router-dom';


const Header = () => {
  // handle logout with Auth
  const logout = event => {
    event.preventDefault();
    // Auth.logout();
  }
  return (
    <nav className='navbar navbar-expand-lg bg-light'>
      <div className='container-fluid'>
        <Link to= '/home'>
            <h1 className='navbar-brand'>🍿Popcorn Pals🍿</h1>
        </Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav'>
            <li className='nav-item'>

              <form className='form-inline my-2 my-lg-0 d-flex'>
                <input className='form-control mr-sm-2' type='search' placeholder='Search for titles' />
                <button className='btn btn-primary' type='submit'>Search</button>
              </form>
            </li>
            <li className='nav-item'>
              <Link to='/profile' className='nav-link'>Profile</Link>
            </li>
            <li className='nav-item'>
              <a href='/' onClick={logout} className='nav-link'>Logout</a>
            </li>

            <li className='nav-item'>
              {/* USE AUTH TO EITHER SHOW LOGIN/SIGNUP OR ACCOUNT/LOGOUT */}
              <Link to='/login' className='nav-link'>
                Login / Sign-up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;