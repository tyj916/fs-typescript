import { useEffect, useState } from "react";
import { Entry, Diagnosis, Discharge } from "../types";
import diagnoseService from "../services/diagnoses";

const Hospital = ({ discharge }: { discharge: Discharge }) => {
  return (
    <div>
      <p>discharge: {discharge.date} - {discharge.criteria}</p>
    </div>
  );
};

const OccupationalHealthcare = ({ entry }: { entry: Entry }) => {
  console.log(entry);
  return (
    <div></div>
  );
};

const HealthCheck = ({ entry }: { entry: Entry }) => {
  console.log(entry);
  return (
    <div></div>
  );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (entry.type) {
    case 'Hospital':
      return <Hospital discharge={entry.discharge} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} />;
    case 'HealthCheck':
      return <HealthCheck entry={entry} />;
    default:
      assertNever(entry);
  }
};

const PatientEntry = ({ entry }: { entry: Entry}) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnoseService.getAll();
      setDiagnoses(diagnoses);
    };

    if (entry.diagnosisCodes) {
      fetchDiagnoses();
    }
  }, [entry]);

  return (
    <div>
      <p>
        {entry.date} {entry.type} 
        {entry.type === 'OccupationalHealthcare' && entry.employerName}
      </p>

      <p><em>{entry.description}</em></p>
      
      <ul>
        {entry.diagnosisCodes && entry.diagnosisCodes.map(code => {
          const diagnosis = diagnoses.find(d => d.code === code);

          if (!diagnosis) {
            return <li key={code}>{code}</li>;
          }

          return <li key={code}>{code} {diagnosis.name}</li>;
        })}
      </ul>

      <EntryDetails entry={entry} />

      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

export default PatientEntry;
