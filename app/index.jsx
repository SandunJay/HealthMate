import { Image, ScrollView, Text, View } from "react-native";
import React from "react";
import { Link, Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";

const Index = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full  items-center min-h-[85vh] px-4">
          <Image
            source={images.medicalLogo}
            className="w-[380px] h-[300px] mt-[150px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-4xl font-pmedium text-white">HealthMate</Text>
          </View>
          <View className="relative mb-5">
            <Text className="text-sm font-pregular text-center mt-[5px] text-white">
              Your Health Partner to Heal you Within...
            </Text>
          </View>
          <CustomButton
            title="Continue"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar />
    </SafeAreaView>
  );
};

export default Index;
