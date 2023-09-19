export function gradeCalculation(gpa: number) {
  // Grading system
  if (gpa === 5.0) {
    return "A+";
  } else if (gpa >= 4.0) {
    return "A";
  } else if (gpa >= 3.5) {
    return "A-";
  } else if (gpa >= 3.0) {
    return "B";
  } else if (gpa >= 2.0) {
    return "C";
  } else if (gpa >= 1.0) {
    return "D";
  } else {
    return "F";
  }
}

export function calculateGradeAndPoint(
  obtainedMark: number,
  totalMark: number
) {
  const parcentage = (obtainedMark / totalMark) * 100;
  if (parcentage >= 80) {
    return { grade: "A+", point: 5.0 };
  } else if (parcentage >= 70) {
    return { grade: "A", point: 4.0 };
  } else if (parcentage >= 60) {
    return { grade: "A-", point: 3.5 };
  } else if (parcentage >= 50) {
    return { grade: "B", point: 3.0 };
  } else if (parcentage >= 40) {
    return { grade: "C", point: 2.0 };
  } else if (parcentage >= 33) {
    return { grade: "D", point: 1.0 };
  } else if (parcentage >= 0) {
    return { grade: "F", point: 0.0 };
  } else {
    return { grade: "Invalid", point: 0.0 };
  }
}
