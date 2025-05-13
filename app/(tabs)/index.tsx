import { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Award, ChevronRight, Trophy, Users } from 'lucide-react-native';
import Header from '@/components/Header';
import { colors } from '@/constants/colors';
import { leaderboardData } from '@/data/mockData';
import { sscContests, iitContests, neetContests } from '@/data/contestQuestions';

const categories = [
  { id: 'iit', name: 'IIT JEE', icon: Trophy },
  { id: 'neet', name: 'NEET', icon: Award },
  { id: 'ssc', name: 'SSC', icon: Award },
];

export default function HomeScreen() {
  const [balance, setBalance] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('iit');

  let filteredContests: any[] = [];
  if (selectedCategory === 'ssc') filteredContests = sscContests;
  else if (selectedCategory === 'iit') filteredContests = iitContests;
  else if (selectedCategory === 'neet') filteredContests = neetContests;

  return (
    <SafeAreaView style={styles.container}>
      <Header title="TestGPT" balance={balance} />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.selectedCategory
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Icon 
                  size={20} 
                  color={selectedCategory === category.id ? colors.white : colors.primary} 
                />
                <Text 
                  style={[
                    styles.categoryText,
                    selectedCategory === category.id && styles.selectedCategoryText
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Active Contests */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Active Contests</Text>
          </View>
          <View style={styles.contestsContainer}>
            {filteredContests.map((contest) => {
              // Calculate progress and countdown
              const spotsLeft = contest.spotsLeft;
              const totalSpots = contest.totalSpots;
              const progress = (spotsLeft / totalSpots) * 100;
              const startDate = new Date(contest.startTime);
              const now = new Date();
              const diffMs = startDate.getTime() - now.getTime();
              const hours = Math.floor(diffMs / (1000 * 60 * 60));
              const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
              return (
                <View key={contest.id} style={styles.contestCardWireframe}>
                  <View style={styles.limitedSeatsBadge}><Text style={styles.limitedSeatsText}>LIMITED SEATS</Text></View>
                  <Text style={styles.contestTitleWireframe}>{contest.title}</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                    <View style={styles.prizeRow}>
                      <Trophy size={18} color={colors.primary} style={{ marginRight: 4 }} />
                      <Text style={styles.prizeTextWireframe}>{contest.prize}</Text>
                    </View>
                    <Text style={styles.entryFeeWireframe}>₹{contest.entryFee}</Text>
                  </View>
                  <View style={styles.spotsRow}>
                    <Text style={styles.spotsLeftText}>{spotsLeft}/{totalSpots} Spots Left</Text>
                    <Text style={styles.startsInText}>Starts in {hours.toString().padStart(2, '0')}h {minutes.toString().padStart(2, '0')}m</Text>
                  </View>
                  <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
                  </View>
                  <TouchableOpacity 
                    style={styles.joinNowButton}
                    onPress={() => router.push(`/contest/${contest.id}`)}
                  >
                    <Text style={styles.joinNowButtonText}>JOIN NOW</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>

        {/* Leaderboard */}
        <View style={[styles.section, styles.lastSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Performers</Text>
            <TouchableOpacity onPress={() => router.push('/leaderboard')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.leaderboardContainer}>
            {leaderboardData.slice(0, 3).map((user, index) => (
              <View key={user.id} style={styles.leaderboardRow}>
                <View style={styles.rankInfo}>
                  <Text style={[
                    styles.rankNumber,
                    index === 0 && styles.firstRank,
                    index === 1 && styles.secondRank,
                    index === 2 && styles.thirdRank,
                  ]}>#{index + 1}</Text>
                  <Text style={styles.userName}>{user.name}</Text>
                </View>
                <Text style={styles.userScore}>{user.score}</Text>
              </View>
            ))}
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
  scrollView: {
    flex: 1,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.white,
    gap: 8,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedCategory: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.primary,
  },
  selectedCategoryText: {
    color: colors.white,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  lastSection: {
    marginBottom: 32,
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
  contestsContainer: {
    gap: 12,
  },
  contestCardWireframe: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    position: 'relative',
  },
  limitedSeatsBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: colors.error,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    zIndex: 2,
  },
  limitedSeatsText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  contestTitleWireframe: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: colors.textPrimary,
    marginTop: 16,
    marginBottom: 4,
  },
  prizeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  prizeTextWireframe: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: colors.textPrimary,
  },
  contestInfoWireframe: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  entryFeeWireframe: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },
  spotsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  spotsLeftText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textPrimary,
  },
  startsInText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textSecondary,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 6,
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  joinNowButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  joinNowButtonText: {
    color: colors.white,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    letterSpacing: 1,
  },
  leaderboardContainer: {
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rankInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rankNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: colors.textPrimary,
    width: 32,
  },
  firstRank: {
    color: colors.gold,
  },
  secondRank: {
    color: colors.silver,
  },
  thirdRank: {
    color: colors.bronze,
  },
  userName: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: colors.textPrimary,
  },
  userScore: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.primary,
  },
});