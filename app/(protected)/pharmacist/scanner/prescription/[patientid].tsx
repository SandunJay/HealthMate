import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useGlobalContext } from '@/context/GlobalProvider';
import { getPatientDetails, getPrescriptionsByPatientId } from '@/lib/appwrite';
import { Entypo } from '@expo/vector-icons';

type Prescription = {
  $id: string;
  diagnosis: string;
  date: string;
  status: string;
  condition: string;
};

type PatientDetails = {
  img: string;
  username: string;
  age: number;
  email: string;
};

const Prescriptions = () => {
  const { isDarkMode } = useGlobalContext();
  const { isIos} = useGlobalContext();
  const { patientid } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [patientDetails, setPatientDetails] = useState<PatientDetails | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (patientid) {
        try {
          const fetchedPrescriptions = await getPrescriptionsByPatientId(patientid);
          const fetchedPatientDetails = await getPatientDetails(patientid);
          setPrescriptions(fetchedPrescriptions);
          setPatientDetails(fetchedPatientDetails);
        } catch (error) {
          console.error('Error fetching data: ', error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [patientid]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const goToRecord = (id: string) => {
    router.push({
      pathname: `/pharmacist/scanner/prescription/item/${id}`,
      params: { patientid: patientid }
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={isDarkMode ? '#fff' : '#000'} />
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background , paddingTop: isIos ? hp('6%') : hp('3%') }]}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/pharmacist/scanner')}>
          <Entypo name='chevron-left' size={hp('3%')} color={isDarkMode ? Colors.dark.text : Colors.light.text} />
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>Prescriptions</Text>
        <View style={{ width: hp('3%') }} />
      </View>

      {patientDetails && (
        <View style={[styles.userInfoSection, { backgroundColor: isDarkMode ? Colors.dark.cardBackground : Colors.main.gray }]}>
          <View style={styles.userDetails}>
            <Image
              source={{ uri: patientDetails.img }}
              style={styles.profileImage}
            />
            <View style={styles.userTextContainer}>
              <View style={styles.nameAgeContainer}>
                <Text style={[styles.doctorName, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>{patientDetails.username}</Text>
                <Text style={[styles.ageText, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>{patientDetails.age} years</Text>
              </View>
              <Text style={[styles.userId, { color: isDarkMode ? Colors.dark.textSecondary : '#fff' }]}>
                {patientDetails.email || 'No email available'}
              </Text>
            </View>
          </View>
        </View>
      )}

      <View style={[styles.prescriptionsSection, { backgroundColor: isDarkMode ? Colors.dark.cardBackground : '#fff' }]}>
        <Text style={[styles.prescriptionsTitle, { color: isDarkMode ? Colors.dark.text : '#333' }]}>All Prescriptions</Text>
        <View>
          {prescriptions.length > 0 ? (
            prescriptions.map((prescription) => (
              <TouchableOpacity
                key={prescription.$id}
                style={[styles.prescriptionItem, { backgroundColor: isDarkMode ? Colors.dark.cardBackground : '#f0f0f0' }]}
                onPress={() => goToRecord(prescription.$id)}
              >
                <View style={styles.prescriptionHeader}>
                  <Text style={[styles.prescriptionDiagnosis, { color: isDarkMode ? Colors.dark.text : '#333' }]}>
                    {prescription.diagnosis}
                  </Text>
                  <Text style={[styles.prescriptionCondition, { color: isDarkMode ? Colors.dark.textSecondary : '#777' }]}>
                    {prescription.condition}
                  </Text>
                </View>
                <View style={styles.prescriptionFooter}>
                  <Text style={[styles.prescriptionDate, { color: isDarkMode ? Colors.dark.textSecondary : '#777' }]}>
                    {formatDate(prescription.date)}
                  </Text>
                  <Text style={[
                    styles.prescriptionStatus,
                    { color: prescription.status === 'Active' ? '#4CAF50' : '#FF9800' }
                  ]}>
                    {prescription.status}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={[styles.noPrescriptions, { color: isDarkMode ? Colors.dark.text : '#333' }]}>
              No prescriptions found for this patient.
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('5%'),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  userInfoSection: {
    borderRadius: 15,
    padding: wp('4%'),
    marginBottom: hp('3%'),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  userDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: hp('7%'),
    height: hp('7%'),
    borderRadius: hp('3.5%'),
    marginRight: wp('4%'),
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
    marginLeft: wp('2%'),
  },
  userTextContainer: {
    flex: 1,
  },
  userId: {
    fontSize: wp('3.5%'),
    marginTop: hp('0.5%'),
  },
  prescriptionsSection: {
    borderRadius: 15,
    padding: wp('4%'),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  prescriptionsTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
  },
  prescriptionItem: {
    borderRadius: 10,
    padding: wp('4%'),
    marginBottom: hp('2%'),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  prescriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  prescriptionDiagnosis: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    flex: 1,
  },
  prescriptionCondition: {
    fontSize: wp('3.5%'),
    fontWeight: '600',
  },
  prescriptionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('1%'),
  },
  prescriptionDate: {
    fontSize: wp('3.5%'),
  },
  prescriptionStatus: {
    fontSize: wp('3.5%'),
    fontWeight: 'bold',
  },
  noPrescriptions: {
    textAlign: 'center',
    fontSize: wp('4%'),
    marginTop: hp('2%'),
  },
});

export default Prescriptions;