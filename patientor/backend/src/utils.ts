import type { NewPatientEntry } from "./types.ts";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

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
