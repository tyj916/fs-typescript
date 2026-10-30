const calculateBmi = (height: number, weight: number) : string => {
  const bmi = height / weight;

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
}

console.log(calculateBmi(180, 74));
