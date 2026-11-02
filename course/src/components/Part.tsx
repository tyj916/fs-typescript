import type { CoursePartBase, CoursePartDescription, CoursePart } from "../types";

interface PartProps {
  part: CoursePart;
}

const PartBase = ({ name, exerciseCount }: CoursePartBase) => {
  return <p><strong>{name} {exerciseCount}</strong></p>
}

const PartWithDescription = ({ name, exerciseCount, description }: CoursePartDescription) => {
  return (<>
    <PartBase name={name} exerciseCount={exerciseCount} />
    <p>{description}</p>
  </>)
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
        <PartWithDescription 
          name={part.name} 
          exerciseCount={part.exerciseCount} 
          description={part.description} 
        />
      </div>
    case 'group':
      return <div key={part.name}>
        <PartBase name={part.name} exerciseCount={part.exerciseCount} />
        <p>{part.groupProjectCount}</p>
      </div>
    case 'background':
      return <div key={part.name}>
        <PartWithDescription 
          name={part.name} 
          exerciseCount={part.exerciseCount} 
          description={part.description} 
        />
        <p>{part.backgroundMaterial}</p>
      </div>
    default:
      return assertNever(part);
  }
};

export default Part;
