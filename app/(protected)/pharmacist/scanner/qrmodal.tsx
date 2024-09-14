// import { View, Text } from 'react-native'
// import React from 'react'

// const QRModal = () => {
//   return (
//     <View>
//       <Text>QRModal</Text>
//     </View>
//   )
// }

// export default QRModal


// import React from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import Modal from 'react-native-modal';

// const QRCodeModal = ({ isVisible, onClose }) => {
//   return (
//     <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
//       <View style={styles.container}>
//         {/* QR Code Scanning Section */}
//         <View style={styles.qrContainer}>
//           <Image
//             source={{ uri: 'https://via.placeholder.com/300x300.png?text=QR+Code' }}
//             style={styles.qrCodeImage}
//             resizeMode="contain"
//           />
//         </View>

//         {/* User Details Section */}
//         <View style={styles.userDetailsContainer}>
//           <Image
//             source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
//             style={styles.userImage}
//           />
//           <View>
//             <Text style={styles.userName}>Ojaman</Text>
//             <Text style={styles.userBankDetails}>Bank - 0987 3422 8756</Text>
//           </View>
//         </View>

//         {/* Check Out Button */}
//         <TouchableOpacity style={styles.checkoutButton}>
//           <Text style={styles.checkoutButtonText}>CHECK OUT</Text>
//         </TouchableOpacity>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modal: {
//     justifyContent: 'center',
//     margin: 0, // full-screen modal
//   },
//   container: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     overflow: 'hidden',
//     alignItems: 'center',
//     paddingBottom: hp('2%'),
//   },
//   qrContainer: {
//     backgroundColor: '#004d00',
//     width: wp('100%'), // fullscreen width
//     height: hp('60%'), // height of the QR scanning area
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   qrCodeImage: {
//     width: wp('70%'),
//     height: wp('70%'),
//     borderRadius: 10,
//   },
//   userDetailsContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#E6F2E6',
//     borderRadius: 10,
//     width: wp('85%'),
//     padding: wp('4%'),
//     marginTop: hp('-5%'), // Overlay effect
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
//     color: '#777',
//   },
//   checkoutButton: {
//     backgroundColor: '#008000',
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
// });

// export default QRCodeModal;


// ScannerModal.js
// import React from 'react';
// import { View, Text, Button, Modal, StyleSheet, Image } from 'react-native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// const ScannerModal = ({ visible, onClose }) => {
//   return (
//     <Modal visible={visible} transparent={true} animationType="slide">
//       <View style={styles.modalOverlay}>
//         <View style={styles.modalContent}>
//           <Text style={styles.title}>Scan QR Code</Text>
//           <View style={styles.qrScannerContainer}>
//             {/* QR Code Scanner Placeholder (Replace with QR code scanner logic) */}
//             <Image
//               source={{ uri: 'https://via.placeholder.com/300x300.png?text=QR+Code' }}
//               style={styles.qrImage}
//             />
//           </View>
//           <Button title="Close" onPress={onClose} />
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     width: wp('90%'),
//     backgroundColor: '#FFF',
//     borderRadius: 10,
//     padding: wp('5%'),
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: wp('5%'),
//     fontWeight: 'bold',
//     marginBottom: hp('2%'),
//   },
//   qrScannerContainer: {
//     width: wp('70%'),
//     height: wp('70%'),
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F0F0F0',
//     borderRadius: 10,
//     marginBottom: hp('2%'),
//   },
//   qrImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'contain',
//   },
// });

// export default ScannerModal;


import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
// import QRCodeScanner from 'react-native-qrcode-scanner';
// import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';

const QRCodeModal = ({ isVisible, onClose, onQRCodeRead  }:{isVisible:boolean, onClose:any, onQRCodeRead:any}) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.container}>
        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Icon name="close" size={hp('3%')} color="#fff" />
        </TouchableOpacity>

        {/* QR Code Scanning Section */}
        <View style={styles.qrContainer}>
          {/* <QRCodeScanner
            onRead={onQRCodeRead}
            cameraStyle={styles.cameraStyle}
            topContent={
              <Text style={styles.scanText}>Scan the QR Code</Text>
            }
            fadeIn={false}
          /> */}
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
});

export default QRCodeModal;
