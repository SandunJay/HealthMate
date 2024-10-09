import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function AppointmentHistoryItem({ appointment }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ID: {appointment.$id}</Text>
      <Text style={styles.text}>Date: {new Date(appointment.date).toLocaleDateString()}</Text>
      <Text style={styles.text}>Time: {appointment.time}</Text>
      <Text style={styles.text}>Doctor: {appointment.doctor}</Text>
      <Text style={styles.text}>Category: {appointment.category}</Text>
      <Text style={styles.text}>Description: {appointment.description}</Text>
      <Text style={styles.text}>Status: {appointment.status}</Text>
      <Text style={styles.text}>Deleted At: {appointment.deleted_at}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});

export default AppointmentHistoryItem;
