import type { CoursePart } from "../types"
import Part from "./Part";

interface ContentProps {
  courseParts: CoursePart[]
}

const Content = ({ courseParts }: ContentProps) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  return (
    <div>
      {courseParts.map(part => {
        switch (part.kind) {
          case 'basic':
            return <div key={part.name}>
              <Part part={part} /> {part.description}
            </div>
          case 'group':
            return <div key={part.name}>
              <Part part={part} /> {part.groupProjectCount}
            </div>
          case 'background':
            return <div key={part.name}>
              <Part part={part} /> {part.description} {part.backgroundMaterial}
            </div>
          default:
            return assertNever(part);
        }
      })}
    </div>
  )
}

export default Content;
