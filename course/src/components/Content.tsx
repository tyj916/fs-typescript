import type { CoursePart } from "../types"

interface ContentProps {
  courseParts: CoursePart[]
}

const Content = ({ courseParts }: ContentProps) => {
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
            break;
        }
      })}
    </div>
  )
}

export default Content;
