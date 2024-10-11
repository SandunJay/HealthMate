// import React from 'react';
// import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { GestureDetector, Gesture } from 'react-native-gesture-handler';

// const chatData = [
//   {
//     id: '1',
//     name: 'Dr. Marcus Horizon',
//     message: "I don't have any fever, but headache...",
//     time: '10:24',
//     imageUrl: 'https://via.placeholder.com/50',
//     isRead: false,
//   },
//   {
//     id: '2',
//     name: 'Dr. Alysa Hana',
//     message: 'Hello, How can I help you?',
//     time: '09:04',
//     imageUrl: 'https://via.placeholder.com/50',
//     isRead: true,
//   },
//   {
//     id: '3',
//     name: 'Dr. Maria Elena',
//     message: 'Do you have fever?',
//     time: '08:57',
//     imageUrl: 'https://via.placeholder.com/50',
//     isRead: true,
//   },
// ];

// const ChatScreen = (onClose ) => {

//     const swipeUpGesture = Gesture.Pan().onEnd((event) => {
//         if (event.translationY < -100) { // Swipe up detection threshold
//           onClose();
//         }
//       });

//   const renderItem = ({ item }) => (
//     <TouchableOpacity style={[styles.chatItem, !item.isRead && styles.unreadMessage]}>
//       <Image source={{ uri: item.imageUrl }} style={styles.avatar} />
//       <View style={styles.chatDetails}>
//         <Text style={styles.chatName}>{item.name}</Text>
//         <Text style={styles.chatMessage}>{item.message}</Text>
//       </View>
//       <View style={styles.chatMeta}>
//         <Text style={styles.chatTime}>{item.time}</Text>
//         {item.isRead ? (
//           <Icon name="checkmark-done-outline" size={hp('2%')} color="gray" />
//         ) : (
//           <Icon name="checkmark-outline" size={hp('2%')} color="green" />
//         )}
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Messages</Text>
//         <Icon name="search-outline" size={hp('3%')} color="#000" />
//       </View>
//       <FlatList data={chatData} keyExtractor={(item) => item.id} renderItem={renderItem} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: wp('5%'),
//     paddingVertical: hp('2%'),
//     alignItems: 'center',
//   },
//   headerText: {
//     fontSize: hp('2.5%'),
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   tabs: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: wp('5%'),
//     marginBottom: hp('1%'),
//   },
//   tab: {
//     flex: 1,
//     alignItems: 'center',
//     paddingVertical: hp('1%'),
//   },
//   activeTab: {
//     backgroundColor: '#E6F7F5',
//     borderRadius: hp('1%'),
//   },
//   tabText: {
//     fontSize: hp('2%'),
//     color: 'gray',
//   },
//   tabTextActive: {
//     fontSize: hp('2%'),
//     color: '#000',
//   },
//   chatList: {
//     paddingHorizontal: wp('5%'),
//   },
//   chatItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: hp('1.5%'),
//     borderBottomWidth: 1,
//     borderBottomColor: '#E6E6E6',
//     alignItems: 'center',
//   },
//   avatar: {
//     width: hp('6%'),
//     height: hp('6%'),
//     borderRadius: hp('3%'),
//   },
//   chatDetails: {
//     flex: 1,
//     marginLeft: wp('3%'),
//   },
//   chatName: {
//     fontSize: hp('2%'),
//     fontWeight: 'bold',
//   },
//   chatMessage: {
//     fontSize: hp('1.8%'),
//     color: 'gray',
//   },
//   chatMeta: {
//     alignItems: 'flex-end',
//   },
//   chatTime: {
//     fontSize: hp('1.6%'),
//     color: 'gray',
//     marginBottom: hp('0.5%'),
//   },
//   fab: {
//     position: 'absolute',
//     bottom: hp('3%'),
//     right: wp('5%'),
//     backgroundColor: '#6C63FF',
//     width: hp('6%'),
//     height: hp('6%'),
//     borderRadius: hp('3%'),
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   unreadMessage: {
//     backgroundColor: '#F5F5F5', // Light background for unread messages
//   },
// });

// export default ChatScreen;

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useGlobalContext } from '@/context/GlobalProvider';
import { fetchRecentAlerts } from '@/lib/appwrite';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const ChatScreen = ({ onClose }) => {
  const [alerts, setAlerts] = useState([]);
  const { isDarkMode } = useGlobalContext();

  useEffect(() => {
    const loadAlerts = async () => {
      const recentAlerts = await fetchRecentAlerts();
      // Limit to the 5 most recent alerts
      setAlerts(recentAlerts.slice(0, 5));
    };

    loadAlerts();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles(isDarkMode).chatItem} key={item.$id}>
      <Image source={{ uri: item.imageUrl }} style={styles(isDarkMode).avatar} />
      <View style={styles(isDarkMode).chatDetails}>
        <Text style={styles(isDarkMode).chatName}>{item.name}</Text>
        <Text style={styles(isDarkMode).chatMessage}>{item.message}</Text>
      </View>
      <View style={styles(isDarkMode).chatMeta}>
        <Text style={styles(isDarkMode).chatTime}>
          {item.type} - {new Date(item.createdAt).toLocaleTimeString()}
        </Text>
        {item.isRead ? (
          <Icon name="checkmark-done-outline" size={18} color={isDarkMode ? 'gray' : 'green'} />
        ) : (
          <Icon name="checkmark-outline" size={18} color={isDarkMode ? 'gray' : 'green'} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles(isDarkMode).container}>
      <View style={styles(isDarkMode).header}>
        <Text style={styles(isDarkMode).headerText}>Messages</Text>
        <TouchableOpacity onPress={onClose}>
          <Icon name="close-outline" size={24} color={isDarkMode ? '#fff' : '#000'} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={alerts}
        keyExtractor={(item) => item.$id} // Ensure this is unique
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = (isDarkMode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? '#1c1c1e' : '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: isDarkMode ? '#fff' : '#000',
  },
  chatItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: isDarkMode ? '#2c2c2e' : '#e6e6e6',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  chatDetails: {
    flex: 1,
    marginLeft: 15,
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: isDarkMode ? '#fff' : '#000',
  },
  chatMessage: {
    fontSize: 14,
    color: isDarkMode ? '#a1a1a3' : 'gray',
  },
  chatMeta: {
    alignItems: 'flex-end',
  },
  chatTime: {
    fontSize: 14,
    color: isDarkMode ? '#a1a1a3' : 'gray',
    marginBottom: 5,
  },
});

export default ChatScreen;



