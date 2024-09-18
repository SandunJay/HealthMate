import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Stack } from 'expo-router';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{headerShown:false}}/>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/women/2.jpg' }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Amelia Renata</Text>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Icon name="heart-outline" size={hp('2.5%')} color="#fff" />
            <Text style={styles.statValue}>215bpm</Text>
            <Text style={styles.statLabel}>Heart rate</Text>
          </View>
          <View style={styles.stat}>
            <Icon name="flame-outline" size={hp('2.5%')} color="#fff" />
            <Text style={styles.statValue}>756cal</Text>
            <Text style={styles.statLabel}>Calories</Text>
          </View>
          <View style={styles.stat}>
            <Icon name="barbell-outline" size={hp('2.5%')} color="#fff" />
            <Text style={styles.statValue}>103lbs</Text>
            <Text style={styles.statLabel}>Weight</Text>
          </View>
        </View>
      </View>

      {/* Menu Options */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="heart-outline" size={hp('2.5%')} color="#6B7280" />
          <Text style={styles.menuText}>My Saved</Text>
          <Icon name="chevron-forward-outline" size={hp('2.5%')} color="#6B7280" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="calendar-outline" size={hp('2.5%')} color="#6B7280" />
          <Text style={styles.menuText}>Appointment</Text>
          <Icon name="chevron-forward-outline" size={hp('2.5%')} color="#6B7280" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="card-outline" size={hp('2.5%')} color="#6B7280" />
          <Text style={styles.menuText}>Payment Method</Text>
          <Icon name="chevron-forward-outline" size={hp('2.5%')} color="#6B7280" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="chatbubble-ellipses-outline" size={hp('2.5%')} color="#6B7280" />
          <Text style={styles.menuText}>FAQs</Text>
          <Icon name="chevron-forward-outline" size={hp('2.5%')} color="#6B7280" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="log-out-outline" size={hp('2.5%')} color="red" />
          <Text style={[styles.menuText, { color: 'red' }]}>Logout</Text>
        </TouchableOpacity>
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  header: {
    backgroundColor: '#4CAF50',
    paddingVertical: hp('5%'),
    alignItems: 'center',
  },
  profileImage: {
    width: hp('10%'),
    height: hp('10%'),
    borderRadius: hp('5%'),
    marginBottom: hp('1%'),
  },
  profileName: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: hp('2%'),
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
  statValue: {
    color: '#fff',
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#fff',
    fontSize: hp('1.5%'),
  },
  menuContainer: {
    paddingHorizontal: wp('5%'),
    marginTop: hp('3%'),
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  menuText: {
    fontSize: hp('2.2%'),
    color: '#000',
    marginLeft: wp('3%'),
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: hp('2%'),
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default ProfileScreen;
