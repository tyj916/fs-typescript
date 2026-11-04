import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { EntryWithoutId, Patient } from "../types";
import { Male, Female, Transgender } from '@mui/icons-material';
import PatientEntry from "./PatientEntry";
import EntryForm from "./EntryForm";
import { Button } from "@mui/material";
import axios from "axios";

const PatientInfo = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return; 

    const fetchPatientInfo = async () => {
      const patient = await patientService.getById(id);
      setPatient(patient);
    };

    fetchPatientInfo();
  }, [id]);

  if (!patient) {
    return <p>Patient not found</p>;
  }

  const createEntry = async (object: EntryWithoutId) => {
    try {
      const addedEntry = await patientService.createEntry(patient.id, object);
      console.log(addedEntry);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <div>
      <h2>
        {patient.name} 
        {patient.gender === 'male' ? <Male /> 
          : patient.gender === 'female' ? <Female />
          : <Transgender /> }  
      </h2>
      {patient.ssn && <p>ssn: {patient.ssn}</p>}
      <p>occupation: {patient.occupation}</p>
      {patient.dateOfBirth && <p>date of birth: {patient.dateOfBirth}</p>}

      {showEntryForm && <EntryForm 
        error={error} 
        createEntry={createEntry} 
        hideForm={() => setShowEntryForm(false)} 
      />}

      {!showEntryForm && <Button variant="outlined" onClick={() => setShowEntryForm(true)}>
        create new entry
      </Button>}
      
      {patient.entries && <div>
        <h3>entries</h3>
        {patient.entries.map(entry => 
          <PatientEntry key={entry.id} entry={entry} />
        )}
      </div>}
    </div>
  );
};

export default PatientInfo;
