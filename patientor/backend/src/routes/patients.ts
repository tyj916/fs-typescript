import express, { type Response } from 'express';
import patientService from '../services/patientService.ts';
import type { NonSensitivePatientEntry } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientService.getNonSensitiveEntries());
});

export default router;
