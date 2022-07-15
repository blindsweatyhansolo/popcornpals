const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// define User schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // regex to match standard email addresses
      match: [/.+@.+\..+/, 'Must match an email address!']
    },
    password: {
      type: String,
      required: true,
      minlength: 5
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    ratedMovies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Movie'
      }
    ],
    suggestions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Suggestion'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

// use pre-save middleware to create password with bcrypt
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare incoming password with hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

// virtual for total number of friends
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('User', userSchema);

// export
module.exports = User;