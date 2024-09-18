
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

const QRCodeModal = ({ isVisible, onClose, onQRCodeRead  }:{isVisible:boolean, onClose:any, onQRCodeRead:any}) => {

  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.container}>
        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Icon name="close" size={hp('3%')} color="#fff" />
        </TouchableOpacity>

         {/* QR Code Scanning Section */}
         <View style={styles.qrContainer}>
          <CameraView style={styles.camera} facing={facing}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                <Text style={styles.text}>Flip Camera</Text>
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>

        {/* User Details Section */}
        <View style={styles.userDetailsContainer}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
            style={styles.userImage}
          />
          <View>
            <Text style={styles.userName}>Ojaman</Text>
            <Text style={styles.userBankDetails}>Bank - 0987 3422 8756</Text>
          </View>
        </View>

        {/* Check Out Button */}
        <TouchableOpacity style={styles.checkoutButton} onPress={onClose}>
          <Text style={styles.checkoutButtonText}>CHECK OUT</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    margin: 0,
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    paddingBottom: hp('2%'),
  },
  closeButton: {
    position: 'absolute',
    top: hp('2%'),
    right: wp('5%'),
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: wp('2%'),
    borderRadius: wp('5%'),
  },
  qrContainer: {
    backgroundColor: '#004d00',
    width: wp('100%'),
    height: hp('60%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraStyle: {
    width: wp('100%'),
    height: hp('60%'),
  },
  scanText: {
    color: '#fff',
    fontSize: hp('2.5%'),
    marginBottom: hp('2%'),
  },
  userDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F2E6',
    borderRadius: 10,
    width: wp('85%'),
    padding: wp('4%'),
    marginTop: hp('-5%'),
  },
  userImage: {
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: wp('7.5%'),
    marginRight: wp('4%'),
  },
  userName: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  userBankDetails: {
    fontSize: wp('4%'),
    color: '#777',
  },
  checkoutButton: {
    backgroundColor: '#008000',
    width: wp('85%'),
    paddingVertical: hp('2%'),
    borderRadius: 10,
    marginTop: hp('2%'),
  },
  checkoutButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  // Camera COntainer
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default QRCodeModal;
