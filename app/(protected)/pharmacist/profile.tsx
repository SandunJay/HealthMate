import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router, Stack } from 'expo-router';
import { useGlobalContext } from '@/context/GlobalProvider';
import { useAuth } from '@/hooks/useAuth';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const ProfileScreen = () => {
  const { isDarkMode, toggleDarkMode } = useGlobalContext();
    const { isIos} = useGlobalContext();

    const { onLogout } = useAuth();

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1F2937' : '#F0F4F8',
    },
    header: {
      backgroundColor: isDarkMode ? '#374151' : '#4CAF50',
      paddingVertical: hp('5%'),
      alignItems: 'center',
    },
    profileName: {
      fontSize: hp('2.5%'),
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: hp('2%'),
    },
    statValue: {
      color: '#fff',
      fontSize: hp('2.5%'),
      fontWeight: 'bold',
    },
    statLabel: {
      color: '#fff',
      fontSize: hp('1.5%'),
    },
    menuItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: hp('2%'),
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#4B5563' : '#E5E7EB',
    },
    menuText: {
      fontSize: hp('2.2%'),
      color: isDarkMode ? '#D1D5DB' : '#000',
      marginLeft: wp('3%'),
    },
    darkModeToggle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: hp('2%'),
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#4B5563' : '#E5E7EB',
    },
    darkModeText: {
      fontSize: hp('2.2%'),
      color: isDarkMode ? '#D1D5DB' : '#000',
    },
  });

  const onLogoutPress = async () => {
    onLogout!();
  };

  return (
    <View style={[dynamicStyles.container, {paddingTop: isIos ? hp('6%') : hp('3%') } ]}>
      <Stack.Screen options={{headerShown:false}}/>
      {/* Profile Header */}
      <View style={dynamicStyles.header}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
          style={styles.profileImage}
        />
        <Text style={dynamicStyles.profileName}>Jonathan Scott</Text>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            {/* <Icon name="heart-outline" size={hp('2.5%')} color="#fff" /> */}
            <MaterialIcons name='local-pharmacy' size={hp('2.5%')} color="#fff"/>
            <Text style={dynamicStyles.statValue}>Pharmacist</Text>
          </View>
          <View style={styles.stat}>
            <MaterialIcons name='bedtime'  size={hp('2.5%')} color="#fff"/>
            <Text style={dynamicStyles.statValue}>Night Shift</Text>
            {/* <Text style={dynamicStyles.statLabel}>Calories</Text> */}
          </View>
          {/* <View style={styles.stat}>
            <Icon name="barbell-outline" size={hp('2.5%')} color="#fff" />
            <Text style={dynamicStyles.statValue}>103lbs</Text>
            <Text style={dynamicStyles.statLabel}>Weight</Text>
          </View> */}
        </View>
      </View>

      {/* Menu Options */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={dynamicStyles.menuItem}>
          <Icon name="heart-outline" size={hp('2.5%')} color={isDarkMode ? '#D1D5DB' : '#6B7280'} />
          <Text style={dynamicStyles.menuText}>My Saved</Text>
          <Icon name="chevron-forward-outline" size={hp('2.5%')} color={isDarkMode ? '#D1D5DB' : '#6B7280'} />
        </TouchableOpacity>
        <TouchableOpacity style={dynamicStyles.menuItem}>
          <Icon name="calendar-outline" size={hp('2.5%')} color={isDarkMode ? '#D1D5DB' : '#6B7280'} />
          <Text style={dynamicStyles.menuText}>Attendance</Text>
          <Icon name="chevron-forward-outline" size={hp('2.5%')} color={isDarkMode ? '#D1D5DB' : '#6B7280'} />
        </TouchableOpacity>
        <TouchableOpacity style={dynamicStyles.menuItem}>
          <MaterialIcons name='pending-actions' size={hp('2.5%')} color={isDarkMode ? '#D1D5DB' : '#6B7280'} />
          <Text style={dynamicStyles.menuText}>Reminders</Text>
          <Icon name="chevron-forward-outline" size={hp('2.5%')} color={isDarkMode ? '#D1D5DB' : '#6B7280'} />
        </TouchableOpacity>
        <TouchableOpacity style={dynamicStyles.menuItem}>
          <Icon name="chatbubble-ellipses-outline" size={hp('2.5%')} color={isDarkMode ? '#D1D5DB' : '#6B7280'} />
          <Text style={dynamicStyles.menuText}>FAQs</Text>
          <Icon name="chevron-forward-outline" size={hp('2.5%')} color={isDarkMode ? '#D1D5DB' : '#6B7280'} />
        </TouchableOpacity>
        <View style={dynamicStyles.darkModeToggle}>
          <Text style={dynamicStyles.darkModeText}>Dark Mode</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleDarkMode}
            value={isDarkMode}
          />
        </View>
        <TouchableOpacity style={dynamicStyles.menuItem} onPress={onLogoutPress}>
          <Icon name="log-out-outline" size={hp('2.5%')} color="red" />
          <Text style={[dynamicStyles.menuText, { color: 'red' }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: hp('10%'),
    height: hp('10%'),
    borderRadius: hp('5%'),
    marginBottom: hp('1%'),
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: hp('2%'),
  },
  stat: {
    alignItems: 'center',
  },
  menuContainer: {
    paddingHorizontal: wp('5%'),
    marginTop: hp('3%'),
  },
});

export default ProfileScreen;