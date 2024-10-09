import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Sample doctors data with images
const doctors = [
  { id: '1', name: 'Dr. John Doe', image: 'https://img.freepik.com/premium-photo/portrait-smiling-young-asian-female-doctor-with-stethoscope_943657-322.jpg' }, // Update with actual image path
  { id: '2', name: 'Dr. Jane Smith', image: 'https://img.freepik.com/premium-photo/portrait-smiling-young-asian-female-doctor-with-stethoscope_943657-322.jpg' },
  { id: '3', name: 'Dr. Emily Johnson', image: 'https://img.freepik.com/premium-photo/portrait-smiling-young-asian-female-doctor-with-stethoscope_943657-322.jpg' },
];

const DoctorList = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleDoctorSelect = (doctorName: string) => {
    navigation.navigate('Chat', { doctorName });
  };

  const renderDoctor = ({ item }: { item: { id: string; name: string; image: any } }) => (
    <TouchableOpacity style={styles.doctorItem} onPress={() => handleDoctorSelect(item.name)}>
      <Image source={{uri:item.image}} style={styles.doctorImage} />
      <Text style={styles.doctorName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Doctors..."
        placeholderTextColor="#aaa"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.id}
        renderItem={renderDoctor}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 50,
    borderColor: '#007bff',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 10,
    fontSize: 16,
  },
  list: {
    paddingTop: 20,
  },
  doctorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#e0f7e0', // Light green background
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  doctorImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // Circular image
    marginRight: 15,
  },
  doctorName: {
    color: '#007bff', // Dark green color
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DoctorList;
