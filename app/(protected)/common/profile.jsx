import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { fetchUserData } from "../../../lib/appwrite";

const Profile = () => {
  const { post } = useLocalSearchParams();
  const [userdata, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await fetchUserData(post);
        console.log("Fetched user data:", data);
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [post]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {userdata ? (
          <SafeAreaView>
            <View>
              <Text>Email: {userdata.email}</Text>
              <Text>Username: {userdata.username}</Text>
              <Text>Age: {userdata.age}</Text>
              <Text>Gender: {userdata.gender}</Text>
              <Text>Blood Type: {userdata.bloodType}</Text>
              <Text>Contact: {userdata.contact}</Text>
            </View>
            <View>
              <Link href="../(protected)/patient/index">
                <Text>Move to Home</Text>
              </Link>
            </View>
          </SafeAreaView>
        ) : (
          <Text>No user data found.</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
