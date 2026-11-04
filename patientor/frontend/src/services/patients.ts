import axios from "axios";
import { Entry, EntryWithoutId, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getById = async (id: string) => {
  const response = await axios.get(`${apiBaseUrl}/patients/${id}`);
  return response.data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const createEntry = async (patientId: Patient['id'], object: EntryWithoutId) => {
  const response = await axios.post<Entry>(`${apiBaseUrl}/patients/${patientId}/entries`, object);
  return response.data;
};

export default {
  getAll,
  getById, 
  create,
  createEntry,
};

