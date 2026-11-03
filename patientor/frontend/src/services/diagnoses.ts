import axios from "axios";
import { Diagnosis } from "../types";

const baseUrl = 'http://localhost:3001/api/diagnoses';

const getAll = async () => {
  const response = await axios.get<Diagnosis[]>(baseUrl);
  return response.data;
};

export default {
  getAll,
};
