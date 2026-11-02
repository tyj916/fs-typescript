interface CourseParts {
  name: string,
  exerciseCount: number,
}

interface ContentProps {
  courseParts: CourseParts[]
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map(course => (
        <p key={course.name}>{course.name} {course.exerciseCount}</p>
      ))}
    </div>
  )
}

export default Content;
