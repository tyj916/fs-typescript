import type { CoursePart } from "../types";

interface PartProps {
  part: CoursePart;
}

const Part = ({ part }: PartProps) => {
  return (
    <div>
      <p><strong>{part.name} {part.exerciseCount}</strong></p>
    </div>
  )
};

export default Part;
