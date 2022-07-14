// !STORE YOUR SECRETS IN AN ENV! //
// import JWT

// authMiddleware function for authenticating JWT
// define token variable (either from req.body, req.query, or req.headers)
// separate 'Bearer' using split()
// if no token, return request object as is
// try/catch: decode and attach user data to request object with jwt.verify() method
// return updated request object

// signToken function for assigning a JWT
// expects user object (username, email, _id), adds them to the token 
// with jwt.sign() method