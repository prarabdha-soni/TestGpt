import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Check, X } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '@/constants/colors';
import type { Question } from '@/data/mockTestQuestions';

export default function Results() {
  const router = useRouter();
  const { score, total, answers: answersStr, questions: questionsStr } = useLocalSearchParams();
  
  const answers = JSON.parse(answersStr as string) as number[];
  const questions = JSON.parse(questionsStr as string) as Question[];
  const percentage = Math.round((Number(score) / Number(total)) * 100);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.push('/')}
        >
          <ChevronLeft size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Test Results</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreTitle}>Your Score</Text>
          <Text style={styles.score}>{score}/{total}</Text>
          <Text style={styles.percentage}>{percentage}%</Text>
        </View>

        <View style={styles.reviewContainer}>
          <Text style={styles.reviewTitle}>Question Review</Text>
          {questions.map((question, index) => (
            <View key={index} style={styles.questionContainer}>
              <Text style={styles.questionNumber}>Question {index + 1}</Text>
              <Text style={styles.questionText}>{question.question}</Text>
              
              <View style={styles.optionsContainer}>
                {question.options.map((option, optionIndex) => (
                  <View
                    key={optionIndex}
                    style={[
                      styles.option,
                      answers[index] === optionIndex && styles.selectedOption,
                      question.correctAnswer === optionIndex && styles.correctOption
                    ]}
                  >
                    <Text style={[
                      styles.optionText,
                      answers[index] === optionIndex && styles.selectedOptionText,
                      question.correctAnswer === optionIndex && styles.correctOptionText
                    ]}>
                      {option}
                    </Text>
                    {answers[index] === optionIndex && (
                      answers[index] === question.correctAnswer ? (
                        <Check size={20} color={colors.success} />
                      ) : (
                        <X size={20} color={colors.error} />
                      )
                    )}
                  </View>
                ))}
              </View>

              <View style={styles.explanationContainer}>
                <Text style={styles.explanationTitle}>Explanation:</Text>
                <Text style={styles.explanationText}>{question.explanation}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => router.push('/')}
        >
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>
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
  content: {
    flex: 1,
  },
  scoreContainer: {
    padding: 24,
    backgroundColor: colors.white,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  scoreTitle: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  score: {
    fontSize: 36,
    fontFamily: 'Poppins-Bold',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  percentage: {
    fontSize: 24,
    color: colors.primary,
    fontFamily: 'Poppins-SemiBold',
  },
  reviewContainer: {
    padding: 16,
  },
  reviewTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  questionContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  questionNumber: {
    fontSize: 16,
    color: colors.primary,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  optionsContainer: {
    marginBottom: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 8,
    backgroundColor: colors.white,
  },
  selectedOption: {
    borderColor: colors.error,
  },
  correctOption: {
    borderColor: colors.success,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
  },
  selectedOptionText: {
    color: colors.error,
  },
  correctOptionText: {
    color: colors.success,
  },
  explanationContainer: {
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 8,
  },
  explanationTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  explanationText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  footer: {
    padding: 16,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  homeButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  homeButtonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
}); 