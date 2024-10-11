import { Colors } from '@/constants/Colors';
import { router, Stack } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from  'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useGlobalContext } from '@/context/GlobalProvider';
import { addInventoryItem } from '@/lib/appwrite';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker'; 


const ItemForm = () => {
  const { isDarkMode } = useGlobalContext();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false); 
  const [form, setForm] = useState({
    name: "",
    sku: "",
    quantity: "",
    expiration: new Date(),
    manufacturer: "",
    category: "",
    description: ""
  });

  const categories = [
    'pain-relief',
    'antibiotic',
    'anti-inflammatory',
    'antihistamine',
    'cold',
    'flu',
    'general',
    'equipment'
  ];

  const submit = async () => {
    if (
      form.name === "" ||
      form.sku === "" ||
      form.quantity === "" ||
      !form.expiration ||
      form.manufacturer === "" ||
      form.category === ""
    ) {
      return Alert.alert("Please provide all fields");
    }

    const parsedQuantity = parseInt(form.quantity);
    if (isNaN(parsedQuantity)) {
      return Alert.alert("Quantity must be a valid number");
    }
    setUploading(true);
    try {
      await addInventoryItem({
        ...form,
        quantity: parsedQuantity, 
      });

      Alert.alert("Success", "Post uploaded successfully");
      router.push("/pharmacist/inventory");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        name: "",
        sku: "",
        quantity: "",
        expiration: new Date(),
        manufacturer: "",
        category: "",
        description: ""
      });
      setUploading(false);
      setSelectedCategory(null);
    }
  };

  const handleCategorySelect = (category: any) => {
    setSelectedCategory(category);
    setForm({ ...form, category });
  };

  const handleBarcodePress = () => {
    // Implement barcode scanning logic here
  };
  
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setForm({ ...form, expiration: selectedDate });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background }]}>
      <Stack.Screen options={{headerShown:false}}/>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
        {/* <TouchableOpacity onPress={() => router.push('/pharmacist/inventory')}>
          <Entypo name='align-left' size={hp('3%')} color={isDarkMode ? Colors.dark.text : Colors.light.text} />
        </TouchableOpacity> */}

        <Text style={[styles.header, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>New SKU</Text>
        <TouchableOpacity style={[styles.skuButton, { backgroundColor: isDarkMode ? Colors.dark.tabIconDefault1 : Colors.light.tabIconDefault1 }]}>
          <Text style={styles.skuButtonText}>
            Barcode
            <FontAwesome
              name='barcode'
              size={wp('5%')}
              color='#fff'
              onPress={handleBarcodePress}
            />
          </Text>
        </TouchableOpacity>

        <TextInput
          style={[styles.input, { 
            backgroundColor: isDarkMode ? Colors.dark.cardBackground : Colors.light.background,
            color: isDarkMode ? Colors.dark.text : Colors.light.text,
            borderColor: isDarkMode ? Colors.dark.border : Colors.light.border
          }]}
          placeholder="Item Name"
          placeholderTextColor={isDarkMode ? Colors.dark.textSecondary : Colors.light.textSecondary}
          onChangeText={(e) => setForm({ ...form, name: e })}
        />

        <Text style={[styles.sectionTitle, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>Category</Text>
        <View style={styles.categoriesContainer}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategoryButton,
                { backgroundColor: isDarkMode ? Colors.dark.cardBackground : '#E0E0E0' }
              ]}
              onPress={() => handleCategorySelect(category)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category && styles.selectedCategoryButtonText,
                  { color: isDarkMode ? Colors.dark.text : Colors.light.text }
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>Data</Text>

        <TextInput
          style={[styles.input, { 
            backgroundColor: isDarkMode ? Colors.dark.cardBackground : Colors.light.background,
            color: isDarkMode ? Colors.dark.text : Colors.light.text,
            borderColor: isDarkMode ? Colors.dark.border : Colors.light.border
          }]}
          onChangeText={(e) => setForm({ ...form, sku: e })}
          placeholder={"sku"}
          placeholderTextColor={isDarkMode ? Colors.dark.textSecondary : Colors.light.textSecondary}
        />
        <TextInput
          style={[styles.input, { 
            backgroundColor: isDarkMode ? Colors.dark.cardBackground : Colors.light.background,
            color: isDarkMode ? Colors.dark.text : Colors.light.text,
            borderColor: isDarkMode ? Colors.dark.border : Colors.light.border
          }]}
          onChangeText={(e) => setForm({ ...form, quantity: e })}
          keyboardType="numeric"
          placeholder={"quantity"}
          placeholderTextColor={isDarkMode ? Colors.dark.textSecondary : Colors.light.textSecondary}
        />
        <TouchableOpacity
          style={[styles.datePickerButton, { backgroundColor: isDarkMode ? Colors.dark.cardBackground : Colors.light.background }]}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={{ color: isDarkMode ? Colors.dark.text : Colors.light.text }}>
            Expiration Date: {form.expiration.toDateString()}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={form.expiration}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        <TextInput
          style={[styles.input, { 
            backgroundColor: isDarkMode ? Colors.dark.cardBackground : Colors.light.background,
            color: isDarkMode ? Colors.dark.text : Colors.light.text,
            borderColor: isDarkMode ? Colors.dark.border : Colors.light.border
          }]}
          onChangeText={(e) => setForm({ ...form, manufacturer: e })}
          placeholder={"manufacturer"}
          placeholderTextColor={isDarkMode ? Colors.dark.textSecondary : Colors.light.textSecondary}
        />

        <TextInput
          style={[styles.specificationsInput, { 
            backgroundColor: isDarkMode ? Colors.dark.cardBackground : Colors.light.background,
            color: isDarkMode ? Colors.dark.text : Colors.light.text,
            borderColor: isDarkMode ? Colors.dark.border : Colors.light.border
          }]}
          placeholder="Description"
          placeholderTextColor={isDarkMode ? Colors.dark.textSecondary : Colors.light.textSecondary}
          onChangeText={(e) => setForm({ ...form, description: e })}
          multiline
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.cancelButton, { backgroundColor: isDarkMode ? Colors.dark.cardBackground : '#E0E0E0' }]} 
            onPress={() => router.push('/pharmacist/inventory')}
          >
            <Text style={[styles.buttonText, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.submitButton, { backgroundColor: isDarkMode ? Colors.dark.tabIconDefault1 : Colors.light.tabIconDefault1 }]} 
            disabled={uploading} 
            onPress={submit}
          >
            <Text style={styles.buttonText}>
              {uploading ? "Submitting..." : "Submit"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('5%'),
  },
  scrollViewContent: {
    paddingBottom: hp('10%'), 
  },
  header: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
  },
  backButton: {
    fontSize: hp('5.5%'),
  },
  skuButton: {
    position: 'absolute',
    right: wp('1%'),
    top: hp('0.01%'),
    flexDirection: 'row',
    borderRadius: wp('2%'),
    paddingVertical: hp('1%'),
    width: wp('25%'),
    justifyContent: 'center',
  },
  skuButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: wp('3%'),
    marginBottom: hp('2%'),
  },
  sectionTitle: {
    fontSize: wp('4.5%'),
    fontWeight: '500',
    marginBottom: hp('1%'),
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: hp('2%'),
  },
  categoryButton: {
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('3%'),
    borderRadius: 20,
    marginRight: wp('2%'),
    marginBottom: hp('1%'),
  },
  selectedCategoryButton: {
    backgroundColor: Colors.light.tabIconDefault1,
  },
  categoryButtonText: {
    fontSize: wp('4%'),
  },
  selectedCategoryButtonText: {
    color: '#fff',
  },
  specificationsInput: {
    height: hp('15%'),
    borderWidth: 1,
    borderRadius: 10,
    padding: wp('3%'),
    textAlignVertical: 'top',
    marginBottom: hp('2%'),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  datePickerButton: {
    padding: wp('4%'),
    borderRadius: wp('3%'),
    marginVertical: hp('1.5%'),
    borderWidth: 1,
    alignItems: 'center',
  },
  cancelButton: {
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('10%'),
    borderRadius: 10,
  },
  submitButton: {
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('10%'),
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ItemForm;