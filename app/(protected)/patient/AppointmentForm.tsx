import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';

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
    // Example data, replace with your API call or data source
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

  const handleSubmit = () => {
    // Handle form submission here
    console.log('Selected Date:', selectedDate);
    console.log('Selected Time:', selectedTime);
    console.log('Selected Doctor:', selectedDoctor);
    console.log('Description:', description);
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
