export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const mockTestQuestions: Question[] = [
  {
    id: 1,
    question: "What is the value of ∫(x² + 2x + 1)dx from 0 to 1?",
    options: ["1/3", "4/3", "5/3", "2/3"],
    correctAnswer: 2,
    explanation: "The integral evaluates to (x³/3 + x² + x) from 0 to 1, which gives 5/3."
  },
  {
    id: 2,
    question: "If a particle moves with velocity v = 2t + 3, what is its displacement after 2 seconds if it starts from rest?",
    options: ["7 units", "10 units", "14 units", "16 units"],
    correctAnswer: 1,
    explanation: "Displacement = ∫(2t + 3)dt from 0 to 2 = [t² + 3t]₀² = 10 units"
  },
  {
    id: 3,
    question: "What is the derivative of sin²x?",
    options: ["2sinx", "2sinxcosx", "sin2x", "2cosx"],
    correctAnswer: 2,
    explanation: "Using chain rule: d/dx(sin²x) = 2sinx * cosx = sin2x"
  },
  {
    id: 4,
    question: "If f(x) = e^x * sinx, what is f'(0)?",
    options: ["0", "1", "2", "e"],
    correctAnswer: 1,
    explanation: "f'(x) = e^x(sinx + cosx), so f'(0) = 1"
  },
  {
    id: 5,
    question: "What is the value of lim(x→0) (sinx/x)?",
    options: ["0", "1", "undefined", "∞"],
    correctAnswer: 1,
    explanation: "This is a standard limit that equals 1"
  },
  {
    id: 6,
    question: "If A = [1 2; 3 4], what is det(A)?",
    options: ["-2", "2", "5", "10"],
    correctAnswer: 0,
    explanation: "det(A) = (1*4) - (2*3) = 4 - 6 = -2"
  },
  {
    id: 7,
    question: "What is the solution to the differential equation dy/dx = y?",
    options: ["y = x + C", "y = Ce^x", "y = Cx", "y = e^x + C"],
    correctAnswer: 1,
    explanation: "The solution is y = Ce^x, where C is the constant of integration"
  },
  {
    id: 8,
    question: "What is the value of ∑(n=1 to 5) n²?",
    options: ["30", "55", "65", "70"],
    correctAnswer: 1,
    explanation: "1² + 2² + 3² + 4² + 5² = 1 + 4 + 9 + 16 + 25 = 55"
  },
  {
    id: 9,
    question: "If z = x + iy, what is |z|²?",
    options: ["x² + y²", "x² - y²", "2xy", "x² + y² + 2xy"],
    correctAnswer: 0,
    explanation: "|z|² = x² + y² for a complex number z = x + iy"
  },
  {
    id: 10,
    question: "What is the value of ∫(0 to π/2) sin²x dx?",
    options: ["π/4", "π/2", "1", "2"],
    correctAnswer: 0,
    explanation: "Using the identity sin²x = (1-cos2x)/2, the integral evaluates to π/4"
  }
]; 