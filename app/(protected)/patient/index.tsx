import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';

const Home = () => {
  // Temporary hardcoded user name (You can replace this with dynamic user data)
  const userName = 'John Doe';

  // Temporary list of recent doctors (replace with actual dynamic data)
  const recentDoctors = [
    { id: 1, name: 'Dr. Smith', image: 'https://img.freepik.com/premium-photo/indian-doctor-smiling-face_1197144-1040.jpg' },
    { id: 2, name: 'Dr. Johnson', image: 'https://img.freepik.com/free-photo/doctor-wrking-their-clinic_23-2149281068.jpg' },
    { id: 3, name: 'Dr. Williams', image: 'https://bl-i.thgim.com/public/incoming/h6056h/article67229868.ece/alternates/FREE_1200/IMG-20230823-WA0016.jpg' },
    { id: 4, name: 'Dr. Brown', image: 'https://static.vecteezy.com/system/resources/previews/036/948/310/non_2x/ai-generated-smiling-young-male-doctor-in-a-white-coat-a-stethoscope-at-a-hospital-pro-photo.jpg' },
    { id: 5, name: 'Dr. Taylor', image: 'https://static.vecteezy.com/system/resources/previews/036/948/271/non_2x/ai-generated-smiling-young-male-doctor-in-a-white-coat-a-stethoscope-at-a-hospital-pro-photo.jpg' },
  ];

  return (
    <View style={styles.container}>
      {/* Header with profile icon and user name */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <View style={styles.profileContainer}>
          <Text style={styles.userName}>{userName}</Text>
          <Image
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp_FZBNQO2Mj7jdd7QAkq71nwczukcyEauww&s' }} // Replace with actual profile image URL
            style={styles.profileIcon}
          />
        </View>
      </View>

      {/* Cards Section */}
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {/* Upcoming Scheduling Appointments - Larger card */}
        <TouchableOpacity style={[styles.card, styles.upcomingCard]}>
  <ImageBackground 
    source={{ uri: 'https://media.istockphoto.com/id/1864917345/photo/march-2024-calendar-on-blue-background-desk-calendar.jpg?b=1&s=612x612&w=0&k=20&c=q0GS9noszjb3frmhnzzOsjG0B_RQXz8cJS-exczbMSs=' }} 
    style={styles.imageBackground}
    imageStyle={styles.imageBorderRadius}
    resizeMode="cover" // Ensures the image covers the entire card
  >
    <Text style={styles.cardTitle}>Upcoming Scheduling Appointments</Text>
  </ImageBackground>
</TouchableOpacity>


        {/* Other Cards - Grid layout (2 per row) */}
        <View style={styles.otherCardsContainer}>
          <TouchableOpacity style={[styles.card, styles.smallCard]}>
          <ImageBackground 
    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdSZcqXovZClG6dQ7puvPXl23v57lMZDNtKQ&s' }} 
    style={styles.imageBackground}
    imageStyle={styles.imageBorderRadius}
    resizeMode="cover" // Ensures the image covers the entire card
  >
            <Text style={styles.cardTitle}>Track Appointment Progress</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, styles.smallCard]}>
          <ImageBackground 
    source={{ uri: 'data:image/jpeg;base64,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' }} 
    style={styles.imageBackground}
    imageStyle={styles.imageBorderRadius}
    resizeMode="cover" // Ensures the image covers the entire card
  >
            <Text style={styles.cardTitle}>Appointment History</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, styles.smallCard]}>
          <ImageBackground 
    source={{ uri: 'https://blog.troygroup.com/hubfs/Imported_Blog_Media/iStock-1015291542-1.jpg' }} 
    style={styles.imageBackground}
    imageStyle={styles.imageBorderRadius}
    resizeMode="cover" // Ensures the image covers the entire card
  >
            <Text style={styles.cardTitle}>Prescription</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, styles.smallCard]}>
          <ImageBackground 
    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6BuYV7c_tk-PlpYvYRVxxhZXjCwjmNEr06g&s' }} 
    style={styles.imageBackground}
    imageStyle={styles.imageBorderRadius}
    resizeMode="cover" // Ensures the image covers the entire card
  >
            <Text style={styles.cardTitle}>Other Services</Text>
            </ImageBackground>
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
    
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  upcomingCard: {
    backgroundColor: '#00693E', 
    height: 180, 
  },
  otherCardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', 
  },
  smallCard: {
    backgroundColor: '#5bc0de', 
    width: '48%', 
    height: 120, 
  },
  imageBackground: {
    flex: 1, 
    justifyContent: 'flex-start', 
    padding: 20, 
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C1C1C', 
    textAlign: 'left', 
    marginBottom: 'auto', 
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
  imageBorderRadius:{
    borderRadius: 15,
  }
});

export default Home;
