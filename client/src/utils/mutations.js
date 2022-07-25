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
  mutation suggestMovie($imdbID: String!, $friendId: ID!, $title: String!) {
    suggestMovie(imdbID: $imdbID, friendId: $friendId, title: $title) {
      imdbID
      title
      suggestedBy
      suggestedTo {
        _id
      }
    }
  }
`;

export const REMOVE_SUGGESTION = gql`
  mutation removeSuggestion($suggestionId: ID!) {
    removeSuggestion(suggestionId: $suggestionId) {
      _id
    }
  }
`;

export const ADD_MOVIE = gql`
  mutation addMovie($imdbID: String!, $title: String!, $year: String!, $poster: String!) {
    addMovie(imdbID: $imdbID, title: $title, year: $year, poster: $poster) {
      _id
      imdbID
      title
      year
      poster
    }
}
`;

export const RATE_MOVIE = gql`
  mutation rateMovie($rating: String!, $imdbID: String!, $reviewBody: String!, $title: String!) {
    rateMovie(rating: $rating, imdbID: $imdbID, reviewBody: $reviewBody, title: $title) {
    _id
    imdbID
    title
    rating
    reviewBody
    user
  }
}
`;
