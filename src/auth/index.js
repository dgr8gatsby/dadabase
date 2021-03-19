const express = require('express');
const router = express.Router();

/****************************************************************
 * GET RANDOM JOKE
 ****************************************************************/
 router.get('/login', (req, res) => {
    // Reference the schema for a Joke
    const Joke = jokeSchema;
    let randomJoke = Joke.aggregate([{ $sample: { size: 1 } }], (err, joke) => {
      if (err) {
        console.log(err);
      } else {
        // Generate an etag for a joke using _id + _version of document
        res.set('etag', `${joke[0]._id}_${joke[0].revision}`);
        res.send(joke[0]);
      }
    });
  });

module.exports.router;