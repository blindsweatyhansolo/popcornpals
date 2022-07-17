// Movie document to hold title pulled from front OMDb query variable, and reference to
// Rating schema (subdocument). After a user searchers for a movie title on the front end
// AND/OR rates / suggests to another friend, the title gets scraped from the query and
// used to create a new Movie document. This ensures only Movies that have been rated or
// suggested are added to the DB, instead of a massive collection

const { Schema, model } = require('mongoose');
const User  = require('./User');

// define Movie schema
const movieSchema = new Schema(
  {
    // omdb ID instead of TITLE
    imdbID: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
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