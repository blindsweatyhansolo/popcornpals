// !STORE YOUR SECRETS IN AN ENV! //
// import JWT
const jwt = require('jsonwebtoken');
require('dotenv').config();

// define hidden secret key and expiration
const secret = process.env.JWT_SECRET;
const expiration = '2h';

module.exports = {
  // signToken function for assigning a JWT
  // expects user object (username, email, _id), adds them to the token 
  // with jwt.sign() method
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

  // authMiddleware function for authenticating JWT
  authMiddleware: function({ req }) {
    // define token variable (either from req.body, req.query, or req.headers)
    let token = req.body.token || req.query.token || req.headers.authorization;

    // separate 'Bearer' using split()
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    // if no token, return request object as is
    if (!token) {
      return req;
    }

    // try/catch: decode and attach user data to request object with jwt.verify() method
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('INVALID TOKEN');
    }

    // return updated request object
    return req;
  }
};

