import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ChevronLeft, ArrowLeft, ArrowRight } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

import { colors } from '@/constants/colors';
import { formatTime } from '@/utils/formatTime';
import { contestData, dsaQuestions } from '@/data/mockData';
import { sscQuestionPool, iitQuestionPool, neetQuestionPool } from '@/data/contestQuestions';
import { QuestionType } from '@/types';

const transformQuestions = (pool: any[]): QuestionType[] => {
  return pool.map((q, index) => ({
    id: `q${index}`,
    contestId: '',
    text: q.question,
    options: {
      a: q.options[0],
      b: q.options[1],
      c: q.options[2],
      d: q.options[3]
    },
    correctAnswer: String.fromCharCode(97 + q.correctAnswer), // Convert 0-3 to a-d
    explanation: ''
  }));
};

export default function TestScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const contest = contestData.find(c => c.id === id) || contestData[0];
  
  // Select questions based on contest type
  let questions: QuestionType[];
  if (id === 'c4') {
    questions = dsaQuestions;
  } else if (id.startsWith('ssc')) {
    questions = transformQuestions(sscQuestionPool);
  } else if (id.startsWith('iit')) {
    questions = transformQuestions(iitQuestionPool);
  } else if (id.startsWith('neet')) {
    questions = transformQuestions(neetQuestionPool);
  } else {
    questions = [];
  }
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [remainingTime, setRemainingTime] = useState(id === 'c4' ? 1800 : 10800); // 30 mins for DSA, 3 hours for others
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerSelect = (questionId: string, optionKey: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionKey
    }));
  };

  const handleNavigateQuestion = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (direction === 'next' && currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
    
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const handleSubmitTest = () => {
    const score = calculateScore();
    Alert.alert(
      "Submit Test",
      `You have answered ${Object.keys(selectedAnswers).length} out of ${questions.length} questions. Are you sure you want to submit?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Submit",
          onPress: () => {
            router.push({
              pathname: `/results/${id}`,
              params: { score: score.toString() }
            });
          }
        }
      ]
    );
  };

  if (!contest || questions.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Test not available</Text>
      </SafeAreaView>
    );
  }

  const question = questions[currentQuestion];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => {
            Alert.alert(
              "Exit Test",
              "Your progress will be lost. Are you sure you want to exit?",
              [
                { text: "Cancel", style: "cancel" },
                { text: "Exit", onPress: () => router.back() }
              ]
            );
          }}
        >
          <ChevronLeft size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{contest.title}</Text>
        <View style={styles.placeholder} />
      </View>
      
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{formatTime(remainingTime)}</Text>
      </View>
      
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.questionContainer}>
          <Text style={styles.questionNumber}>Question {currentQuestion + 1} of {questions.length}</Text>
          <Text style={styles.questionText}>{question.text}</Text>
          
          <View style={styles.optionsContainer}>
            {Object.entries(question.options).map(([key, value]) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.optionItem,
                  selectedAnswers[question.id] === key && styles.selectedOption
                ]}
                onPress={() => handleAnswerSelect(question.id, key)}
              >
                <Text style={styles.optionKey}>{key.toUpperCase()}</Text>
                <Text 
                  style={[
                    styles.optionText,
                    selectedAnswers[question.id] === key && styles.selectedOptionText
                  ]}
                >
                  {value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <View style={styles.navigationButtons}>
          <TouchableOpacity
            style={[styles.navButton, currentQuestion === 0 && styles.disabledButton]}
            onPress={() => handleNavigateQuestion('prev')}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft size={20} color={currentQuestion === 0 ? colors.border : colors.textPrimary} />
            <Text 
              style={[
                styles.navButtonText,
                currentQuestion === 0 && styles.disabledButtonText
              ]}
            >
              Previous
            </Text>
          </TouchableOpacity>
          
          {currentQuestion === questions.length - 1 ? (
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmitTest}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.navButton, styles.nextButton]}
              onPress={() => handleNavigateQuestion('next')}
            >
              <Text style={[styles.navButtonText, styles.nextButtonText]}>Next</Text>
              <ArrowRight size={20} color={colors.white} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.white,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: colors.textPrimary,
  },
  placeholder: {
    width: 40,
  },
  timerContainer: {
    backgroundColor: colors.white,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  timerText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  questionContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
  },
  questionNumber: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  questionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 24,
  },
  optionsContainer: {
    gap: 16,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
  },
  selectedOption: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  optionKey: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: colors.primary,
    marginRight: 16,
  },
  optionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: colors.textPrimary,
    flex: 1,
  },
  selectedOptionText: {
    fontFamily: 'Inter-Medium',
  },
  footer: {
    backgroundColor: colors.white,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    flex: 1,
  },
  disabledButton: {
    borderColor: colors.border,
    backgroundColor: colors.lightBackground,
  },
  navButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.textPrimary,
    marginHorizontal: 8,
  },
  disabledButtonText: {
    color: colors.textSecondary,
  },
  nextButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  nextButtonText: {
    color: colors.white,
  },
  submitButton: {
    backgroundColor: colors.success,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  submitButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: colors.white,
  },
});