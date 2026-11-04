import { z } from "zod";

export const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other',
} as const;
export type Gender = typeof Gender[keyof typeof Gender];

const DiagnosisCodeSchema = z.string();

export const DiagnosisSchema = z.object({
  code: DiagnosisCodeSchema,
  name: z.string(),
  latin: z.string().optional(),
});
export type Diagnosis = z.infer<typeof DiagnosisSchema>;

export const NewBaseEntrySchema = z.object({
  date: z.iso.date(),
  description: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(DiagnosisCodeSchema).optional(),
});
export type NewBaseEntry = z.infer<typeof NewBaseEntrySchema>;
export interface BaseEntry extends NewBaseEntry {
  id: string;
}

interface Discharge {
  date: string;
  criteria: string;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

export const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;
type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type NewEntry = UnionOmit<Entry, 'id'>;

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
});

export type NewPatient = z.infer<typeof NewPatientSchema>;
export interface Patient extends NewPatient {
  id: string,
  entries: Entry[]
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
