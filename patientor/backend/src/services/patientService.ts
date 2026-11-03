import { v4 as uuid } from 'uuid';
import patients from "../../data/patients.ts";
import type { NewPatientEntry, PatientEntry, NonSensitivePatientEntry } from "../types.ts";

const getPatients = (): PatientEntry[] => {
  return patients;
};

const getPatientById = (id: string): PatientEntry => {
  const patient = patients.find(p => p.id === id);

  if (!patient) {
    throw new Error('Patient not found');
  }

  return patient;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatientEntry): PatientEntry => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPatientById,
  getNonSensitiveEntries,
  addPatient,
};
