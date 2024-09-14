import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Stack } from 'expo-router';

const Prescription = () => {
    const [text, onChangeText] = React.useState('Useless Text');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={hp('3%')} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Checkout</Text>
        <TouchableOpacity>
          <Icon name="notifications-outline" size={hp('3%')} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Doctor Info */}
      <View style={styles.doctorContainer}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/women/1.jpg' }}
          style={styles.doctorImage}
        />
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>John Doe</Text>
          <Text style={styles.doctorSpeciality}>ClientID: 120255</Text>
          <View style={styles.locationContainer}>
            <Icon name="location-outline" size={hp('2%')} color="#6B7280" />
            <Text style={styles.locationText}>3167 Durgan Shores, NC</Text>
          </View>
        </View>
      </View>

      {/* Price Details */}
      <View style={styles.priceContainer}>
        <View style={styles.heading}>
            <Text style={styles.sectionTitle}>Item Name</Text>
            <Text style={styles.sectionTitle}>Dosage</Text>
            <Text style={styles.sectionTitle}>Quantity</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.priceText}>item1</Text>
          <Text style={styles.priceAmount}>3</Text>
          <Text style={styles.priceAmount}>21</Text>
        </View>
      </View>

      {/* Text box */}
      <TouchableOpacity style={styles.promoContainer}>
        <TextInput
            style={styles.textInput}
            value={text}
            clearTextOnFocus={true}
            editable={true}
            multiline={true}
        />
      </TouchableOpacity>

      {/* Buttons*/}
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.paymentButton}>
            <Text style={styles.paymentButtonText}>Select Payment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentButton}>
            <Text style={styles.paymentButtonText}>Select Payment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('5%'),
    paddingTop: hp('2%'),
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('3%'),
  },
  headerText: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
  },
  doctorContainer: {
    flexDirection: 'row',
    paddingVertical: hp('2%'),
    backgroundColor: '#F3F4F6',
    borderRadius: wp('3%'),
    marginBottom: hp('2%'),
  },
  doctorImage: {
    width: hp('7%'),
    height: hp('7%'),
    borderRadius: hp('3.5%'),
    marginRight: wp('4%'),
  },
  doctorInfo: {
    justifyContent: 'center',
  },
  doctorName: {
    fontSize: hp('2.2%'),
    fontWeight: 'bold',
  },
  doctorSpeciality: {
    color: '#6B7280',
    fontSize: hp('1.8%'),
    marginBottom: hp('0.5%'),
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: '#6B7280',
    fontSize: hp('1.8%'),
    marginLeft: wp('1%'),
  },
  serviceContainer: {
    backgroundColor: '#F9FAFB',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('3%'),
    borderRadius: wp('3%'),
    marginBottom: hp('2%'),
  },
  sectionTitle: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
  },
  heading:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('1%'),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('0.8%'),
  },
  rowText: {
    marginLeft: wp('2%'),
    fontSize: hp('2%'),
  },
  priceContainer: {
    backgroundColor: '#F9FAFB',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('3%'),
    borderRadius: wp('3%'),
    marginBottom: hp('2%'),
  },
  priceText: {
    fontSize: hp('2%'),
    color: '#6B7280',
  },
  priceAmount: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: hp('2.2%'),
    fontWeight: 'bold',
    color: '#374151',
  },
  promoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('3%'),
    backgroundColor: '#F3F4F6',
    borderRadius: wp('3%'),
    marginBottom: hp('2%'),
  },
  promoText: {
    fontSize: hp('2%'),
    color: '#6B7280',
  },
  paymentButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: hp('1.5%'),
    borderRadius: wp('3%'),
    alignItems: 'center',
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
});

export default Prescription;
