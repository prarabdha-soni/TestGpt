import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Clock, CheckCircle2, XCircle } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';

// Sample questions - you can replace these with your actual questions
const quizQuestions = [
  {
    question: "What is the derivative of sin(x)?",
    options: ["cos(x)", "-sin(x)", "-cos(x)", "tan(x)"],
    correctAnswer: 0
  },
  {
    question: "What is the integral of x²?",
    options: ["x³", "x³/2", "x³/3", "2x³"],
    correctAnswer: 2
  },
  {
    question: "What is the limit of sin(x)/x as x approaches 0?",
    options: ["0", "1", "undefined", "∞"],
    correctAnswer: 1
  },
  {
    question: "What is the determinant of a 2x2 matrix [[a,b],[c,d]]?",
    options: ["ad-bc", "ab-cd", "ac-bd", "ad+bc"],
    correctAnswer: 0
  },
  {
    question: "What is the probability of rolling a 6 on a fair die?",
    options: ["1/6", "1/3", "1/2", "1/4"],
    correctAnswer: 0
  }
];

const { width } = Dimensions.get('window');

export default function QuizScreen() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(quizQuestions.length).fill(-1));
  const [timeLeft, setTimeLeft] = useState(60 * 10); // 10 minutes
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  const slideAnim = React.useRef(new Animated.Value(0)).current;
  const fadeAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
    
    // Show feedback animation
    setIsCorrect(optionIndex === quizQuestions[currentQuestion].correctAnswer);
    setShowFeedback(true);
    
    setTimeout(() => {
      setShowFeedback(false);
    }, 1000);
  };

  const handleSubmit = () => {
    const score = answers.reduce((acc, answer, index) => {
      return acc + (answer === quizQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
    
    router.push({
      pathname: '/results',
      params: {
        score,
        total: quizQuestions.length,
        answers: JSON.stringify(answers),
        questions: JSON.stringify(quizQuestions)
      }
    });
  };

  const handleNext = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentQuestion(prev => Math.min(quizQuestions.length - 1, prev + 1));
      slideAnim.setValue(width);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handlePrevious = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: width,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentQuestion(prev => Math.max(0, prev - 1));
      slideAnim.setValue(-width);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quiz</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.timerContainer}>
        <View style={styles.timerWrapper}>
          <Clock size={20} color={colors.error} style={styles.timerIcon} />
          <Text style={styles.timer}>Time Left: {formatTime(timeLeft)}</Text>
        </View>
        <View style={styles.progressContainer}>
          {quizQuestions.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index === currentQuestion && styles.progressDotActive,
                index < currentQuestion && styles.progressDotCompleted
              ]}
            />
          ))}
        </View>
      </View>

      <Animated.View 
        style={[
          styles.questionContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateX: slideAnim }]
          }
        ]}
      >
        <Text style={styles.questionNumber}>
          Question {currentQuestion + 1} of {quizQuestions.length}
        </Text>
        <Text style={styles.question}>
          {quizQuestions[currentQuestion].question}
        </Text>

        <View style={styles.optionsContainer}>
          {quizQuestions[currentQuestion].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                answers[currentQuestion] === index && styles.selectedOption
              ]}
              onPress={() => handleAnswer(index)}
            >
              <Text style={[
                styles.optionText,
                answers[currentQuestion] === index && styles.selectedOptionText
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      {showFeedback && (
        <Animated.View 
          style={[
            styles.feedbackContainer,
            {
              backgroundColor: isCorrect ? colors.successLight : colors.errorLight,
            }
          ]}
        >
          {isCorrect ? (
            <CheckCircle2 size={24} color={colors.success} />
          ) : (
            <XCircle size={24} color={colors.error} />
          )}
          <Text style={[
            styles.feedbackText,
            { color: isCorrect ? colors.success : colors.error }
          ]}>
            {isCorrect ? 'Correct!' : 'Incorrect'}
          </Text>
        </Animated.View>
      )}

      <View style={styles.navigation}>
        <TouchableOpacity
          style={[styles.navButton, currentQuestion === 0 && styles.disabledButton]}
          onPress={handlePrevious}
          disabled={currentQuestion === 0}
        >
          <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>

        {currentQuestion === quizQuestions.length - 1 ? (
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <LinearGradient
              colors={[colors.success, colors.successDark]}
              style={styles.submitButtonGradient}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.navButton}
            onPress={handleNext}
          >
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              style={styles.navButtonGradient}
            >
              <Text style={styles.navButtonText}>Next</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
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
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.background,
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  timerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  timerIcon: {
    marginRight: 8,
  },
  timer: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.error,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
    marginHorizontal: 4,
  },
  progressDotActive: {
    backgroundColor: colors.primary,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  progressDotCompleted: {
    backgroundColor: colors.success,
  },
  questionContainer: {
    flex: 1,
    padding: 16,
  },
  questionNumber: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  question: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: colors.textPrimary,
    marginBottom: 24,
    lineHeight: 28,
  },
  optionsContainer: {
    marginTop: 10,
  },
  option: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
    backgroundColor: colors.white,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedOption: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  optionText: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  selectedOptionText: {
    color: colors.primary,
    fontFamily: 'Poppins-SemiBold',
  },
  feedbackContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -100 }, { translateY: -25 }],
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  feedbackText: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  navButton: {
    borderRadius: 12,
    overflow: 'hidden',
    minWidth: 120,
  },
  navButtonGradient: {
    padding: 16,
    alignItems: 'center',
  },
  navButtonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  disabledButton: {
    opacity: 0.5,
  },
  submitButton: {
    borderRadius: 12,
    overflow: 'hidden',
    minWidth: 120,
  },
  submitButtonGradient: {
    padding: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
}); 