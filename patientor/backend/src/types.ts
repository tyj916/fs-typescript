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

const NewBaseEntrySchema = z.object({
  date: z.iso.date(),
  description: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(DiagnosisCodeSchema).optional(),
});

const DischargeSchema = z.object({
  date: z.iso.date(),
  criteria: z.string()
});

export const NewHospitalEntrySchema = NewBaseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: DischargeSchema,
});

const SickLeaveSchema = z.object({
  startDate: z.iso.date(),
  endDate: z.iso.date(),
});

export const NewOccupationalHealthcareEntrySchema = NewBaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: SickLeaveSchema.optional(),
});

export const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;
type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];

export const NewHealthCheckEntrySchema = NewBaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.union([
    z.literal(HealthCheckRating.Healthy),
    z.literal(HealthCheckRating.LowRisk),
    z.literal(HealthCheckRating.HighRisk),
    z.literal(HealthCheckRating.CriticalRisk),
  ])
});

export const NewEntrySchema = z.discriminatedUnion('type', [
  NewHospitalEntrySchema,
  NewOccupationalHealthcareEntrySchema,
  NewHealthCheckEntrySchema,
]);
export type NewEntry = z.infer<typeof NewEntrySchema>;

export type Entry = NewEntry & {
  id: string;
};

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
