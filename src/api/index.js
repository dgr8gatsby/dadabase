const mongo = require('../../mongo.config'); // Use Mongo db for data management
const mongoose = require('mongoose'); // Use Mongoose for data schema
const jokeSchema = require('../models/joke.js');
const express = require('express');
const router = express.Router();
const data = require('../data/jokes.json');
const PAGE_SIZE = mongo.apiConfig.PAGE_SIZE;

try {
  // Connect to the Mongoose DB
  mongoose.connect(
    mongo.config.URL + '/' + mongo.config.DB_NAME,
    mongo.config.OPTIONS
  );
} catch (error) {
  console.log(`Connection error: ${error}`);
}


/****************************************************************
 * The use case for this API is that users should be able to
 * create new jokes. 
 * 
 * TODO: implement Authentication, only authenitcated users can submit
 * TODO: or implement ALWAYS review process, and or both
 ****************************************************************/
router.post('/addjoke', (req, res) => {
  mongoose.connect(
    mongo.config.URL + '/' + mongo.config.DB_NAME,
    mongo.config.OPTIONS
  );
  const Joke = jokeSchema;

  const newJoke = new Joke({
    type: req.body.type,
    headline: req.body.headline,
    punchline: req.body.punchline,
    why: req.body.why,
  });

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
  let jokes = await jokeSchema.find();
  let items = {};
  items.totalJokes = jokes.length;
  items.items = jokes;
  res.send(items);
  /*
  jokeSchema.aggregate([
    { $match: { tellAfter: { $exists: false } } },
    { $limit: 2 }
  ], (error, jokes) => {
    if (error) {
      console.log(`/jokes error: ${error}`);
    } else {
      let items = {};
      items.items = jokes;
      res.send(items);
    }
  }) */
});

/****************************************************************
 * GET JOKES ADD SUPPORT FOR PAGING
 ****************************************************************/
router.get('/jokes/page/:page', async (req, res) => {
  let jokes = await jokeSchema.find()
    .skip(PAGE_SIZE * (req.params.page - 1))
    .limit(PAGE_SIZE);

  let items = {};
  items.totalPages = Math.ceil(await jokeSchema.countDocuments() / PAGE_SIZE);
  items.page = req.params.page;
  items.items = jokes;
  res.send(items);
})

function handleError(error) {
  console.log(`Connection Error: ${error}`)
}

/****************************************************************
 * LOAD SAMPLE DATA
 ****************************************************************/
router.get('/loaddata', (req, res) => {
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

/****************************************************************
 * LOAD A JOKE BY ID
 ****************************************************************/
router.get('/jokes/:id', (req, res) => {
  // Reference the schema for a Joke
  if (req.params.id != undefined) {
    const Joke = jokeSchema;
    let jokeObject;
    Joke.find({ _id: req.params.id }, (err, joke) => {
      if (err) {
        console.log(err);
        res.status(404).send('Joke Not Found');
      } else {
        res.set('etag', `${joke[0]._id}_${joke[0].revision}`);
        jokeObject = joke[0];
        addRender(joke[0]._id);
      }
    }).then(() => {
      Joke.find({ tellAfter: req.params.id }, (err, joke) => {
        if (err) {
          console.log(`/jokes ${err}`);
        } else {
          if (joke[0]) {
            jokeObject.nextJokeId = joke[0]._id
          }
          res.send(jokeObject);
        }
      })
    });
  } else {
    res.send('id was undefined');
  }
});

/****************************************************************
 * LOAD BASIC METADATA
 ****************************************************************/
router.get('/meta', (req, res) => {
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
        metadata.totalRenders = meta[0].totalRenders;
      }
    })

  jokeSchema.countDocuments({ revision: { $gte: 0 } }, (err, meta) => {
    if (err) {
      console.log(err);
    } else {
      metadata.jokeCount = meta;
      res.send(metadata);
    }
  })
})

router.get ('/social/:id', (req, res) => {
  const Joke = jokeSchema;
  Joke.find ({_id: req.params.id}, (err, joke) => {
    if (err) {
      console.log (err);
      res.status (404).send ('Joke Not Found');
    } else {
      console.log(`Social Server Page: ` + joke[0])
      res.render ('jokeDisplayPage', joke[0]);
    }
  });
});


/****************************************************************
 * LOG A RENDER ON THE DOCUMENT
 ****************************************************************/
function addRender(id) {
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