const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const path = require('path');

const config = require('../config');
const Album = require('../models/Album');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
}
});

const upload = multer({storage});

const router = express.Router();

router.get('/', async (req, res) => {
  try{
    const albums = await Album.find();

    res.send(albums);
  }catch(e){
    res.status(400).send(e);
  }
});

router.get('/:id', async (req, res) => {
  try{
    const album = await Album.find({_id: req.params.id}).populate('artist');

    res.send(album);
  }catch(e){
    res.status(400).send(e);
  }
});

router.post('/', upload.single('cover_image'), async (req, res) => {
  const albumData = req.body;

  if(req.file){
    albumData.cover_image = req.file.filename;
  }

  const album = new Album(albumData);

  try{
    await album.save();

    res.send({id: album._id});
  }catch(e){
    res.status(400).send(e);
  }
});

module.exports = router;

