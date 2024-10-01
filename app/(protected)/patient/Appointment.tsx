import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { databases } from './appwriteConfig';

type AppointmentType = {
  $id: string;
  date: string;
  time: string;
  doctor: string;
  category: string;
  description: string;
};

const Appointment = () => {
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await databases.listDocuments(
          'appoint',
          '66c9c467003136e731d1'
        );
        setAppointments(response.documents);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    if (route.params?.newAppointment) {
      setAppointments((prevAppointments) => [
        ...prevAppointments,
        route.params.newAppointment as AppointmentType,
      ]);
    }
  }, [route.params?.newAppointment]);

  const handlePress = () => {
    navigation.navigate('AppointmentForm');
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  const handleItemPress = (item: AppointmentType) => {
    navigation.navigate('AppointmentItem', { appointment: item });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          {/* <Icon name="arrow-back" size={24} color="#007BFF" /> */}
        </TouchableOpacity>
       
      </View>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.appointmentItem,
              expandedId === item.$id && styles.expandedItem,
            ]}
            onPress={() => handleItemPress(item)}
          >
            <Text style={styles.doctorText}>Doctor: {item.doctor}</Text>
            {expandedId === item.$id && (
              <View style={styles.detailsContainer}>
                <Text>Date: {item.date}</Text>
                <Text>Time: {item.time}</Text>
                <Text>Category: {item.category}</Text>
                <Text>Description: {item.description}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      />
      <Button title="Add New Appointment" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
    marginRight: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  appointmentItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  expandedItem: {
    backgroundColor: '#e8f4fd',
    borderColor: '#007BFF',
  },
  doctorText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007BFF',
  },
  detailsContainer: {
    marginTop: 10,
  },
});

export default Appointment;
