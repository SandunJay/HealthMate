import { Colors } from '@/constants/Colors';
import { Link, router, useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image, StyleSheet, Pressable, ScrollView, Animated, Modal } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useGlobalContext } from '@/context/GlobalProvider';
import { fetchPrescriptions } from '@/lib/appwrite';
import { Octicons } from '@expo/vector-icons';

interface PrescriptionType {
    $id: string;
    name: { username: string; img: string };  // Adjust name to be an object
    date: string;
    diagnosis: string;
    condition: 'minor' | 'normal' | 'severe';  
    status: 'issued' | 'rejected' | 'dispensed'; 
}



const Records = () => {
  const { isIos } = useGlobalContext();
  const { isDarkMode } = useGlobalContext();
  const router = useRouter();
  // const [selectedTab, setSelectedTab] = useState('upcoming');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');
  const filterAnimation = useRef(new Animated.Value(0)).current;
  // const [showModal, setShowModal] = useState(false);
  const modalAnimation = useRef(new Animated.Value(0)).current; 
  const [prescriptions, setPrescriptions] = useState<PrescriptionType[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<string>('all'); 
  const [filteredPrescriptions, setFilteredPrescriptions] = useState<PrescriptionType[]>([]); // filtered list state

  useFocusEffect(
    useCallback(() => {
      const fetchFilteredPrescriptions = async () => {
        const fetchedPrescriptions = await fetchPrescriptions();

        const mappedPrescriptions: PrescriptionType[] = fetchedPrescriptions.map(prescription => ({
          $id: prescription.$id,
          name: prescription.user,  // Map userName to name, with a fallback
          date: prescription.$createdAt, // Assuming $createdAt represents the 'date'
          diagnosis: prescription.diagnosis,  // Map diagnosis, or provide a default
          condition: prescription.condition,  // Provide default or adjust based on real data
          status: prescription.status // Provide default or adjust based on real data
        }));

        setPrescriptions(mappedPrescriptions);
      };

      fetchFilteredPrescriptions();
    }, [selectedTab, searchKeyword])
  );



  // const openModal = () => {
  //   setShowModal(true);
  //   Animated.timing(modalAnimation, {
  //     toValue: 1,
  //     duration: 300,
  //     useNativeDriver: true,
  //   }).start();
  // };

  // const closeModal = () => {
  //   Animated.timing(modalAnimation, {
  //     toValue: 0,
  //     duration: 300,
  //     useNativeDriver: true,
  //   }).start(() => setShowModal(false));
  // };

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

const handleSearch = (text: string) => {
  setSearchKeyword(text);

  if (text) {
    const filteredData = prescriptions.filter((prescription) => {
      const username = prescription.name?.username?.toLowerCase() || '';  // Check for existence of username
      return username.includes(text.toLowerCase());
    });

    setFilteredPrescriptions(filteredData);
  } else {
    setFilteredPrescriptions(prescriptions); // Show all if no search term
  }
};



const renderBookingCard = ({ item }: { item: PrescriptionType }) => {
  let buttonText = '';
  let buttonStyle = {};
  let otherButtonStyle = {};

  // Determine button text and styles based on item status
  switch (item.status) {
    case 'issued':
      buttonText = 'New Record';
      buttonStyle = { backgroundColor: isDarkMode ? Colors.dark.tabIconSelected : Colors.light.tabIconDefault1 };
      otherButtonStyle = { backgroundColor: isDarkMode ? Colors.dark.tabIconDefault1 : Colors.light.tabIconDefault1 };
      break;

    case 'dispensed':
      buttonText = 'View Record';
      buttonStyle = { backgroundColor: isDarkMode ? Colors.dark.tabIconDefault : Colors.light.tabIconSelected }; // Dark green for dispensed
      otherButtonStyle = { backgroundColor: isDarkMode ? Colors.dark.tabIconDefault1 : Colors.light.tabIconDefault1 };
      break;

    case 'rejected':
      buttonText = 'View Record';
      buttonStyle = { backgroundColor: isDarkMode ? Colors.dark.icon : Colors.light.icon }; // Red for rejected
      otherButtonStyle = { backgroundColor: isDarkMode ? Colors.dark.tabIconDefault1 : Colors.light.tabIconDefault1 };
      break;

    default:
      buttonText = 'Unknown Status';
      buttonStyle = { backgroundColor: 'gray' };
      otherButtonStyle = { backgroundColor: isDarkMode ? Colors.dark.tabIconDefault1 : Colors.light.tabIconDefault1 };
  }

  return (
    <View key={item.$id} style={[styles.bookingCard, { backgroundColor: isDarkMode ? Colors.dark.cardBackground : Colors.light.tint }]}>
      <View style={styles.bookingHeader}>
        <Text style={[styles.orderId, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>Record ID: {item.$id}</Text>
        <Text style={[styles.orderDate, { color: isDarkMode ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>{item.date}</Text>
      </View>

      <View style={styles.userInfo}>
        <Image source={{ uri: item.name.img }} style={styles.userImage} />
        <View style={styles.userDetails}>
          <Text style={[styles.userName, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>{item.name.username}</Text>
          <Text style={[styles.userRating, { color: isDarkMode ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>{item.diagnosis}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={[styles.reviewButton, otherButtonStyle]}>
          <Text style={styles.buttonText}>Remainder</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.bookAgainButton, buttonStyle]} onPress={() => handleViewBtn(item.$id)}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background, paddingTop: isIos ? hp('3%') : hp('3%') }]}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>Records</Text>
        <TouchableOpacity style={[styles.skuButton, { backgroundColor: isDarkMode ? Colors.light.icon : Colors.dark.icon1 }]} onPress={() => handleNew()}>
          <Text style={styles.skuButtonText}>New Record</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: isDarkMode ? Colors.dark.cardBackground : Colors.light.background }]}>
        <Octicons name="search" size={hp('3%')} color={isDarkMode ? Colors.dark.icon : Colors.light.icon} />
        <TextInput
          placeholder="Search by username"
          placeholderTextColor={isDarkMode ? Colors.dark.textSecondary : Colors.light.textSecondary}
          style={[styles.searchInput, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}
          value={searchKeyword}
          onChangeText={handleSearch}  // Call handleSearch on text change
        />
        <TouchableOpacity onPress={openFilterPopup}>
          <Octicons name="filter" size={hp('3%')} color={isDarkMode ? Colors.dark.icon : Colors.light.icon} />
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
              backgroundColor: isDarkMode ? Colors.dark.cardBackground : Colors.light.background,
            },
          ]}
        >
          <Pressable
            style={styles.filterItem}
            onPress={() => handleFilterSelection('All')}
          >
            <Text style={[styles.filterText, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>All</Text>
          </Pressable>
          <View style={styles.separator} />
          <Pressable
            style={styles.filterItem}
            onPress={() => handleFilterSelection('issued')}
          >
            <Text style={[styles.filterText, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>Issued</Text>
          </Pressable>
          <View style={styles.separator} />
          <Pressable
            style={styles.filterItem}
            onPress={() => handleFilterSelection('dispensed')}
          >
            <Text style={[styles.filterText, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>Dispensed</Text>
          </Pressable>
        </Animated.View>
      </Modal>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'issued' && styles.selectedTab,
            { backgroundColor: isDarkMode ? Colors.dark.cardBackground : '#F0F0F0' }
          ]}
          onPress={() => setSelectedTab('issued')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'issued' && styles.selectedTabText,
              { color: isDarkMode ? Colors.dark.text : Colors.light.text }
            ]}
          >
            Issued
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'dispensed' && styles.selectedTab,
            { backgroundColor: isDarkMode ? Colors.dark.cardBackground : '#F0F0F0' }
          ]}
          onPress={() => setSelectedTab('dispensed')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'dispensed' && styles.selectedTabText,
              { color: isDarkMode ? Colors.dark.text : Colors.light.text }
            ]}
          >
            Dispensed
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.bookingContainer}>
        {prescriptions.map((prescription) => renderBookingCard({ item: prescription }))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('5%'),
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
    borderRadius: wp('5%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    marginVertical: hp('2%'),
    borderWidth: 1,
    borderColor: 'transparent',
  },
  searchInput: {
    flex: 1,
    marginLeft: wp('2%'),
    fontSize: hp('2%'),
  },
  filterPopup: {
    position: 'absolute',
    top: hp('12%'),
    right: wp('5%'),
    width: wp('40%'),
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  userName: {
    fontSize: wp('3.5%'),
    fontWeight: '500',
  },
  userRating: {
    paddingRight: wp('3%'),
    fontSize: wp('3%'),
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reviewButton: {
    paddingVertical: hp('1.25%'),
    paddingHorizontal: wp('3%'),
    borderRadius: 25,
  },
  bookAgainButton: {
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
    marginHorizontal: wp('2%'),
  },
  selectedTab: {
    backgroundColor: Colors.light.tabIconDefault1,
  },
  tabText: {
    fontSize: wp('3%'),
  },
  selectedTabText: {
    color: '#fff',
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
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