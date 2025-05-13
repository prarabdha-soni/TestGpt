import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight, Clock } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { TestType } from '@/types';

interface MyTestCardProps {
  test: TestType;
  status: string;
  onPress: () => void;
}

export default function MyTestCard({ test, status, onPress }: MyTestCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardContent}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{test.title}</Text>
          <ChevronRight size={20} color={colors.textSecondary} />
        </View>
        
        <View style={styles.infoRow}>
          {status === 'upcoming' && (
            <>
              <View style={styles.infoItem}>
                <Clock size={16} color={colors.textSecondary} />
                <Text style={styles.infoText}>{test.date} at {test.time}</Text>
              </View>
              
              <View style={[styles.statusBadge, styles.upcomingBadge]}>
                <Text style={styles.statusText}>Upcoming</Text>
              </View>
            </>
          )}
          
          {status === 'completed' && (
            <>
              <Text style={styles.infoText}>Completed on {test.completedDate}</Text>
              <View style={[styles.statusBadge, styles.completedBadge]}>
                <Text style={[styles.statusText, styles.completedText]}>Completed</Text>
              </View>
            </>
          )}
          
          {status === 'results' && (
            <>
              <View style={styles.resultInfo}>
                <Text style={styles.rankText}>Rank {test.rank}</Text>
                <Text style={styles.winningText}>₹{test.winningAmount} won</Text>
              </View>
              
              <View style={[styles.statusBadge, styles.resultsBadge]}>
                <Text style={[styles.statusText, styles.resultsText]}>Results</Text>
              </View>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardContent: {
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: colors.textPrimary,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textSecondary,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  upcomingBadge: {
    backgroundColor: colors.primaryLight,
  },
  completedBadge: {
    backgroundColor: colors.successLight,
  },
  resultsBadge: {
    backgroundColor: colors.warningLight,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: colors.primary,
  },
  completedText: {
    color: colors.success,
  },
  resultsText: {
    color: colors.warning,
  },
  resultInfo: {
    flexDirection: 'column',
  },
  rankText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.textPrimary,
  },
  winningText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.success,
  },
});