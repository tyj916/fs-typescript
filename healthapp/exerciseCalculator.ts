interface InputValues {
  dailyExerciseHours: number[],
  target: number,
}

const parseArgumentsForExercises = (args: string[]): InputValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target = Number(args[2]);
  const dailyExerciseHours = args.slice(3).map(hour => Number(hour));

  if (isNaN(target) || dailyExerciseHours.includes(NaN)) {
    throw new Error('Provided values were not numbers');
  } else {
    return {
      dailyExerciseHours,
      target,
    };
  }
};

interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export const calculateExercises = (dailyExerciseHours: number[], target: number): Result => {
  const periodLength = dailyExerciseHours.length;
  const totalHours = dailyExerciseHours.reduce((acc, dailyHour) => acc + dailyHour, 0);
  const average = totalHours / periodLength;
  const success = average > target;
  const rating = average - target > 1 ? 3
    : target - average > 1 ? 1 : 2;
  const ratingDescription = rating === 1 ? 'bad'
    : rating === 2 ? 'not too bad but could be better' : 'awesome';

  return {
    periodLength,
    trainingDays: dailyExerciseHours.filter(hour => hour !== 0).length,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { target, dailyExerciseHours } = parseArgumentsForExercises(process.argv);
    console.log(calculateExercises(dailyExerciseHours, target));
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ` ${error.message}`;
    }
    console.log(errorMessage);
  }
}