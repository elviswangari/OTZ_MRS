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
  .delete('/triage', HcwController.deleteVitals);

router.post('/lab', HcwController.newLabOrder)
  .put('/lab', HcwController.updateLabOrder)
  .delete('/lab', HcwController.deleteLabOrder);

router.post('/pharmacy', HcwController.newPharmacyOrder)
  .put('/pharmacy', HcwController.updatePharmacyOrder)
  .delete('/pharmacy', HcwController.deletePharmacyOrder);

router.post('/appointments', HcwController.newAppoitment)
  .put('/appointments', HcwController.updateAppoitment)
  .delete('/appointments', HcwController.deleteAppoitment);

module.exports = router;
