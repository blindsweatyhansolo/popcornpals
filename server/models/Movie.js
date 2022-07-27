// Movie document to hold title pulled from front OMDb query variable, and reference to
// Rating schema. After a user searchers for a movie title on the front end
// AND rates to it, the title gets scraped from the query and
// used to create a new Movie document. This ensures only Movies that have been rated
// are added to the DB, instead of a massive collection
const { Schema, model } = require('mongoose');

// define Movie schema
const movieSchema = new Schema(
  {
    imdbID: {
      type: String,
      required: true,
      unique: true
    },
    title: {
      type: String,
      required: true
    },
    year: {
      type: String,
      required: true
    },
    // do not require poster, since some responses from OMDb are missing poster data
    poster: {
      type: String,
      // required: true
    },
    // reference to ratingSchema which holds a user ID and their rating for this movie
    rating: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Rating'
      }
    ]
  }
);

const Movie = model('Movie', movieSchema);

module.exports = Movie;