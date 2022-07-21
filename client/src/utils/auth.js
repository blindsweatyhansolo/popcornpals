import decode from 'jwt-decode';

class AuthService {
  // get data saved in token
  getProfile() {
    return decode(this.getToken());
  }

  // check if user is logged in
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // check for token expiration
  isTokenExpired(token) {
    try {
      const decoded = decode(token);

      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  // get token from local storage
  getToken() {
    return localStorage.getItem('id_token');
  }

  // set token to local storage, reload to homepage
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/home');
  }

  // clear token from local storage and force logout with reload
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
};

export default new AuthService();