import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useGlobalContext } from "@/context/GlobalProvider";
import { images } from "../../constants";

const Home = () => {
  const { username } = useGlobalContext();
  const userName = username;
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("AppointmentHistory");
  };
  const handlePressTrack = () => {
    navigation.navigate("TrackAppointment");
  };

  const recentDoctors = [
    {
      id: 1,
      name: "Dr. Smith",
      image:
        "https://img.freepik.com/premium-photo/indian-doctor-smiling-face_1197144-1040.jpg",
    },
    {
      id: 2,
      name: "Dr. Johnson",
      image:
        "https://img.freepik.com/free-photo/doctor-wrking-their-clinic_23-2149281068.jpg",
    },
    {
      id: 3,
      name: "Dr. Williams",
      image:
        "https://bl-i.thgim.com/public/incoming/h6056h/article67229868.ece/alternates/FREE_1200/IMG-20230823-WA0016.jpg",
    },
    {
      id: 4,
      name: "Dr. Brown",
      image:
        "https://static.vecteezy.com/system/resources/previews/036/948/310/non_2x/ai-generated-smiling-young-male-doctor-in-a-white-coat-a-stethoscope-at-a-hospital-pro-photo.jpg",
    },
    {
      id: 5,
      name: "Dr. Taylor",
      image:
        "https://static.vecteezy.com/system/resources/previews/036/948/271/non_2x/ai-generated-smiling-young-male-doctor-in-a-white-coat-a-stethoscope-at-a-hospital-pro-photo.jpg",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <View style={styles.profileContainer}>
          <Text style={styles.userName}>{userName}</Text>
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp_FZBNQO2Mj7jdd7QAkq71nwczukcyEauww&s",
            }}
            style={styles.profileIcon}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.cardsContainer}>
        <TouchableOpacity style={[styles.card, styles.upcomingCard]}>
          <ImageBackground
            source={{
              uri: "https://media.istockphoto.com/id/1864917345/photo/march-2024-calendar-on-blue-background-desk-calendar.jpg?b=1&s=612x612&w=0&k=20&c=q0GS9noszjb3frmhnzzOsjG0B_RQXz8cJS-exczbMSs=",
            }}
            style={styles.imageBackground}
            imageStyle={styles.imageBorderRadius}
            resizeMode="cover" // Ensures the image covers the entire card
          >
            <Text style={styles.cardTitle} className="text-primary">
              Upcoming Scheduling Appointments
            </Text>
          </ImageBackground>
        </TouchableOpacity>

        {/* Other Cards - Grid layout (2 per row) */}
        <View style={styles.otherCardsContainer}>
          <TouchableOpacity
            style={[styles.card, styles.smallCard]}
            onPress={handlePressTrack}
          >
            <ImageBackground
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdSZcqXovZClG6dQ7puvPXl23v57lMZDNtKQ&s",
              }}
              style={styles.imageBackground}
              imageStyle={styles.imageBorderRadius}
              resizeMode="cover" // Ensures the image covers the entire card
            >
              <Text style={styles.cardTitle}>Track Appointment Progress</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, styles.smallCard]}
            onPress={handlePress}
          >
            <ImageBackground
              source={images.appointment}
              style={styles.imageBackground}
              imageStyle={styles.imageBorderRadius}
              resizeMode="cover"
            >
              <Text style={styles.cardTitle}>Appointment History</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, styles.smallCard]}>
            <ImageBackground
              source={{
                uri: "https://blog.troygroup.com/hubfs/Imported_Blog_Media/iStock-1015291542-1.jpg",
              }}
              style={styles.imageBackground}
              imageStyle={styles.imageBorderRadius}
              resizeMode="cover"
            >
              <Text style={styles.cardTitle}>Prescription</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, styles.smallCard]}>
            <ImageBackground
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6BuYV7c_tk-PlpYvYRVxxhZXjCwjmNEr06g&s",
              }}
              style={styles.imageBackground}
              imageStyle={styles.imageBorderRadius}
              resizeMode="cover"
            >
              <Text style={styles.cardTitle}>Other Services</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Recent Doctors</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.recentDoctorsContainer}
        >
          {recentDoctors.map((doctor) => (
            <View key={doctor.id} style={styles.doctorProfileContainer}>
              <Image
                source={{ uri: doctor.image }}
                style={styles.doctorProfileImage}
              />
              <Text style={styles.doctorName}>{doctor.name}</Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00693E",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontSize: 18,
    marginRight: 10,
    color: "#00693E",
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
  },
  cardsContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  card: {
    borderRadius: 15,

    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  upcomingCard: {
    backgroundColor: "#00693E",
    height: 180,
  },
  otherCardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  smallCard: {
    backgroundColor: "#5bc0de",
    width: "48%",
    height: 120,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#199A8E",
    textAlign: "left",
    marginBottom: "auto",
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#00693E",
  },
  recentDoctorsContainer: {
    marginTop: 10,
  },
  doctorProfileContainer: {
    alignItems: "center",
    marginRight: 20,
  },
  doctorProfileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ccc",
  },
  doctorName: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
    color: "#00693E",
  },
  imageBorderRadius: {
    borderRadius: 15,
  },
});

export default Home;
