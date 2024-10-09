import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Animated, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { databases } from './appwriteConfig';

type AppointmentType = {
  $id: string;
  date: string;
  time: string;
  doctor: string;
  category: string;
  description: string;
  image: string; // Added image field
};

const doctorImages = [
  'https://img.freepik.com/premium-photo/portrait-smiling-young-asian-female-doctor-with-stethoscope_943657-322.jpg',
  'https://img.freepik.com/premium-photo/portrait-smiling-female-asian-doctor-with-stethoscope_900706-26112.jpg?w=360',
  'https://img.freepik.com/premium-photo/portrait-friendly-female-doctor-workwear-with-stethoscope-neck_604472-19024.jpg',
];

const Appointment = () => {
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const route = useRoute();
  const navigation = useNavigation();
  const scaleAnim = new Animated.Value(1);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await databases.listDocuments('appoint', '66c9c467003136e731d1');
        const appointmentsWithImages = response.documents.map((doc: any, index: number) => ({
          ...doc,
          image: doctorImages[index % doctorImages.length], // Assign an image from the list in a loop
        }));
        setAppointments(appointmentsWithImages);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    if (route.params?.newAppointment) {
      const newAppointmentWithImage = {
        ...route.params.newAppointment,
        image: doctorImages[appointments.length % doctorImages.length], // Add image to new appointment
      };
      setAppointments((prevAppointments) => [
        ...prevAppointments,
        newAppointmentWithImage as AppointmentType,
      ]);
    }
  }, [route.params?.newAppointment]);

  const handlePress = () => {
    navigation.navigate('AppointmentForm');
  };

  const handleItemPress = (item: AppointmentType) => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate('AppointmentItem', { appointment: item });
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
              style={[styles.appointmentItem, expandedId === item.$id && styles.expandedItem]}
              onPress={() => handleItemPress(item)}
            >
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.doctorImage} />
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.doctorText}>Doctor: {item.doctor}</Text>
                {expandedId === item.$id && (
                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailText}>Date: {item.date}</Text>
                    <Text style={styles.detailText}>Time: {item.time}</Text>
                    <Text style={styles.detailText}>Category: {item.category}</Text>
                    <Text style={styles.detailText}>Description: {item.description}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </Animated.View>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={handlePress}>
        <Text style={styles.addButtonText}>Add New Appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0fff4',
    justifyContent: 'center',
  },
  appointmentItem: {
    flexDirection: 'row',
    padding: 20,
    borderWidth: 1,
    borderColor: '#28a745',
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  expandedItem: {
    backgroundColor: '#e0f7e4',
    borderColor: '#28a745',
  },
  imageContainer: {
    marginRight: 15,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  doctorText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#28a745',
    marginBottom: 8,
  },
  detailsContainer: {
    marginTop: 10,
    paddingLeft: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  addButton: {
    marginTop: 20,
    backgroundColor: '#28a745',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    shadowColor: '#28a745',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Appointment;
