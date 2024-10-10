import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';
import { Button, TextInput as PaperInput, Card, Divider, Title, Subheading } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; // For navigation
import { client, databases } from './appwriteConfig'; // Appwrite config import
import { ID, Models } from 'appwrite'; // Import ID and Models from Appwrite
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Rating } from 'react-native-elements'; // For showing rating stars

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
  const [doctors, setDoctors] = useState<Array<{ label: string; value: string; image: string; rating: number }>>([]);
  const [categories] = useState<Array<{ label: string; value: string }>>([
    { label: 'General', value: 'General' },
    { label: 'Cardiology', value: 'Cardiology' },
  ]);

  // Store the selected doctor's details (image and rating)
  const [doctorDetails, setDoctorDetails] = useState<{ image: string; rating: number } | undefined>(undefined);

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
        { label: 'Dr. Smith', value: 'dr_smith', image: 'https://img.freepik.com/premium-photo/portrait-smiling-young-asian-female-doctor-with-stethoscope_943657-322.jpg', rating: 4.5 },
        { label: 'Dr. Johnson', value: 'dr_johnson', image: 'https://img.freepik.com/premium-photo/portrait-smiling-young-asian-female-doctor-with-stethoscope_943657-322.jpg', rating: 4.7 },
      ],
      Cardiology: [
        { label: 'Dr. Brown', value: 'dr_brown', image: 'https://img.freepik.com/premium-photo/portrait-smiling-young-asian-female-doctor-with-stethoscope_943657-322.jpg', rating: 4.8 },
        { label: 'Dr. Davis', value: 'dr_davis', image: 'https://img.freepik.com/premium-photo/portrait-smiling-young-asian-female-doctor-with-stethoscope_943657-322.jpg', rating: 4.6 },
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

  const handleDoctorSelect = (value: string | undefined) => {
    setSelectedDoctor(value);

    // Get doctor details (image and rating) based on the selected value
    const selectedDoctorDetails = doctors.find((doc) => doc.value === value);
    if (selectedDoctorDetails) {
      setDoctorDetails({
        image: selectedDoctorDetails.image,
        rating: selectedDoctorDetails.rating,
      });
    }
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
            onValueChange={(value) => handleDoctorSelect(value)}
            value={selectedDoctor}
            style={pickerStyles}
          />

          {/* Display the doctor's image and rating after selection */}
          {doctorDetails && (
            <View style={styles.doctorDetails}>
              <Image source={{ uri: doctorDetails.image }} style={styles.doctorImage} />
              <Rating
                imageSize={20}
                readonly
                startingValue={doctorDetails.rating}
                style={styles.doctorRating}
              />
              <Text>Rating: {doctorDetails.rating}</Text>
            </View>
          )}

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
    backgroundColor: '#FFFFFF', // White background
  },
  card: {
    borderRadius: 8,
    elevation: 4,
    backgroundColor: '#FFFFFF', // White background
    borderColor: '#199A8E', // Main theme color
    borderWidth: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#199A8E', // Main theme color
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333', // Dark text for readability
  },
  calendar: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginBottom: 10,
    backgroundColor: '#199A8E', // Main theme color for buttons
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#199A8E', // Main theme color for submit button
  },
  doctorDetails: {
    alignItems: 'center',
    marginVertical: 20,
  },
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  doctorRating: {
    marginVertical: 5,
  },
});

const pickerStyles = StyleSheet.create({
  inputIOS: {
    borderWidth: 1,
    borderColor: '#199A8E', // Main theme color for borders
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  inputAndroid: {
    borderWidth: 1,
    borderColor: '#199A8E', // Main theme color for borders
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default AppointmentForm;
