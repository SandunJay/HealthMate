import React, { useRef, useState } from 'react'
import { Animated, Image, Modal, PanResponder, Platform, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import { PhoneIcon } from 'react-native-heroicons/outline'
import { BellAlertIcon } from 'react-native-heroicons/outline'
import { InboxIcon } from 'react-native-heroicons/solid'
import CategoryCard from '@/components/CategoryCard';
import SortCategoryCard from '@/components/SortCategoryCard';
import PieChartComp  from '@/components/pieChart'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import ChatScreen from '../message'
import { BlurView } from '@react-native-community/blur';
import { Colors } from '@/constants/Colors'
import HealthTip from '@/components/DestinationComp'


const ios = Platform.OS==='ios';
const topMargin= ios? 'mt-3' : 'mt-10';
const Home = () => {
  const [isChatVisible, setChatVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [toggles, setToggles] = useState([false, false, false, false, false]); // 5 toggles
  const [isEmergencyConfirmed, setEmergencyConfirmed] = useState(false);
  const [isIconBlinking, setIconBlinking] = useState(false);

  const blinkAnim = useRef(new Animated.Value(1)).current; // For blinking effect
  const slideAnim = useRef(new Animated.Value(hp('100%'))).current;


   // Toggle modal visibility
   const toggleModal = () => setModalVisible((prev) => !prev);

   // Toggle switch logic
   const toggleSwitch = (index) => {
    setToggles((prevToggles) => 
      prevToggles.map((toggle, i) => (i === index ? !toggle : toggle))
    );
  };
 
   // Blink the emergency icon
   const startBlinking = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, { toValue: 0, duration: 500, useNativeDriver: false }),
        Animated.timing(blinkAnim, { toValue: 1, duration: 500, useNativeDriver: false }),
      ])
    ).start();
  };

   // Confirm emergency state and blink icon
   const confirmEmergency = () => {
    setConfirmationVisible(false); // Close confirmation modal
    setEmergencyConfirmed(true);   // Set emergency as confirmed
    setIconBlinking(true);         // Start blinking
  
    // Trigger the blinking animation
    startBlinking();
  
    // Stop blinking after 10 seconds
    setTimeout(() => {
      blinkAnim.stopAnimation(() => {
        // Safely reset after animation stops
        Animated.timing(blinkAnim, { 
          toValue: 1, 
          duration: 0, 
          useNativeDriver: false 
        }).start();
      });
      setIconBlinking(false);
    }, 10000);
  };
 
   // Background blur effect when modal is active
  //  const renderBlurBackground = () => (
  //    <BlurView style={styles.absolute} blurType="light" blurAmount={10} />
  //  );

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

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Trigger panResponder only when swiping upwards (negative Y movement)
        return gestureState.dy < -20;
      },
      onPanResponderMove: (evt, gestureState) => {
        // If the user swipes up, manually update the animated value
        if (gestureState.dy < 0) {
          slideAnim.setValue(hp('100%') + gestureState.dy); // Moving upwards decreases Y value
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        // If the upward swipe is significant enough, close the chat screen
        if (gestureState.dy < -80) {
          Animated.timing(slideAnim, {
            toValue: hp('100%'), // Slide chat off-screen
            duration: 300,
            useNativeDriver: false,
          }).start(() => setChatVisible(false)); // After sliding out, hide the chat
        } else {
          // If swipe isn't significant, bring the chat back to full view
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView className={"space-y-6"+topMargin} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.greetingText}>Hi, Jonathan</Text>
              <Text style={styles.subText}>May you always be healthy</Text>
            </View>

            <View style={styles.headerIcons}>
            <TouchableOpacity onPress={toggleModal}>
              <MaterialCommunityIcons
                name="alarm-light-outline"
                style={[styles.icon, isIconBlinking && { opacity: blinkAnim }]}
                color="gray"
              />
            </TouchableOpacity>
              <TouchableOpacity onPress={toggleChat}>
              <Feather name='phone' style={styles.icon}/>
                {/* <PhoneIcon size={25} strokeWidth={1} color={"gray"}  style={styles.icon}/> */}
              </TouchableOpacity>
              <TouchableOpacity>
                  <InboxIcon size={25} strokeWidth={1} color={"gray"}  style={styles.icon}/>
              </TouchableOpacity>
            </View>
          </View>

          {/* Search bar */}
          <View className='mx-5 mb-4'>
            <View className="flex-row items-center bg-neutral-100 rounded-full p-4 space-x-2 pl-6">
              <MagnifyingGlassIcon size={20} strokeWidth={3} color={"gray"}/>
              <TextInput
                placeholder="Search"
                placeholderTextColor={'gray'}
                className="flex-1 text-base mb-1 pl-1 tracking-wider"
                style={{fontSize: wp(4), width: wp(80)}}
              />
            </View>
          </View>

          {/* Categories */}
          <View className={'mt-4'}>
            <CategoryCard/>
          </View>

          <View>
            <PieChartComp/>
          </View>

          {/* Soft categories */}
          <View className='mb-4'>
            <SortCategoryCard/>
          </View>

          {/* Destination */}
          <View>
            <HealthTip/>
          </View>


      </ScrollView>

      {/* Chat overlay */}
      {isChatVisible && (
        <Animated.View style={[styles.chatOverlay, { transform: [{ translateY: slideAnim }] }]} {...panResponder.panHandlers}>
          <ChatScreen />
        </Animated.View>
      )}

       {/* Modal for Emergency */}
       <Modal visible={isModalVisible} transparent={true} animationType="fade">
       <View style={styles.overlay} />

        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Emergency</Text>

            {/* 5 Toggle switches */}
            {toggles.map((toggle, index) => (
              <View key={index} style={styles.toggleContainer}>
                <Text>Option {index + 1}</Text>
                <Switch
                  value={toggle}
                  onValueChange={() => toggleSwitch(index)}
                  thumbColor={toggle ? 'green' : 'red'}
                />
              </View>
            ))}

            {/* Cancel and Confirm buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setConfirmationVisible(true)} style={styles.confirmButton}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirmation Alert */}
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
      </Modal>

    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('3%'),
    marginBottom: hp('2%'),
  },
  profileImage: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('6%'),
    left:wp('6%')

  },
  greetingText: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    color: Colors.light.tabIconDefault1,
  },
  subText: {
    fontSize: wp('3.5%'),
    color: Colors.light.tabIconDefault,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    fontSize: wp('6%'),
    marginHorizontal: wp('2%'),
    color: Colors.light.tabIconDefault1

  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark transparent overlay
  },
  chatOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    top: 0,
    zIndex: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark background for the modal
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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
  },
  absolute: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
export default Home