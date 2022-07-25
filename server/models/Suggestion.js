
// when a movie is SUGGESTED to another user, the data in the suggestedSchema
// array is updated with the logged in user's username and the movie's title to
// be read by the user it is SUGGESTED TO
const { Schema, model } = require('mongoose');
const User = require('./User');

const suggestionSchema = new Schema(
  {
    // save the suggested movie's imdbID instead of just title to avoid collisions
    // in search results of movies with the same title
    imdbID: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    // suggestedBy is the current logged in user's username
    suggestedBy: {
      type: String,
      required: true
    },
    // suggestedTo is the logged in user's selected friend id
    suggestedTo: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
  }
);


// middleware to handle new suggestion being pushed to suggestedTo User's suggestion array
suggestionSchema.post('save', async (newSuggestion) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: newSuggestion.suggestedTo },
    { $addToSet: { suggestions: newSuggestion._id } },
    { new: true }
  );
});

const Suggestion = model('Suggestion', suggestionSchema);

module.exports = Suggestion;