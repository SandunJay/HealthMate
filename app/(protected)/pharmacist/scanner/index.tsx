import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Modal, Pressable, TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { Link, router, Stack } from 'expo-router';
import QRCodeModal from './qrmodal';


const NFCScanner = () => {
  const [nfcDetected, setNfcDetected] = useState(false);
  const [nfcAnimation] = useState(new Animated.Value(0));
  const filterAnimation = useRef(new Animated.Value(0)).current;
  const [modalAnimation] = useState(new Animated.Value(0));
  const [showFilter, setShowFilter] = useState(false);
  const [showQRCodeModal, setShowQRCodeModal] = useState(false);
  const [showManualEntryModal, setShowManualEntryModal] = useState(false);
  const [manualEntry, setManualEntry] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');

  // Filter Popup open and close animations
  const openFilterPopup = () => {
    setShowFilter(true);
    Animated.timing(filterAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeFilterPopup = () => {
    Animated.timing(filterAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setShowFilter(false));
  };

  // Model Open and close animations
  const openQRCodeModal = () => {
    Animated.timing(modalAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setShowQRCodeModal(true));
  };

  const closeQRCodeModal = () => {
    Animated.timing(modalAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setShowQRCodeModal(false));
  };


    // Manual Entry Modal Animation
  const openManualEntryModal = () => {
    Animated.timing(modalAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setShowManualEntryModal(true));
  };

  const closeManualEntryModal = () => {
    Animated.timing(modalAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setShowManualEntryModal(false));
  };

  const handleFilterSelection = (filter: string) => {
    setSelectedFilter(filter);
    closeFilterPopup();

    if (filter === 'QR Scanner') {
      openQRCodeModal();
    } else if (filter === 'Manual entry') {
      openManualEntryModal();
    }
  };

  const handleManualSubmit = () => {
    console.log('Manual Entry:', manualEntry);
    closeManualEntryModal();
  };

  const handleNfcDetected = () => {
    setNfcDetected(true);

    Animated.timing(nfcAnimation, {
      toValue: 1, 
      duration: 500, 
      useNativeDriver: false, 
    }).start();
  };

  const nfcIconContainerStyle = nfcAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [hp('35%'), hp('5%')], 
  });

  const patientdid = 'u002';

  return (
    <View style={styles.container}>
      <Stack.Screen options={{headerShown:false}}/>
      {/* Header Section */}
      <View style={styles.header}>
        {/* <TouchableOpacity style={styles.backButton} onPress={() => router.push('/pharmacist/')}>
          <Icon name="arrow-back" size={hp('3%')} color="#000" />
        </TouchableOpacity> */}
        <Text style={styles.headerText}>Scanner</Text>
        <TouchableOpacity style={styles.menuButton} onPress={openFilterPopup}>
          <Icon1 name="more-vertical" size={hp('3%')} color="#000" />
        </TouchableOpacity>
      </View>

      <Modal transparent visible={showFilter} animationType='fade'>
          <TouchableOpacity style={styles.overlay} onPress={closeFilterPopup} />
          <Animated.View
            style={[
              styles.filterPopup,
              {
                opacity: filterAnimation,
                transform: [{
                  translateY: filterAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                }],
              },
            ]}
          >
            <Pressable
              style={styles.filterItem}
              onPress={() => handleFilterSelection('QR Scanner')}
            >
              <Text style={styles.filterText}>QR Scanner</Text>
            </Pressable>
            <View style={styles.separator} />
            <Pressable
              style={styles.filterItem}
              onPress={() => handleFilterSelection('Manual entry')}
              >
              <Text style={styles.filterText}>Manual entry</Text>
            </Pressable>
          </Animated.View>
        </Modal>

        <QRCodeModal
        isVisible={showQRCodeModal}
        onClose={closeQRCodeModal}
        onQRCodeRead={() => console.log('QR code read!')}
      />

      <Animated.View style={[styles.iconContainer, { marginTop: nfcIconContainerStyle }]}>
        <View style={styles.nfcIcon}>
          <Icon2 name="line-scan" size={hp('5%')} color="#fff" />
        </View>
        <Text style={styles.promptText}>Place your NFC tag below the device</Text>
      </Animated.View>

      <TouchableOpacity onPress={handleNfcDetected} style={styles.dummyButton}>
        <Text>Simulate NFC Detection</Text>
      </TouchableOpacity>

      {nfcDetected && (
          <TouchableOpacity onPress={()=> router.push(`/pharmacist/scanner/prescription/${patientdid}`)}>
        <View style={styles.userContainer}>
        <View style={styles.userCard}>
          <Image
            source={{ uri: 'https://example.com/user-image.jpg' }} 
            style={styles.userImage}
          />
          <Text style={styles.userName}>Aditya Vijay</Text>
          <Text style={styles.userAccount}>A/C No - 7890 6754 6689 7753</Text>
        </View>
        </View>
        </TouchableOpacity>

      )}


      {/* Manual Entry Modal */}
      <Modal
        transparent
        visible={showManualEntryModal}
        animationType="slide"
        onRequestClose={closeManualEntryModal}
      >
        <View style={styles.manualEntryContainer}>
          <View style={styles.manualEntryContent}>
            <TextInput
              placeholder="Enter ID"
              value={manualEntry}
              onChangeText={setManualEntry}
              style={styles.manualEntryInput}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={closeManualEntryModal} style={styles.cancelButton}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleManualSubmit} style={styles.submitButton}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('3%'),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('5%'),
  },
  backButton: {
    fontSize: hp('5.5%'),
  },
  headerText: {
    justifyContent: 'center',
    fontSize: hp('3%'),
    fontWeight: 'bold',
  },
  menuButton: {
    fontSize: hp('5.5%'),
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  nfcIcon: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: wp('10%'),
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkMark: {
    fontSize: hp('4%'),
    color: '#fff',
  },
  promptText: {
    fontSize: hp('2.2%'),
    textAlign: 'center',
    marginTop: hp('1%'),
  },
  dummyButton: {
    backgroundColor: '#ddd',
    padding: hp('1.5%'),
    borderRadius: hp('1%'),
    marginTop: hp('5%'),
    alignSelf: 'center',
  },
  userContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  userCard: {
    width: wp('70%'),
    padding: hp('2%'),
    borderRadius: hp('2%'),
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('5%'),
  },
  userImage: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: wp('10%'),
    marginBottom: hp('1%'),
  },
  userName: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
  },
  userAccount: {
    fontSize: hp('2%'),
    color: '#666',
    textAlign: 'center',
  },
  manualButton: {
    position: 'absolute',
    bottom: hp('5%'),
    left: wp('5%'),
    right: wp('5%'),
    backgroundColor: '#000',
    borderRadius: hp('2%'),
    paddingVertical: hp('1.5%'),
    alignItems: 'center',
  },
  manualButtonText: {
    color: '#fff',
    fontSize: hp('2.2%'),
    fontWeight: 'bold',
  },
  // Filter popup styles
  filterPopup: {
    position: 'absolute',
    top: hp('12%'),
    right: wp('5%'),
    width: wp('40%'),
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: hp('1%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  filterItem: {
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('5%'),
  },
  filterText: {
    fontSize: hp('2%'),
    color: '#000',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: wp('5%'),
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
    //Filter Popup options
    manualEntryContainer: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    manualEntryContent: {
      backgroundColor: '#fff',
      padding: wp('5%'),
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      elevation: 10,
    },
    manualEntryInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: hp('1.5%'),
      borderRadius: 10,
      marginBottom: hp('2%'),
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cancelButton: {
      backgroundColor: '#ddd',
      padding: hp('1.5%'),
      borderRadius: 10,
      width: '45%',
      alignItems: 'center',
    },
    submitButton: {
      backgroundColor: '#000',
      padding: hp('1.5%'),
      borderRadius: 10,
      width: '45%',
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
});

export default NFCScanner;
