import { v4 as uuid } from 'uuid';
import patients from "../../data/patients.ts";
import type { NewPatient, Patient, NonSensitivePatient, NewEntry, Entry } from "../types.ts";

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientById = (id: string): Patient => {
  const patient = patients.find(p => p.id === id);

  if (!patient) {
    throw new Error('Patient not found');
  }

  return patient;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (id: Patient['id'], entry: NewEntry): Entry => {
  const newEntry = {
    id: uuid(),
    diagnosisCodes: entry.diagnosisCodes ?? [],
    ...entry,
  };

  const patient = patients.find(patient => patient.id === id);
  
  if (!patient) {
    throw new Error('Patient not found');
  }
  
  patient.entries = patient.entries.concat(newEntry);

  return newEntry;
};

export default {
  getPatients,
  getPatientById,
  getNonSensitiveEntries,
  addPatient,
  addEntry,
};
