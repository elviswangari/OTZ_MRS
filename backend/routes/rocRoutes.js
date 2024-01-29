/* eslint-disable jest/require-hook */
import { Router } from 'express';
import { home, getVitals, getLabs, getAppointments, getPharmacy, getTest } from '../controllers/RocController.js';
const rocRoutes = Router();

rocRoutes.get('/', home)
  .get('/triage', getVitals)
  .get('/labs', getLabs)
  .get('/appointments', getAppointments)
  .get('/pharmacy', getPharmacy)
  .get('/test', getTest);

export { rocRoutes };