import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import Overlay from "./Overlay";

const scanner = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [hasScanned, setHasScanned] = useState(false);
  if (!permission) {
    return (
      <View>
        <Text>No Camera Permission Allowed...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View className="items-center min-h-[85vh] w-full justify-center">
        <Text>Need Permission to Open the Camera..</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }
  return (
    <View>
      <CameraView
        facing="back"
        className="items-center min-h-[85vh] w-full"
        onBarcodeScanned={({ data }) => {
          if (!hasScanned && data.length > 0) {
            setHasScanned(true);
            router.push({
              pathname: "../(protected)/common/profile",
              params: {
                post: data,
              },
            });
          } else {
            console.log("No Data found");
          }
        }}
      >
        <TouchableOpacity
          onPress={() => router.push("/sign-in")}
          className="items-center min-h-[85vh] w-full mt-10"
        >
          <Text className="text-left text-2xl text-blue-900">Go Back</Text>
        </TouchableOpacity>
        <Text className="text-center">QR code Scanner</Text>
      </CameraView>
    </View>
  );
};

export default scanner;

const styles = StyleSheet.create({});
