interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (dailyExerciseHours: number[], target: number): Result => {
  const periodLength = dailyExerciseHours.length;
  const totalHours = dailyExerciseHours.reduce((acc, dailyHour) => acc + dailyHour, 0);
  const average = totalHours / periodLength;
  const success = average > target;
  const rating = average - target > 1 ? 3
    : target - average > 1 ? 1 : 2;
  const ratingDescription = rating === 1 ? 'you need to exercise more'
    : rating === 2 ? 'not too bad but could be better' : 'awesome';

  return {
    periodLength,
    trainingDays: dailyExerciseHours.filter(hour => hour !== 0).length,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
