import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

const API_ENDPOINT = 'https://cloud.appwrite.io/v1/databases/66c9c467003136e731d1/collections/appoint/documents';
const API_KEY = 'standard_a615b85885ddf3b1636ad98e22b6b256782d0a1745b09ed68ae2474f69add021400f3dab5b300aac45e242357f9b71026e8fe6659b4e7df79e1db27d2901bc8997eb621069348276fab425390802814f9c051faa63370566af0aa95f8b17b0be5d030258c179e17c2675624d23b307fd7cdad9490b99a38b9812340ad159d4ed';

const AppointmentForm = () => {
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string>('');
  const [isTimePickerVisible, setTimePickerVisibility] = useState<boolean>(false);
  const [selectedDoctor, setSelectedDoctor] = useState<string | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [doctors, setDoctors] = useState<Array<{ label: string; value: string }>>([]);
  const [categories, setCategories] = useState<Array<{ label: string; value: string }>>([
    { label: 'General', value: 'General' },
    { label: 'Cardiology', value: 'Cardiology' },
    // Add more categories as needed
  ]);

  useEffect(() => {
    if (selectedCategory) {
      fetchDoctorsByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchDoctorsByCategory = (category: string) => {
    const doctorList = {
      'General': [
        { label: 'Dr. Smith', value: 'dr_smith' },
        { label: 'Dr. Johnson', value: 'dr_johnson' },
      ],
      'Cardiology': [
        { label: 'Dr. Brown', value: 'dr_brown' },
        { label: 'Dr. Davis', value: 'dr_davis' },
      ],
      // Add more categories and doctors as needed
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
      const response = await axios.post(
        API_ENDPOINT,
        {
            data: {
              date: '2024-09-12',
              time: '15:00',
              doctor: 'Dr. Smith',
              description: 'Patient Checkup',
              category: 'General',
            }
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-Appwrite-Project': 'your_project_id',
              'X-Appwrite-Key': API_KEY,
            },
          }
        );
        console.log('Document created:', response.data);
      } catch (error) {
        console.error('Error creating document:', error);
      }
    };
  
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Appointment Form</Text>
      
      <Text style={styles.label}>Select Appointment Type:</Text>
      <RNPickerSelect
        placeholder={{ label: 'Select a category', value: null }}
        items={categories}
        onValueChange={(value) => setSelectedCategory(value)}
        value={selectedCategory}
        style={pickerStyles}
      />

      <Text style={styles.label}>Select Date:</Text>
      <Calendar
        onDayPress={(day) => handleDateChange(day.dateString)}
        markedDates={{
          [selectedDate || '']: { selected: true, marked: true },
        }}
        style={styles.calendar}
      />

      <Text style={styles.label}>Select Time:</Text>
      <Button title={selectedTime || 'Select Time'} onPress={() => setTimePickerVisibility(true)} />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={() => setTimePickerVisibility(false)}
      />

      <Text style={styles.label}>Select Doctor:</Text>
      <RNPickerSelect
        placeholder={{ label: 'Select a doctor', value: null }}
        items={doctors}
        onValueChange={(value) => setSelectedDoctor(value)}
        value={selectedDoctor}
        style={pickerStyles}
      />

      <TextInput
        placeholder="Description"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  calendar: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
  },
});

const pickerStyles = StyleSheet.create({
  inputIOS: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  inputAndroid: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default AppointmentForm;
