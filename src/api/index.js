const mongo = require('../../mongo.config'); // Use Mongo db for data management
const mongoose = require('mongoose'); // Use Mongoose for data schema
const jokeSchema = require('../models/joke.js');
const express = require('express');
const router = express.Router();
const data = require('../data/jokes.json');

// End point for adding new Joke documents to the mongo Database
router.post('/addjoke', (req, res) => {
  // Log requests from the client in the console for debugging
  //console.log(req.body);

  // Connect to the Mongoose DB
  mongoose.connect(
    mongo.config.URL + '/' + mongo.config.DB_NAME,
    mongo.config.OPTIONS
  );

  // Reference the schema for a Joke
  const Joke = jokeSchema;

  // Create a new Joke Object
  const newJoke = new Joke({
    type: req.body.type,
    headline: req.body.headline,
    punchline: req.body.punchline,
    why: req.body.why,
  });

  // Try to save the new joke
  newJoke.updateOne(
    {
      headline: req.body.headline,
      punchline: req.body.punchline,
      type: req.body.type,
      why: req.body.why,
    },
    { upsert: true },
    error => {
      if (error) {
        console.error(error);
      } else {
        res.end('{"success" : "New joke added successfully", "status" : 200}');
      }
    }
  );
});

/****************************************************************
 * GET RANDOM JOKE
 ****************************************************************/
router.get('/random', (req, res) => {
  // Connect to the Mongoose DB
  mongoose.connect(
    mongo.config.URL + '/' + mongo.config.DB_NAME,
    mongo.config.OPTIONS
  );

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

/****************************************************************
 * GET JOKES
 ****************************************************************/
router.get('/jokes', async (req, res) => {
  // Connect to the Mongoose DB
  mongoose.connect(
    mongo.config.URL + '/' + mongo.config.DB_NAME,
    mongo.config.OPTIONS
  );

  jokeSchema.aggregate([
    { $match: { tellAfter: { $exists: false } } },
    { $limit: 10 }
  ], (error, jokes) => {
    if (error) {
      console.log(`/jokes error: ${error}`);
    } else {
      let items = {};
      items.items = jokes;
      res.send(items);
    }
  })
});

/****************************************************************
 * LOAD SAMPLE DATA
 ****************************************************************/
router.get('/loaddata', (req, res) => {
  // Connect to the Mongoose DB
  mongoose.connect(
    mongo.config.URL + '/' + mongo.config.DB_NAME,
    mongo.config.OPTIONS
  );

  // Reference the schema for a Joke
  const Joke = jokeSchema;

  const bulkUpdate = data.map(doc => ({
    updateOne: {
      filter: { headline: doc.headline },
      update: doc,
      upsert: true,
    },
  }));

  Joke.bulkWrite(bulkUpdate)
    .then(result => {
      console.log(`Bulk update ok: ${result}`);
      res.send(result);
    })
    .catch(console.error.bind(console, `Bulk update error!`));
});

// End point for returing one random joke from the Mongo database
router.get('/jokes/:id', (req, res) => {
  // Connect to the Mongoose DB
  mongoose.connect(
    mongo.config.URL + '/' + mongo.config.DB_NAME,
    mongo.config.OPTIONS
  );

  // Reference the schema for a Joke
  if (req.params.id != undefined) {
    const Joke = jokeSchema;
    let jokeObject;
    Joke.find({ _id: req.params.id }, (err, joke) => {
      if (err) {
        console.log(err);
        res.status(404).send('Joke Not Found');
      } else {
        // Generate an etag for a joke using _id + _version of document
        res.set('etag', `${joke[0]._id}_${joke[0].revision}`);
        // res.send(joke[0]);
        jokeObject = joke[0];
        addRender(joke[0]._id);
      }
    }).then(() => {
      Joke.find({ tellAfter: req.params.id }, (err, joke) => {
        if (err) {
          console.log(`/jokes ${err}`);
        } else {
          if (joke[0]) {
            console.log(`related joke: ${joke[0]._id}`);
            jokeObject.nextJokeId = joke[0]._id
          } 
          console.log(jokeObject);

          res.send(jokeObject);
        }
      })
    });
  } else {
    res.send('id was undefined');
  }
});

router.get('/meta', (req, res) => {
  // Connect to the Mongoose DB
  mongoose.connect(
    mongo.config.URL + '/' + mongo.config.DB_NAME,
    mongo.config.OPTIONS
  );

  let metadata = {};

  jokeSchema.aggregate(
    [{ $match: { renders: { $gt: 0 } } },
    {
      $group: {
        _id: null,
        totalRenders: { $sum: "$renders" }
      }
    }],
    (err, meta) => {
      if (err) {
        console.log(err)
      } else {
        console.log(meta);
        metadata.totalRenders = meta[0].totalRenders;
      }
    })

  jokeSchema.countDocuments({ revision: { $gte: 0 } }, (err, meta) => {
    if (err) {
      console.log(err);
    } else {
      metadata.jokeCount = meta;
      console.log(metadata);
      res.send(metadata);
    }
  })
})



function addRender(id) {
  // Connect to the Mongoose DB
  mongoose.connect(
    mongo.config.URL + '/' + mongo.config.DB_NAME,
    mongo.config.OPTIONS
  );


  jokeSchema.findByIdAndUpdate(
    id,
    { $inc: { renders: 1 } },
    (error, data) => {
      if (error) {
        console.log(error);
      }
    }
  )
}

module.exports = router;
