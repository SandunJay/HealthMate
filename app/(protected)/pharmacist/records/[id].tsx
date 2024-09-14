// import { useEffect, useState } from 'react';
// import { View, Text } from 'react-native';
// import { Stack, useRouter, useLocalSearchParams } from 'expo-router';

// const NewsDetailsPage = () => {
// 	const { id } = useLocalSearchParams();
// 	const [loading, setLoading] = useState(true);
// 	const router = useRouter();

// 	useEffect(() => {
// 		if (!id) {
// 			router.replace('/pharmacist/records');
// 		} else {
// 			setLoading(false); 
// 		}
// 	}, [id, router]);

// 	if (loading) {
// 		return <Text>Loading...</Text>; 
// 	}

// 	return (
// 		<View>
// 			<Stack.Screen options={{ headerTitle: `News #${id}` }} />
// 			<Text>My News: {id}</Text>
// 		</View>
// 	);
// };

// export default NewsDetailsPage;



import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Stack, useLocalSearchParams } from 'expo-router';


const reports = [
	{
	  rid: '123',
	  date: 'June 25, 2022, 10:00 PM - 03:00 PM',
	  name: 'Alexa Johnson',
	  diagnosis: 'Diabetes',
	  rating: 4.8,
	  image: 'https://randomuser.me/api/portraits/women/44.jpg',
	},
	{
	  rid: '456',
	  date: 'March 15, 2023, 11:00 AM - 05:00 PM',
	  name: 'Bob Smith',
	  diagnosis: 'Hypertension',
	  rating: 4.5,
	  image: 'https://randomuser.me/api/portraits/men/10.jpg',
	},
  ];
  
  const prescription = [
	{
	  pid: '12446563',
	  rid: '123',
	  name: 'Amoxicillin',
	  dosage: '500mg',
	  quantity: 21,
	},
	{
	  pid: '12446564',
	  rid: '123',
	  name: 'Metformin',
	  dosage: '850mg',
	  quantity: 14,
	},
	{
	  pid: '12446565',
	  rid: '456',
	  name: 'Lisinopril',
	  dosage: '20mg',
	  quantity: 30,
	},
	{
	  pid: '12446566',
	  rid: '456',
	  name: 'Amlodipine',
	  dosage: '5mg',
	  quantity: 28,
	},
  ];


const Record = () => {
    const [text, onChangeText] = React.useState('');
	const rid = useLocalSearchParams();

	const userReport = reports.find((report) => report.rid === rid);
	const userPrescriptions = prescription.filter((med) => med.rid === rid);
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={hp('3%')} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Record</Text>
        <TouchableOpacity>
          <Icon name="notifications-outline" size={hp('3%')} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Patient Info */}
	  {userReport && (
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
	  )}

      {/* Prescription List */}
      <View style={styles.priceContainer}>
        <View style={styles.heading}>
          <Text style={styles.sectionTitle}>Item Name</Text>
          <Text style={styles.sectionTitle}>Dosage</Text>
          <Text style={styles.sectionTitle}>Quantity</Text>
        </View>

        {userPrescriptions.map((med) => (
          <View style={styles.row} key={med.pid}>
            <Text style={styles.priceText}>{med.name}</Text>
            <Text style={styles.priceAmount}>{med.dosage}</Text>
            <Text style={styles.priceAmount}>{med.quantity}</Text>
          </View>
        ))}
      </View>

      {/* Text box */}
      <View style={styles.promoContainer}>
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={onChangeText}
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: wp('5%'),
//     paddingTop: hp('2%'),
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: hp('3%'),
//   },
//   headerText: {
//     fontSize: hp('2.5%'),
//     fontWeight: 'bold',
//   },
//   doctorContainer: {
//     flexDirection: 'row',
//     paddingVertical: hp('2%'),
//     backgroundColor: '#F3F4F6',
//     borderRadius: wp('3%'),
//     marginBottom: hp('2%'),
//   },
//   doctorImage: {
//     width: hp('7%'),
//     height: hp('7%'),
//     borderRadius: hp('3.5%'),
//     marginRight: wp('4%'),
//   },
//   doctorInfo: {
//     justifyContent: 'center',
//   },
//   doctorName: {
//     fontSize: hp('2.2%'),
//     fontWeight: 'bold',
//   },
//   doctorSpeciality: {
//     color: '#6B7280',
//     fontSize: hp('1.8%'),
//     marginBottom: hp('0.5%'),
//   },
//   locationContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   locationText: {
//     color: '#6B7280',
//     fontSize: hp('1.8%'),
//     marginLeft: wp('1%'),
//   },
//   serviceContainer: {
//     backgroundColor: '#F9FAFB',
//     paddingVertical: hp('2%'),
//     paddingHorizontal: wp('3%'),
//     borderRadius: wp('3%'),
//     marginBottom: hp('2%'),
//   },
//   sectionTitle: {
//     fontSize: hp('2%'),
//     fontWeight: 'bold',
//     marginBottom: hp('1%'),
//   },
//   heading:{
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: hp('1%'),
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: hp('0.8%'),
//   },
//   rowText: {
//     marginLeft: wp('2%'),
//     fontSize: hp('2%'),
//   },
//   priceContainer: {
//     backgroundColor: '#F9FAFB',
//     paddingVertical: hp('2%'),
//     paddingHorizontal: wp('3%'),
//     borderRadius: wp('3%'),
//     marginBottom: hp('2%'),
//   },
//   priceText: {
//     fontSize: hp('2%'),
//     color: '#6B7280',
//   },
//   priceAmount: {
//     fontSize: hp('2%'),
//     fontWeight: 'bold',
//   },
//   totalPrice: {
//     fontSize: hp('2.2%'),
//     fontWeight: 'bold',
//     color: '#374151',
//   },
//   promoContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: hp('2%'),
//     paddingHorizontal: wp('3%'),
//     backgroundColor: '#F3F4F6',
//     borderRadius: wp('3%'),
//     marginBottom: hp('2%'),
//   },
//   promoText: {
//     fontSize: hp('2%'),
//     color: '#6B7280',
//   },
//   paymentButton: {
//     backgroundColor: '#6C63FF',
//     paddingVertical: hp('1.5%'),
//     borderRadius: wp('3%'),
//     alignItems: 'center',
//   },
//   paymentButtonText: {
//     color: '#fff',
//     fontSize: hp('2%'),
//     fontWeight: 'bold',
//   },
// });

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
	  backgroundColor: '#6C63FF',
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
  });

export default Record;
