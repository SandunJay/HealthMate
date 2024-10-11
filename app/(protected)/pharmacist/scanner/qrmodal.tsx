// import React, { useState } from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet, Button } from 'react-native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import Modal from 'react-native-modal';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
// import { Colors } from '@/constants/Colors';

// const QRCodeModal = ({ isVisible, onClose, onQRCodeRead, isDarkMode }: { isVisible: boolean, onClose: any, onQRCodeRead: any, isDarkMode: boolean }) => {
//   const [facing, setFacing] = useState<CameraType>('back');
//   const [permission, requestPermission] = useCameraPermissions();

//   if (!permission) {
//     return <View />;
//   }

//   if (!permission.granted) {
//     return (
//       <View style={[styles.container, { backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background }]}>
//         <Text style={[styles.message, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>We need your permission to show the camera</Text>
//         <Button onPress={requestPermission} title="grant permission" />
//       </View>
//     );
//   }

//   function toggleCameraFacing() {
//     setFacing(current => (current === 'back' ? 'front' : 'back'));
//   }

//   return (
//     <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
//       <View style={[styles.container, { backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background }]}>
//         <TouchableOpacity style={styles.closeButton} onPress={onClose}>
//           <Icon name="close" size={hp('3%')} color="#fff" />
//         </TouchableOpacity>

//         <View style={styles.qrContainer}>
//           <CameraView style={styles.camera} facing={facing}>
//             <View style={styles.buttonContainer}>
//               <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
//                 <Text style={styles.text}>Flip Camera</Text>
//               </TouchableOpacity>
//             </View>
//           </CameraView>
//         </View>

//         <View style={[styles.userDetailsContainer, { backgroundColor: isDarkMode ? Colors.dark.cardBackground : '#E6F2E6' }]}>
//           <Image
//             source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
//             style={styles.userImage}
//           />
//           <View>
//             <Text style={[styles.userName, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>Ojaman</Text>
//             <Text style={[styles.userBankDetails, { color: isDarkMode ? Colors.dark.textSecondary : '#777' }]}>Bank - 0987 3422 8756</Text>
//           </View>
//         </View>

//         <TouchableOpacity 
//           style={[styles.checkoutButton, { backgroundColor: isDarkMode ? Colors.dark.icon : '#008000' }]} 
//           onPress={onClose}
//         >
//           <Text style={styles.checkoutButtonText}>CHECK OUT</Text>
//         </TouchableOpacity>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modal: {
//     justifyContent: 'center',
//     margin: 0,
//   },
//   container: {
//     borderRadius: 10,
//     overflow: 'hidden',
//     alignItems: 'center',
//     paddingBottom: hp('2%'),
//   },
//   closeButton: {
//     position: 'absolute',
//     top: hp('2%'),
//     right: wp('5%'),
//     zIndex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     padding: wp('2%'),
//     borderRadius: wp('5%'),
//   },
//   qrContainer: {
//     backgroundColor: '#004d00',
//     width: wp('100%'),
//     height: hp('60%'),
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   userDetailsContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: 10,
//     width: wp('85%'),
//     padding: wp('4%'),
//     marginTop: hp('-5%'),
//   },
//   userImage: {
//     width: wp('15%'),
//     height: wp('15%'),
//     borderRadius: wp('7.5%'),
//     marginRight: wp('4%'),
//   },
//   userName: {
//     fontSize: wp('5%'),
//     fontWeight: 'bold',
//   },
//   userBankDetails: {
//     fontSize: wp('4%'),
//   },
//   checkoutButton: {
//     width: wp('85%'),
//     paddingVertical: hp('2%'),
//     borderRadius: 10,
//     marginTop: hp('2%'),
//   },
//   checkoutButtonText: {
//     color: 'white',
//     textAlign: 'center',
//     fontSize: wp('5%'),
//     fontWeight: 'bold',
//   },
//   message: {
//     textAlign: 'center',
//     paddingBottom: 10,
//   },
//   camera: {
//     flex: 1,
//   },
//   buttonContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: 'transparent',
//     margin: 64,
//   },
//   button: {
//     flex: 1,
//     alignSelf: 'flex-end',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//   },
// });

// export default QRCodeModal;