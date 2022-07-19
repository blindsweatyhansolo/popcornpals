// SEEDING SCRIPT FOR DEVELOPMENT //
// import faker, db connection, and User / Movie models
const faker = require('faker');

const db = require('../config/connection');
const { User, Movie } = require('../models');

db.once('open', async () => {
  // delete any existing data
  await User.deleteMany({});
  await Movie.deleteMany({});

  // create empty user data array
  const userData = [];

  // loop for creating 5 users
  for (let i = 0; i < 5; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    // push to userData array
    userData.push({ username, email, password });
  }

  // variable to hold all faked users
  const createdUsers = await User.collection.insertMany(userData);

  // create friends
  for (let i = 0; i < 20; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { _id: userId } = createdUsers.ops[randomUserIndex];

    let friendId = userId;

    while (friendId === userId) {
      const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
      friendId = createdUsers.ops[randomUserIndex];
    }

    await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
  }

  // // create movies
  // const movieData = [];

  // // loop for creating 5 movies
  // for (let i = 0; i < 5; i += 1){
  //   const imdbID = faker.internet.password(8);
  //   const title = faker.lorem.words(3);

  //   const createdMovie = await Movie.create({ imdbID, title });

  //   movieData.push(createdMovie);
  // }

  console.log('FAKE DATA CREATED');
  process.exit(0);
});