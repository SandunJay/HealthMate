// app/(protected)/patient/appointment.tsx
import { View, Text, Button, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const Appointment = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('AppointmentForm');
  };

  return (
    <View style={styles.container}>
      <Text>Appointments</Text>
      <Button title="Add New Appointment" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Appointment;
