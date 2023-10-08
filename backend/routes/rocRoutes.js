/* eslint-disable jest/require-hook */
const router = require('express').Router();
const RocController = require('../controllers/RocController');

router.get('/', RocController.home)
  .get('/triage', RocController.getVitals)
  .get('/labs', RocController.getLabs)
  .get('/appointments', RocController.getAppointments)
  .get('/pharmacy', RocController.getPharmacy);

module.exports = router;
