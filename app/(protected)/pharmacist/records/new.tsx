import { Colors } from '@/constants/Colors';
import { router, Stack } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from  'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import Icon from 'react-native-vector-icons/Ionicons';
import { useGlobalContext } from '@/context/GlobalProvider';
import { Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const ItemForm = () => {
  const { isDarkMode } = useGlobalContext();
  const { isIos} = useGlobalContext();
  const [partName, setPartName] = useState('');
  const [specifications, setSpecifications] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    'Battery & Charging',
    'Sensors & Cameras',
    'Electric Motors & Drivetrain',
    'Infotainment & Connectivity',
    'Body & Accessories'
  ];

  const handleCategorySelect = (category: any) => {
    setSelectedCategory(category);
  };

  const handleBarcodePress = () => {
    // Implement barcode scanning logic here
  };
  
  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background, paddingTop: isIos ? hp('6%') : hp('3%') }]}>
      <Stack.Screen options={{headerShown:false}}/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={() => router.push('/pharmacist/records')}>
          {/* <Icon name="arrow-back" size={hp('3%')} color={isDarkMode ? Colors.dark.text : Colors.light.text} /> */}
          <Entypo name='align-left' size={hp('3%')} color={isDarkMode ? Colors.dark.text : Colors.light.text} />
        </TouchableOpacity>

        <Text style={[styles.header, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>New SKU</Text>
        <TouchableOpacity style={[styles.skuButton, { backgroundColor: isDarkMode ? Colors.dark.tabIconDefault1 : Colors.light.tabIconDefault1 }]}>
          <Text style={styles.skuButtonText}>
            Barcode
            <MaterialCommunityIcons
              name='barcode-scan'
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
          placeholder="Part Name"
          placeholderTextColor={isDarkMode ? Colors.dark.textSecondary : Colors.light.textSecondary}
          value={partName}
          onChangeText={setPartName}
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

        <Text style={[styles.sectionTitle, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>Specifications</Text>
        <TextInput
          style={[styles.specificationsInput, { 
            backgroundColor: isDarkMode ? Colors.dark.cardBackground : Colors.light.background,
            color: isDarkMode ? Colors.dark.text : Colors.light.text,
            borderColor: isDarkMode ? Colors.dark.border : Colors.light.border
          }]}
          placeholder="Specifications"
          placeholderTextColor={isDarkMode ? Colors.dark.textSecondary : Colors.light.textSecondary}
          value={specifications}
          onChangeText={setSpecifications}
          multiline
        />

        {/* Additional input fields */}
        {[1, 2, 3, 4].map((_, index) => (
          <TextInput
            key={index}
            style={[styles.input, { 
              backgroundColor: isDarkMode ? Colors.dark.cardBackground : Colors.light.background,
              color: isDarkMode ? Colors.dark.text : Colors.light.text,
              borderColor: isDarkMode ? Colors.dark.border : Colors.light.border
            }]}
            placeholder={`Additional Field ${index + 1}`}
            placeholderTextColor={isDarkMode ? Colors.dark.textSecondary : Colors.light.textSecondary}
          />
        ))}

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.cancelButton, { backgroundColor: isDarkMode ? Colors.dark.cardBackground : '#E0E0E0' }]} 
            onPress={() => router.push('/pharmacist/records')}
          >
            <Text style={[styles.buttonText, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.submitButton, { backgroundColor: isDarkMode ? Colors.dark.tabIconDefault1 : Colors.light.tabIconDefault1 }]}>
            <Text style={styles.buttonText}>Submit</Text>
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
    top: hp('3.00%'),
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