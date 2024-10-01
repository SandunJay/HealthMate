import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Chat from './chat';
const doctors = [
  { id: '1', name: 'Dr. John Doe' },
  { id: '2', name: 'Dr. Jane Smith' },
  { id: '3', name: 'Dr. Emily Johnson' },
];

const DoctorList = () => {
  const navigation = useNavigation();

  const handleDoctorSelect = (doctorName: string) => {
    navigation.navigate('Chat', { doctorName });
  };

  const renderDoctor = ({ item }: { item: { id: string; name: string } }) => (
    <TouchableOpacity style={styles.doctorItem} onPress={() => handleDoctorSelect(item.name)}>
      <Text style={styles.doctorName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={doctors}
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
    backgroundColor: '#f0f0f0',
  },
  list: {
    paddingTop: 20,
  },
  doctorItem: {
    padding: 20,
    backgroundColor: '#007bff',
    marginBottom: 10,
    borderRadius: 10,
  },
  doctorName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DoctorList;
