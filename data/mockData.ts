import { ContestType, TestType, PracticeZoneType, UserType, TransactionType, QuestionType } from '@/types';

export const contestData: ContestType[] = [
  {
    id: 'c4',
    title: 'DSA Programming MCQ Test',
    date: 'June 15',
    time: '10:00 AM',
    participants: 3500,
    entryFee: 11,
    winningAmount: 10000,
    subjects: ['Data Structures', 'Algorithms', 'Java Programming'],
    topics: {
      'Data Structures': [
        'Arrays and Strings',
        'Linked Lists',
        'Trees and Graphs',
        'Hash Tables'
      ],
      'Algorithms': [
        'Time and Space Complexity',
        'Sorting and Searching',
        'Dynamic Programming',
        'Graph Algorithms'
      ],
      'Java Programming': [
        'Core Java Concepts',
        'Collections Framework',
        'Exception Handling',
        'Multithreading'
      ]
    },
    prizes: [
      { rank: '1st Rank', amount: 1000 },
      { rank: '2nd-10 Ranks', amount: 500 },
      { rank: '11th-100 Ranks', amount: 100 }
    ],
    rules: [
      'The test duration is 30 minutes',
      'Each question carries 1 mark',
      'No negative marking for wrong answers',
      'You can review and change your answers before final submission',
      'Results will be declared immediately after submission'
    ]
  },
  {
    id: 'c1',
    title: 'IIT JEE Test 1',
    date: 'June 15',
    time: '10:00 AM',
    participants: 3500,
    entryFee: 11,
    winningAmount: 10000,
    subjects: ['Mathematics', 'Physics', 'Chemistry'],
    topics: {
      Mathematics: [
        'Algebra: Quadratic Equations, Complex Numbers',
        'Calculus: Limits, Differentiation, Integration',
        'Coordinate Geometry: Straight Lines, Circles',
        'Trigonometry: Trigonometric Ratios, Identities'
      ],
      Physics: [
        'Mechanics: Kinematics, Laws of Motion, Work-Energy',
        'Thermodynamics: Laws of Thermodynamics, Heat Transfer',
        'Electrostatics: Coulomb\'s Law, Electric Field',
        'Optics: Reflection, Refraction, Wave Optics'
      ],
      Chemistry: [
        'Physical Chemistry: Chemical Kinetics, Thermodynamics',
        'Organic Chemistry: Hydrocarbons, Functional Groups',
        'Inorganic Chemistry: Periodic Table, Chemical Bonding',
        'Solutions: Concentration, Properties of Solutions'
      ]
    },
    prizes: [
      { rank: '1st Rank', amount: 1000 },
      { rank: '2nd-10 Ranks', amount: 500 },
      { rank: '11th-100 Ranks', amount: 100 }
    ],
    rules: [
      'The test duration is 3 hours',
      'Each question carries 4 marks for a correct answer',
      'There is a negative marking of 1 mark for each incorrect answer',
      'No marks will be deducted for unattempted questions',
      'Use of calculators or any electronic devices is not allowed',
      'Rankings will be determined based on scores, with time taken as a tiebreaker'
    ]
  },
  {
    id: 'c2',
    title: 'NEET Test 1',
    date: 'June 20',
    time: '11:00 AM',
    participants: 4200,
    entryFee: 11,
    winningAmount: 10000,
    subjects: ['Biology', 'Physics', 'Chemistry'],
    topics: {
      Biology: [
        'Human Physiology: Digestive, Respiratory Systems',
        'Cell Biology: Cell Structure, Cell Division',
        'Genetics: Mendelian Genetics, Human Genetics',
        'Ecology: Ecosystem, Biodiversity'
      ],
      Physics: [
        'Mechanics: Kinematics, Laws of Motion',
        'Modern Physics: Atoms and Nuclei, Dual Nature of Matter',
        'Electrodynamics: Current Electricity, Magnetic Effects',
        'Optics: Ray Optics, Wave Optics'
      ],
      Chemistry: [
        'Physical Chemistry: Chemical Kinetics, Thermodynamics',
        'Organic Chemistry: Hydrocarbons, Functional Groups',
        'Inorganic Chemistry: Periodic Table, Chemical Bonding',
        'Biomolecules: Carbohydrates, Proteins, Nucleic Acids'
      ]
    },
    prizes: [
      { rank: '1st Rank', amount: 1000 },
      { rank: '2nd-10 Ranks', amount: 500 },
      { rank: '11th-100 Ranks', amount: 100 }
    ],
    rules: [
      'The test duration is 3 hours',
      'Each question carries 4 marks for a correct answer',
      'There is a negative marking of 1 mark for each incorrect answer',
      'No marks will be deducted for unattempted questions',
      'Rankings will be determined based on scores, with time taken as a tiebreaker'
    ]
  },
  {
    id: 'c3',
    title: 'UPSC Test 1',
    date: 'June 25',
    time: '09:00 AM',
    participants: 2800,
    entryFee: 11,
    winningAmount: 10000,
    subjects: ['General Studies', 'CSAT'],
    topics: {
      'General Studies': [
        'Indian History: Ancient, Medieval, Modern',
        'Geography: Physical, Human, Economic',
        'Polity: Constitution, Governance, International Relations',
        'Economy: Macroeconomics, Indian Economy, Budget'
      ],
      'CSAT': [
        'Comprehension: Reading Comprehension',
        'Interpersonal Skills: Communication',
        'Logical Reasoning: Critical Thinking',
        'Decision Making: Problem Solving'
      ]
    },
    prizes: [
      { rank: '1st Rank', amount: 1000 },
      { rank: '2nd-10 Ranks', amount: 500 },
      { rank: '11th-100 Ranks', amount: 100 }
    ],
    rules: [
      'The test duration is 3 hours',
      'Each question carries 2 marks for a correct answer',
      'There is no negative marking',
      'Questions will be of MCQ type',
      'Rankings will be determined based on scores, with time taken as a tiebreaker'
    ]
  }
];

export const myTestsData: TestType[] = [
  {
    id: 'c1',
    title: 'IIT JEE Test 1',
    date: 'June 15',
    time: '10:00 AM',
    status: 'upcoming',
    completedDate: '',
    rank: 0,
    winningAmount: 0
  },
  {
    id: 'c4',
    title: 'IIT JEE Previous Year',
    date: 'June 10',
    time: '10:00 AM',
    status: 'completed',
    completedDate: 'June 10, 2023',
    rank: 3,
    winningAmount: 500
  },
  {
    id: 'c5',
    title: 'NEET Mock Test',
    date: 'June 5',
    time: '11:00 AM',
    status: 'results',
    completedDate: 'June 5, 2023',
    rank: 12,
    winningAmount: 100
  }
];

export const leaderboardData: UserType[] = [
  { id: 'u1', name: 'Gaurav', score: '1,300' },
  { id: 'u2', name: 'Mahesh', score: '1,250' },
  { id: 'u3', name: 'Anita', score: '1,225' },
  { id: 'u4', name: 'Revi', score: '1,200' },
  { id: 'u5', name: 'Sanjay', score: '1,180' },
  { id: 'u6', name: 'Priya', score: '1,150' },
  { id: 'u7', name: 'Amit', score: '1,120' },
  { id: 'u8', name: 'Deepak', score: '1,100' },
  { id: 'u9', name: 'Kavita', score: '1,080' },
  { id: 'u10', name: 'Rajesh', score: '1,050' }
];

export const transactionHistory: TransactionType[] = [
  {
    id: 't1',
    title: 'Contest Winning - IIT JEE Test',
    amount: 500,
    date: 'June 10, 2023',
    type: 'credit'
  },
  {
    id: 't2',
    title: 'Contest Entry - NEET Test',
    amount: 11,
    date: 'June 5, 2023',
    type: 'debit'
  },
  {
    id: 't3',
    title: 'Wallet Recharge',
    amount: 200,
    date: 'June 1, 2023',
    type: 'credit'
  },
  {
    id: 't4',
    title: 'Contest Entry - IIT JEE Test',
    amount: 11,
    date: 'May 28, 2023',
    type: 'debit'
  },
  {
    id: 't5',
    title: 'Withdrawal to UPI',
    amount: 300,
    date: 'May 25, 2023',
    type: 'debit'
  }
];

export const testQuestions: QuestionType[] = [
  {
    id: 'q1',
    contestId: 'c1',
    text: 'A particle moves along the x-axis from x = 0 to x = 10 m with a constant acceleration of 2 m/s². If its final velocity is 10 m/s, what was its initial velocity?',
    options: {
      a: '6 m/s',
      b: '5 m/s',
      c: '4 m/s',
      d: '3 m/s'
    },
    correctAnswer: 'a',
    explanation: 'Using the equation v² = u² + 2as, where v is the final velocity, u is the initial velocity, a is the acceleration, and s is the displacement. Substituting v = 10 m/s, a = 2 m/s², and s = 10 m, we get 10² = u² + 2(2)(10), which gives u² = 100 - 40 = 60, so u = √60 ≈ 6 m/s.'
  },
  {
    id: 'q2',
    contestId: 'c1',
    text: 'The distance between two consecutive nodes in a stationary wave is:',
    options: {
      a: 'Equal to the wavelength',
      b: 'Equal to twice the wavelength',
      c: 'Equal to half the wavelength',
      d: 'Equal to one-fourth the wavelength'
    },
    correctAnswer: 'c',
    explanation: 'In a stationary wave, the distance between two consecutive nodes is equal to half the wavelength (λ/2). Nodes are points of zero displacement, and they are equally spaced along the wave.'
  },
  {
    id: 'q3',
    contestId: 'c1',
    text: 'Which of the following represents the correct order of increasing acidic strength?',
    options: {
      a: 'CH₃OH < H₂O < HCOOH < HCl',
      b: 'H₂O < CH₃OH < HCOOH < HCl',
      c: 'CH₃OH < HCOOH < H₂O < HCl',
      d: 'H₂O < HCOOH < CH₃OH < HCl'
    },
    correctAnswer: 'a',
    explanation: 'The acidic strength can be determined by the ease with which a compound can donate a proton (H⁺). The correct order of increasing acidic strength is: CH₃OH (methanol, pKa ≈ 15.5) < H₂O (water, pKa ≈ 14) < HCOOH (formic acid, pKa ≈ 3.8) < HCl (hydrochloric acid, pKa ≈ -7). Lower pKa values indicate stronger acids.'
  },
  {
    id: 'q4',
    contestId: 'c1',
    text: 'If f(x) = x² - 3x + 2, then the value of f(f(1)) is:',
    options: {
      a: '0',
      b: '1',
      c: '2',
      d: '4'
    },
    correctAnswer: 'c',
    explanation: 'First, calculate f(1) = 1² - 3(1) + 2 = 1 - 3 + 2 = 0. Then, calculate f(f(1)) = f(0) = 0² - 3(0) + 2 = 0 - 0 + 2 = 2.'
  },
  {
    id: 'q5',
    contestId: 'c1',
    text: 'In the circuit shown, the equivalent resistance between points A and B is:',
    options: {
      a: '2 Ω',
      b: '3 Ω',
      c: '4 Ω',
      d: '5 Ω'
    },
    correctAnswer: 'b',
    explanation: 'The circuit has a 6 Ω resistor in parallel with a series combination of 3 Ω and 3 Ω (which equals 6 Ω). Two 6 Ω resistors in parallel have an equivalent resistance of 6 Ω × 6 Ω / (6 Ω + 6 Ω) = 36 Ω / 12 Ω = 3 Ω.'
  }
];

export const dsaQuestions: QuestionType[] = [
  {
    id: 'dsa1',
    contestId: 'c4',
    text: 'What is the time complexity of QuickSort in the average case?',
    options: {
      a: 'O(n)',
      b: 'O(n log n)',
      c: 'O(n²)',
      d: 'O(log n)',
    },
    correctAnswer: 'b',
    explanation: 'QuickSort has an average time complexity of O(n log n). This is because the array is partitioned into two parts in each recursive step (log n) and each partition step takes O(n) time.'
  },
  {
    id: 'dsa2',
    contestId: 'c4',
    text: 'Which data structure would be most efficient for implementing a cache with a "Least Recently Used" (LRU) eviction policy?',
    options: {
      a: 'Array',
      b: 'Binary Search Tree',
      c: 'Hash Map + Doubly Linked List',
      d: 'Stack',
    },
    correctAnswer: 'c',
    explanation: 'A combination of HashMap and Doubly Linked List is ideal for LRU Cache. HashMap provides O(1) lookup, while Doubly Linked List allows O(1) removal and addition of elements, which is necessary for updating the "recently used" order.'
  },
  {
    id: 'dsa3',
    contestId: 'c4',
    text: 'What is the output of this Java code?\n\nString str = "Hello";\nstr.concat(" World");\nSystem.out.println(str);',
    options: {
      a: 'Hello World',
      b: 'Hello',
      c: 'World',
      d: 'Compilation Error',
    },
    correctAnswer: 'b',
    explanation: 'Strings in Java are immutable. The concat() method creates a new String object but doesn\'t modify the original string. Since we don\'t assign the result back to str, it remains unchanged.'
  },
  {
    id: 'dsa4',
    contestId: 'c4',
    text: 'Which of these sorting algorithms is stable by nature?',
    options: {
      a: 'QuickSort',
      b: 'HeapSort',
      c: 'MergeSort',
      d: 'Selection Sort',
    },
    correctAnswer: 'c',
    explanation: 'MergeSort is naturally stable, meaning it preserves the relative order of equal elements. This is because when merging two sorted sequences, elements from the left sequence are preferred when equal.'
  },
  {
    id: 'dsa5',
    contestId: 'c4',
    text: 'What will be the output of this Java code?\n\nArrayList<Integer> list = new ArrayList<>();\nlist.add(1);\nlist.add(2);\nlist.remove(1);\nSystem.out.println(list);',
    options: {
      a: '[1]',
      b: '[2]',
      c: '[1, 2]',
      d: 'IndexOutOfBoundsException',
    },
    correctAnswer: 'a',
    explanation: 'The remove(1) method removes the element at index 1, which is 2. After removal, only 1 remains in the list.'
  },
  {
    id: 'dsa6',
    contestId: 'c4',
    text: 'What is the space complexity of recursive Fibonacci implementation?',
    options: {
      a: 'O(1)',
      b: 'O(n)',
      c: 'O(log n)',
      d: 'O(2ⁿ)',
    },
    correctAnswer: 'b',
    explanation: 'The space complexity is O(n) due to the recursion stack. Each recursive call adds a new frame to the stack, and the maximum depth of recursion is n.'
  },
  {
    id: 'dsa7',
    contestId: 'c4',
    text: 'In Java, what happens when you try to insert an element into a full PriorityQueue?',
    options: {
      a: 'It throws an exception',
      b: 'It automatically doubles in size',
      c: 'It removes the lowest priority element',
      d: 'It ignores the new element',
    },
    correctAnswer: 'b',
    explanation: 'When a PriorityQueue is full, it automatically resizes by doubling its capacity, similar to ArrayList. This is handled internally by the Java implementation.'
  },
  {
    id: 'dsa8',
    contestId: 'c4',
    text: 'What is the time complexity of finding an element in a balanced Binary Search Tree?',
    options: {
      a: 'O(1)',
      b: 'O(log n)',
      c: 'O(n)',
      d: 'O(n²)',
    },
    correctAnswer: 'b',
    explanation: 'In a balanced BST, each comparison eliminates half of the remaining tree, resulting in O(log n) time complexity. This is why BSTs are efficient for searching operations.'
  },
  {
    id: 'dsa9',
    contestId: 'c4',
    text: 'What will this Java code print?\n\nHashMap<Integer, Integer> map = new HashMap<>();\nmap.put(1, 1);\nmap.put(1, 2);\nSystem.out.println(map.size());',
    options: {
      a: '0',
      b: '1',
      c: '2',
      d: 'Compilation Error',
    },
    correctAnswer: 'b',
    explanation: 'When you put a value with an existing key in a HashMap, it overwrites the old value. The size remains 1 because there is still only one key-value pair.'
  },
  {
    id: 'dsa10',
    contestId: 'c4',
    text: 'Which collection in Java implements the LIFO (Last In First Out) principle?',
    options: {
      a: 'ArrayList',
      b: 'LinkedList',
      c: 'Stack',
      d: 'Queue',
    },
    correctAnswer: 'c',
    explanation: 'Stack is a class that implements the LIFO principle. Elements are added to the top of the stack and removed from the top, following Last In First Out order.'
  }
];