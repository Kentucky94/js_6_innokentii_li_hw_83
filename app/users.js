const express = require('express');
const nanoid = require('nanoid');

const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
  const userData = req.body;

  const user = new User(userData);

  try{
    await user.save();

    res.send(user);
  }catch(e){
    res.status(400).send(e);
  }
});

router.post('/sessions', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({username});

  if(!user) return res.status(400).send({error: 'User not found!'});

  const isMatch = await user.checkPassword(password);

  if(!isMatch) return res.status(400).send({error: 'Wrong password!'});

  user.token = nanoid();

  await user.save();

  res.send(user);
});

module.exports = router;