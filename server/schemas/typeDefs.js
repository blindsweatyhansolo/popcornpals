// GRAPHQL TYPE DEFINITIONS //
// Defines every piece of data the client can expect to work with through queries/mutations

// import gql tagged template function
const { gql } = require('apollo-server-express');

// create typeDefs
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    friends: [User]
  }

  type Query {
    users: [User]
  }
`;

module.exports = typeDefs;