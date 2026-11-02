interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: 'basic'
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: 'background'
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group'
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;
