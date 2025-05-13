import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { PracticeZoneType } from '@/types';

interface PracticeZoneCardProps {
  zone: PracticeZoneType;
  onPress: () => void;
}

export default function PracticeZoneCard({ zone, onPress }: PracticeZoneCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{zone.title}</Text>
      <ChevronRight size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  title: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: colors.textPrimary,
  },
});