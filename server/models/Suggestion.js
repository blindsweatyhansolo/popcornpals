// Suggestion is a SCHEMA only
// when a movie is SUGGESTED to another user, the data in the suggestedSchema
// array is updated with the logged in user's username and the movie's title to
// be read by the user it is SUGGESTED TO
const { Schema } = require('mongoose');

const suggestionSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    // suggestedBy is the current logged in user's username
    suggestedBy: {
      type: String,
      required: true
    }
  }
);

module.exports = suggestionSchema;