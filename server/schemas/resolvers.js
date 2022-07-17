// GRAPHQL RESOLVERS //
// import AuthenticationError, User/Movie models, and signToken (JWT)
const { User, Movie, Rating, Suggestion } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

// Best practice: methods should be the same name as the query/mutation that use them
const resolvers = {
  // QUERY RESOLVERS //
  Query: {
    // ME - use authenticated user (JWT passed auth) to return logged in user's data; populate
    // with friends, rated movies, and suggestions
    me: async (parent, args, context) => {
      if (context.user) { 
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('friends')
          .populate('ratedMovies')
          .populate('suggestions');

          return userData;
        }

        throw new AuthenticationError('Not logged in!');
    },

    // USERS - find all users; populate with friend and rated movie data
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('friends')
        .populate('ratedMovies');
    },

    // USER - find single user (via username); populate with friend and rated movie data
    user: async (parent, { username }) => {
      return User.findOne({ username })
      .select('-__v -password')
      .populate('friends')
      .populate('ratedMovies')
      .populate('suggestions');
    },

    // RATEDMOVIES - find all rated movies for specified user; params: username
    // ratedMovies: async (parent, { userId }) => {
    //   return User.findOne({ userId })
    //     .select('-__v')
    //     .populate('ratedMovies')
    // },

    // SUGGESTIONS - find all movies suggested to logged in user(context)

    // ALL MOVIES - find all movies saved in db
    allMovies: async () => {
      return Movie.find()
        .select('-__v')
        .populate('rating')
    },

    // SINGLEMOVIE - find single movie saved in db via id
    singleMovie: async (parent, { _id }) => {
      return Movie.findOne({ _id })
        .select('-__v')
        .populate('rating')
    },
  },

  // MUTATION RESOLVERS //
  Mutation: {
    // ADDUSER - create new user, assign JWT with signToken (imported from utils/auth); return
    // { token, user }
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    // LOGIN - find a user by email, throw AuthenticationError if user is not found; use bcrypt
    // isCorrectPassword(password) to check password, throw AuthenticationError if password
    // is incorrect; assign JWT with signToken; return { token, user }
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      // if user is not found, throw AuthenticationError
      if (!user) {
        throw new AuthenticationError('Login failed. Please check credentials.');
      }

      const correctPw = await user.isCorrectPassword(password);

      // if password is incorrect, throw AuthenticationError
      if (!correctPw) {
        throw new AuthenticationError('Login failed. Please check credentials.');
      }

      const token = await signToken(user);
      return { token, user };
    },
    
    // REMOVEUSER - remove user from DB using username/id
    removeUser: async (parent, { _id }) => {
      const user = await User.findByIdAndDelete({ _id });

      return user;
    },

    // ADDFRIEND - find/update logged in user via context; add friendId to User's friends array;
    // return updated user data
    // CHANGE USERID TO CONTEXT WHEN FINISHED WITH JWT SECTION
    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { friends: friendId } },
        { new: true }
        ).populate('friends');

        return updatedUser;
      }

      throw new AuthenticationError('You must be logged in!');
    },

    // REMOVEFRIEND - find/update logged in user via context; remove friendId from User's friends
    // array; return updated user data
    removeFriend: async (parent, { friendId, userId }) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { friends: friendId } },
        { new: true }
      ).populate('friends');

      return updatedUser;
    },

    // ADDMOVIE - scrape movie title from API query params, create new Movie in DB
    addMovie: async (parent, args, context) => {
      if (context.user) {
        const newMovie = await Movie.create({ ...args });
        
        return newMovie;
      };

      throw new AuthenticationError('You must be logged in!');
    },
  
    // RATEMOVIE - find Movie by title, if no Movie is found create new Movie with ADDMOVIE; push
    // rating and username(context) to Movie's rating array
    rateMovie: async (parent, { userRating, reviewBody, imdbID }, context) => {
      if (context.user) {
        const userId = context.user._id;

        const newRating = await Rating.create(
            { 
              imdbID: imdbID,
              rating: userRating, 
              reviewBody: reviewBody,
              user: userId
            }
          );

        return newRating;
      };

      throw new AuthenticationError('You must be logged in!');
    },

    // ADDTORATED - adds newly added movie to ratedMovies array on User
    addToRated: async (parent, { movieId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { ratedMovies: movieId } },
          { new: true, runValidators: true }
        );

        return updatedUser;
      };

      throw new AuthenticationError('You must be logged in!');
    },

    // SUGGESTMOVIE - create new suggestion using logged in user's id, selected friend id, and
    // movie id
    suggestMovie: async (parent, { movieId, friendId }, context) => {
      if (context.user) {
        const newSuggestion = await Suggestion.create(
          {
            movie: movieId,
            suggestedBy: context.user._id,
            suggestedTo: friendId
          }
        );

        return newSuggestion;
      };

      throw new AuthenticationError('You must be logged in!');
    },
  }
};

// export resolvers
module.exports = resolvers;