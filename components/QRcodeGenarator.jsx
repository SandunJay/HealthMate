import QRCode from "react-native-qrcode-svg";
import { View, Image, Button } from "react-native";
import React, { useRef } from "react";
import { captureRef } from "react-native-view-shot";

const QRcodeGenarator = ({ value }) => {
  const qrRef = useRef(null); // Use a proper ref

  const generateQRCode = async () => {
    try {
      const uri = await captureRef(qrRef, {
        format: "png",
        quality: 1,
      });

      console.log("QR Code URI:", uri); // Log the URI
      return uri;
    } catch (error) {
      console.error("Failed to generate QR code:", error);
    }
  };

  return (
    <View>
      {/* Wrap the QR code with a View and assign the ref */}
      <View ref={qrRef} style={{ padding: 10 }}>
        <QRCode value={value} size={256} />
      </View>

      {/* Button to trigger QR code generation */}
      <Button title="Generate QR Code" onPress={generateQRCode} />
    </View>
  );
};

export default QRcodeGenarator;
