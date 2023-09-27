/* eslint-disable jest/require-hook */
const router = require('express').Router();
const AppController = require('../controllers/AppController');
const HcwController = require('../controllers/HcwController');

router.get('/', HcwController.home)
  .get('/status', AppController.getStatus)
  .get('/stats', AppController.getStats)
  .get('/users', HcwController.getUser);

module.exports = router;
