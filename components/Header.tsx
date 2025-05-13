import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Wallet } from 'lucide-react-native';
import { colors } from '@/constants/colors';

interface HeaderProps {
  title: string;
  balance: number;
}

export default function Header({ title, balance }: HeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.balanceContainer}>
        <Wallet size={18} color={colors.primary} style={{ marginRight: 6 }} />
        <Text style={styles.balanceText}>₹ {balance}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.background,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  balanceText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.textPrimary,
  },
});