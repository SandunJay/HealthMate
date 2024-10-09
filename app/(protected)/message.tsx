import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

const chatData = [
  {
    id: '1',
    name: 'Dr. Marcus Horizon',
    message: "I don't have any fever, but headache...",
    time: '10:24',
    imageUrl: 'https://via.placeholder.com/50',
    isRead: false,
  },
  {
    id: '2',
    name: 'Dr. Alysa Hana',
    message: 'Hello, How can I help you?',
    time: '09:04',
    imageUrl: 'https://via.placeholder.com/50',
    isRead: true,
  },
  {
    id: '3',
    name: 'Dr. Maria Elena',
    message: 'Do you have fever?',
    time: '08:57',
    imageUrl: 'https://via.placeholder.com/50',
    isRead: true,
  },
];

const ChatScreen = (onClose ) => {

    const swipeUpGesture = Gesture.Pan().onEnd((event) => {
        if (event.translationY < -100) { // Swipe up detection threshold
          onClose();
        }
      });

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.chatItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.avatar} />
      <View style={styles.chatDetails}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.chatMessage}>{item.message}</Text>
      </View>
      <View style={styles.chatMeta}>
        <Text style={styles.chatTime}>{item.time}</Text>
        {item.isRead ? (
          <Icon name="checkmark-done-outline" size={hp('2%')} color="gray" />
        ) : (
          <Icon name="checkmark-outline" size={hp('2%')} color="green" />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    // <GestureDetector gesture={swipeUpGesture}>
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Message</Text>
        <Icon name="search-outline" size={hp('3%')} color="#000" />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={styles.tabTextActive}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Group</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Private</Text>
        </TouchableOpacity>
      </View>

      {/* Chat List */}
      <FlatList
        data={chatData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.chatList}
      />

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Icon name="chatbubble-ellipses-outline" size={hp('3%')} color="white" />
      </TouchableOpacity>
    </View>
    // </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
    alignItems: 'center',
  },
  headerText: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    color: '#000',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5%'),
    marginBottom: hp('1%'),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: hp('1%'),
  },
  activeTab: {
    backgroundColor: '#E6F7F5',
    borderRadius: hp('1%'),
  },
  tabText: {
    fontSize: hp('2%'),
    color: 'gray',
  },
  tabTextActive: {
    fontSize: hp('2%'),
    color: '#000',
  },
  chatList: {
    paddingHorizontal: wp('5%'),
  },
  chatItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp('1.5%'),
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
    alignItems: 'center',
  },
  avatar: {
    width: hp('6%'),
    height: hp('6%'),
    borderRadius: hp('3%'),
  },
  chatDetails: {
    flex: 1,
    marginLeft: wp('3%'),
  },
  chatName: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
  chatMessage: {
    fontSize: hp('1.8%'),
    color: 'gray',
  },
  chatMeta: {
    alignItems: 'flex-end',
  },
  chatTime: {
    fontSize: hp('1.6%'),
    color: 'gray',
    marginBottom: hp('0.5%'),
  },
  fab: {
    position: 'absolute',
    bottom: hp('3%'),
    right: wp('5%'),
    backgroundColor: '#6C63FF',
    width: hp('6%'),
    height: hp('6%'),
    borderRadius: hp('3%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatScreen;
