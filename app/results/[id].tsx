import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ChevronLeft, Trophy, Eye } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

import { colors } from '@/constants/colors';
import { contestData, testQuestions, dsaQuestions } from '@/data/mockData';

export default function ResultsScreen() {
  const { id, score } = useLocalSearchParams<{ id: string; score: string }>();
  const contest = contestData.find(c => c.id === id) || contestData[0];
  const questions = id === 'c4' ? dsaQuestions : testQuestions.filter(q => q.contestId === id);
  
  // Mock result data - in a real app, this would come from the backend
  const resultData = {
    rank: 3,
    totalParticipants: 256,
    score: parseInt(score || '0'),
    correctAnswers: parseInt(score || '0'),
    incorrectAnswers: questions.length - parseInt(score || '0'),
    timeSpent: id === 'c4' ? '25:30' : '2:15:30',
    prizeMoney: 500,
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.push('/(tabs)/my-tests')}
        >
          <ChevronLeft size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Result & Rewards</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.rankCard}>
          <Text style={styles.rankLabel}>Score</Text>
          <Text style={styles.rankValue}>{resultData.correctAnswers}/{questions.length}</Text>
          
          <Text style={styles.congratsText}>
            {resultData.correctAnswers >= questions.length * 0.7 ? 'Excellent!' : 
             resultData.correctAnswers >= questions.length * 0.5 ? 'Good Job!' : 
             'Keep Practicing!'}
          </Text>
          <Text style={styles.prizeText}>You have won ₹ {resultData.prizeMoney}</Text>
          
          <TouchableOpacity 
            style={styles.viewSolutionsButton}
            onPress={() => router.push(`/solutions/${id}`)}
          >
            <Eye size={16} color={colors.white} />
            <Text style={styles.viewSolutionsText}>VIEW SOLUTIONS</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Performance Summary</Text>
          </View>
          
          <View style={styles.performanceCard}>
            <View style={styles.performanceRow}>
              <Text style={styles.performanceLabel}>Correct Answers</Text>
              <Text style={[styles.performanceValue, styles.correctText]}>
                {resultData.correctAnswers}
              </Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.performanceRow}>
              <Text style={styles.performanceLabel}>Incorrect Answers</Text>
              <Text style={[styles.performanceValue, styles.incorrectText]}>
                {resultData.incorrectAnswers}
              </Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.performanceRow}>
              <Text style={styles.performanceLabel}>Accuracy</Text>
              <Text style={styles.performanceValue}>
                {Math.round((resultData.correctAnswers / questions.length) * 100)}%
              </Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.performanceRow}>
              <Text style={styles.performanceLabel}>Time Spent</Text>
              <Text style={styles.performanceValue}>{resultData.timeSpent}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Leaderboard</Text>
            <TouchableOpacity onPress={() => router.push('/leaderboard')}>
              <Text style={styles.viewAllText}>View ALL</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.leaderboardCard}>
            {[1, 2, 3, 4].map((rank) => (
              <View
                key={rank}
                style={[
                  styles.leaderboardRow,
                  rank === resultData.rank && styles.highlightedRow,
                  rank < 4 && styles.leaderboardRowBorder
                ]}
              >
                <View style={styles.rankInfo}>
                  <Text style={styles.rankNumber}>{rank}</Text>
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>
                      {rank === 1 ? 'Gaurav' : 
                       rank === 2 ? 'Mahesh' :
                       rank === 3 ? 'Anita' : 'Revi'}
                    </Text>
                  </View>
                </View>
                <View style={styles.scoreContainer}>
                  {rank === 1 && (
                    <Trophy size={16} color={colors.gold} style={styles.trophyIcon} />
                  )}
                  <Text style={styles.leaderboardScore}>
                    {rank === 1 ? '10/10' : 
                     rank === 2 ? '9/10' :
                     rank === 3 ? '8/10' : '7/10'}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.walletCard}>
            <View style={styles.walletHeader}>
              <Text style={styles.walletTitle}>Wallet</Text>
              <Text style={styles.walletBalance}>₹ {resultData.prizeMoney}</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.withdrawButton}
              onPress={() => router.push('/(tabs)/wallet')}
            >
              <Text style={styles.withdrawButtonText}>Withdrawal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  rankCard: {
    margin: 16,
    padding: 24,
    backgroundColor: colors.white,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  rankLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  rankValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 56,
    color: colors.primary,
    marginBottom: 16,
  },
  congratsText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  prizeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.success,
    marginBottom: 24,
  },
  viewSolutionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  viewSolutionsText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.white,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: colors.textPrimary,
  },
  viewAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.primary,
  },
  performanceCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  performanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  performanceLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: colors.textPrimary,
  },
  performanceValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: colors.textPrimary,
  },
  correctText: {
    color: colors.success,
  },
  incorrectText: {
    color: colors.error,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  leaderboardCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  leaderboardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  highlightedRow: {
    backgroundColor: colors.primaryLight,
  },
  leaderboardRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rankInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankNumber: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.textPrimary,
    width: 30,
  },
  userInfo: {
    marginLeft: 16,
  },
  userName: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: colors.textPrimary,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trophyIcon: {
    marginRight: 8,
  },
  leaderboardScore: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.textPrimary,
  },
  walletCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  walletTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: colors.textPrimary,
  },
  walletBalance: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: colors.success,
  },
  withdrawButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  withdrawButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.white,
  },
});