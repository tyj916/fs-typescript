import type { CoursePart } from "../types"

interface ContentProps {
  courseParts: CoursePart[]
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map(part => (
        <p key={part.name}>{part.name} {part.exerciseCount}</p>
      ))}
    </div>
  )
}

export default Content;
