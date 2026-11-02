import type { CoursePart } from "../types"

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
            return <p key={part.name}>
              {part.name} {part.exerciseCount} {part.description}
            </p>
          case 'group':
            return <p key={part.name}>
              {part.name} {part.exerciseCount} {part.groupProjectCount}
            </p>
          case 'background':
            return <p key={part.name}>
              {part.name} {part.exerciseCount} {part.description} {part.backgroundMaterial}
            </p>
          default:
            return assertNever(part);
        }
      })}
    </div>
  )
}

export default Content;
