import express, { type Request, type Response, type NextFunction } from 'express';
import { z } from 'zod';
import patientService from '../services/patientService.ts';
import { 
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
  res.send(patientService.getNonSensitiveEntries());
});

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const assertNever = (value: never): never => {
  throw new Error(`Unexpected value: ${value}`);
};

router.post('/:id/entries', (req: Request<unknown, unknown, NewEntry>, res: Response) => {
  const body = req.body;

  switch (body.type) {
    case "Hospital":
      console.log("Type Hospital");
      return res.json(body);
    case "OccupationalHealthcare":
      console.log("Type Occupational Healthcare");
      return res.json(body);
    case "HealthCheck":
      console.log("Type Health Check");
      return res.json(body);
    default:
      return assertNever(body);
  }
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<NewPatient>) => {
  const addedPatient = patientService.addPatient(req.body);
  res.json(addedPatient);
});

router.use(errorMiddleware);

export default router;
