// GRAPHQL TYPE DEFINITIONS //
// Defines every piece of data the client can expect to work with through queries/mutations

// import gql tagged template function
const { gql } = require('apollo-server-express');

// create typeDefs
const typeDefs = gql`
  # full User type definition
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    friends: [User]
    ratedMovies: [Movie]
    suggestions: [Suggestion]
  }

  # full Movie type definition
  type Movie {
    _id: ID
    imdbID: String
    title: String
    year: String
    poster: String
    rating: [Rating]
  }

  # Rating type definition
  type Rating {
    _id: ID
    imdbID: String
    rating: String
    reviewBody: String
    user: String
    # user: [User]
  }

  # Suggestion type definition
  type Suggestion {
    _id: ID
    # movie: [Movie]
    imdbID: String
    suggestedBy: String
    suggestedTo: [User]
  }

  # Auth type definition (JWT)
  type Auth {
    token: ID!
    user: User
  }

  # DEFINE QUERIES
  # me | users | user | ratedMovies | suggestions
  type Query {
    me: User
    users: [User]
    user(username: String!): User
    ratedMovies(user: String!): Rating
    suggestedMovies: [Suggestion]

    myRating(imdbID: String!): Rating
    allRatings(imdbID: String!): [Rating]

    singleMovie(imdbID: String!): Movie
    allMovies: [Movie]

  } 

  # DEFINE MUTATIONS
  # login | addUser | removeUser | addFriend | removeFriend | addMovie | rateMovie
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeUser(_id: ID!): User
    addFriend(friendId: ID!): User
    removeFriend(friendId: ID!, userId: ID!): User
    addMovie(imdbID: String!, title: String!, year: String!, poster: String!): Movie
    rateMovie(rating: String!, reviewBody: String!, imdbID: String!): Rating

    suggestMovie(imdbID: String!, friendId: ID!): Suggestion
    removeSuggestion(suggestionId: ID!): Suggestion

    # TESTING MUTATIONS
    suggestToMyselfTest(imdbID: String!, friendId: ID!): Suggestion
    deleteAllRatings: Rating
    rateMovieForFriend(user: String!, userRating: String!, imdbID: String!, reviewBody: String!): Rating 
  }
`;

// export typeDefs
module.exports = typeDefs;