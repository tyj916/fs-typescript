import type { CoursePartBase, CoursePart } from "../types";

interface PartProps {
  part: CoursePart;
}

const PartBase = ({ name, exerciseCount }: CoursePartBase) => {
  return <p><strong>{name} {exerciseCount}</strong></p>
}

const Part = ({ part }: PartProps) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (part.kind) {
    case 'basic':
      return <div key={part.name}>
        <PartBase name={part.name} exerciseCount={part.exerciseCount} />
        <p>{part.description}</p>
      </div>
    case 'group':
      return <div key={part.name}>
        <PartBase name={part.name} exerciseCount={part.exerciseCount} />
        <p>{part.groupProjectCount}</p>
      </div>
    case 'background':
      return <div key={part.name}>
        <PartBase name={part.name} exerciseCount={part.exerciseCount} />
        <p>{part.description}</p> 
        <p>{part.backgroundMaterial}</p>
      </div>
    default:
      return assertNever(part);
  }
};

export default Part;
