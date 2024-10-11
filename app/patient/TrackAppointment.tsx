import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

function TrackAppointment() {
  const [qrCode, setQrCode] = useState('');
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  const handleTrackAppointment = async () => {
    try {
      // Replace this URL with your API endpoint to fetch appointment details
      const response = await fetch(`https://your-api-endpoint/appointments/${qrCode}`);
      if (!response.ok) {
        throw new Error('Appointment not found');
      }

      const data = await response.json();
      setAppointmentDetails(data);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Track Appointment</Text>
      <TextInput
        style={styles.input}
        placeholder="Scan QR Code or Enter Code"
        value={qrCode}
        onChangeText={setQrCode}
      />
      <Button title="Track Appointment" onPress={handleTrackAppointment} />

      {appointmentDetails && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Appointment Details:</Text>
          <Text style={styles.detailsText}>ID: {appointmentDetails.id}</Text>
          <Text style={styles.detailsText}>Date: {new Date(appointmentDetails.date).toLocaleDateString()}</Text>
          <Text style={styles.detailsText}>Time: {appointmentDetails.time}</Text>
          <Text style={styles.detailsText}>Doctor: {appointmentDetails.doctor}</Text>
          <Text style={styles.detailsText}>Description: {appointmentDetails.description}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2E8B57',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  detailsContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#f9f9f9',
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 16,
    marginVertical: 2,
  },
});

export default TrackAppointment;
