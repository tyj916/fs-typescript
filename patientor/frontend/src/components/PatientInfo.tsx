import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { Patient } from "../types";
import { Male, Female, Transgender } from '@mui/icons-material';
import PatientEntry from "./PatientEntry";
import EntryForm from "./EntryForm";
import { Button } from "@mui/material";

const PatientInfo = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [showEntryForm, setShowEntryForm] = useState(false);

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

      {showEntryForm ? <EntryForm hideForm={() => setShowEntryForm(false)} /> 
        : <Button variant="outlined" onClick={() => setShowEntryForm(true)}>
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
