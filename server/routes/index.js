const express = require('express');
const router = express.Router();
const Twitter = require('../functions/fetchTwitter');
require('dotenv').config();


/*POST FROM CLIENT SIDE*/
router.post('/:account', async function (req, res, next) {
  try {
    lastTwitterId = req.body.twitterId;
    twitterObject = await Twitter.findTweets(req.params.account.toLowerCase(), lastTwitterId);
    res.status(200).json(twitterObject)
  } catch {
    res.status(500).json({ serverError: true })
  }
});

module.exports = router;
