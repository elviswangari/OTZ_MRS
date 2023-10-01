/* eslint-disable jest/require-hook */
const router = require('express').Router();
const AppController = require('../controllers/AppController');
const HcwController = require('../controllers/HcwController');
const AuthController = require('../controllers/AuthController');

router.post('/register', AuthController.register)
  .post('/login', AuthController.login);

router.get('/', HcwController.home)
  .get('/status', AppController.getStatus)
  .get('/stats', AppController.getStats)
  .get('/users', HcwController.getNoOfUser)
  .post('/search', HcwController.getRocRecord)
  .post('/registration', HcwController.registerRoc)
  .put('/registration', HcwController.updateRocRecord);

router.post('/triage', HcwController.newVitals)
  .put('/triage', HcwController.updateVitals)
  .delete('/triage', HcwController.deleteVitals)
  


module.exports = router;
