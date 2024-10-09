import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { recordType } from '@/assets/types';
import { drugs, prescriptions } from '@/assets/dummy';
import { Colors } from '@/constants/Colors';
// import {records, prescriptiondatas} from '@/assets/dummy'

const Record = () => {
  const [text, onChangeText] = useState('');
	const [record, setRecord] = useState(null); 
	const [loading, setLoading] = useState(true);
	const [reportPrescriptions, setReportPrescriptions] = useState([]);

	// const {id} = useLocalSearchParams<{id: string}>();

	const { id, patientid } = useLocalSearchParams();
  	console.log('Recieved id: '+ id + " pid: "+ patientid)

	useEffect(() => {
		if (id) {
		  const fetchedRecord: recordType | undefined = prescriptions.find(item => item.patientid === patientid); 
		  setRecord(fetchedRecord);

			const fetchedPrescriptions = drugs.filter(prescription => prescription.pid === id);
			setReportPrescriptions(fetchedPrescriptions);
		  setLoading(false);
		}
	  }, [id]);


	  if (loading) {
		return (
		  <View style={styles.loadingContainer}>
			  <ActivityIndicator size="large" color="#6200EE"/>
		  </View>
		);
	  }

	  if (!record) {
		return (
		  <View style={styles.container}>
			<Text>Record not found</Text>
		  </View>
		);
	  }

  return (
    <View style={styles.container}>
		<Stack.Screen options={{headerShown:false}}/>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/pharmacist/scanner')}>
          <Icon name="arrow-back" size={hp('3%')} color="#000" />
        </TouchableOpacity>
		<View style={{ flex: 1 }}/>
        <Text style={styles.headerText}>Prescription</Text>
      </View>

      {/* Patient Info */}
      <View style={styles.doctorContainer}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/women/1.jpg' }}
          style={styles.doctorImage}
        />
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{record.patientid}</Text>
          <Text style={styles.doctorSpeciality}>Diagnosis: {record.diagnosis}</Text>
          <View style={styles.locationContainer}>
            <Icon name="location-outline" size={hp('2%')} color="#6B7280" />
            <Text style={styles.locationText}>Date: {record.date}</Text>
          </View>
        </View>
      </View>

      {/* Prescription List */}
      <View style={styles.priceContainer}>
        <View style={styles.heading}>
          <Text style={styles.sectionTitle}>Item Name</Text>
          <Text style={styles.sectionTitle}>Dosage</Text>
          <Text style={styles.sectionTitle}>Quantity</Text>
        </View>

        {reportPrescriptions.map((drug) => (
          <View style={styles.row} key={drug.id}>
            <Text style={styles.priceText}>{drug.name}</Text>
            <Text style={styles.priceAmount}>{drug.dosage}</Text>
            <Text style={styles.priceAmount}>{drug.quantity}</Text>
          </View>
        ))}
      </View>

      {/* Text box */}
      <View style={styles.promoContainer}>
        <TextInput
          style={styles.textInput}
          value={text}
          placeholder="Enter notes here"
          multiline={true}
          numberOfLines={3}
          clearTextOnFocus={true}
          editable={true}
        />
      </View>

      {/* Buttons*/}
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.paymentButton}>
            <Text style={styles.paymentButtonText}>Flag</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentButton}>
            <Text style={styles.paymentButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	  },
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
		position: 'absolute', // This will make the text centered
		left: 0,
		right: 0,
		textAlign: 'center',  // Align text to center
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
	sectionTitle: {
	  fontSize: hp('2%'),
	  fontWeight: 'bold',
	  marginBottom: hp('1%'),
	},
	heading: {
	  flexDirection: 'row',
	  justifyContent: 'space-between',
	  marginBottom: hp('1%'),
	},
	row: {
	  flexDirection: 'row',
	  justifyContent: 'space-between',
	  alignItems: 'center',
	  marginVertical: hp('0.8%'),
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
	promoContainer: {
	  flexDirection: 'row',
	  justifyContent: 'center',
	  paddingVertical: hp('2%'),
	  paddingHorizontal: wp('3%'),
	  backgroundColor: '#F3F4F6',
	  borderRadius: wp('3%'),
	  marginBottom: hp('2%'),
	},
	textInput: {
	  width: '100%',
	  backgroundColor: '#fff',
	  padding: hp('1%'),
	  borderRadius: wp('2%'),
	  borderWidth: 1,
	  borderColor: '#ccc',
	  textAlignVertical: 'top',
	},
	btnContainer: {
	  flexDirection: 'row',
	  justifyContent: 'space-between',
	  marginBottom: hp('2%'),
	},
	paymentButton: {
	  backgroundColor: Colors.light.tabIconDefault1,
	  paddingVertical: hp('1.5%'),
	  borderRadius: wp('3%'),
	  width: wp('40%'),
	  alignItems: 'center',
	},
	paymentButtonText: {
	  color: '#fff',
	  fontSize: hp('2%'),
	  fontWeight: 'bold',
	},
	flagButton: {
	  backgroundColor: Colors.light.tabIconSelected,
	  paddingVertical: hp('1.5%'),
	  borderRadius: wp('3%'),
	  width: wp('40%'),
	  alignItems: 'center',
	},
	flagButtonText: {
	  color: '#C96868',
	  fontSize: hp('2%'),
	  fontWeight: 'bold',
	},
  });

export default Record;
