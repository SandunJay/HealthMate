import React from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { databases } from './appwriteConfig'; 
import * as FileSystem from 'expo-file-system';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'; 
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { ID } from 'appwrite';

const AppointmentItem = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { appointment } = route.params || {};

  const handleEdit = () => {
    navigation.navigate('AppointmentForm', { appointment });
  };

  const handleDelete = async () => {
    console.log(appointment);

    if (appointment) {
      try {
        // Step 1: Create a history record for the deleted appointment
        await databases.createDocument('appoint', '67056a470030d9416981', ID.unique(), {
          id: ID.unique(),
          date: new Date().toISOString(),
          time: appointment.time,
          description: appointment.description,
          doctor: appointment.doctor,
          category: appointment.category,
          status: 'deleted', 
          deleted_at: new Date().toISOString() // Record the time of deletion
        });

        // Step 2: Delete the appointment from the original collection
        await databases.deleteDocument('appoint', '66c9c467003136e731d1', appointment.$id);
        console.log(appointment.$id);

        Alert.alert('Success', 'Appointment deleted and added to history');
        navigation.goBack();
      } catch (error) {
        console.error('Error:', error); // Log the error details
        Alert.alert('Error', 'Could not delete appointment.');
      }
    }
  };

  const handleDownloadPDF = async () => {
    if (appointment) {
      try {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 800]);
        const { width, height } = page.getSize();
        const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

        // Title
        page.drawText('Appointment Details', {
          x: 50,
          y: height - 50,
          size: 24,
          color: rgb(0, 0.5, 0), // Green text
          font,
        });

        // Appointment details
        page.drawText(`ID: ${appointment.$id}`, {
          x: 50,
          y: height - 100,
          size: 18,
          font,
        });
        page.drawText(`Date: ${appointment.date}`, {
          x: 50,
          y: height - 140,
          size: 18,
          font,
        });
        page.drawText(`Time: ${appointment.time}`, {
          x: 50,
          y: height - 180,
          size: 18,
          font,
        });
        page.drawText(`Doctor: ${appointment.doctor}`, {
          x: 50,
          y: height - 220,
          size: 18,
          font,
        });
        page.drawText(`Category: ${appointment.category}`, {
          x: 50,
          y: height - 260,
          size: 18,
          font,
        });
        page.drawText(`Description: ${appointment.description}`, {
          x: 50,
          y: height - 300,
          size: 18,
          font,
        });

        // Save PDF and write it to filesystem
        const pdfBytes = await pdfDoc.save();
        const pdfUri = `${FileSystem.documentDirectory}Appointment_${appointment.$id}.pdf`;
        await FileSystem.writeAsStringAsync(pdfUri, pdfBytes.toString('base64'), {
          encoding: FileSystem.EncodingType.Base64,
        });

        Alert.alert('Success', `PDF saved to ${pdfUri}`);
      } catch (error) {
        Alert.alert('Error', 'Could not generate PDF.');
      }
    }
  };

  if (!appointment) {
    return (
      <View style={styles.noDetailsContainer}>
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
          <Button
            mode="contained"
            onPress={handleEdit}
            style={styles.button}
            icon={() => <AntDesign name="edit" size={16} color="white" />}
          >
            Edit
          </Button>
          <Button
            mode="contained"
            onPress={handleDelete}
            color="red"
            style={styles.button}
            icon={() => <MaterialIcons name="delete" size={16} color="white" />}
          >
            Delete
          </Button>
          <Button
            mode="contained"
            onPress={handleDownloadPDF}
            style={styles.button}
            icon={() => <AntDesign name="download" size={16} color="white" />}
          >
            Download PDF
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff', // White background for the entire container
  },
  card: {
    marginVertical: 10,
    borderRadius: 12, // Smooth corners for the card
    elevation: 5,
    backgroundColor: '#ffffff', // White card background
    borderColor: '#199A8E', // Primary color for the border
    borderWidth: 1.5, // Slightly thicker border
  },
  heading: {
    fontSize: 26, // Slightly larger font size for the heading
    fontWeight: 'bold',
    color: '#199A8E', // Primary color for the heading
    marginBottom: 12, // More space below the heading
    textAlign: 'center',
  },
  detail: {
    fontSize: 17, // Slightly larger font for the details
    marginVertical: 6, // Spacing between the detail lines
    color: '#333', // Dark text for the details
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Evenly spaced buttons
    marginTop: 25, // Extra margin on top of buttons
  },
  button: {
    flex: 1,
    marginHorizontal: 8, // Spacing between buttons
    paddingVertical: 10, // Larger button padding
    borderRadius: 6, // Smooth corners for buttons
    backgroundColor: '#199A8E', // Primary color for the button background
  },
  noDetailsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDetails: {
    fontSize: 20, // Larger font size for no-details message
    color: '#199A8E', // Primary color for no-details message
  },
});



export default AppointmentItem;
