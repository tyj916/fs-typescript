import patients from "../../data/patients.ts";
import type { PatientEntry } from "../types.ts";

const getPatients = (): PatientEntry[] => {
  return patients;
};

export default {
  getPatients,
};
