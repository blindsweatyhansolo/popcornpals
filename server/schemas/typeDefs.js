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
    rating: [Rating]
  }

  # Rating type definition
  type Rating {
    _id: ID
    rating: String
    user: [User]
  }

  # Suggestion type definition
  type Suggestion {
    movie: [Movie]
    suggestedBy: [User]
  }

  # Auth type definition (JWT)

  # DEFINE QUERIES
  # me | users | user | ratedMovies | suggestions
  type Query {
    users: [User]
    user(_id: ID!): User
    ratedMovies(username: String!): User
    # suggestions(username: String!): User
    allMovies: [Movie]
    singleMovie(_id: ID!): Movie
    allRatings: [Rating]
  } 

  # DEFINE MUTATIONS
  # login | addUser | removeUser | addFriend | removeFriend | addMovie | rateMovie
  type Mutation {
    addUser(username: String!, email: String!, password: String!): User
    removeUser(_id: ID!): User
    addFriend(friendId: ID!, userId: ID!): User
    rateMovie(userID: ID!, userRating: String!): Rating
  }
`;

// export typeDefs
module.exports = typeDefs;