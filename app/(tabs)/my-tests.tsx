import { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';

import TabHeader from '@/components/TabHeader';
import { colors } from '@/constants/colors';
import { myTestsData } from '@/data/mockData';
import MyTestCard from '@/components/MyTestCard';

export default function MyTestsScreen() {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const tabs = ['Upcoming', 'Completed', 'Results'];
  
  const filteredTests = myTestsData.filter(test => {
    if (activeTab === 'Upcoming') return test.status === 'upcoming';
    if (activeTab === 'Completed') return test.status === 'completed';
    if (activeTab === 'Results') return test.status === 'results';
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <TabHeader title="My Tests" />
      
      <View style={styles.tabsContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredTests.length > 0 ? (
          filteredTests.map(test => (
            <MyTestCard
              key={test.id}
              test={test}
              status={activeTab.toLowerCase()}
              onPress={() => {
                if (activeTab === 'Upcoming') {
                  router.push(`/contest/${test.id}`);
                } else if (activeTab === 'Completed') {
                  router.push(`/results/${test.id}`);
                } else {
                  router.push(`/results/${test.id}`);
                }
              }}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No {activeTab.toLowerCase()} tests found.</Text>
            {activeTab === 'Upcoming' && (
              <TouchableOpacity 
                style={styles.browseButton}
                onPress={() => router.push('/')}
              >
                <Text style={styles.browseButtonText}>Browse Contests</Text>
                <ChevronRight size={16} color={colors.white} />
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.white,
  },
  tab: {
    paddingVertical: 16,
    marginRight: 24,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  browseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  browseButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.white,
    marginRight: 4,
  },
});