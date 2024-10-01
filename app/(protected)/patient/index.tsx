import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const Home = () => {
  // Temporary hardcoded user name (You can replace this with dynamic user data)
  const userName = 'John Doe';

  // Temporary list of recent doctors (replace with actual dynamic data)
  const recentDoctors = [
    { id: 1, name: 'Dr. Smith', image: 'https://via.placeholder.com/50' },
    { id: 2, name: 'Dr. Johnson', image: 'https://via.placeholder.com/50' },
    { id: 3, name: 'Dr. Williams', image: 'https://via.placeholder.com/50' },
    { id: 4, name: 'Dr. Brown', image: 'https://via.placeholder.com/50' },
    { id: 5, name: 'Dr. Taylor', image: 'https://via.placeholder.com/50' },
  ];

  return (
    <View style={styles.container}>
      {/* Header with profile icon and user name */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <View style={styles.profileContainer}>
          <Text style={styles.userName}>{userName}</Text>
          <Image
            source={{ uri: 'https://via.placeholder.com/40' }} // Replace with actual profile image URL
            style={styles.profileIcon}
          />
        </View>
      </View>

      {/* Cards Section */}
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {/* Upcoming Scheduling Appointments - Larger card */}
        <TouchableOpacity style={[styles.card, styles.upcomingCard]}>
          <Text style={styles.cardTitle}>Upcoming Scheduling Appointments</Text>
        </TouchableOpacity>

        {/* Other Cards - Grid layout (2 per row) */}
        <View style={styles.otherCardsContainer}>
          <TouchableOpacity style={[styles.card, styles.smallCard]}>
            <Text style={styles.cardTitle}>Track Appointment Progress</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, styles.smallCard]}>
            <Text style={styles.cardTitle}>Appointment History</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, styles.smallCard]}>
            <Text style={styles.cardTitle}>Prescription</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, styles.smallCard]}>
            <Text style={styles.cardTitle}>Other Services</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Doctors - Horizontal Scroll */}
        <Text style={styles.sectionTitle}>Recent Doctors</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recentDoctorsContainer}>
          {recentDoctors.map((doctor) => (
            <View key={doctor.id} style={styles.doctorProfileContainer}>
              <Image source={{ uri: doctor.image }} style={styles.doctorProfileImage} />
              <Text style={styles.doctorName}>{doctor.name}</Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

// Styles for the home page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00693E',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 18,
    marginRight: 10,
    color: '#00693E',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
  },
  cardsContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  card: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  upcomingCard: {
    backgroundColor: '#00693E', // Green background
    height: 180, // Larger height for Upcoming Scheduling Appointments
  },
  otherCardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allows cards to wrap to the next row
    justifyContent: 'space-between', // Ensures space between cards
  },
  smallCard: {
    backgroundColor: '#5bc0de', // Default light blue color for smaller cards
    width: '48%', // Two cards per row
    height: 120, // Smaller height
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // White text for titles
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#00693E',
  },
  recentDoctorsContainer: {
    marginTop: 10,
  },
  doctorProfileContainer: {
    alignItems: 'center',
    marginRight: 20,
  },
  doctorProfileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
  },
  doctorName: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00693E',
  },
});

export default Home;
