import { gql } from '@apollo/client';

export const QUERY_SUGGESTIONS = gql`
  query suggestedMovies {
    suggestedMovies {
      # _id
      # movie {
      #   _id
      #   imdbID
      #   title
      #   year
      #   poster
      # }
      imdbID
      suggestedBy
      # suggestedTo {
      #   _id
      #   username
      # }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      friends {
        _id
        username
      }
      ratedMovies {
        _id
        title
        rating {
          rating
        }
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
        rating {
          rating
        }
      }
      suggestions {
        _id
        movie {
          _id
          imdbID
          title
        }
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