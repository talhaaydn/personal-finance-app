const router = require('express').Router();

const Favorite = require('../models/Favorite');

router.get('/favorite', (req, res) => {
  const USER_ID = '5ff09e7bbe598c1c199cd9aa';

  Favorite.find({user_id: USER_ID})
    .then((result) => res.json(result))
    .catch((error) => res.status(500).send(error));
});

router.post('/favorite', (req, res) => {
  const favorite = new Favorite(req.body);

  favorite
    .save()
    .then((result) => res.json(result))
    .catch((error) => res.status(500).send(error));
});

module.exports = router;
