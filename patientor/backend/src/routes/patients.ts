import express, { type Request, type Response, type NextFunction } from 'express';
import { z } from 'zod';
import patientService from '../services/patientService.ts';
import { 
  NewEntrySchema,
  NewPatientSchema, 
  type NewEntry, 
  type NewPatient, 
  type NonSensitivePatient, 
  type Patient 
} from '../types.ts';

const router = express.Router();

router.get('/:id', (req, res: Response<Patient>) => {
  const { id } = req.params;
  const patient = patientService.getPatientById(id);
  res.json(patient);
});

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.json(patientService.getNonSensitiveEntries());
});

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.post('/:id/entries', newEntryParser, (req: Request<{ id: Patient['id']}, unknown, NewEntry>, res: Response) => {
  const addedEntry = patientService.addEntry(req.params.id, req.body);
  res.json(addedEntry);
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<NewPatient>) => {
  const addedPatient = patientService.addPatient(req.body);
  res.json(addedPatient);
});

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.use(errorMiddleware);

export default router;
