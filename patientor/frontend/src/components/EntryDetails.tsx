import { useEffect, useState } from "react";
import { Entry, Diagnosis } from "../types";
import diagnoseService from "../services/diagnoses";

const EntryDetails = ({ entry }: { entry: Entry}) => {
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
  );
};

export default EntryDetails;
