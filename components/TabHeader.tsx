import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

interface TabHeaderProps {
  title: string;
}

export default function TabHeader({ title }: TabHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: colors.textPrimary,
  },
});