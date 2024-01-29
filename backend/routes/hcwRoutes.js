/* eslint-disable jest/require-hook */
import { Router } from 'express';
import { getStats, getStatus, } from '../controllers/AppController.js';
// import { home, getNoOfUser, registerRoc, updateRocRecord, newVitals, updateVitals, deleteVitals, getRocRecord, newLabOrder, updateLabOrder, deleteLabOrder, newPharmacyOrder, updatePharmacyOrder, deletePharmacyOrder, newAppointment, updateAppointment, deleteAppointment } from '../controllers/HcwController.js';
import { home, getNoOfUser, registerRoc, updateRocRecord, newVitals, updateVitals, deleteVitals, getRocRecord } from '../controllers/HcwController.js';

const hcwRoutes = Router();

hcwRoutes.get('/', home)
  .get('/status', getStatus)
  .get('/stats', getStats)
  .get('/users', getNoOfUser)
  .post('/search', getRocRecord)
  .post('/registration', registerRoc)
  .put('/registration', updateRocRecord);

hcwRoutes.post('/triage', newVitals)
  .put('/triage', updateVitals)
  .delete('/triage', deleteVitals);

// hcwRoutes.post('/lab', newLabOrder)
//   .put('/lab', updateLabOrder)
//   .delete('/lab', deleteLabOrder);

// hcwRoutes.post('/pharmacy', newPharmacyOrder)
//   .put('/pharmacy', updatePharmacyOrder)
//   .delete('/pharmacy', deletePharmacyOrder);

// hcwRoutes.post('/appointments', newAppointment)
//   .put('/appointments', updateAppointment)
//   .delete('/appointments', deleteAppointment);

export { hcwRoutes };