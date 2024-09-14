import { InventoryItem } from '@/assets/types';
import { inventoryData } from '@/assets/dummy';
import { Link, router, useRouter } from 'expo-router';
import React from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image, StyleSheet, Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';




const InventoryScreen = () => {
  const router = useRouter(); // Get router instance

  const handlePress = (id:string) => {
    router.push(`/pharmacist/inventory/${id}`); // Navigate to the dynamic path
  };

  const handleButtonPress = () => {
    router.push('/pharmacist/inventory/add');
  }

  const renderItem = ({ item }:{item: InventoryItem}) => (
    // <Link href={`/pharmacist/records/${item.id}`} style={{ flex: 1 }}>
    <Pressable onPress={() => handlePress(item.id)}>
    <View style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemSKU}>{item.sku}</Text>
        </View>
        <Text style={styles.itemPrice}>{item.quantity}</Text>
    </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Inventory</Text>
        <TouchableOpacity style={styles.skuButton} onPress={()=> handleButtonPress}>
          <Text style={styles.skuButtonText}>+ New SKU</Text>
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

      {/* Inventory List */}
      <FlatList
        data={inventoryData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('5%'),
    backgroundColor: '#fff',
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
  linkWrapper: {
    flex: 1,
    width: '100%',
  },
  link: {
    flex: 1,
    width: '100%',
  },
  listContent: {
    paddingBottom: hp('10%'),
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp('1.5%'),
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  itemImage: {
    width: wp('10%'),
    height: wp('10%'),
    resizeMode: 'contain',
  },
  itemDetails: {
    flex: 1,
    marginLeft: wp('4%'),
  },
  itemName: {
    fontSize: hp('2.2%'),
    fontWeight: 'bold',
  },
  itemSKU: {
    fontSize: hp('1.8%'),
    color: '#6B7280',
  },
  itemPrice: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
});

export default InventoryScreen;

