import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import diagnoseService from "../services/diagnoses";
import { Diagnosis, Patient } from "../types";
import { Male, Female, Transgender } from '@mui/icons-material';

const PatientInfo = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    if (!id) return; 

    const fetchPatientInfo = async () => {
      const patient = await patientService.getById(id);
      setPatient(patient);
    };

    fetchPatientInfo();
  }, [id]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnoseService.getAll();
      setDiagnoses(diagnoses);
    };

    fetchDiagnoses();
  }, []);

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
      {patient.entries && <div>
        <h3>entries</h3>
        {patient.entries.map(entry => 
          <div key={entry.id}>
            <p>{entry.date} {entry.description}</p>
            <ul>
              {entry.diagnosisCodes && entry.diagnosisCodes.map(code => {
                const diagnosis = diagnoses.find(d => d.code === code);

                if (!diagnosis) {
                  return <li key={code}>{code}</li>;
                }

                return <li key={code}>{code} {diagnosis.name}</li>;
              })}
            </ul>
          </div>
        )}
      </div>}
    </div>
  );
};

export default PatientInfo;
