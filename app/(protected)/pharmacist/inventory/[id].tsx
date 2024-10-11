import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Animated, Modal, TextInput, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Entypo } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import { InventoryItem as ItemType } from '@/assets/types';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useGlobalContext } from '@/context/GlobalProvider';
import { Colors } from '@/constants/Colors';
import { getInventoryItem, updateInventoryItem } from '@/lib/appwrite';

const InventoryItem = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isDarkMode } = useGlobalContext();
    const { isIos} = useGlobalContext();
  const [item, setItem] = useState<ItemType | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalAnimation] = useState(new Animated.Value(0));
  const [showManualEntryModal, setShowManualEntryModal] = useState(false);
  const [stockAmount, setStockAmount] = useState('');

  useEffect(() => {
    console.log("ID is: " + id);
    const fetchItemData = async () => {
      try {
        const response = await getInventoryItem(id);
        const itemData: ItemType = {
          $id: response.$id,
          name: response.name,
          category: response.category,
          quantity: response.quantity,
          sku: response.sku,
          description: response.description,
          manufacturer: response.manufacturer,
          expiration:formatDate(response.expiration),
        };
        setItem(itemData);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch item data.', [
          { text: 'OK', onPress: () => router.back() },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchItemData();
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const openManualEntryModal = () => {
    Animated.timing(modalAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setShowManualEntryModal(true));
  };

  const closeManualEntryModal = () => {
    Animated.timing(modalAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setShowManualEntryModal(false));
  };

const handleManualSubmit = async () => {
  const amountToAdd = parseInt(stockAmount, 10);
  if (isNaN(amountToAdd) || amountToAdd <= 0) {
    Alert.alert('Invalid Input', 'Please enter a valid stock amount.');
    return;
  }

  try {
    await updateInventoryItem(id, amountToAdd); // Call the update function
    
    // Update the item quantity locally without making another API call
    setItem((prevItem) => {
      if (prevItem) {
        return {
          ...prevItem,
          quantity: prevItem.quantity + amountToAdd, // Update the quantity in the item state
        };
      }
      return prevItem;
    });

    Alert.alert('Success', `Added ${amountToAdd} units to ${item?.name}`);
    setStockAmount(''); // Clear the input field
  } catch (error) {
    Alert.alert('Error', 'Failed to update inventory item.');
  } finally {
    closeManualEntryModal();
  }
};

  // Render a loading indicator while data is being fetched
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={isDarkMode ? Colors.dark.text : Colors.light.text} />
      </View>
    );
  }

  // Check if item is undefined and handle accordingly
  if (!item) {
    Alert.alert('Item Not Found', 'The selected item does not exist.', [
      { text: 'OK', onPress: () => router.back() },
    ]);
    return null; // Prevent further rendering if item is not found
  }

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background, paddingTop: isIos ? hp('5%') : hp('3%') }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Entypo name='align-left' size={hp('3%')} color={isDarkMode ? Colors.dark.text : Colors.light.text} />
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>{item.name}</Text>
      </View>

    <ScrollView>
        <TouchableOpacity onPress={openManualEntryModal} style={[styles.addStockButton, { backgroundColor: isDarkMode ? Colors.dark.icon : Colors.light.icon }]}>
          <Text style={styles.addStockButtonText}>+ Add Stock</Text>
        </TouchableOpacity>

        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: isDarkMode ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>ID</Text>
          <Text style={[styles.detailValue, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>{item.$id}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: isDarkMode ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>Category</Text>
          <Text style={[styles.detailValue, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>{item.category}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: isDarkMode ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>Quantity</Text>
          <Text style={[styles.detailValue, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>{item.quantity} units</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: isDarkMode ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>Expiration</Text>
          <Text style={[styles.detailValue, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>{item.expiration}</Text>
        </View>

        <TouchableOpacity style={[styles.supplierContainer, { backgroundColor: isDarkMode ? Colors.dark.cardBackground : Colors.light.cardBackground }]}>
          <Text style={[styles.supplierLabel, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>Manufacturer</Text>
          <Text style={[styles.supplierName, { color: isDarkMode ? Colors.dark.textSecondary : Colors.light.textSecondary }]}>{item.manufacturer}</Text>
        </TouchableOpacity>

        <View style={styles.barcodeContainer}>
          <QRCode 
            value={item.sku} 
            size={150} 
            color={isDarkMode ? Colors.dark.text : Colors.light.text} 
            backgroundColor={isDarkMode ? Colors.dark.background : Colors.light.background} 
          />
          <Text style={[styles.barcodeText, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>{item.sku}</Text>
        </View>

        {/* New container for the description */}
        <View style={[styles.descriptionContainer, { backgroundColor: isDarkMode ? Colors.dark.cardBackground : Colors.light.cardBackground }]}>
          <Text style={[styles.descriptionLabel, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>Description</Text>
          <Text style={[styles.descriptionText, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>{item.description}</Text>
        </View>

      </ScrollView>
      <Modal
        transparent
        visible={showManualEntryModal}
        animationType="slide"
        onRequestClose={closeManualEntryModal}
      >
        <View style={styles.manualEntryContainer}>
          <View style={[styles.manualEntryContent, { backgroundColor: isDarkMode ? Colors.dark.cardBackground : Colors.light.background }]}>
            <TextInput
              placeholder="Enter new stock amount"
              placeholderTextColor={isDarkMode ? Colors.dark.textSecondary : '#ccc'}
              value={stockAmount}
              onChangeText={setStockAmount}
              style={[styles.manualEntryInput, { 
                backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background,
                color: isDarkMode ? Colors.dark.text : Colors.light.text,
                borderColor: isDarkMode ? Colors.dark.border : '#ccc'
              }]}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={closeManualEntryModal} style={[styles.cancelButton, { backgroundColor: isDarkMode ? Colors.dark.cardBackground : '#ddd' }]}>
                <Text style={[styles.buttonText, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleManualSubmit} style={[styles.submitButton, { backgroundColor: isDarkMode ? Colors.dark.tabIconDefault1 : Colors.light.tabIconDefault1 }]}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('5%'),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background, // or use your dark mode color
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('2%'),
  },
  headerText: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    marginLeft: wp('4%'),
  },
  addStockButton: {
    paddingVertical: hp('1%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    marginVertical: hp('2%'),
  },
  addStockButtonText: {
    color: '#fff',
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp('0.8%'),
  },
  detailLabel: {
    fontSize: hp('2%'),
  },
  detailValue: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
  supplierContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: hp('2%'),
    borderRadius: wp('2%'),
    marginVertical: hp('2%'),
  },
  supplierLabel: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
  supplierName: {
    fontSize: hp('2%'),
  },
  barcodeContainer: {
    alignItems: 'center',
    marginVertical: hp('2%'),
  },
  barcodeText: {
    fontSize: hp('2%'),
    marginTop: hp('1%'),
  },
  // New styles for the description container
  descriptionContainer: {
    padding: hp('2%'),
    borderRadius: wp('2%'),
    marginVertical: hp('2%'),
  },
  descriptionLabel: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: hp('2%'),
    marginTop: hp('1%'),
  },
    manualEntryContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  manualEntryContent: {
    padding: wp('5%'),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  },
  manualEntryInput: {
    borderWidth: 1,
    padding: hp('1.5%'),
    borderRadius: 10,
    marginBottom: hp('2%'),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    padding: hp('1.5%'),
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  submitButton: {
    padding: hp('1.5%'),
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default InventoryItem;
