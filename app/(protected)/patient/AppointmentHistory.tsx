import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Button, Image } from 'react-native';
import { databases } from './appwriteConfig';
import AppointmentHistoryItem from './AppointmentHistoryItem'; // Import the new component

function AppointmentHistory() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await databases.listDocuments('appoint', '67056a470030d9416981'); // Replace with your database and collection IDs
        console.log('Fetched appointments:', response);
        setAppointments(response.documents);
      } catch (error) {
        console.error('Error fetching appointment history:', error);
      }
    };

    fetchAppointments();
  }, []);

  const handleAppointmentPress = (item) => {
    console.log('Selected Appointment:', item);
    setSelectedAppointment(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedAppointment(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointment History</Text>
      {appointments.length === 0 ? (
        <Text>No appointment history available.</Text>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleAppointmentPress(item)} style={styles.itemContainer}>
              <Image
                source={{ uri: 'https://cdn.pixabay.com/photo/2023/10/05/07/38/appointment-8295104_1280.png' }}
                style={styles.image}
              />
              <View style={styles.textContainer}>
                <Text style={styles.itemText}>{item.description || 'N/A'}</Text>
                <Text style={styles.itemText}>{new Date(item.date).toLocaleDateString() || 'N/A'}</Text>
                <Text style={styles.itemText}>{item.time || 'N/A'}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Appointment Details</Text>
            {selectedAppointment ? (
              <AppointmentHistoryItem appointment={selectedAppointment} /> // Use the AppointmentHistoryItem component
            ) : (
              <Text style={styles.modalText}>No appointment selected.</Text>
            )}
            <Button title="Close" onPress={closeModal} color="#FF6347" />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2E8B57',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#E0F7E5',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 12,
    borderRadius: 4,
  },
  textContainer: {
    flex: 1,
  },
  itemText: {
    color: '#2E8B57',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2E8B57',
  },
  modalText: {
    marginVertical: 4,
    color: '#333',
  },
});

export default AppointmentHistory;
