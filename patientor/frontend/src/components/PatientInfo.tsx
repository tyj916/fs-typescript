import { useParams } from "react-router-dom";

const PatientInfo = () => {
  const { id } = useParams();

  return (
    <div>
      <p>{id}</p>
    </div>
  );
};

export default PatientInfo;
