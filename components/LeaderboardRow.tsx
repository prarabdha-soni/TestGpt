import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';
import { UserType } from '@/types';

interface LeaderboardRowProps {
  rank: number;
  user: UserType;
}

export default function LeaderboardRow({ rank, user }: LeaderboardRowProps) {
  return (
    <View style={styles.container}>
      <View style={styles.rankContainer}>
        <Text style={styles.rankText}>{rank}</Text>
      </View>
      
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{user.name}</Text>
      </View>
      
      <Text style={styles.score}>{user.score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  rankContainer: {
    width: 24,
    marginRight: 16,
  },
  rankText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.textPrimary,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.textPrimary,
  },
  score: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.primary,
  },
});