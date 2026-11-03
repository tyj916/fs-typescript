import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";

const PatientInfo = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

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

  console.log(patient);

  return (
    <div>
      <h2>{id}</h2>
    </div>
  );
};

export default PatientInfo;
