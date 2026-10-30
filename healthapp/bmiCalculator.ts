interface BmiValues {
  height: number,
  weight: number,
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error('Provided values were not numbers');
  } else {
    return {
      height,
      weight,
    };
  }
};

export const calculateBmi = (height: number, weight: number) : string => {
  if (height <= 0) throw new Error('Height can\'t be lower than 0');
  if (weight <= 0) throw new Error('Weight can\'t be lower than 0');

  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters ^ 2);

  switch(true) {
    case (bmi < 16):
      return 'Underweight (Severe thinness)';
    case (bmi >= 16 && bmi < 17):
      return 'Underweight (Moderate thinness)';
    case (bmi >= 17 && bmi < 18.5):
      return 'Underweight (Mild thinness)';
    case (bmi >= 18.5 && bmi < 25):
      return 'Normal range';
    case (bmi >= 25 && bmi < 30):
      return 'Overweight (Pre-obese)';
    case (bmi >= 30 && bmi < 35):
      return 'Obsese (Class I)';
    case (bmi >= 35 && bmi < 40):
      return 'Obsese (Class II)';
    default:
      return 'Obsese (Class III)';
  }
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}
