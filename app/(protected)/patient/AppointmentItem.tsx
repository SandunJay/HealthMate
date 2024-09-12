import React from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { databases } from './appwriteConfig'; // Import the Appwrite configuration
import * as FileSystem from 'expo-file-system';
import { PDFDocument, rgb } from 'pdf-lib';

const AppointmentItem = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { appointment } = route.params || {};

  const handleEdit = () => {
    navigation.navigate('AppointmentForm', { appointment }); // Pass appointment details to edit form
  };

  const handleDelete = async () => {
    if (appointment) {
      try {
        console.log('Attempting to delete document with ID:', appointment.$id);
  
        const response = await databases.getDocument(
          'appoint',
          '66c9c467003136e731d1',
          appointment.$id
        );
  
        if (response) {
          await databases.deleteDocument(
            'appoint',
            '66c9c467003136e731d1',
            appointment.$id
          );
          Alert.alert('Success', 'Appointment deleted');
          navigation.goBack();
        }
      } catch (error) {
        console.error('Error deleting appointment:', error);
        Alert.alert('Error', 'Could not delete appointment. Please check the ID and try again.');
      }
    }
  };

  const handleDownloadPDF = async () => {
    if (appointment) {
      try {
        // Create a new PDF document
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 800]);
        const { width, height } = page.getSize();

        // Embed standard fonts
        const font = await pdfDoc.embedFont(PDFDocument.Font.HelveticaBold);

        // Draw content on the page
        page.drawText('Appointment Details', {
          x: 50,
          y: height - 50,
          size: 24,
          color: rgb(0, 0, 1), // Blue
          font,
        });
        page.drawText(`ID: ${appointment.$id}`, { x: 50, y: height - 100, font });
        page.drawText(`Date: ${appointment.date}`, { x: 50, y: height - 140, font });
        page.drawText(`Time: ${appointment.time}`, { x: 50, y: height - 180, font });
        page.drawText(`Doctor: ${appointment.doctor}`, { x: 50, y: height - 220, font });
        page.drawText(`Category: ${appointment.category}`, { x: 50, y: height - 260, font });
        page.drawText(`Description: ${appointment.description}`, { x: 50, y: height - 300, font });

        // Save the PDF to the file system
        const pdfBytes = await pdfDoc.save();
        const pdfUri = `${FileSystem.documentDirectory}Appointment_${appointment.$id}.pdf`;
        await FileSystem.writeAsStringAsync(pdfUri, pdfBytes.toString('base64'), {
          encoding: FileSystem.EncodingType.Base64,
        });

        Alert.alert('Success', `PDF has been saved to ${pdfUri}`);
      } catch (error) {
        console.error('Error generating PDF:', error);
        Alert.alert('Error', 'Could not generate PDF. Please try again.');
      }
    }
  };

  if (!appointment) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDetails}>No appointment details available</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.heading}>Appointment Details</Title>
          <Paragraph style={styles.detail}>ID: {appointment.$id}</Paragraph>
          <Paragraph style={styles.detail}>Date: {appointment.date}</Paragraph>
          <Paragraph style={styles.detail}>Time: {appointment.time}</Paragraph>
          <Paragraph style={styles.detail}>Doctor: {appointment.doctor}</Paragraph>
          <Paragraph style={styles.detail}>Category: {appointment.category}</Paragraph>
          <Paragraph style={styles.detail}>Description: {appointment.description}</Paragraph>
        </Card.Content>
        <Card.Actions style={styles.buttonsContainer}>
          <Button mode="contained" onPress={handleEdit} style={styles.button}>Edit</Button>
          <Button mode="contained" onPress={handleDelete} color="red" style={styles.button}>Delete</Button>
          <Button mode="contained" onPress={handleDownloadPDF} style={styles.button}>Download PDF</Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  card: {
    margin: 0,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: '#ffffff',
    borderColor: '#007BFF',
    borderWidth: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 15,
  },
  detail: {
    fontSize: 16,
    marginVertical: 5,
    color: '#333',
  },
  buttonsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  noDetails: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
});

export default AppointmentItem;
