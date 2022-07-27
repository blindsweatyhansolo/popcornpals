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

    // USER - find single user (via username); populate with friend and rated movie data
    user: async (parent, { username }) => {
      return User.findOne({ username })
      .select('-__v -password')
      .populate('friends')
      .populate('ratedMovies');
    },

    // RATEDMOVIES - find all rated movies for specified user; params: username
    ratedMovies: async (parent, { user }) => {
      const ratedMovieData = await Rating.find({ user: user })
      .select('-__v');

      return ratedMovieData;
    },

    // SUGGESTIONS - find all movies suggested to logged in user(context)
    suggestedMovies: async (parent, args, context) => {
      if (context.user) {

        const suggestionData = await Suggestion.find({ suggestedTo: context.user._id })
          .populate('suggestedTo');

        return suggestionData;
      };

      throw new AuthenticationError('Not logged in!');
    },
    
    // ALLRATINGS - find all ratings for specified movie via imdbID, a movie must exist in
    // the db before it can be rated
    allRatings: async (parent, { imdbID }, context) => {
      return Rating.find({ imdbID: imdbID })
      .select('-__v')
    },

    myRating: async (parent, { imdbID }, context) => {
      if (context.user) {
        const rating = await Rating.findOne(
          { imdbID: imdbID, user: context.user.username }
          );
          
          return rating;
        }
        
        throw new AuthenticationError('Not logged in!');
    },
    
    // USERS - find all users; populate with friend and rated movie data
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('friends')
        .populate('ratedMovies')
        .populate('suggestions');
    },

    // SINGLEMOVIE - find single movie saved in db via id
    singleMovie: async (parent, { imdbID }) => {
      return Movie.findOne({ imdbID })
        .select('-__v')
        .populate('rating');
    },

    // ALL MOVIES - find all movies saved in db
    allMovies: async () => {
    return Movie.find()
      .select('-__v')
      .populate('rating')
    },

    singleSuggestion: async (parent, { imdbID }, context) => {
      if (context.user) {
        const suggestion = await Suggestion.findOne(
          { imdbID: imdbID, suggestedTo: context.user._id}
        );

        return suggestion;
      }

      throw new AuthenticationError('You must be logged in!');
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
    removeUser: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findByIdAndDelete( context.user._id );

        return user;
      }

      throw new AuthenticationError('You must be logged in!');
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
    addMovie: async (parent, { imdbID, title, year, poster }) => {
      // check if movie is already in dB
      const movie = await Movie.findOne({ imdbID });

      if (movie) {
        return movie;
      } else {
        const newMovie = await Movie.create(
          { imdbID: imdbID, title: title, year: year, poster: poster}
        );
          
        return newMovie;
      }
    },
  
    // RATEMOVIE - find Movie by title, if no Movie is found create new Movie with ADDMOVIE; push
    // rating and username(context) to Movie's rating array
    rateMovie: async (parent, { rating, reviewBody, imdbID, title }, context) => {
      if (context.user) {
        // check if user has already rated this movie
        const rated = await Rating.findOne(
          { imdbID: imdbID, user: context.user.username }
        );

        // console.log(rated);
        // if rating exists, update rating, else create new rating
        if (rated) {
          const updatedRating = await Rating.findOneAndUpdate(
            { _id: rated },
            { 
              rating: rating,
              reviewBody: reviewBody,
            },
            { new: true }
          );

          return updatedRating;
        
        } else if (rated === null){
          const newRating = await Rating.create(
            { 
              imdbID: imdbID,
              title: title,
              rating: rating, 
              reviewBody: reviewBody,
              user: context.user.username
            }
          );

          // console.log(newRating);
          return newRating;
        };
      };

      throw new AuthenticationError('You must be logged in!');
    },

    // SUGGESTMOVIE - create new suggestion using logged in user's id, selected friend id, and
    // movie imdbID
    suggestMovie: async (parent, { imdbID, friendId, title }, context) => {
      if (context.user) {
        // check if suggestedTo user already has this title in their suggestions
        const suggestion = await Suggestion.findOne(
          { imdbID: imdbID, suggestedTo: friendId }
        );
        
        if (suggestion) {
          const updatedSuggestion = await Suggestion.findOneAndUpdate(
            { _id: suggestion },
            { suggestedBy: context.user.username },
            { new: true }
          );

          return updatedSuggestion;
        } else if (suggestion === null) {
          const newSuggestion = await Suggestion.create(
            {
              imdbID: imdbID,
              title: title,
              suggestedBy: context.user.username,
              suggestedTo: friendId
            }
          );

          return newSuggestion;
        };
      };

      throw new AuthenticationError('You must be logged in!');
    },

    // REMOVESUGGESTION - remove movie from logged in user's suggestions list
    removeSuggestion: async (parent, { suggestionId }, context) => {
      if (context.user) {
        const suggestion = await Suggestion.findOneAndDelete(
          { _id: suggestionId }
        );

        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { suggestions: suggestionId } },
          { new: true }
        );

        return suggestion;
      };

      throw new AuthenticationError('You must be logged in!');
    },


    // TESTING MUTATIONS
    suggestToMyselfTest: async (parent, { friend, imdbID, title }, context) => {
      if (context.user) {
        const suggestion = await Suggestion.findOne(
          { imdbID: imdbID, suggestedTo: context.user._id }
        );
        
        if (suggestion) {
          const updatedSuggestion = await Suggestion.findOneAndUpdate(
            { _id: suggestion },
            { suggestedBy: friend },
            { new: true }
          );

          return updatedSuggestion;

        } else if (suggestion === null) {
          const newSuggestion = await Suggestion.create(
            {
              imdbID: imdbID,
              title: title,
              suggestedBy: friend,
              suggestedTo: context.user._id
            }
          );

          return newSuggestion;
        };
      };

      throw new AuthenticationError('You must be logged in!');
    },

    rateMovieForFriend: async (parent, { user, imdbID, userRating, reviewBody, title }) => {
      const newFakeRating = await Rating.create(
        {
          imdbID: imdbID,
          title: title,
          rating: userRating,
          reviewBody: reviewBody,
          user: user
        }
      );
      return newFakeRating;
    },

    deleteAllRatings: async (parent) => {
      await Rating.deleteMany({});
    },

    deleteAllSuggestions: async (parent) => {
      await Suggestion.deleteMany({});
    },
  }
};

// export resolvers
module.exports = resolvers;