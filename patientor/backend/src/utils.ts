import type { NewPatientEntry } from "./types.ts";

const parseNewPatientEntry = (object: unknown): NewPatientEntry => {
  // To be updated
  console.log(object);
  const newEntry: NewPatientEntry = {
    name: 'abc',
    dateOfBirth: '2026-11-1',
    ssn: 'abc',
    gender: 'other',
    occupation: 'unemployed',
  };

  return newEntry;
};

export default parseNewPatientEntry;
