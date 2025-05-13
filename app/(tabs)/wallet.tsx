import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import TabHeader from '@/components/TabHeader';
import { colors } from '@/constants/colors';
import { ArrowUp, ArrowDown } from 'lucide-react-native';
import { transactionHistory } from '@/data/mockData';

export default function WalletScreen() {
  const [walletBalance, setWalletBalance] = useState(500);

  const handleAddMoney = () => {
    Alert.alert(
      "Add Money",
      "This feature will be available in the next update.",
      [{ text: "OK" }]
    );
  };

  const handleWithdraw = () => {
    if (walletBalance < 200) {
      Alert.alert(
        "Insufficient Balance",
        "You need at least ₹200 to withdraw.",
        [{ text: "OK" }]
      );
      return;
    }
    
    Alert.alert(
      "Withdraw Money",
      "This feature will be available in the next update.",
      [{ text: "OK" }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TabHeader title="Wallet" />
      
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <Text style={styles.balanceAmount}>₹ {walletBalance.toFixed(2)}</Text>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.addButton]} 
            onPress={handleAddMoney}
          >
            <ArrowDown size={16} color={colors.white} />
            <Text style={styles.actionButtonText}>Add Money</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.withdrawButton]} 
            onPress={handleWithdraw}
          >
            <ArrowUp size={16} color={colors.white} />
            <Text style={styles.actionButtonText}>Withdraw</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.transactionSection}>
        <Text style={styles.sectionTitle}>Transaction History</Text>
        
        <ScrollView 
          style={styles.transactionsContainer}
          showsVerticalScrollIndicator={false}
        >
          {transactionHistory.length > 0 ? (
            transactionHistory.map((transaction, index) => (
              <View 
                key={transaction.id} 
                style={[
                  styles.transactionItem,
                  index !== transactionHistory.length - 1 && styles.transactionItemBorder
                ]}
              >
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionTitle}>{transaction.title}</Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
                <Text 
                  style={[
                    styles.transactionAmount,
                    transaction.type === 'credit' ? styles.creditAmount : styles.debitAmount
                  ]}
                >
                  {transaction.type === 'credit' ? '+' : '-'} ₹{transaction.amount}
                </Text>
              </View>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No transactions yet.</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  balanceCard: {
    margin: 16,
    padding: 24,
    backgroundColor: colors.white,
    borderRadius: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  balanceLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  balanceAmount: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: colors.textPrimary,
    marginBottom: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  addButton: {
    backgroundColor: colors.success,
  },
  withdrawButton: {
    backgroundColor: colors.primary,
  },
  actionButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.white,
  },
  transactionSection: {
    flex: 1,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  transactionsContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  transactionItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  transactionDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: colors.textSecondary,
  },
  transactionAmount: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
  },
  creditAmount: {
    color: colors.success,
  },
  debitAmount: {
    color: colors.error,
  },
  emptyContainer: {
    padding: 16,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textSecondary,
  },
});