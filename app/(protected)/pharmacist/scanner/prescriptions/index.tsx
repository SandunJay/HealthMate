import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable, TouchableOpacity, Button } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const conversations = [
  { id: 1, name: 'Kyal Samuels', message: 'Hi Harold, how can I help you', time: 'Just now' },
  { id: 2, name: 'Rhys Bains', message: 'Hi Harold, how can I help you', time: '2d ago' },
  { id: 3, name: 'Rhys Bains', message: 'Hi Harold, how can I help you', time: '2d ago' },
  { id: 4, name: 'Rhys Bains', message: 'Hi Harold, how can I help you', time: '2d ago' },
];

const SupportPage = () => {

    const goToRecord = () => {
        console.log('Go to record');
    };

  return (
    <ScrollView style={styles.container}>

    {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={hp('3%')} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Prescriptions</Text>
      </View>

      {/* User Info Section */}
      <View style={styles.userInfoSection}>
        <View style={styles.userDetails}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150x150.png?text=Profile' }} // Replace with actual user image
            style={styles.profileImage}
          />
          <View style={styles.userTextContainer}>
            <Text style={styles.userName}>John Doe</Text>
            <Text style={styles.userId}>ClientID: 120255</Text>
          </View>
        </View>
        <Pressable>
          <Text style={styles.seeAllText}>See all</Text>
        </Pressable>
      </View>

      {/* Conversation List Section */}
      <View style={styles.conversationSection}>
        <Text style={styles.conversationTitle}>All Prescriptions</Text>
        {conversations.map((conversation) => (
          <View key={conversation.id} style={styles.conversationItem}>
            <View style={styles.conversationContent}>
              <Image
                source={{ uri: 'https://via.placeholder.com/50x50.png?text=User' }} // Replace with actual user image
                style={styles.conversationImage}
              />
              <View style={styles.conversationTextContainer}>
                <Text style={styles.conversationName}>{conversation.name}</Text>
                <Text style={styles.conversationMessage}>{conversation.message}</Text>
              </View>
            </View>
            <Button onPress={goToRecord} title='View' color={"#f194ff"}/>
            {/* <Text style={styles.conversationTime}>{conversation.time}</Text> */}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: wp('5%'),
  },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp('3%'),
    },
    headerText: {
        fontSize: hp('2.5%'),
        fontWeight: 'bold',
    },
  userInfoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4B0052',
    borderRadius: 10,
    padding: wp('4%'),
    marginBottom: hp('3%'),
  },
  userDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: wp('7.5%'),
  },
  userTextContainer: {
    marginLeft: wp('3%'),
  },
  userName: {
    fontSize: wp('5%'),
    color: '#fff',
    fontWeight: 'bold',
  },
  userId: {
    fontSize: wp('4%'),
    color: '#fff',
    marginTop: hp('0.5%'),
  },
  seeAllText: {
    fontSize: wp('4%'),
    color: '#fff',
    textDecorationLine: 'underline',
  },
  conversationSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: wp('4%'),
  },
  conversationTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
    color: '#333',
  },
  conversationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('1.5%'),
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  conversationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  conversationImage: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('6%'),
  },
  conversationTextContainer: {
    marginLeft: wp('3%'),
  },
  conversationName: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    color: '#333',
  },
  conversationMessage: {
    fontSize: wp('4%'),
    color: '#777',
    marginTop: hp('0.5%'),
  },
  conversationTime: {
    fontSize: wp('3.5%'),
    color: '#999',
  },
});

export default SupportPage;
