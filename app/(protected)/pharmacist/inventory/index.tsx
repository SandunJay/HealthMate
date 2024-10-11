import { InventoryItem } from '@/assets/types';
import { Stack, useRouter, useFocusEffect } from 'expo-router';
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Octicons } from '@expo/vector-icons';
import { useGlobalContext } from '@/context/GlobalProvider';
import { Colors } from '@/constants/Colors';
import { getInventoryItems } from '@/lib/appwrite';

const InventoryScreen = () => {
  const router = useRouter();
  const { isDarkMode, isIos } = useGlobalContext();
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); // State to track search input

  const fetchInventoryItems = async () => {
    setLoading(true);
    try {
      const data = await getInventoryItems();

      // Map the Document[] to InventoryItem[]
      const mappedData: InventoryItem[] = data.map((doc) => ({
        $id: doc.$id,
        name: doc.name,
        category: doc.category,
        sku: doc.sku,
        manufacturer: doc.manufacturer,
        quantity: doc.quantity,
        expiration: doc.expiration,
        description: doc.description,
      }));

      setInventoryData(mappedData);
    } catch (error) {
      console.error("Failed to fetch inventory items:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchInventoryItems();
    }, [])
  );

  const handlePress = (id: string) => {
    router.push(`/pharmacist/inventory/${id}`);
  };

  const handleButtonPress = () => {
    router.push('/pharmacist/inventory/add');
  };

  // Function to filter items based on the search query
  const filteredData = inventoryData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }: { item: InventoryItem }) => (
    <Pressable onPress={() => handlePress(item.$id)}>
      <View style={[styles.itemContainer, { borderColor: isDarkMode ? Colors.dark.border : Colors.light.border }]}>
        <View style={styles.itemDetails}>
          <Text style={[styles.itemName, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>{item.name}</Text>
          <Text style={[styles.itemSKU, { color: isDarkMode ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>{item.sku}</Text>
        </View>
        <Text style={[styles.itemPrice, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>{item.quantity}</Text>
      </View>
    </Pressable>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={isDarkMode ? Colors.dark.text : Colors.light.text} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background, paddingTop: isIos ? hp('4%') : hp('3%') }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>Inventory</Text>
        <TouchableOpacity style={[styles.skuButton, { backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.text }]} onPress={handleButtonPress}>
          <Text style={styles.skuButtonText}>+ New SKU</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: isDarkMode ? Colors.dark.cardBackground : Colors.light.cardBackground }]}>
        <Octicons name='search' size={hp('3%')} color={isDarkMode ? Colors.dark.text : Colors.light.text} />
        <TextInput
          placeholder="Search"
          placeholderTextColor={isDarkMode ? Colors.dark.textSecondary : Colors.light.textSecondary}
          style={[styles.searchInput, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}
          value={searchQuery} // Bind search input value
          onChangeText={setSearchQuery} // Update search query state
        />
        <Octicons name='filter' size={hp('3%')} color={isDarkMode ? Colors.dark.text : Colors.light.text} />
      </View>

      {filteredData.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: isDarkMode ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>No items to show</Text>
        </View>
      ) : (
        <FlatList
          data={filteredData} // Use the filtered data
          renderItem={renderItem}
          keyExtractor={item => item['$id']}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // your existing styles
  container: {
    flex: 1,
    paddingHorizontal: wp('5%'),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  listContent: {
    paddingBottom: hp('10%'),
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp('1.5%'),
    borderBottomWidth: 1,
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
  },
  itemPrice: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: hp('2.5%'),
  },
});

export default InventoryScreen;
