import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($id: ID!) {
    addFriend(friendId: $id) {
      _id
      username
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation removeFriend($id: ID!) {
    removeFriend(id: $id) {
      _id
      username
      friends {
        _id
        username
      }
    }
  }
`;

export const SUGGEST_MOVIE = gql`
  mutation suggestMovie($movieId: ID!, $friendId: ID!) {
    suggestMovie(movieId: $movieId, friendId: $friendId) {
      movie {
        _id
      }
      suggestedBy
      suggestedTo {
        _id
      }
    }
  }
`;

export const ADD_MOVIE = gql`
  mutation AddMovie($imdbId: String!, $title: String!, $year: String!, $poster: String!) {
    addMovie(imdbID: $imdbId, title: $title, year: $year, poster: $poster) {
      _id
      imdbID
      title
      year
      poster
    }
}
`;