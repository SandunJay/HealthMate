// import { Pressable, Text, View } from 'react-native';
// import { Link, router } from 'expo-router';
// import React from 'react';

// // Example array of news items
// const newsItems = [
//   { rid: 1, title: 'News One' },
//   { rid: 2, title: 'News Two' },
//   { rid: 3, title: 'News Three' },
//   { rid: 4, title: 'News Four' }
// ];

// const inventoryData = [
//   { rid: '1', name: 'Battery Pack', sku: 'BAT-125-GEN1', price: '$8,500', image: 'https://path-to-battery-pack-image' },
//   { rid: '2', name: 'Electric Motor', sku: 'MOT-248-GEN2', price: '$3,200', image: 'https://path-to-electric-motor-image' },
//   // Add more inventory items as needed
// ];
// const ListPage = () => {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       {newsItems.map((news) => (
//         <Link key={news.rid} href={`/pharmacist/records/${news.rid}`}>
//             <Text>          
//               {news.title}
//             </Text>
//         </Link>
//       ))}

//     </View>
//   );
// };

// export default ListPage;


import { Link, router, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image, StyleSheet, Pressable, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

const inventoryData = [
  { rid: '1', name: 'Battery Pack', sku: 'BAT-125-GEN1', price: '$8,500', image: 'https://www.pexels.com/photo/people-s-hands-touching-10667757/' },
  { rid: '2', name: 'Electric Motor', sku: 'MOT-248-GEN2', price: '$3,200', image: 'https://www.pexels.com/photo/people-s-hands-touching-10667757/' },
  // Add more inventory items as needed
];


const bookings = [
  {
    rid: '123',
    date: 'June 25, 2022, 10:00 PM - 03:00 PM',
    name: 'Alexa Johnson',
    diagnosis:'Diabetes',
    rating: 4.8,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    rid: '245',
    date: 'June 25, 2022, 10:00 PM - 03:00 PM',
    name: 'John Wilson',
    diagnosis:'Chornic Kidney',
    rating: 4.8,
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
  {
    rid: '678',
    date: 'June 22, 2022, 09:00 PM - 11:00 PM',
    name: 'Wade Warren',
    diagnosis:'Diabetes',
    rating: 4.2,
    image: 'https://randomuser.me/api/portraits/men/25.jpg',
  },
  {
    rid: '9820147',
    date: 'June 25, 2022, 10:00 PM - 03:00 PM',
    name: 'Alexa Johnson',
    rating: 4.8,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    rid: '5896795',
    date: 'June 25, 2022, 10:00 PM - 03:00 PM',
    name: 'John Wilson',
    rating: 4.8,
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
  {
    rid: '2856344',
    date: 'June 22, 2022, 09:00 PM - 11:00 PM',
    name: 'Wade Warren',
    rating: 4.2,
    image: 'https://randomuser.me/api/portraits/men/25.jpg',
  },
  {
    rid: '9820017',
    date: 'June 25, 2022, 10:00 PM - 03:00 PM',
    name: 'Alexa Johnson',
    rating: 4.8,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    rid: '587895',
    date: 'June 25, 2022, 10:00 PM - 03:00 PM',
    name: 'John Wilson',
    rating: 4.8,
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
  {
    rid: '287564',
    date: 'June 22, 2022, 09:00 PM - 11:00 PM',
    name: 'Wade Warren',
    rating: 4.2,
    image: 'https://randomuser.me/api/portraits/men/25.jpg',
  },
  {
    rid: '8200147',
    date: 'June 25, 2022, 10:00 PM - 03:00 PM',
    name: 'Alexa Johnson',
    rating: 4.8,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    rid: '58995',
    date: 'June 25, 2022, 10:00 PM - 03:00 PM',
    name: 'John Wilson',
    rating: 4.8,
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
  {
    rid: '256344',
    date: 'June 22, 2022, 09:00 PM - 11:00 PM',
    name: 'Wade Warren',
    rating: 4.2,
    image: 'https://randomuser.me/api/portraits/men/25.jpg',
  },
];


const Records = () => {
  const router = useRouter(); // Get router instance
  const [selectedTab, setSelectedTab] = useState('upcoming');


  const handlePress = (rid:number) => {
    router.push(`/pharmacist/records/${rid}`); // Navigate to the dynamic path
  };

  const handleViewPress = (rid:number) => {
    router.push(`/pharmacist/records/${rid}`); 
  }

  const renderBookingCard = (booking: any) => (
    <View key={booking.rid} style={styles.bookingCard}>
      <View style={styles.bookingHeader}>
        <Text style={styles.orderId}>Record ID: {booking.rid}</Text>
        <Text style={styles.orderDate}>{booking.date}</Text>
      </View>

      <View style={styles.userInfo}>
        <Image source={{ uri: booking.image }} style={styles.userImage} />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{booking.name}</Text>
          {/* UPDATE RATING TO DIAGNOSIS */}
          <Text style={styles.userRating}>{booking.diagnosis}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.reviewButton}>
          <Text style={styles.buttonText}>Remainder</Text>
        </TouchableOpacity>
        {/* <Pressable onPress={() => handleViewPress(booking.rid)}> */}
          <TouchableOpacity style={styles.bookAgainButton}>
          <Link href={`/pharmacist/records/${booking.rid}`}>

            <Text style={styles.buttonText}>View Record</Text>
            </Link>

          </TouchableOpacity>
        {/* </Pressable> */}
      </View>
    </View>
  );

  // const renderItem = ({ item }) => (
  //   // <Link href={`/pharmacist/records/${item.rid}`} style={{ flex: 1 }}>
  //   <Pressable onPress={() => handlePress(item.rid)}>
  //   <View style={styles.itemContainer}>
  //       <Image source={{ uri: item.image }} style={styles.itemImage} />
  //       <View style={styles.itemDetails}>
  //         <Text style={styles.itemName}>{item.name}</Text>
  //         <Text style={styles.itemSKU}>{item.sku}</Text>
  //       </View>
  //       <Text style={styles.itemPrice}>{item.price}</Text>
  //   </View>
  //   </Pressable>
  // );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Records</Text>
        <TouchableOpacity style={styles.skuButton}>
          <Text style={styles.skuButtonText}>New Record</Text>
        </TouchableOpacity>
      </View>

      {/* Search Section */}
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={hp('3%')} color="#000" />
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
        />
        <Icon name="filter-outline" size={hp('3%')} color="#000" />
      </View>



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
        {bookings.map((booking) => renderBookingCard(booking))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('5%'),
    backgroundColor: '#fff4',
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
    backgroundColor: '#3B82F6', // Tailwind CSS blue-500 color
    borderRadius: wp('2%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('4%'),
  },
  skuButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: wp('2%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    marginVertical: hp('2%'),
  },
  searchInput: {
    flex: 1,
    marginLeft: wp('2%'),
    fontSize: hp('2%'),
  },
  bookingContainer:{
    flex: 1,
    paddingHorizontal: wp('1%'),

  },
  bookingCard: {
    paddingHorizontal: wp('5%'),
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: wp('2%'),
    marginBottom: hp('1%'),
    shadowColor: '#000',
    shadowOpacity: 0.1,
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
    backgroundColor: '#F0F0F0',
    paddingVertical: hp('1.25%'),
    paddingHorizontal: wp('3%'),
    borderRadius: 25,
  },
  bookAgainButton: {
    backgroundColor: '#6200EE',
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
    backgroundColor: '#6200EE',
  },
  tabText: {
    fontSize: wp('3%'),
    color: '#000',
  },
  selectedTabText: {
    color: '#fff',
  },

});

export default Records;

