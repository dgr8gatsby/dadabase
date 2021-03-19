const mongo = require ('../../mongo.config'); // Use Mongo db for data management
const mongoose = require ('mongoose'); // Use Mongoose for data schema
const jokeSchema = require ('../models/joke.js');
const express = require ('express');
const router = express.Router ();

// End point for returing one random joke from the Mongo database
router.get ('/social/:id', (req, res) => {
  console.log(`social route`)
  // Reference the schema for a Joke
  const Joke = jokeSchema;
  Joke.find ({_id: req.params.id}, (err, joke) => {
    if (err) {
      console.log (err);
      res.status (404).send ('Joke Not Found');
    } else {
      console.log (joke[0]);
      res.render ('jokeDisplayPage', joke[0]); //(joke[0]);
    }
  });
});

module.exports = router;
