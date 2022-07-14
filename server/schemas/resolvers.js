// GRAPHQL RESOLVERS //
// import AuthenticationError, User/Movie models, and signToken (JWT)

// Best practice: methods should be the same name as the query/mutation that use them
const resolvers = {
  // QUERY RESOLVERS //
  
  // ME - use authenticated user (JWT passed auth) to return logged in user's data; populate
  // with friends, rated movies, and suggestions

  // USERS - find all users; populate with friend and rated movie data
  
  // USER - find single user (via username); populate with friend and rated movie data
  
  // RATEDMOVIES - find all rated movies for specified user; params: username
  
  // SUGGESTIONS - find all movies suggested to logged in user(context)


  // MUTATION RESOLVERS //

  // ADDUSER - create new user, assign JWT with signToken (imported from utils/auth); return
  // { token, user }

  // REMOVEUSER - remove user from DB using username/id

  // LOGIN - find a user by email, throw AuthenticationError if user is not found; use bcrypt
  // isCorrectPassword(password) to check password, throw AuthenticationError if password
  // is incorrect; assign JWT with signToken; return { token, user }

  // ADDFRIEND - find/update logged in user via context; add friendId to User's friends array;
  // return updated user data

  // REMOVEFRIEND - find/update logged in user via context; remove friendId from User's friends
  // array; return updated user data

  // ADDMOVIE - scrape movie title from API query params, create new Movie in DB

  // RATEMOVIE - find Movie by title, if no Movie is found create new Movie with ADDMOVIE; push
  // rating and username(context) to Movie's rating array
};

// export resolvers
module.exports = resolvers;