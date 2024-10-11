// import React, { useEffect, useRef, useState } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Modal, Pressable, TextInput, Button } from 'react-native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { router, Stack } from 'expo-router';
// import QRCodeModal from './qrmodal';
// import { Colors } from '@/constants/Colors';
// import { useGlobalContext } from '@/context/GlobalProvider';
// import { Entypo } from '@expo/vector-icons';
// import { MaterialIcons } from '@expo/vector-icons';
// import { BarCodeScanner } from 'expo-barcode-scanner';
// // import NfcManager, { NfcTech } from 'react-native-nfc-manager';
// import { fetchUserData } from '@/lib/appwrite';

// interface UserData {
//   $id: string;
//   name: string;
//   email: string;
// }

// const NFCScanner = () => {
//   const { isDarkMode } = useGlobalContext();
//   const [nfcDetected, setNfcDetected] = useState(false);
//   const [nfcAnimation] = useState(new Animated.Value(0));
//   const filterAnimation = useRef(new Animated.Value(0)).current;
//   const [modalAnimation] = useState(new Animated.Value(0));
//   const [showFilter, setShowFilter] = useState(false);
//   const [showQRCodeModal, setShowQRCodeModal] = useState(false);
//   const [showManualEntryModal, setShowManualEntryModal] = useState(false);
//   const [patientId, setPatientId] = useState('');
//   const [selectedFilter, setSelectedFilter] = useState('');

//   const [userData, setUserData] = useState<UserData | null>(null);

//   const [hasPermission, setHasPermission] = useState(null);
//   const [scanned, setScanned] = useState(false);

//   useEffect(() => {
//     const getBarCodeScannerPermissions = async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//       setHasPermission(status === 'granted');
//     };

//     getBarCodeScannerPermissions();
//   }, []);

//   const handleBarCodeScanned = ({ type, data }) => {
//     setScanned(true);
//     alert(`Bar code with type ${type} and data ${data} has been scanned!`);
//   };

//   if (hasPermission === null) {
//     return <Text>Requesting for camera permission</Text>;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   const openFilterPopup = () => {
//     setShowFilter(true);
//     Animated.timing(filterAnimation, {
//       toValue: 1,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   };

//   const closeFilterPopup = () => {
//     Animated.timing(filterAnimation, {
//       toValue: 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start(() => setShowFilter(false));
//   };

//   const openQRCodeModal = () => {
//     Animated.timing(modalAnimation, {
//       toValue: 1,
//       duration: 300,
//       useNativeDriver: true,
//     }).start(() => setShowQRCodeModal(true));
//   };

//   const closeQRCodeModal = () => {
//     Animated.timing(modalAnimation, {
//       toValue: 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start(() => setShowQRCodeModal(false));
//   };

//   const openManualEntryModal = () => {
//     Animated.timing(modalAnimation, {
//       toValue: 1,
//       duration: 300,
//       useNativeDriver: true,
//     }).start(() => setShowManualEntryModal(true));
//   };

//   const closeManualEntryModal = () => {
//     Animated.timing(modalAnimation, {
//       toValue: 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start(() => setShowManualEntryModal(false));
//   };

//   const handleFilterSelection = (filter: string) => {
//     setSelectedFilter(filter);
//     closeFilterPopup();

//     if (filter === 'QR Scanner') {
//       openQRCodeModal();
//     } else if (filter === 'Manual entry') {
//       openManualEntryModal();
//     }
//   };

//   const handleManualSubmit = () => {
//     router.push(`/pharmacist/scanner/prescription/${patientId}`);
//     closeManualEntryModal();
//   };


//   const nfcIconContainerStyle = nfcAnimation.interpolate({
//     inputRange: [0, 1],
//     outputRange: [hp('35%'), hp('5%')], 
//   });

//   return (
//     <View  style={[styles.container, { backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background }]}>
//       <Stack.Screen options={{headerShown:false}}/>
//       <View style={styles.header}>
//         <Text style={[styles.headerText, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>Scanner</Text>
//         <View style={styles.menuButton}>
//           <TouchableOpacity onPress={openFilterPopup}>
//             <Entypo name='dots-three-vertical' size={hp('3%')} color={isDarkMode ? Colors.dark.text : Colors.light.text} />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <Modal transparent visible={showFilter} animationType='fade'>
//         <TouchableOpacity style={styles.overlay} onPress={closeFilterPopup} />
//         <Animated.View
//           style={[
//             styles.filterPopup,
//             {
//               opacity: filterAnimation,
//               transform: [{
//                 translateY: filterAnimation.interpolate({
//                   inputRange: [0, 1],
//                   outputRange: [50, 0],
//                 }),
//               }],
//               backgroundColor: isDarkMode ? Colors.dark.cardBackground : Colors.light.background,
//             },
//           ]}
//         >
//           <Pressable
//             style={styles.filterItem}
//             onPress={() => handleFilterSelection('QR Scanner')}
//           >
//             <Text style={[styles.filterText, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>QR Scanner</Text>
//           </Pressable>
//           <View style={styles.separator} />
//           <Pressable
//             style={styles.filterItem}
//             onPress={() => handleFilterSelection('Manual entry')}
//           >
//             <Text style={[styles.filterText, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>Manual entry</Text>
//           </Pressable>
//         </Animated.View>
//       </Modal>

//       <QRCodeModal
//         isVisible={showQRCodeModal}
//         onClose={closeQRCodeModal}
//         onQRCodeRead={() => console.log('QR code read!')}
//         isDarkMode={isDarkMode}
//       />

//       <Animated.View style={[styles.iconContainer, { marginTop: nfcIconContainerStyle }]}>
//         <View style={[styles.nfcIcon, { backgroundColor: isDarkMode ? Colors.dark.text : Colors.light.tabIconDefault1 }]}>
//           <BarCodeScanner
//             onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//             style={StyleSheet.absoluteFillObject}
//           />
//           {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
//         </View>
//         <Text style={[styles.promptText, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>Place your NFC tag below the device</Text>
//       </Animated.View>

//       {nfcDetected && userData && (
//         <TouchableOpacity onPress={() => router.push(`/pharmacist/scanner/prescription/${userData.$id}`)}>
//           <View style={styles.userContainer}>
//             <View style={[styles.userCard, { backgroundColor: isDarkMode ? Colors.dark.cardBackground : Colors.light.background }]}>
//               {userData.name ? (
//                 <Text style={[styles.userName, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>
//                   {userData.name}
//                 </Text>
//               ) : (
//                 <Text style={[styles.userName, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>Unknown User</Text>
//               )}
//               {userData.email ? (
//                 <Text style={[styles.userAccount, { color: isDarkMode ? Colors.dark.textSecondary : '#666' }]}>
//                   Email No - {userData.email}
//                 </Text>
//               ) : (
//                 <Text style={[styles.userAccount, { color: isDarkMode ? Colors.dark.textSecondary : '#666' }]}>Email not available</Text>
//               )}
//             </View>
//           </View>
//         </TouchableOpacity>
//       )}


//       <Modal
//         transparent
//         visible={showManualEntryModal}
//         animationType="slide"
//         onRequestClose={closeManualEntryModal}
//       >
//         <View style={styles.manualEntryContainer}>
//           <View style={[styles.manualEntryContent, { backgroundColor: isDarkMode ? Colors.dark.cardBackground : Colors.light.background }]}>
//             <TextInput
//               placeholder="Enter ID"
//               placeholderTextColor={isDarkMode ? Colors.dark.textSecondary : '#ccc'}
//               value={patientId}
//               onChangeText={setPatientId}
//               style={[styles.manualEntryInput, { 
//                 backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background,
//                 color: isDarkMode ? Colors.dark.text : Colors.light.text,
//                 borderColor: isDarkMode ? Colors.dark.border : '#ccc'
//               }]}
//             />
//             <View style={styles.buttonRow}>
//               <TouchableOpacity onPress={closeManualEntryModal} style={[styles.cancelButton, { backgroundColor: isDarkMode ? Colors.dark.cardBackground : '#ddd' }]}>
//                 <Text style={[styles.buttonText, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={handleManualSubmit} style={[styles.submitButton, { backgroundColor: isDarkMode ? Colors.dark.tabIconDefault1 : Colors.light.tabIconDefault1 }]}>
//                 <Text style={styles.buttonText}>Submit</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: wp('5%'),
//     paddingVertical: hp('3%'),
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: hp('5%'),
//   },
//   headerText: {
//     fontSize: hp('3%'),
//     fontWeight: 'bold',
//   },
//   menuButton: {
//     fontSize: hp('5.5%'),
//   },
//   iconContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: hp('2%'),
//   },
//   nfcIcon: {
//     width: wp('20%'),
//     height: wp('20%'),
//     borderRadius: wp('10%'),
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   promptText: {
//     fontSize: hp('2.2%'),
//     textAlign: 'center',
//     marginTop: hp('1%'),
//   },
//   dummyButton: {
//     padding: hp('1.5%'),
//     borderRadius: hp('1%'),
//     marginTop: hp('5%'),
//     alignSelf: 'center',
//   },
//   userContainer: {
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   userCard: {
//     width: wp('70%'),
//     padding: hp('2%'),
//     borderRadius: hp('2%'),
//     borderWidth: 1,
//     borderColor: '#ddd',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: hp('5%'),
//   },
//   userImage: {
//     width: wp('20%'),
//     height: wp('20%'),
//     borderRadius: wp('10%'),
//     marginBottom: hp('1%'),
//   },
//   userName: {
//     fontSize: hp('2.5%'),
//     fontWeight: 'bold',
//   },
//   userAccount: {
//     fontSize: hp('2%'),
//     textAlign: 'center',
//   },
//   filterPopup: {
//     position: 'absolute',
//     top: hp('12%'),
//     right: wp('5%'),
//     width: wp('40%'),
//     borderRadius: 10,
//     paddingVertical: hp('1%'),
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   filterItem: {
//     paddingVertical: hp('1.5%'),
//     paddingHorizontal: wp('5%'),
//   },
//   filterText: {
//     fontSize: hp('2%'),
//   },
//   separator: {
//     height: 1,
//     backgroundColor: '#ccc',
//     marginHorizontal: wp('5%'),
//   },
//   overlay: {
//     flex: 1,
//     backgroundColor: 'transparent',
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//   },
//   manualEntryContainer: {
//     flex: 1,
//     justifyContent: 'flex-end',
//   },
//   manualEntryContent: {
//     padding: wp('5%'),
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     elevation: 10,
//   },
//   manualEntryInput: {
//     borderWidth: 1,
//     padding: hp('1.5%'),
//     borderRadius: 10,
//     marginBottom: hp('2%'),
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   cancelButton: {
//     padding: hp('1.5%'),
//     borderRadius: 10,
//     width: '45%',
//     alignItems: 'center',
//   },
//   submitButton: {
//     padding: hp('1.5%'),
//     borderRadius: 10,
//     width: '45%',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default NFCScanner;


// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Animated, Modal, Pressable, TextInput } from 'react-native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { router, Stack } from 'expo-router';
// import { Colors } from '@/constants/Colors';
// import { useGlobalContext } from '@/context/GlobalProvider';
// import { Entypo } from '@expo/vector-icons';
// import { BarCodeScanner } from 'expo-barcode-scanner';
// import { fetchUserData } from '@/lib/appwrite';

// interface UserData {
//   $id: string;
//   username: string;
//   email: string;
// }

// export default function QRScanner() {
//   const { isDarkMode } = useGlobalContext();
//     const { isIos} = useGlobalContext();
//   const [hasPermission, setHasPermission] = useState(null);
//   const [scanned, setScanned] = useState(false);
//   const [showManualEntryModal, setShowManualEntryModal] = useState(false);
//   const [patientId, setPatientId] = useState('');
//   const [userData, setUserData] = useState<UserData | null>(null);

//   useEffect(() => {
//     const getBarCodeScannerPermissions = async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//       setHasPermission(status === 'granted');
//     };

//     getBarCodeScannerPermissions();
//   }, []);

//   const handleBarCodeScanned = async ({ data }) => {
//     setScanned(true);
//      console.log('Scanned data:', data); 
//     try {
//       const user = await fetchUserData(data);
//       setUserData(user);
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       alert('Failed to fetch user data. Please try again.');
//     }
//   };

//   const handleManualSubmit = async () => {
//     try {
//       const user = await fetchUserData(patientId);
//       setUserData(user);
//       setShowManualEntryModal(false);
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       alert('Failed to fetch user data. Please try again.');
//     }
//   };

//   if (hasPermission === null) {
//     return <Text>Requesting camera permission</Text>;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={[styles.container, { backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background, paddingTop: isIos ? hp('6%') : hp('3%') }]}>
//       <Stack.Screen options={{ headerShown: false }} />
//       <View style={styles.header}>
//         <Text style={[styles.headerText, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>QR Scanner</Text>
//         <TouchableOpacity onPress={() => setShowManualEntryModal(true)}>
//           <Entypo name="keyboard" size={hp('3%')} color={isDarkMode ? Colors.dark.text : Colors.light.text} />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.scannerContainer}>
//         <BarCodeScanner
//           onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//           style={StyleSheet.absoluteFillObject}
//         />
//         <View style={styles.overlay}>
//           <View style={styles.scanArea} />
//         </View>
//       </View>

//       {scanned && !userData && (
//         <TouchableOpacity
//           style={[styles.rescanButton, { backgroundColor: isDarkMode ? Colors.dark.tabIconDefault1 : Colors.light.tabIconDefault1 }]}
//           onPress={() => setScanned(false)}
//         >
//           <Text style={styles.buttonText}>Scan Again</Text>
//         </TouchableOpacity>
//       )}

//       {userData && (
//         <TouchableOpacity onPress={() => router.push(`/pharmacist/scanner/prescription/${userData.$id}`)}>
//           <View style={styles.userContainer}>
//             <View style={[styles.userCard, { backgroundColor: isDarkMode ? Colors.dark.cardBackground : Colors.light.background }]}>
//               <Text style={[styles.userName, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>
//                 {userData.username || 'Unknown User'}
//               </Text>
//               <Text style={[styles.userAccount, { color: isDarkMode ? Colors.dark.textSecondary : '#666' }]}>
//                 Email: {userData.email || 'Not available'}
//               </Text>
//             </View>
//           </View>
//         </TouchableOpacity>
//       )}

//       <Modal
//         transparent
//         visible={showManualEntryModal}
//         animationType="slide"
//         onRequestClose={() => setShowManualEntryModal(false)}
//       >
//         <View style={styles.manualEntryContainer}>
//           <View style={[styles.manualEntryContent, { backgroundColor: isDarkMode ? Colors.dark.cardBackground : Colors.light.background }]}>
//             <TextInput
//               placeholder="Enter Patient ID"
//               placeholderTextColor={isDarkMode ? Colors.dark.textSecondary : '#ccc'}
//               value={patientId}
//               onChangeText={setPatientId}
//               style={[styles.manualEntryInput, { 
//                 backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background,
//                 color: isDarkMode ? Colors.dark.text : Colors.light.text,
//                 borderColor: isDarkMode ? Colors.dark.border : '#ccc'
//               }]}
//             />
//             <View style={styles.buttonRow}>
//               <TouchableOpacity onPress={() => setShowManualEntryModal(false)} style={[styles.cancelButton, { backgroundColor: isDarkMode ? Colors.dark.cardBackground : '#ddd' }]}>
//                 <Text style={[styles.buttonText, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={handleManualSubmit} style={[styles.submitButton, { backgroundColor: isDarkMode ? Colors.dark.tabIconDefault1 : Colors.light.tabIconDefault1 }]}>
//                 <Text style={styles.buttonText}>Submit</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: wp('5%'),
//     paddingVertical: hp('3%'),
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: hp('5%'),
//   },
//   headerText: {
//     fontSize: hp('3%'),
//     fontWeight: 'bold',
//   },
//   scannerContainer: {
//     aspectRatio: 1,
//     width: '100%',
//     overflow: 'hidden',
//     borderRadius: 20,
//     marginBottom: hp('2%'),
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   scanArea: {
//     width: wp('60%'),
//     height: wp('60%'),
//     borderWidth: 2,
//     borderColor: '#fff',
//     borderRadius: 20,
//   },
//   rescanButton: {
//     padding: hp('1.5%'),
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: hp('2%'),
//   },
//   userContainer: {
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   userCard: {
//     width: wp('90%'),
//     padding: hp('2%'),
//     borderRadius: hp('2%'),
//     borderWidth: 1,
//     borderColor: '#ddd',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: hp('5%'),
//   },
//   userName: {
//     fontSize: hp('2.5%'),
//     fontWeight: 'bold',
//   },
//   userAccount: {
//     fontSize: hp('2%'),
//     textAlign: 'center',
//   },
//   manualEntryContainer: {
//     flex: 1,
//     justifyContent: 'flex-end',
//   },
//   manualEntryContent: {
//     padding: wp('5%'),
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     elevation: 10,
//   },
//   manualEntryInput: {
//     borderWidth: 1,
//     padding: hp('1.5%'),
//     borderRadius: 10,
//     marginBottom: hp('2%'),
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   cancelButton: {
//     padding: hp('1.5%'),
//     borderRadius: 10,
//     width: '45%',
//     alignItems: 'center',
//   },
//   submitButton: {
//     padding: hp('1.5%'),
//     borderRadius: 10,
//     width: '45%',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Modal, Pressable, TextInput, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { router, Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useGlobalContext } from '@/context/GlobalProvider';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { fetchUserData } from '@/lib/appwrite';

interface UserData {
  $id: string;
  username: string;
  email: string;
  img: string;
}

export default function QRScanner() {
  const { isDarkMode, isIos } = useGlobalContext();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showManualEntryModal, setShowManualEntryModal] = useState(false);
  const [patientId, setPatientId] = useState('');
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    console.log('Scanned data:', data);
    try {
      const user = await fetchUserData(data);
      setUserData(user);
    } catch (error) {
      console.error('Error fetching user data:', error);
      alert('Failed to fetch user data. Please try again.');
    }
  };

  const handleManualSubmit = async () => {
    try {
      const user = await fetchUserData(patientId);
      setUserData(user);
      setShowManualEntryModal(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      alert('Failed to fetch user data. Please try again.');
    }
  };

  const handleRetry = () => {
    setScanned(false);
    setUserData(null);
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background, paddingTop: isIos ? hp('6%') : hp('3%') }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>QR Scanner</Text>
        <TouchableOpacity onPress={() => setShowManualEntryModal(true)}>
          <Entypo name="keyboard" size={hp('3%')} color={isDarkMode ? Colors.dark.text : Colors.light.text} />
        </TouchableOpacity>
      </View>

      {!userData && (
        <View style={styles.scannerContainer}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.overlay}>
            <View style={styles.scanArea} />
          </View>
        </View>
      )}

      {scanned && !userData && (
        <TouchableOpacity
          style={[styles.rescanButton, { backgroundColor: isDarkMode ? Colors.dark.tabIconDefault1 : Colors.light.tabIconDefault1 }]}
          onPress={() => setScanned(false)}
        >
          <Text style={styles.buttonText}>Scan Again</Text>
        </TouchableOpacity>
      )}

      {userData && (
        <View style={styles.userContainer}>
          <View style={[styles.userCard, { backgroundColor: isDarkMode ? Colors.dark.cardBackground : Colors.light.background }]}>
            <Image
              source={{ uri: userData.img }}
              style={styles.userImage}
            />
            <Text style={[styles.userName, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>
              {userData.username || 'Unknown User'}
            </Text>
            <Text style={[styles.userAccount, { color: isDarkMode ? Colors.dark.textSecondary : '#666' }]}>
              Email: {userData.email || 'Not available'}
            </Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: isDarkMode ? Colors.dark.tabIconDefault1 : Colors.light.tabIconDefault1 }]}
                onPress={handleRetry}
              >
                <MaterialIcons name="refresh" size={hp('2.5%')} color="#fff" />
                <Text style={styles.buttonText}>Retry</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: isDarkMode ? Colors.dark.tabIconDefault1 : Colors.light.tabIconDefault1 }]}
                onPress={() => router.push(`/pharmacist/scanner/prescription/${userData.$id}`)}
              >
                <MaterialIcons name="arrow-forward" size={hp('2.5%')} color="#fff" />
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      <Modal
        transparent
        visible={showManualEntryModal}
        animationType="slide"
        onRequestClose={() => setShowManualEntryModal(false)}
      >
        <View style={styles.manualEntryContainer}>
          <View style={[styles.manualEntryContent, { backgroundColor: isDarkMode ? Colors.dark.cardBackground : Colors.light.background }]}>
            <TextInput
              placeholder="Enter Patient ID"
              placeholderTextColor={isDarkMode ? Colors.dark.textSecondary : '#ccc'}
              value={patientId}
              onChangeText={setPatientId}
              style={[styles.manualEntryInput, { 
                backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background,
                color: isDarkMode ? Colors.dark.text : Colors.light.text,
                borderColor: isDarkMode ? Colors.dark.border : '#ccc'
              }]}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={() => setShowManualEntryModal(false)} style={[styles.cancelButton, { backgroundColor: isDarkMode ? Colors.dark.cardBackground : '#ddd' }]}>
                <Text style={[styles.buttonText, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleManualSubmit} style={[styles.submitButton, { backgroundColor: isDarkMode ? Colors.dark.tabIconDefault1 : Colors.light.tabIconDefault1 }]}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('3%'),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('5%'),
  },
  headerText: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
  },
  scannerContainer: {
    aspectRatio: 1,
    width: '100%',
    overflow: 'hidden',
    borderRadius: 20,
    marginBottom: hp('2%'),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: wp('60%'),
    height: wp('60%'),
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 20,
  },
  rescanButton: {
    padding: hp('1.5%'),
    borderRadius: 10,
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  userContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  userCard: {
    width: wp('90%'),
    padding: hp('2%'),
    borderRadius: hp('2%'),
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('5%'),
  },
  userImage: {
    width: wp('30%'),
    height: wp('30%'),
    borderRadius: wp('15%'),
    marginBottom: hp('2%'),
  },
  userName: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
  },
  userAccount: {
    fontSize: hp('2%'),
    textAlign: 'center',
    marginBottom: hp('2%'),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: hp('1.5%'),
    borderRadius: 10,
    width: '45%',
  },
  manualEntryContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  manualEntryContent: {
    padding: wp('5%'),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  },
  manualEntryInput: {
    borderWidth: 1,
    padding: hp('1.5%'),
    borderRadius: 10,
    marginBottom: hp('2%'),
  },
  cancelButton: {
    padding: hp('1.5%'),
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  submitButton: {
    padding: hp('1.5%'),
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: hp('1%'),
  },
});