// Rating is a SCHEMA only
// when a movie is RATED, a new instance of a Movie is created with the title, and the data 
// in the ratingSchema array is updated with the logged in user's username and subsequent rating
// rating: DISLIKE | LIKE | MUST SEE
const { Schema } = require('mongoose');

const ratingSchema = new Schema(
  {
    rating: {
      type: String,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }
);

module.exports = ratingSchema;