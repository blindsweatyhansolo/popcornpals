// Suggestion is a SCHEMA only
// when a movie is SUGGESTED to another user, the data in the suggestedSchema
// array is updated with the logged in user's username and the movie's title to
// be read by the user it is SUGGESTED TO
const { Schema } = require('mongoose');

const suggestionSchema = new Schema(
  {
    movie: {
      type: Schema.Types.ObjectId,
      ref: 'Movie'
    },
    // suggestedBy is the current logged in user's username
    suggestedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
  }
);

module.exports = suggestionSchema;