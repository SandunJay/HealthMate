import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import React, { useRef } from "react";
import QRcodeGenarator from "../../components/QRcodeGenarator";
import { useGlobalContext } from "../../context/GlobalProvider";
import { captureRef } from "react-native-view-shot";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { router } from "expo-router";

const Qrcode = () => {
  const { user } = useGlobalContext();
  const viewShotRef = useRef(null);

  const captureAndShareQR = async () => {
    try {
      // Capture the QR code as base64
      const uri = await captureRef(viewShotRef, {
        format: "png",
        quality: 1,
        result: "base64", // Get the result as base64
      });

      // Define the file URI
      const fileUri = `${FileSystem.documentDirectory}qrcode_${user.accountId}.png`;

      // Save the base64 image as a file
      await FileSystem.writeAsStringAsync(fileUri, uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Check if sharing is available and share the file
      const isShareAvailable = await Sharing.isAvailableAsync();
      if (isShareAvailable) {
        await Sharing.shareAsync(fileUri);
      } else {
        console.log("Sharing is not available on this platform.");
      }
    } catch (error) {
      console.error("Error capturing or sharing QR code:", error);
    }
  };

  const handleSignInNavigate = () => {
    router.push("/sign-in"); // Correct navigation using expo-router
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Profile Page</Text>
        <Text>Hello {user?.accountId}</Text>

        {/* Capture the QR code */}
        <View ref={viewShotRef}>
          <QRcodeGenarator value={user?.accountId} />
        </View>

        {/* Button to share QR code */}
        <Button title="Save and Share QR Code" onPress={captureAndShareQR} />

        {/* Button to navigate to sign-in */}
        <Button title="SignIn" onPress={handleSignInNavigate} />
      </View>
    </SafeAreaView>
  );
};

export default Qrcode;

const styles = StyleSheet.create({});
