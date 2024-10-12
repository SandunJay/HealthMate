import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router, useLocalSearchParams } from "expo-router";
import { fetchUserData } from "../../lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import { images } from "../../constants";
import CustomButtonRed from "@/components/CustomButtonRed";

const Profile = () => {
  const { post } = useLocalSearchParams();
  const [userdata, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setUsername } = useGlobalContext();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await fetchUserData(post);
        console.log("Fetched user data:", data);
        setUsername(data.username);
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
    <SafeAreaView className="bg-white h-full w-full">
      <View className="flex justify-center items-center py-3 ">
        {userdata ? (
          <SafeAreaView className="w-full p-5">
            {/* Profile Heading */}
            <Text className="text-center font-pregular text-2xl mb-5">
              User Profile
            </Text>

            {/* Background Card */}
            <View className="bg-primary h-[180px] w-full max-w-[320px] justify-center mx-auto rounded-3xl relative"></View>
            {/* Profile Image */}
            <Image
              source={images.profile}
              resizeMode="contain"
              style={{
                height: 155,
                width: 155,
                borderRadius: 999,
                borderColor: "#000000",
                borderWidth: 2,
                marginTop: -99,
                marginLeft: 120,
              }}
            />

            {/* User Information */}
            <View className="mt-6 text-center">
              <Text className="font-bold text-gray-800 text-xl mb-1 text-center">
                {userdata.username}
              </Text>
              <Text className="font-light text-gray-500 text-center">
                - Patient -
              </Text>
            </View>

            {/* User Details */}
            <View className="mt-8 space-y-4">
              <View className="flex-row justify-between mx-16">
                <Text className="font-semibold text-gray-700">Email:</Text>
                <Text className="text-gray-700">{userdata.email}</Text>
              </View>

              <View className="flex-row justify-between mx-16">
                <Text className="font-semibold text-gray-700">Username:</Text>
                <Text className="text-gray-700">{userdata.username}</Text>
              </View>

              <View className="flex-row justify-between mx-16">
                <Text className="font-semibold text-gray-700">Age:</Text>
                <Text className="text-gray-700">{userdata.age}</Text>
              </View>

              <View className="flex-row justify-between mx-16">
                <Text className="font-semibold text-gray-700">Gender:</Text>
                <Text className="text-gray-700">{userdata.gender}</Text>
              </View>

              <View className="flex-row justify-between mx-16">
                <Text className="font-semibold text-gray-700">Blood Type:</Text>
                <Text className="text-gray-700">{userdata.bloodType}</Text>
              </View>

              <View className="flex-row justify-between mx-16">
                <Text className="font-semibold text-gray-700">Contact:</Text>
                <Text className="text-gray-700">{userdata.contact}</Text>
              </View>
            </View>
            <CustomButtonRed
              title="Log out"
              handlePress={() => {
                router.push("/(auth)/sign-in");
              }}
              containerStyles="mt-6 max-w-[360px] ml-4"
            />
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
