import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useGlobalContext } from '@/context/GlobalProvider';
import { getPrescriptionDetailsById, updatePrescriptionStatus } from '@/lib/appwrite';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

export type DrugType = {
  $id: string;
  inventoryDetails?: { name: string };
  dosage: string;
  duration: string;
};

export type UserType = {
  username: string,
  img: string,
  age: number,
  email: string
}

export type RecordType = {
  drugs: DrugType[];
  user: UserType;
  $id: string;
  patientid: string;
  diagnosis: string;
  date: string;
  note: string;
};

const Record = () => {
  const { isDarkMode } = useGlobalContext();
  const { isIos} = useGlobalContext();
  const [text, onChangeText] = useState('');
  const [record, setRecord] = useState<RecordType | null>(null); 
  const [loading, setLoading] = useState(true);
  const [reportPrescriptions, setReportPrescriptions] = useState([]);
  const [formattedPrescriptionDate, setFormattedPrescriptionDate] = useState('');
  const { id } = useLocalSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const prescriptionDetails = await getPrescriptionDetailsById(id);
        if (prescriptionDetails) {
          const formattedDate = formatDate(prescriptionDetails.date);
          setRecord(prescriptionDetails);
          setReportPrescriptions(prescriptionDetails.drugs || []); 
          setFormattedPrescriptionDate(formattedDate);
          onChangeText(prescriptionDetails.note || ''); 
        } else {
          setRecord(null);
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

    const handleSave = async () => {
    try {
      await updatePrescriptionStatus(id as string, 'dispensed', text); // Pass text as note (optional for dispensing)
      alert('Prescription marked as dispensed!');
    } catch (error) {
      alert('Failed to update prescription.');
    }
  };

  const handleFlag = async () => {
    if (!text.trim()) {
      alert('You must provide a note to flag a prescription.');
      return;
    }

    try {
      await updatePrescriptionStatus(id as string, 'rejected', text); // Note is mandatory for rejection
      alert('Prescription flagged as rejected!');
    } catch (error) {
      alert('Failed to flag prescription.');
    }
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background }]}>
        <ActivityIndicator size="large" color={isDarkMode ? Colors.dark.textSecondary : Colors.light.textSecondary} />
      </View>
    );
  }

  if (!record) {
    return (
      <View style={[styles.container, { backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background }]}>
        <Text style={{ color: isDarkMode ? Colors.dark.text : Colors.light.text }}>Record not found</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background , paddingTop: isIos ? hp('6%') : hp('3%') }]}>
      <Stack.Screen options={{headerShown:false}}/>
      <View style={styles.header}>
        {/* <TouchableOpacity onPress={() => router.push('/pharmacist/records/')}> */}
        <TouchableOpacity onPress={() => router.back()}>
          {/* <Entypo name='align-left' size={hp('3%')} color={isDarkMode ? Colors.dark.text : Colors.light.text} /> */}
          <MaterialCommunityIcons name='arrow-collapse-left' size={hp('3%')} color={isDarkMode ? Colors.dark.text : Colors.light.text} onPress={() => router.back()}/>
        </TouchableOpacity>
        <View style={{ flex: 1 }}/>
        <Text style={[styles.headerText, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>Prescription Record</Text>
      </View>

      <View style={[styles.doctorContainer, { backgroundColor: isDarkMode ? Colors.dark.cardBackground : '#F3F4F6' }]}>
        <Image
          source={{ uri: record.user.img }}
          style={styles.doctorImage}
        />
        <View style={styles.doctorInfo}>
          <View style={styles.nameAgeContainer}>
            <Text style={[styles.doctorName, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>{record.user.username}</Text>
            <Text style={[styles.ageText, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>{record.user.age} years</Text>
          </View>
          <Text style={[styles.doctorSpeciality, { color: isDarkMode ? Colors.dark.textSecondary : '#6B7280' }]}>Diagnosis: {record.diagnosis}</Text>
          <View style={styles.locationContainer}>
            <MaterialCommunityIcons name="calendar" size={hp('2%')} color={isDarkMode ? Colors.dark.textSecondary : '#6B7280'} />
            <Text style={[styles.locationText, { color: isDarkMode ? Colors.dark.textSecondary : '#6B7280' }]}>Date: {formattedPrescriptionDate}</Text>
          </View>
        </View>
      </View>

      <View style={[styles.priceContainer, { backgroundColor: isDarkMode ? Colors.dark.cardBackground : '#F9FAFB' }]}>
        <View style={styles.heading}>
          <Text style={[styles.sectionTitle, styles.itemName, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>Item Name</Text>
          <Text style={[styles.sectionTitle, styles.dosage, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>Dosage</Text>
          <Text style={[styles.sectionTitle, styles.duration, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>Duration</Text>
        </View>
        {reportPrescriptions.map((drug) => (
          <View style={styles.row} key={drug.$id}>
            <Text style={[ styles.itemName, { color: isDarkMode ? Colors.dark.textSecondary : '#6B7280' }]}>
              {drug.inventoryDetails?.name || 'Unknown Drug'}
            </Text>
            <Text style={[ styles.dosage, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>
              {drug.dosage}
            </Text>
            <Text style={[ styles.duration, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>
              {drug.duration}
            </Text>
          </View>
        ))}
      </View>

      <View style={[styles.promoContainer, { backgroundColor: isDarkMode ? Colors.dark.cardBackground : '#F3F4F6' }]}>
        <TextInput
          style={[styles.textInput, { 
            backgroundColor: isDarkMode ? Colors.dark.background : '#fff',
            color: isDarkMode ? Colors.dark.text : Colors.light.text,
            borderColor: isDarkMode ? Colors.dark.border : '#ccc'
          }]}
          value={text}
          onChangeText={onChangeText}
          placeholder="Enter notes here"
          placeholderTextColor={isDarkMode ? Colors.dark.textSecondary : '#ccc'}
          multiline={true}
          numberOfLines={3}
          clearTextOnFocus={true}
          editable={true}
        />
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity 
          style={[styles.paymentButton, { backgroundColor: isDarkMode ? Colors.dark.tabIconSelected : Colors.light.tabIconSelected }]}
          onPress={handleFlag} 
          >
          <Text style={styles.paymentButtonText}>Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.paymentButton, { backgroundColor: isDarkMode ? Colors.dark.tabIconDefault1 : Colors.light.tabIconDefault1 }]}
          onPress={handleSave}
          >
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
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  doctorContainer: {
    flexDirection: 'row',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('4%'),
    borderRadius: wp('3%'),
    marginBottom: hp('2%'),
    alignItems: 'center',
  },
  doctorImage: {
    width: hp('7%'),
    height: hp('7%'),
    borderRadius: hp('3.5%'),
    marginRight: wp('4%'),
  },
  doctorInfo: {
    flex: 1,
  },
  nameAgeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('0.5%'),
  },
  doctorName: {
    fontSize: hp('2.2%'),
    fontWeight: 'bold',
  },
  ageText: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
  doctorSpeciality: {
    fontSize: hp('1.8%'),
    marginBottom: hp('0.5%'),
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: hp('1.8%'),
    marginLeft: wp('1%'),
  },
  sectionTitle: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
    textAlign: 'center',
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
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('3%'),
    borderRadius: wp('3%'),
    marginBottom: hp('2%'),
  },
  itemName: {
    flex: 2,
    marginRight: wp('2%'),
    textAlign: 'justify',
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
  dosage: {
    flex: 1,
    textAlign: 'center',
  },
  duration: {
    flex: 1,
    textAlign: 'center',
  },
  promoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('3%'),
    borderRadius: wp('3%'),
    marginBottom: hp('2%'),
  },
  textInput: {
    width: '100%',
    padding: hp('1%'),
    borderRadius: wp('2%'),
    borderWidth: 1,
    textAlignVertical: 'top',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
  },
  paymentButton: {
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