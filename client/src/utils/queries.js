import { gql } from '@apollo/client';

export const QUERY_SUGGESTIONS = gql`
  query suggestedMovies {
    suggestedMovies {
      _id
      imdbID
      title
      suggestedBy
      suggestedTo {
        _id
        username
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
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

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
      ratedMovies {
        _id
        title
        imdbID
      }
      suggestions {
        _id
        imdbID
        suggestedBy
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

export const QUERY_ALL_MOVIES = gql`
  {
    allMovies {
      _id
      imdbID
      title
    }
  }
`;

export const QUERY_SINGLE_MOVIE = gql`
  query singleMovie($imdbID: String!) {
    singleMovie(imdbID: $imdbID) {
      _id
      imdbID
      title
      year
      poster
    }
}
`;

export const QUERY_MY_RATING = gql`
  query myRating($imdbID: String!) {
    myRating(imdbID: $imdbID) {
      rating
      reviewBody
      user
    }
}
`;

export const QUERY_ALL_RATINGS = gql`
  query allRatings($imdbID: String!) {
  allRatings(imdbID: $imdbID) {
    rating
    reviewBody
    user
  }
}
`;

export const QUERY_RATED_MOVIES = gql`
  query ratedMovies($user: String!) {
    ratedMovies(user: $user) {
      _id
      imdbID
      title
      rating
      reviewBody
      user
    }
}
`;