import express, { type Response } from 'express';
import patientService from '../services/patientService.ts';
import type { PatientEntry } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res: Response<PatientEntry[]>) => {
  res.send(patientService.getPatients());
});

export default router;
