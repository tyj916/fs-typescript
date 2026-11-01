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

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }
  return date;
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
