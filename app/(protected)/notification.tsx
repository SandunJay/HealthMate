import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const NotificationPage = () => {
  const transactions = [
    { id: 1, date: 'September 4', text: 'successful transaction to ojaman, view and download the receipt' },
    { id: 2, date: 'September 3', text: 'successful transaction to ojaman, view and download the receipt' },
    { id: 3, date: 'September 1', text: 'successful transaction to ojaman, view and download the receipt' }
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Transactions Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Transaction</Text>
        {transactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionItem}>
            <View style={styles.transactionContent}>
              <Image
                source={require('../../assets/images/react-logo.png')} // Use your transaction icon here
                style={styles.icon}
              />
              <View style={styles.transactionText}>
                <Text style={styles.transactionDesc}>{transaction.text}</Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
            </View>
            <Pressable style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </Pressable>
          </View>
        ))}
      </View>

      {/* Verification Section */}
      <View style={styles.verificationSection}>
        <Text style={styles.verificationTitle}>Complete Verification</Text>
        <View style={styles.progressBar}>
          <View style={styles.progress} />
          <Text style={styles.progressText}>60%</Text>
        </View>
        <View style={styles.verificationItems}>
          <Pressable style={styles.verificationItem}>
            <Image
              source={require('../../assets/images/react-logo.png')} // Use your personal info icon here
              style={styles.icon}
            />
            <View style={styles.verificationTextContainer}>
              <Text style={styles.verificationText}>Personal Information</Text>
              <Text style={styles.verificationSubtext}>complete your name and profile photo to complete the data</Text>
            </View>
          </Pressable>

          <Pressable style={styles.verificationItem}>
            <Image
              source={require('../../assets/images/react-logo.png')} // Use your email confirm icon here
              style={styles.icon}
            />
            <View style={styles.verificationTextContainer}>
              <Text style={styles.verificationText}>Confirm Email</Text>
              <Text style={styles.verificationSubtext}>Please confirm your email for further notifications</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    padding: wp('5%'),
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: wp('4%'),
    marginBottom: hp('3%'),
  },
  sectionTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
    color: '#10101E',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
    borderRadius: 10,
    padding: wp('3%'),
    marginBottom: hp('1%'),
  },
  transactionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionText: {
    marginLeft: wp('3%'),
  },
  transactionDesc: {
    fontSize: wp('4%'),
    color: '#333',
  },
  transactionDate: {
    fontSize: wp('3%'),
    color: '#777',
    marginTop: hp('0.5%'),
  },
  closeButton: {
    padding: wp('2%'),
  },
  closeText: {
    fontSize: wp('4%'),
    color: '#ff0000',
  },
  icon: {
    width: wp('7%'),
    height: wp('7%'),
    resizeMode: 'contain',
  },
  verificationSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: wp('4%'),
  },
  verificationTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
    color: '#10101E',
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
  },
  progress: {
    width: wp('70%'),
    height: hp('1%'),
    backgroundColor: '#008000',
    borderRadius: 10,
  },
  progressText: {
    fontSize: wp('4%'),
    color: '#008000',
  },
  verificationItems: {
    marginTop: hp('2%'),
  },
  verificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F2E6',
    borderRadius: 10,
    padding: wp('3%'),
    marginBottom: hp('1.5%'),
  },
  verificationTextContainer: {
    marginLeft: wp('3%'),
  },
  verificationText: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    color: '#333',
  },
  verificationSubtext: {
    fontSize: wp('3.5%'),
    color: '#777',
    marginTop: hp('0.5%'),
  },
});

export default NotificationPage;
