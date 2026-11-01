export interface DiagnoseEntry {
  code: string,
  name: string,
  latin?: string,
}

export const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other',
} as const;
export type Gender = typeof Gender[keyof typeof Gender];

export interface PatientEntry {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;
export type NewPatientEntry = Omit<PatientEntry, 'id'>;
