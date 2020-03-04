const express = require('express');

const Track = require('../models/Track');

const router = express.Router();

router.get('/', async (req, res) => {
  try{
    const tracks = await Track.find().populate('album');

    res.send(tracks);
  }catch(e){
    res.status(400).send(e);
  }
});

router.get('/:artist_id', async(req, res) => {
  try{
    const tracksByArtist = await Track.find().populate('album', {artist: req.params.artist_id});

    res.send(tracksByArtist);
  }catch(e){
    res.status(400).send(e);
  }
});

router.post('/', async (req, res) => {
  const trackData = req.body;

  const track = new Track(trackData);

  try{
    await track.save();

    res.send({id: track._id});
  }catch(e){
    res.status(400).send(e);
  }
});

module.exports = router;