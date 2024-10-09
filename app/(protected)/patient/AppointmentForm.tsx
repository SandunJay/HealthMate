import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';
import { Button, TextInput as PaperInput, Card, Divider, Title, Subheading } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; // For navigation
import { client, databases } from './appwriteConfig'; // Appwrite config import
import { ID, Models } from 'appwrite'; // Import ID and Models from Appwrite
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define your stack parameter types for navigation
type RootStackParamList = {
  Appointment: { newAppointment: Models.Document };
  AppointmentForm: undefined;
};

type AppointmentFormNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AppointmentForm'
>;

const AppointmentForm = () => {
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string>('');
  const [isTimePickerVisible, setTimePickerVisibility] = useState<boolean>(false);
  const [selectedDoctor, setSelectedDoctor] = useState<string | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [doctors, setDoctors] = useState<Array<{ label: string; value: string }>>([]);
  const [categories] = useState<Array<{ label: string; value: string }>>([
    { label: 'General', value: 'General' },
    { label: 'Cardiology', value: 'Cardiology' },
  ]);

  // Typed navigation hook
  const navigation = useNavigation<AppointmentFormNavigationProp>();

  useEffect(() => {
    if (selectedCategory) {
      fetchDoctorsByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchDoctorsByCategory = (category: string) => {
    const doctorList = {
      General: [
        { label: 'Dr. Smith', value: 'dr_smith' },
        { label: 'Dr. Johnson', value: 'dr_johnson' },
      ],
      Cardiology: [
        { label: 'Dr. Brown', value: 'dr_brown' },
        { label: 'Dr. Davis', value: 'dr_davis' },
      ],
    };

    setDoctors(doctorList[category] || []);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const handleTimeConfirm = (date: Date) => {
    setSelectedTime(date.toLocaleTimeString());
    setTimePickerVisibility(false);
  };

  const handleSubmit = async () => {
    try {
      const response = await databases.createDocument(
        'appoint', // Database ID
        '66c9c467003136e731d1', // Collection ID
        ID.unique(), // Automatically generate a unique document ID
        { 
          date: selectedDate,
          time: selectedTime,
          doctor: selectedDoctor,
          description: description,
          category: selectedCategory,
        }
      );
      console.log('Appointment successfully created:', response);

      // Navigate to the Appointment screen and pass the appointment data
      navigation.navigate('Appointment', { newAppointment: response });
    } catch (error) {
      console.error('Error creating appointment:', error);
      Alert.alert('Error', 'Failed to create appointment. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
        <Card.Content>
          <Subheading style={styles.label}>Select Appointment Type:</Subheading>
          <RNPickerSelect
            placeholder={{ label: 'Select a category', value: null }}
            items={categories}
            onValueChange={(value) => setSelectedCategory(value)}
            value={selectedCategory}
            style={pickerStyles}
          />

          <Subheading style={styles.label}>Select Date:</Subheading>
          <Calendar
            onDayPress={(day) => handleDateChange(day.dateString)}
            markedDates={{
              [selectedDate || '']: { selected: true, marked: true },
            }}
            style={styles.calendar}
          />

          <Subheading style={styles.label}>Select Time:</Subheading>
          <Button mode="contained" onPress={() => setTimePickerVisibility(true)} style={styles.button}>
            {selectedTime || 'Select Time'}
          </Button>
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleTimeConfirm}
            onCancel={() => setTimePickerVisibility(false)}
          />

          <Subheading style={styles.label}>Select Doctor:</Subheading>
          <RNPickerSelect
            placeholder={{ label: 'Select a doctor', value: null }}
            items={doctors}
            onValueChange={(value) => setSelectedDoctor(value)}
            value={selectedDoctor}
            style={pickerStyles}
          />

          <PaperInput
            label="Description"
            mode="outlined"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
          />

          <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
            Submit
          </Button>
        </Card.Content>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  card: {
    borderRadius: 8,
    elevation: 4,
    backgroundColor: '#ffffff',
    borderColor: '#007BFF',
    borderWidth: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#007BFF',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  calendar: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginBottom: 10,
  },
  submitButton: {
    marginTop: 20,
  },
});

const pickerStyles = StyleSheet.create({
  inputIOS: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  inputAndroid: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default AppointmentForm;
