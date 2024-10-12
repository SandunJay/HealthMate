import { StyleSheet, Text, View, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomeButtonGreen from "../../components/CustomeButtonGreen";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Dropdown } from "react-native-element-dropdown";

const SignUp = ({ navigation }) => {
  const { createUserAndSave, isLoading } = useGlobalContext();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    bloodtype: "",
    contact: "",
  });

  const gender = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  const [isSubmitting, setIsSubmiting] = useState(false);

  const submit = async () => {
    if (
      !form.fullName ||
      !form.email ||
      !form.password ||
      !form.age ||
      !form.gender ||
      !form.bloodtype ||
      !form.contact
    ) {
      Alert.alert("Error", "Please Fill in the all the fields");
    }
    setIsSubmiting(true);

    try {
      // const newUser = await createUser(
      //   form.email,
      //   form.password,
      //   form.fullName,
      //   form.age,
      //   form.gender,
      //   form.bloodtype,
      //   form.contact
      // );

      await createUserAndSave(
        form.email,
        form.password,
        form.fullName,
        form.age,
        form.gender,
        form.bloodtype,
        form.contact
      );

      console.log("User created and saved to context");
      router.push("/qrcode");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmiting(false);
    }
  };
  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6">
          <View className="justify-center items-center">
            <Image
              source={images.medicalLogoGreen}
              className="w-[350px] h-[70px]"
              resizeMode="contain"
            />
            <Text className="text-2xl text-primary font-psemibold mt-3">
              HealthMate
            </Text>
          </View>
          <Text className="text-2xl text-semibold mt-10 font-plight text-primary">
            Sign Up
          </Text>

          <FormField
            title="Full Name"
            value={form.fullName}
            handleChangeText={(e) => setForm({ ...form, fullName: e })}
            otherStyles="mt-7"
            keyboardType="default"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            keyboardType="default"
          />
          <FormField
            title="age"
            value={form.age}
            handleChangeText={(e) => setForm({ ...form, age: e })}
            otherStyles="mt-7"
            keyboardType="numeric"
          />
          {/* <Dropdown
            placeholder="Male"
            value={form.gender}
            valueField={gender}
            style="border-2 border-gray-100 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-primary items-center flex-row"
            selectedTextStyle="flex-1 text-primary font-psemibold text-base"
            onChange={(e) => setForm({ ...form, gender: e })}
          /> */}
          <FormField
            title="Gender"
            value={form.gender}
            handleChangeText={(e) => setForm({ ...form, gender: e })}
            otherStyles="mt-7"
            keyboardType="text"
          />
          <FormField
            title="Blood Type"
            value={form.bloodtype}
            handleChangeText={(e) => setForm({ ...form, bloodtype: e })}
            otherStyles="mt-7"
            keyboardType="default"
          />
          <FormField
            title="Contact"
            value={form.contact}
            handleChangeText={(e) => setForm({ ...form, contact: e })}
            otherStyles="mt-7"
            keyboardType="numeric"
          />
          <CustomeButtonGreen
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-6"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-200 font-pregular">
              Already Have an account?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-primary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
