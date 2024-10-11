import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import CustomButtonGreen from "../../components/CustomeButtonGreen";
import { Link, router } from "expo-router";

const SignIn = () => {
  return (
    <SafeAreaView>
      <View className="w-full  items-center min-h-[85vh] px-4">
        <View className="mt-10 relative items-center">
          <Text className="mb-5">Welcome to</Text>
          <Text className="text-primary text-4xl font-pmedium">HealthMate</Text>
        </View>
        <Image
          source={images.scan}
          className="w-[380px] h-[300px] mt-[50px]"
          resizeMode="contain"
        />
        <Text className="text-gray-200 text-1xl">
          Tap Your HealthMate Id Card...
        </Text>
        <Text className="mt-6 text-primary text-2xl font-pmedium">Or</Text>
        <CustomButtonGreen
          title="Scan the QR Code"
          containerStyles="w-[350px] mt-7"
          handlePress={() => router.push("/scanner")}
        />

        <View className="mt-[100px]">
          <Text className="text-gray-200">
            Don't have an account?
            <Link href="/sign-up" className="text-primary">
              {" "}
              Sign Up
            </Link>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
