import { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ChevronLeft, ArrowLeft, ArrowRight, Check, X } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

import { colors } from '@/constants/colors';
import { contestData, testQuestions } from '@/data/mockData';

export default function SolutionsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const contest = contestData.find(c => c.id === id) || contestData[0];
  const questions = testQuestions.filter(q => q.contestId === id);
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  // Mock user answers - in a real app, this would come from the backend
  const userAnswers: Record<string, string> = {
    'q1': 'a',
    'q2': 'c',
    'q3': 'b',
    'q4': 'd',
    'q5': 'b',
  };

  if (!contest || questions.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Solutions not available</Text>
      </SafeAreaView>
    );
  }

  const question = questions[currentQuestion];
  const userAnswer = userAnswers[question.id];
  const isCorrect = userAnswer === question.correctAnswer;

  const handleNavigateQuestion = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (direction === 'next' && currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
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
        <Text style={styles.headerTitle}>Solutions</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionNumber}>Question {currentQuestion + 1} of {questions.length}</Text>
          <Text style={styles.questionText}>{question.text}</Text>
          
          <View style={styles.optionsContainer}>
            {Object.entries(question.options).map(([key, value]) => {
              const isUserSelected = userAnswer === key;
              const isCorrectAnswer = question.correctAnswer === key;
              
              return (
                <View
                  key={key}
                  style={[
                    styles.optionItem,
                    isUserSelected && !isCorrectAnswer && styles.incorrectOption,
                    isCorrectAnswer && styles.correctOption,
                  ]}
                >
                  <Text style={styles.optionKey}>{key.toUpperCase()}</Text>
                  <Text style={styles.optionText}>{value}</Text>
                  
                  {isUserSelected && !isCorrectAnswer && (
                    <View style={styles.resultIcon}>
                      <X size={16} color={colors.white} />
                    </View>
                  )}
                  
                  {isCorrectAnswer && (
                    <View style={[styles.resultIcon, styles.correctIcon]}>
                      <Check size={16} color={colors.white} />
                    </View>
                  )}
                </View>
              );
            })}
          </View>
          
          <View style={styles.solutionContainer}>
            <Text style={styles.solutionTitle}>Solution Explanation</Text>
            <Text style={styles.solutionText}>{question.explanation}</Text>
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
          
          <TouchableOpacity
            style={[
              styles.navButton, 
              styles.nextButton,
              currentQuestion === questions.length - 1 && styles.disabledButton
            ]}
            onPress={() => handleNavigateQuestion('next')}
            disabled={currentQuestion === questions.length - 1}
          >
            <Text 
              style={[
                styles.navButtonText, 
                styles.nextButtonText,
                currentQuestion === questions.length - 1 && styles.disabledButtonText
              ]}
            >
              Next
            </Text>
            <ArrowRight 
              size={20} 
              color={currentQuestion === questions.length - 1 ? colors.border : colors.white} 
            />
          </TouchableOpacity>
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
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
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
  scrollView: {
    flex: 1,
  },
  questionContainer: {
    backgroundColor: colors.white,
    margin: 16,
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
    marginBottom: 24,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    position: 'relative',
  },
  correctOption: {
    borderColor: colors.success,
    backgroundColor: colors.successLight,
  },
  incorrectOption: {
    borderColor: colors.error,
    backgroundColor: colors.errorLight,
  },
  optionKey: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: colors.primary,
    marginRight: 16,
    width: 20,
  },
  optionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: colors.textPrimary,
    flex: 1,
    paddingRight: 24,
  },
  resultIcon: {
    position: 'absolute',
    right: 16,
    backgroundColor: colors.error,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  correctIcon: {
    backgroundColor: colors.success,
  },
  solutionContainer: {
    backgroundColor: colors.lightBackground,
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  solutionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  solutionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 20,
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
});