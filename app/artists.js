const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const path = require('path');

const config = require('../config');
const Artist = require('../models/Artist');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname))
  }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', async (req, res) => {
  try{
    const artists = await Artist.find();

    res.send(artists);
  }catch(e){
    res.status(400).send(e);
  }
});

router.post('/', upload.single('photo'), async (req, res) => {
  const artistData = req.body;

  if(req.file){
    artistData.photo = req.file.filename;
  }

  const artist = new Artist(artistData);

  try{
    await artist.save();

    res.send({id: artist._id})
  }catch(e){
    res.status(400).send(e);
  }
});

module.exports = router;