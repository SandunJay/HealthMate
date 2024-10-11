import React, { useRef, useState, useEffect, useCallback } from 'react'
import { Alert, Animated, Button, Image, Modal, PanResponder, Platform, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { InboxIcon } from 'react-native-heroicons/solid'
import CategoryCard from '@/components/CategoryCard'
import SortCategoryCard from '@/components/SortCategoryCard'
import PieChartComp from '@/components/pieChart'
import { Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import ChatScreen from '../message'
import { Colors } from '@/constants/Colors'
import HealthTip from '@/components/HealthTip'
import { useGlobalContext } from '@/context/GlobalProvider'
import { fetchAlertsFromToday, fetchRecentAlerts, triggerAmbulanceAlert, triggerFireAlert, triggerGeneralAlert, triggerHazardousAlert } from '@/lib/appwrite'
import { useFocusEffect } from 'expo-router'

const ios = Platform.OS === 'ios'

interface SkeletonLoaderProps {
  width: number | string;
  height: number | string;
  style?: object;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ width, height, style }) => {
  const pulseAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: false }),
        Animated.timing(pulseAnim, { toValue: 0, duration: 1000, useNativeDriver: false })
      ])
    )
    pulse.start()
    return () => pulse.stop()
  }, [])

  const backgroundColor = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E0E0E0', '#F5F5F5']
  })

  return (
    <Animated.View
      style={[
        { width, height, backgroundColor, borderRadius: 8 },
        style
      ]}
    />
  )
}

const Home: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useGlobalContext()
  const [isLoading, setIsLoading] = useState(true)
  const [isChatVisible, setChatVisible] = useState(false)
  const [isModalVisible, setModalVisible] = useState(false)
  const [isConfirmationVisible, setConfirmationVisible] = useState(false)
  const [toggles, setToggles] = useState([false, false, false, false, false])
  const [isEmergencyConfirmed, setEmergencyConfirmed] = useState(false)
  const [isIconBlinking, setIconBlinking] = useState(false)
  const [newMessage, setNewMessage] = useState(false);
  const [slideAnim] = useState(new Animated.Value(300)); // Slide animation for chat window
  const [newAlerts, setNewAlerts] = useState([]);
  const [blinkAnim] = useState(new Animated.Value(1)); 
  const [alerts, setAlerts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [shownAlertIds, setShownAlertIds] = useState<string[]>([]); // List of alert IDs that have already been shown

  // const blinkAnim = useRef(new Animated.Value(1)).current
  // const slideAnim = useRef(new Animated.Value(hp('100%'))).current

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const toggleModal = () => setModalVisible((prev) => !prev)

  const toggleSwitch = (index: number) => {
    setToggles((prevToggles) => 
      prevToggles.map((toggle, i) => (i === index ? !toggle : toggle))
    )
  }

   const checkNewAlerts = async () => {
    const recentAlerts = await fetchRecentAlerts(); // Fetch new alerts
    setAlerts(recentAlerts); // Update alert list

    // Check if there are new alerts within the last 5 minutes that haven't been shown
    const now = new Date();
    const fiveMinutesAgo = now.getTime() - 5 * 60 * 1000;

    const newAlertsToShow = recentAlerts.filter((alert) => {
      const alertTime = new Date(alert.timestamp).getTime();
      // Only show alerts within the last 5 minutes that have not already been shown
      return alertTime > fiveMinutesAgo && !shownAlertIds.includes(alert.$id);
    });

    if (newAlertsToShow.length > 0) {
      // Show the first new alert in the popup
      const newAlert = newAlertsToShow[0];
      setShowPopup(true);
      setPopupMessage(`New alert: ${newAlert.message}`);

      // Add the alert ID to the list of shown alert IDs to avoid showing it again
      setShownAlertIds((prev) => [...prev, newAlert.$id]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      // Check for new alerts when the screen is focused
      checkNewAlerts();

      // Set an interval to check for new alerts every minute
      const interval = setInterval(checkNewAlerts, 60000); // 60000ms = 1 minute

      return () => clearInterval(interval); // Cleanup interval on unmount
    }, []) // Empty dependency array ensures the effect runs only when the screen is focused
  );

  // const startBlinking = () => {
  //   Animated.loop(
  //     Animated.sequence([
  //       Animated.timing(blinkAnim, { toValue: 0, duration: 500, useNativeDriver: false }),
  //       Animated.timing(blinkAnim, { toValue: 1, duration: 500, useNativeDriver: false }),
  //     ])
  //   ).start()
  // }

  const confirmEmergency = () => {
    setConfirmationVisible(false)
    setEmergencyConfirmed(true)
    setIconBlinking(true)
    startBlinking()
    setTimeout(() => {
      blinkAnim.stopAnimation(() => {
        Animated.timing(blinkAnim, { 
          toValue: 1, 
          duration: 0, 
          useNativeDriver: false 
        }).start()
      })
      setIconBlinking(false)
    }, 10000)
  }

  // const toggleChat = () => {
  //   setChatVisible(!isChatVisible)
  //   if (!isChatVisible) {
  //     Animated.timing(slideAnim, {
  //       toValue: 0,
  //       duration: 300,
  //       useNativeDriver: false,
  //     }).start()
  //   }
  // }

  const handleButtonPress = (action: string, callback: () => void) => {
    Alert.alert(
      'Confirmation',
      `Are you sure you want to proceed with the ${action} action?`,
      [
        { text: 'Cancel', onPress: () => setModalVisible(false), style: 'cancel' },
        { text: 'Confirm', onPress: callback }
      ],
      { cancelable: true }
    );
  };

  const onAmbulancePress = () => {
    console.log('Ambulance action triggered');
    triggerAmbulanceAlert()
    setModalVisible(false);
  };

  const onFirePress = () => {
    console.log('Fire action triggered');
    triggerFireAlert()
    setModalVisible(false);
  };

  const onHazardousPress = () => {
    console.log('Hazardous action triggered');
    triggerHazardousAlert()
    setModalVisible(false);
  };

  const onGeneralPress = () => {
    console.log('General action triggered');
    triggerGeneralAlert()
    setModalVisible(false);
  };


  //  useEffect(() => {
  //   if (newMessage) {
  //     // Start blinking animation
  //     Animated.loop(
  //       Animated.sequence([
  //         Animated.timing(blinkAnim, {
  //           toValue: 1,
  //           duration: 500,
  //           useNativeDriver: true,
  //         }),
  //         Animated.timing(blinkAnim, {
  //           toValue: 0,
  //           duration: 500,
  //           useNativeDriver: true,
  //         }),
  //       ]),
  //       { iterations: 5 } // Blink for 5 seconds
  //     ).start(() => setNewMessage(false)); // Stop blinking after 5 seconds
  //   }
  // }, [newMessage]);

  // // Toggle chat window
  // const toggleChat = () => {
  //   setChatVisible(!isChatVisible);
  //   if (!isChatVisible) {
  //     Animated.timing(slideAnim, {
  //       toValue: 0,
  //       duration: 300,
  //       useNativeDriver: false,
  //     }).start();
  //     setNewMessage(false); // Stop blinking when chat opens
  //   }
  // };

  // // Simulate new message arrival (for testing purpose)
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setNewMessage(true); // Trigger blinking when a new message arrives
  //   }, 10000); // Simulate message arrival after 10 seconds

  //   return () => clearTimeout(timer);
  // }, []);

    const toggleChat = () => {
    setChatVisible(!isChatVisible);
    if (!isChatVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const startBlinking = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
        Animated.timing(blinkAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]),
      { iterations: 5 } // Blink for 5 seconds
    ).start();
  };

  useEffect(() => {
    const checkForNewAlerts = async () => {
      const alerts = await fetchAlertsFromToday();  // Fetch today's alerts only
      if (alerts.length > 0) {
        setNewAlerts(alerts);
        startBlinking();
      }
    };

    // Periodically check for new alerts
    const interval = setInterval(checkForNewAlerts, 10000); // Every 10 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return gestureState.dy < -20
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy < 0) {
          slideAnim.setValue(hp('100%') + gestureState.dy)
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy < -80) {
          Animated.timing(slideAnim, {
            toValue: hp('100%'),
            duration: 300,
            useNativeDriver: false,
          }).start(() => setChatVisible(false))
        } else {
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }).start()
        }
      },
    })
  ).current

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background,
    },
    scrollView: {
      paddingTop: ios ? hp('2%') : hp('3%'),
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: hp('2%'),
      paddingHorizontal: wp('4%'),
    },
    profileImage: {
      width: wp('12%'),
      height: wp('12%'),
      borderRadius: wp('6%'),
    },
    greetingContainer: {
      flex: 1,
      marginLeft: wp('4%'),
    },
    greetingText: {
      fontSize: wp('4.5%'),
      fontWeight: 'bold',
      color: isDarkMode ? Colors.dark.text : Colors.light.tabIconDefault1,
    },
    subText: {
      fontSize: wp('3.5%'),
      color: isDarkMode ? Colors.dark.textSecondary : Colors.light.tabIconDefault,
    },
    headerIcons: {
      flexDirection: 'row',
    },
    icon: {
      fontSize: wp('6%'),
      marginHorizontal: wp('2%'),
      color: isDarkMode ? Colors.dark.icon : Colors.light.tabIconDefault1,
    },
    searchBarContainer: {
      marginHorizontal: wp('5%'),
      marginBottom: hp('4%'),
    },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDarkMode ? Colors.dark.cardBackground : Colors.light.background,
      borderColor: isDarkMode ? Colors.dark.border : Colors.light.border,
      borderWidth: 1,
      borderRadius: 25,
      paddingHorizontal: wp('4%'),
      paddingVertical: hp('1.5%'),
    },
    searchIcon: {
      marginRight: wp('2%'),
    },
    searchInput: {
      flex: 1,
      fontSize: wp('4%'),
      color: isDarkMode ? Colors.dark.text : Colors.light.text,
    },
    sectionContainer: {
      marginBottom: hp('4%'),
    },
    chatOverlay: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: '#fff',
      top: 0,
      zIndex: 10,
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '80%',
      padding: 20,
      borderRadius: 10,
      backgroundColor: isDarkMode ? Colors.dark.cardBackground : Colors.light.background,
    },
    modalTitle: {
      fontSize: wp('5%'),
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
      color: isDarkMode ? Colors.dark.text : Colors.light.text,
    },
    toggleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    cancelButton: {
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 5,
    },
    confirmButton: {
      backgroundColor: 'green',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      fontSize: wp('4%'),
    },
    confirmationAlert: {
      position: 'absolute',
      top: '20%',
      width: '80%',
      padding: 20,
      backgroundColor: '#fff',
      borderRadius: 10,
      elevation: 5,
    },
    alertText: {
      fontSize: wp('4.5%'),
      textAlign: 'center',
      marginBottom: 20,
      color: isDarkMode ? Colors.dark.textSecondary : Colors.light.tabIconDefault,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
      width: '100%',
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '45%',
      padding: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
    },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  popupMessage: {
    fontSize: 18,
    marginBottom: 10,
  },
  })

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <SkeletonLoader width={wp('12%')} height={wp('12%')} style={{ borderRadius: wp('6%') }} />
            <View style={styles.greetingContainer}>
              <SkeletonLoader width={wp('40%')} height={wp('5%')} style={{ marginBottom: 5 }} />
              <SkeletonLoader width={wp('30%')} height={wp('4%')} />
            </View>
            <View style={styles.headerIcons}>
              <SkeletonLoader width={wp('6%')} height={wp('6%')} style={{ marginHorizontal: wp('2%') }} />
              <SkeletonLoader width={wp('6%')} height={wp('6%')} style={{ marginHorizontal: wp('2%') }} />
              <SkeletonLoader width={wp('6%')} height={wp('6%')} style={{ marginHorizontal: wp('2%') }} />
            </View>
          </View>

          <View style={styles.searchBarContainer}>
            <SkeletonLoader width="100%" height={hp('6%')} style={{ borderRadius: 25 }} />
          </View>

          <View style={styles.sectionContainer}>
            <SkeletonLoader width="100%" height={hp('20%')} style={{ borderRadius: 12, marginBottom: hp('2%') }} />
          </View>

          <View style={styles.sectionContainer}>
            <SkeletonLoader width="100%" height={hp('30%')} style={{ borderRadius: 12, marginBottom: hp('2%') }} />
          </View>

          <View style={styles.sectionContainer}>
            <SkeletonLoader width="100%" height={hp('20%')} style={{ borderRadius: 12, marginBottom: hp('2%') }} />
          </View>

          <View style={styles.sectionContainer}>
            <SkeletonLoader width="100%" height={hp('15%')} style={{ borderRadius: 12 }} />
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
            style={styles.profileImage}
          />
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>Hi, Jonathan</Text>
            <Text style={styles.subText}>May you always be healthy</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={toggleModal}>
              <MaterialCommunityIcons
                name="alarm-light-outline"
                style={[styles.icon, isIconBlinking && { opacity: blinkAnim }]}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={toggleChat}>
              <Feather name='phone' style={styles.icon} />
            </TouchableOpacity> */}

            <TouchableOpacity onPress={toggleChat}>
              <Animated.View
                style={[
                  styles.icon,
                  { opacity: newMessage ? blinkAnim : 1 }, // Apply blinking effect when newMessage is true
                ]}
              >
                <Feather name='phone' style={styles.icon} />
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity>
              <InboxIcon size={wp('6%')} color={isDarkMode ? Colors.dark.icon : Colors.light.tabIconDefault1} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchBarContainer}>
          <View style={styles.searchBar}>
            <MagnifyingGlassIcon size={20} strokeWidth={3} color={isDarkMode ? Colors.dark.icon : "gray"} style={styles.searchIcon} />
            <TextInput
              placeholder="Search"
              placeholderTextColor={isDarkMode ? Colors.dark.textSecondary : 'gray'}
              style={styles.searchInput}
            />
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <CategoryCard isDarkMode={isDarkMode} />
        </View>

        <View style={styles.sectionContainer}>
          <PieChartComp isDarkMode={isDarkMode} />
        </View>

        <View style={styles.sectionContainer}>
          <SortCategoryCard isDarkMode={isDarkMode} />
        </View>

        <View style={styles.sectionContainer}>
          <HealthTip isDarkMode={isDarkMode} />
        </View>
      </ScrollView>

      {/* {isChatVisible && (
        <Animated.View style={[styles.chatOverlay, { transform: [{ translateY: slideAnim }] }]} {...panResponder.panHandlers}>
          <ChatScreen  isDarkMode={isDarkMode} />
        </Animated.View>
      )} */}

      
      {isChatVisible && (
        <Animated.View style={[styles.chatOverlay, { transform: [{ translateY: slideAnim }] }]} {...panResponder.panHandlers}>
          <ChatScreen isDarkMode={isDarkMode} />
        </Animated.View>
      )}

      {/* <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={styles.overlay} />
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Emergency</Text>
            {toggles.map((toggle, index) => (
              <View key={index} style={styles.toggleContainer}>
                <Text style={styles.subText}>Option {index + 1}</Text>
                <Switch
                  value={toggle}
                  onValueChange={() => toggleSwitch(index)}
                  thumbColor={toggle ? 'green' : 'red'}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                />
              </View>
            ))}
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setConfirmationVisible(true)} style={styles.confirmButton}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
          {isConfirmationVisible && (
            <View style={styles.confirmationAlert}>
              <Text style={styles.alertText}>Are you sure to state an emergency?</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => setConfirmationVisible(false)} style={styles.cancelButton}>
                  <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={confirmEmergency} style={styles.confirmButton}>
                  <Text style={styles.buttonText}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </Modal> */}

    <Modal visible={isModalVisible} transparent={true} animationType="fade">
      <View style={styles.overlay} />
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Emergency</Text>

          <View style={styles.row}>
            {/* First Button - Ambulance */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress('Ambulance', onAmbulancePress)}
            >
              <MaterialCommunityIcons name="ambulance" size={50} color="#FF0000" />
              <Text style={styles.buttonText}>Patient</Text>
            </TouchableOpacity>

            {/* Second Button - Fire */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress('Fire', onFirePress)}
            >
              <MaterialCommunityIcons name="fire-truck" size={50} color="#FF4500" />
              <Text style={styles.buttonText}>Fire</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            {/* Third Button - Hazardous */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress('Hazardous', onHazardousPress)}
            >
              <MaterialCommunityIcons name="biohazard" size={50} color="#FFD700" />
              <Text style={styles.buttonText}>Hazardous</Text>
            </TouchableOpacity>

            {/* Fourth Button - General */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleButtonPress('General', onGeneralPress)}
            >
              <FontAwesome name="exclamation" size={50} color="#FF6347" />
              <Text style={styles.buttonText}>General</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>

      <Modal
        transparent={true}
        visible={showPopup}
        onRequestClose={() => setShowPopup(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.popup}>
            <Text style={styles.popupMessage}>{popupMessage}</Text>
            <Button title="Close" onPress={() => setShowPopup(false)} />
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  )
}

export default Home