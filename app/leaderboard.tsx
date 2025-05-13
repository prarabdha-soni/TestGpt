import { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ChevronLeft, Trophy, Medal } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

import { colors } from '@/constants/colors';
import { leaderboardData, contestData } from '@/data/mockData';

export default function LeaderboardScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const contest = id ? contestData.find(c => c.id === id) : null;
  
  const [selectedTab, setSelectedTab] = useState<'all' | 'weekly' | 'monthly'>('all');
  
  const getFilteredLeaderboard = () => {
    if (selectedTab === 'weekly') {
      return leaderboardData.slice(0, 20);
    } else if (selectedTab === 'monthly') {
      return leaderboardData.slice(0, 50);
    }
    return leaderboardData;
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
        <Text style={styles.headerTitle}>
          {contest ? `${contest.title} Leaderboard` : 'Leaderboard'}
        </Text>
        <View style={styles.placeholder} />
      </View>
      
      {!contest && (
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'all' && styles.selectedTab
            ]}
            onPress={() => setSelectedTab('all')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'all' && styles.selectedTabText
              ]}
            >
              All Time
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'weekly' && styles.selectedTab
            ]}
            onPress={() => setSelectedTab('weekly')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'weekly' && styles.selectedTabText
              ]}
            >
              Weekly
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'monthly' && styles.selectedTab
            ]}
            onPress={() => setSelectedTab('monthly')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'monthly' && styles.selectedTabText
              ]}
            >
              Monthly
            </Text>
          </TouchableOpacity>
        </View>
      )}
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.topRankersContainer}>
          <View style={styles.topRankerCard}>
            <View style={[styles.crownContainer, styles.secondPlace]}>
              <Medal size={24} color={colors.silver} />
            </View>
            <Text style={styles.topRankerName}>Mahesh</Text>
            <Text style={styles.topRankerScore}>1,250</Text>
            <View style={[styles.rankCircle, styles.secondPlaceCircle]}>
              <Text style={styles.rankNumber}>2</Text>
            </View>
          </View>
          
          <View style={[styles.topRankerCard, styles.firstPlaceCard]}>
            <View style={[styles.crownContainer, styles.firstPlace]}>
              <Trophy size={24} color={colors.gold} />
            </View>
            <Text style={[styles.topRankerName, styles.firstPlaceName]}>Gaurav</Text>
            <Text style={[styles.topRankerScore, styles.firstPlaceScore]}>1,300</Text>
            <View style={[styles.rankCircle, styles.firstPlaceCircle]}>
              <Text style={styles.rankNumber}>1</Text>
            </View>
          </View>
          
          <View style={styles.topRankerCard}>
            <View style={[styles.crownContainer, styles.thirdPlace]}>
              <Medal size={24} color={colors.bronze} />
            </View>
            <Text style={styles.topRankerName}>Anita</Text>
            <Text style={styles.topRankerScore}>1,225</Text>
            <View style={[styles.rankCircle, styles.thirdPlaceCircle]}>
              <Text style={styles.rankNumber}>3</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.leaderboardListContainer}>
          {getFilteredLeaderboard().slice(3).map((user, index) => (
            <View key={user.id} style={styles.leaderboardRow}>
              <View style={styles.rankAndName}>
                <Text style={styles.listRank}>{index + 4}</Text>
                <Text style={styles.listName}>{user.name}</Text>
              </View>
              <Text style={styles.listScore}>{user.score}</Text>
            </View>
          ))}
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
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    paddingBottom: 8,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: colors.lightBackground,
  },
  selectedTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.textPrimary,
  },
  selectedTabText: {
    color: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  topRankersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
  },
  topRankerCard: {
    alignItems: 'center',
    width: 100,
    height: 130,
    marginHorizontal: 8,
    position: 'relative',
  },
  firstPlaceCard: {
    height: 150,
    marginTop: -20,
  },
  crownContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  firstPlace: {
    backgroundColor: colors.goldLight,
  },
  secondPlace: {
    backgroundColor: colors.silverLight,
  },
  thirdPlace: {
    backgroundColor: colors.bronzeLight,
  },
  topRankerName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  firstPlaceName: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  topRankerScore: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.primary,
  },
  firstPlaceScore: {
    fontSize: 18,
  },
  rankCircle: {
    position: 'absolute',
    bottom: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstPlaceCircle: {
    backgroundColor: colors.gold,
  },
  secondPlaceCircle: {
    backgroundColor: colors.silver,
  },
  thirdPlaceCircle: {
    backgroundColor: colors.bronze,
  },
  rankNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    color: colors.white,
  },
  leaderboardListContainer: {
    backgroundColor: colors.white,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  leaderboardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rankAndName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listRank: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: colors.textPrimary,
    width: 30,
  },
  listName: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: colors.textPrimary,
  },
  listScore: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.primary,
  },
});