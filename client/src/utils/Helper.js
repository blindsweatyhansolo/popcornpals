// // custom hook to handle checking if a movie exists in the database, returns boolean
// import { useState } from "react";
// import { useQuery, useMutation } from "@apollo/client";
// import { ADD_MOVIE } from "./mutations";
// import { QUERY_SINGLE_MOVIE } from "../../utils/queries";
// import { useParams } from "react-router-dom";

// class Helper {

//   useCheckMovie(imdbID) {
    
//     const [movieStatus, setMovieStatus] = useState(null);

//     const { loading, data, error } = useQuery(QUERY_SINGLE_MOVIE, {
//       variables: { imdbID: imdbID },
//     });

//     const movie = data?.movie;

//     if (movie) {
//       setMovieStatus(true);
//     } else {
//       setMovieStatus(false);
//     }

//     return movieStatus;
//   };
// };

// export default Helper;
// export function useCheckMovie() {
//   const { imdbID } = useParams();
  
//   const [movieStatus, setMovieStatus] = useState(null);

//   const { loading, data, error } = useQuery(QUERY_SINGLE_MOVIE, {
//     variables: { imdbID: imdbID },
//   });

//   const movie = data?.movie;

//   if (movie) {
//     setMovieStatus(true);
//   } else {
//     setMovieStatus(false);
//   }

//   return movieStatus;
// };
