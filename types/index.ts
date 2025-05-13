export interface ContestType {
  id: string;
  title: string;
  date: string;
  time: string;
  participants: number;
  entryFee: number;
  winningAmount: number;
  subjects: string[];
  topics: Record<string, string[]>;
  prizes: {
    rank: string;
    amount: number;
  }[];
  rules: string[];
}

export interface TestType {
  id: string;
  title: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'results';
  completedDate: string;
  rank: number;
  winningAmount: number;
}

export interface PracticeZoneType {
  id: string;
  title: string;
  type: 'mock' | 'quizzes' | 'papers';
}

export interface UserType {
  id: string;
  name: string;
  score: string;
}

export interface TransactionType {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: 'credit' | 'debit';
}

export interface QuestionType {
  id: string;
  contestId: string;
  text: string;
  options: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  correctAnswer: string;
  explanation: string;
}