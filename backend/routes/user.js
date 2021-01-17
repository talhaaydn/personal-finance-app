const router = require('express').Router();
const bcrypt = require('bcrypt');

const User = require('../models/User');

router.get('/user', (req, res) => {
  User.find({})
    .then((result) => res.json(result))
    .catch((error) => res.status(500).send(error));
});

router.post('/user/register', async (req, res) => {
  // Check email is already exist in the database
  const emailIsExist = await User.findOne({where: {email: req.body.email}});
  if (emailIsExist) return res.status(400).send('Email already exist');

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  };

  try {
    const newUser = await User.create(user);
    res
      .status(200)
      .send({user: newUser.id, message: 'User successfully created.'});
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
