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

  # Rating type definition

  # Suggestion type definition

  # Auth type definition (JWT)

  # DEFINE QUERIES
  # me | users | user | ratedMovies | suggestions
  type Query {
    users: [User]
  } 

  # DEFINE MUTATIONS
  # login | addUser | removeUser | addFriend | removeFriend | addMovie | rateMovie
`;

// export typeDefs
module.exports = typeDefs;