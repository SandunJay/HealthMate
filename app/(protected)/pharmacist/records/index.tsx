// import { Pressable, Text, View } from 'react-native';
// import { Link, router } from 'expo-router';
// import React from 'react';

// // Example array of news items
// const newsItems = [
//   { id: 1, title: 'News One' },
//   { id: 2, title: 'News Two' },
//   { id: 3, title: 'News Three' },
//   { id: 4, title: 'News Four' }
// ];

// const inventoryData = [
//   { id: '1', name: 'Battery Pack', sku: 'BAT-125-GEN1', price: '$8,500', image: 'https://path-to-battery-pack-image' },
//   { id: '2', name: 'Electric Motor', sku: 'MOT-248-GEN2', price: '$3,200', image: 'https://path-to-electric-motor-image' },
//   // Add more inventory items as needed
// ];
// const ListPage = () => {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       {newsItems.map((news) => (
//         <Link key={news.id} href={`/pharmacist/records/${news.id}`}>
//             <Text>          
//               {news.title}
//             </Text>
//         </Link>
//       ))}

//     </View>
//   );
// };

// export default ListPage;

import { bookings } from '@/assets/dummy';
import { bookingType } from '@/assets/types';
import { Colors } from '@/constants/Colors';
import { Link, router, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image, StyleSheet, Pressable, ScrollView, Animated, Modal } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

const Records = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');
  const filterAnimation = useRef(new Animated.Value(0)).current;
  const [showModal, setShowModal] = useState(false);
  const modalAnimation = useRef(new Animated.Value(0)).current; 

  const openModal = () => {
    setShowModal(true);
    Animated.timing(modalAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(modalAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setShowModal(false));
  };

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

  const handleFilterSelection = (filter: string) => {
    setSelectedFilter(filter);
    closeFilterPopup();
  };

  const handleViewBtn = (id: string) => {
    router.push(`/pharmacist/records/${id}`); 
    console.log("Passing rId: "+id);
  };

  const handleNew = () => {
    router.push('/pharmacist/records/newModal');
  }


  const renderBookingCard = ({item}: {item: bookingType}) => (
    <View key={item.id} style={styles.bookingCard}>
      <View style={styles.bookingHeader}>
        <Text style={styles.orderId}>Record ID: {item.id}</Text>
        <Text style={styles.orderDate}>{item.date}</Text>
      </View>

      <View style={styles.userInfo}>
        <Image source={{ uri: item.image }} style={styles.userImage} />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{item.name}</Text>
          {/* UPDATE RATING TO DIAGNOSIS */}
          <Text style={styles.userRating}>{item.diagnosis}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.reviewButton}>
          <Text style={styles.buttonText}>Remainder</Text>
        </TouchableOpacity>
          <TouchableOpacity style={styles.bookAgainButton} onPress={() => handleViewBtn(item.id)}>
            <Text style={styles.buttonText}>View Record</Text>
          </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Records</Text>
        <TouchableOpacity style={styles.skuButton} onPress={() => handleNew()}>
          <Text style={styles.skuButtonText}>New Record</Text>
        </TouchableOpacity>
      </View>

      {/* Search Section */}
      <View style={Colors.glassOly}/>
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={hp('3%')} color="#000" />
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
        />
        <TouchableOpacity onPress={openFilterPopup}>
          <Icon name="filter-outline" size={hp('3%')} color="#000" />
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
              onPress={() => handleFilterSelection('Price Low to High')}
            >
              <Text style={styles.filterText}>All</Text>
            </Pressable>
            <View style={styles.separator} />
            <Pressable
              style={styles.filterItem}
              onPress={() => handleFilterSelection('Price High to Low')}
            >
              <Text style={styles.filterText}>Accepted</Text>
            </Pressable>
            <View style={styles.separator} />
            <Pressable
              style={styles.filterItem}
              onPress={() => handleFilterSelection('Latest Arrivals')}
            >
              <Text style={styles.filterText}>Rejected</Text>
            </Pressable>
          </Animated.View>
        </Modal>

            {/* Tabs */}
            <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'upcoming' && styles.selectedTab,
          ]}
          onPress={() => setSelectedTab('upcoming')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'upcoming' && styles.selectedTabText,
            ]}
          >
            Accepted
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'past' && styles.selectedTab,
          ]}
          onPress={() => setSelectedTab('past')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'past' && styles.selectedTabText,
            ]}
          >
            Rejected
          </Text>
        </TouchableOpacity>
      </View>

      {/* Record List */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.bookingContainer}>
      {bookings.map((booking) => renderBookingCard({ item: booking }))}
      </ScrollView>

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('5%'),
    backgroundColor: Colors.main.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  headerText: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
  },
  skuButton: {
    backgroundColor: Colors.dark.icon1, // Tailwind CSS blue-500 color
    borderRadius: wp('2%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('4%'),
  },
  skuButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  searchContainer: {
    ...Colors.glassBg,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp('5%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    marginVertical: hp('2%'),
    borderColor: Colors.main.secondary
  },
  searchInput: {
    flex: 1,
    marginLeft: wp('2%'),
    fontSize: hp('2%'),
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
  bookingContainer:{
    flex: 1,
    paddingHorizontal: wp('1%'),

  },
  bookingCard: {
    paddingHorizontal: wp('5%'),
    backgroundColor: Colors.dark.tint,
    borderRadius: 25,
    padding: wp('2%'),
    marginBottom: hp('1%'),
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 3,
  },
  bookingHeader: {
    marginBottom: hp('1%'),
  },
  orderId: {
    fontSize: wp('3.5%'),
    fontWeight: 'bold',
  },
  orderDate: {
    fontSize: wp('2.5%'),
    color: '#777',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  userImage: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('7.5%'),
    marginRight: wp('3%'),
  },
  userDetails: {
    flexDirection: 'row',     // Align items in a row
    justifyContent: 'space-between',  // Spread out items
    alignItems: 'center',    // Align them vertically at the center
    flex: 1,
  },
  userName: {
    fontSize: wp('3.5%'),
    fontWeight: '500',
  },
  userRating: {
    paddingRight: wp('3%'),
    fontSize: wp('3%'),
    color: '#555',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reviewButton: {
    backgroundColor: Colors.light.tabIconDefault1,
    paddingVertical: hp('1.25%'),
    paddingHorizontal: wp('3%'),
    borderRadius: 25,
  },
  bookAgainButton: {
    backgroundColor: Colors.light.tabIconSelected,
    paddingVertical: hp('1.25%'),
    paddingHorizontal: wp('3%'),
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: wp('3%'),
    fontWeight: 'normal',
    textAlign: 'center',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: hp('2%'),
  },
  tab: {
    paddingVertical: hp('1.25%'),
    paddingHorizontal: wp('4%'),
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
    marginHorizontal: wp('2%'),
  },
  selectedTab: {
    backgroundColor: Colors.light.tabIconDefault1,
  },
  tabText: {
    fontSize: wp('3%'),
    color: '#000',
  },
  selectedTabText: {
    color: '#fff',
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: wp('5%'),
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 5,
    elevation: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Records;