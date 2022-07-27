// when a movie is RATED, a new instance of a Movie is created with the title, and the data 
// in the ratingSchema array is updated with the logged in user's username and subsequent rating
// rating: DISLIKE | LIKE | MUST SEE
const { Schema, model } = require('mongoose');
const Movie = require('./Movie');
const User = require('./User');

const ratingSchema = new Schema(
  {
    imdbID: {
      type: String,
      required: true
    },

    title: {
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
    user: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

// middleware to handle new rating being pushed to rated Movie's rating array
ratingSchema.post('save', async (newRating) => {
  const movie = await Movie.findOneAndUpdate(
    { imdbID: newRating.imdbID },
    { $addToSet: { rating: newRating._id } },
    { new: true }
    );

  const updatedUser = await User.findOneAndUpdate(
    { username: newRating.user },
    { $addToSet: { ratedMovies: movie._id }},
    { new: true }
    );
});


const Rating = model('Rating', ratingSchema);

module.exports = Rating;