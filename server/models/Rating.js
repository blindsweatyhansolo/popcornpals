
// when a movie is RATED, a new instance of a Movie is created with the title, and the data 
// in the ratingSchema array is updated with the logged in user's username and subsequent rating
// rating: DISLIKE | LIKE | MUST SEE
const { Schema, model } = require('mongoose');
const Movie = require('./Movie');

const ratingSchema = new Schema(
  {
    imdbID: {
      type: String,
      required: true
    },
    rating: {
      type: String,
      required: true
    },
    reviewBody: {
      type: String,
      maxlength: 280,
      required: true      
    },
    user: [
      {
      type: Schema.Types.ObjectId,
      ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

// middleware to handle new rating being pushed to rated Movie's rating array
ratingSchema.post('save', async (newRating) => {
  const updatedMovie = await Movie.findOneAndUpdate(
    { imdbID: newRating.imdbID },
    { $push: { rating: newRating._id } },
    { new: true }
    );
});


const Rating = model('Rating', ratingSchema);

module.exports = Rating;