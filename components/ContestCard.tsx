import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Users } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { ContestType } from '@/types';

interface ContestCardProps {
  contest: ContestType;
  onPress: () => void;
}

export default function ContestCard({ contest, onPress }: ContestCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{contest.title}</Text>
          <Text style={styles.entryFee}>{contest.entryFee}₹</Text>
        </View>
        
        <Text style={styles.date}>Entry Fee {contest.entryFee}₹</Text>
        
        <View style={styles.bottomSection}>
          <View style={styles.participantsContainer}>
            <Text style={styles.participants}>Winnings {contest.winningAmount}₹</Text>
          </View>
          
          <TouchableOpacity style={styles.joinButton} onPress={onPress}>
            <Text style={styles.joinButtonText}>JOIN</Text>
          </TouchableOpacity>
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
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: colors.textPrimary,
  },
  entryFee: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.primary,
  },
  date: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  participantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participants: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.textSecondary,
  },
  joinButton: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  joinButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.white,
  },
});