const express = require('express');

const Track = require('../models/Track');
const User = require('../models/User');
const TrackHistory = require('../models/TrackHistory');

const router = express.Router();

router.post('/', async (req, res) => {
  const token = req.get('Token');

  const track = await Track.findOne({_id: req.body.trackId});
  const user = await User.findOne({token});

  if(!track) return res.status(400).send({error: 'Track Not Found!'});
  if(!user) return res.status(401).send({error: 'Not Authorized!'});

  const trackHistoryData = {track: track._id, user: user._id};

  const trackHistory = new TrackHistory(trackHistoryData);

  try{
    await trackHistory.save();

    res.send(trackHistory);
  }catch(e){
    res.status(400).send(e);
  }
});

module.exports = router;