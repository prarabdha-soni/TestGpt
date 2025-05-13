import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Settings, LogOut, CircleUser as UserCircle, Award, History, Shield } from 'lucide-react-native';
import TabHeader from '@/components/TabHeader';
import { colors } from '@/constants/colors';

export default function ProfileScreen() {
  const profileData = {
    name: 'Ravi Kumar',
    email: 'ravi.kumar@example.com',
    phone: '+91 98765 43210',
    joinedOn: 'June 2023',
    testsJoined: 24,
    testsWon: 8,
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Logout", 
          style: "destructive",
          onPress: () => console.log("User logged out") 
        }
      ]
    );
  };

  const menuItems = [
    {
      id: 'history',
      title: 'Test History',
      icon: <History size={20} color={colors.textPrimary} />,
      onPress: () => Alert.alert("Coming Soon", "This feature will be available in the next update.")
    },
    {
      id: 'achievements',
      title: 'My Achievements',
      icon: <Award size={20} color={colors.textPrimary} />,
      onPress: () => Alert.alert("Coming Soon", "This feature will be available in the next update.")
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      icon: <Shield size={20} color={colors.textPrimary} />,
      onPress: () => Alert.alert("Coming Soon", "This feature will be available in the next update.")
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: <Settings size={20} color={colors.textPrimary} />,
      onPress: () => Alert.alert("Coming Soon", "This feature will be available in the next update.")
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <TabHeader title="Profile" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <UserCircle size={80} color={colors.primary} />
          </View>
          
          <Text style={styles.userName}>{profileData.name}</Text>
          <Text style={styles.userEmail}>{profileData.email}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{profileData.testsJoined}</Text>
              <Text style={styles.statLabel}>Tests Joined</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{profileData.testsWon}</Text>
              <Text style={styles.statLabel}>Tests Won</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.menuSection}>
          {menuItems.map(item => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuIconTitle}>
                {item.icon}
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              <Settings size={16} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogOut size={20} color={colors.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: colors.white,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImageContainer: {
    marginBottom: 16,
  },
  userName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  userEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-evenly',
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: colors.lightBackground,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.textSecondary,
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: colors.border,
  },
  menuSection: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 24,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuIconTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: colors.textPrimary,
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 32,
    paddingVertical: 16,
    backgroundColor: colors.lightBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.error,
  },
  logoutText: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: colors.error,
    marginLeft: 12,
  },
});