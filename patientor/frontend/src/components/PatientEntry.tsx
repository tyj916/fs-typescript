import { useEffect, useState } from "react";
import { Entry, Diagnosis, Discharge, SickLeave, HealthCheckRating } from "../types";
import diagnoseService from "../services/diagnoses";
import { Box, Paper } from "@mui/material";

const Hospital = ({ discharge }: { discharge: Discharge }) => {
  return (
    <div>
      <p>discharge: {discharge.date} - {discharge.criteria}</p>
    </div>
  );
};

const OccupationalHealthcare = ({ sickLeave }: { sickLeave: SickLeave | undefined }) => {
  if (!sickLeave) return null;

  return (
    <div>
      <p>Sick leave start date {sickLeave.startDate}</p>
      <p>Sick leave end date {sickLeave.endDate}</p>
    </div>
  );
};

const HealthCheck = ({ rating }: { rating: HealthCheckRating }) => {
  return (
    <div>
      <p>Health Check Rating: {rating}</p>
    </div>
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
      return <OccupationalHealthcare sickLeave={entry.sickLeave} />;
    case 'HealthCheck':
      return <HealthCheck rating={entry.healthCheckRating} />;
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
    <Box component={Paper} variant="outlined" sx={{ px: 1, my: 1 }}>
      <p><strong>
        {entry.date} {entry.type} {' '}
        {entry.type === 'OccupationalHealthcare' && entry.employerName}
      </strong></p>

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
    </Box>
  );
};

export default PatientEntry;
