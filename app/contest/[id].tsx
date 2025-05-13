import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Animated } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Clock, BookOpen, Award, AlertCircle } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';

export default function ContestDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handleJoinContest = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.push(`/test/${id}`);
    });
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
        <Text style={styles.headerTitle}>Contest Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          style={styles.heroSection}
        >
          <Text style={styles.heroTitle}>IIT Mathematics Quiz</Text>
          <Text style={styles.heroSubtitle}>Test your knowledge with our comprehensive quiz</Text>
        </LinearGradient>

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Clock size={24} color={colors.primary} />
            <Text style={styles.infoLabel}>Duration</Text>
            <Text style={styles.infoValue}>10 Minutes</Text>
          </View>
          <View style={styles.infoItem}>
            <BookOpen size={24} color={colors.primary} />
            <Text style={styles.infoLabel}>Questions</Text>
            <Text style={styles.infoValue}>10 Questions</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <BookOpen size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>Syllabus</Text>
          </View>
          <View style={styles.syllabusContainer}>
            {['Calculus', 'Differential Equations', 'Limits and Continuity', 'Matrices and Determinants', 'Probability and Statistics'].map((topic, index) => (
              <View key={index} style={styles.topicItem}>
                <View style={styles.topicBullet} />
                <Text style={styles.topicText}>{topic}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AlertCircle size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>Rules</Text>
          </View>
          <View style={styles.rulesContainer}>
            {[
              'You will have 10 minutes to complete the quiz',
              'Each question carries equal marks',
              'No negative marking',
              'You can review and change your answers',
              'Quiz will auto-submit when time runs out'
            ].map((rule, index) => (
              <View key={index} style={styles.ruleItem}>
                <View style={styles.ruleBullet} />
                <Text style={styles.ruleText}>{rule}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            style={styles.joinButton}
            onPress={handleJoinContest}
          >
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              style={styles.joinButtonGradient}
            >
              <Award size={20} color={colors.white} style={styles.joinButtonIcon} />
              <Text style={styles.joinButtonText}>JOIN CONTEST</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
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
  content: {
    flex: 1,
  },
  heroSection: {
    padding: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  heroTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: colors.white,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.9,
  },
  infoContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 16,
    marginTop: -20,
    marginHorizontal: 16,
    borderRadius: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 8,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: colors.textPrimary,
  },
  section: {
    backgroundColor: colors.white,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: colors.textPrimary,
    marginLeft: 8,
  },
  syllabusContainer: {
    marginTop: 8,
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  topicBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginRight: 12,
  },
  topicText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  rulesContainer: {
    marginTop: 8,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ruleBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginRight: 12,
  },
  ruleText: {
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
  },
  footer: {
    padding: 16,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  joinButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  joinButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  joinButtonIcon: {
    marginRight: 8,
  },
  joinButtonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});