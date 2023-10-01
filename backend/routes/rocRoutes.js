/* eslint-disable jest/require-hook */
const router = require('express').Router();
const AppController = require('../controllers/AppController');
const RocController = require('../controllers/RocController');

router.get('/', RocController.home)
  .get('/status', AppController.getStatus)
  .get('/stats', AppController.getStats)
  .get('/users', RocController.getNoOfUser);

module.exports = router;
