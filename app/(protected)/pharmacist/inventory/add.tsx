import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

const ItemForm = () => {
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

  const handleBarcodePress  ={
  }
  
  return (
    <View style={styles.container}>
        <ScrollView showsHorizontalScrollIndicator>
      <Text style={styles.header}>New SKU</Text>
      <TouchableOpacity style={styles.skuButton}>
          <Text style={styles.skuButtonText}>Barcode
            <Icon
                name='barcode'
                size={wp('5%')}
                color='#fff'
                onPress={()=>{handleBarcodePress}}
            />
          </Text>
     </TouchableOpacity>

      {/* Part Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Part Name"
        value={partName}
        onChangeText={setPartName}
      />

      {/* Categories */}
      <Text style={styles.sectionTitle}>Category</Text>
      <View style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton
            ]}
            onPress={() => handleCategorySelect(category)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === category && styles.selectedCategoryButtonText
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Specifications Input */}
      <Text style={styles.sectionTitle}>Specifications</Text>
      <TextInput
        style={styles.specificationsInput}
        placeholder="Specifications"
        value={specifications}
        onChangeText={setSpecifications}
        multiline
      />

    {/* Specifications Input */}
    <Text style={styles.sectionTitle}>Specifications</Text>
        <TextInput
        style={styles.specificationsInput}
        placeholder="Specifications"
        value={specifications}
        onChangeText={setSpecifications}
        multiline
      />

    {/* Part Name Input */}
    <TextInput
        style={styles.input}
        placeholder="Part Name"
        value={partName}
        onChangeText={setPartName}
      />
    {/* Part Name Input */}
    <TextInput
        style={styles.input}
        placeholder="Part Name"
        value={partName}
        onChangeText={setPartName}
      />
      {/* Part Name Input */}
    <TextInput
        style={styles.input}
        placeholder="Part Name"
        value={partName}
        onChangeText={setPartName}
      />
      {/* Part Name Input */}
    <TextInput
        style={styles.input}
        placeholder="Part Name"
        value={partName}
        onChangeText={setPartName}
      />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton}>
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
    backgroundColor: '#f5f5f5',
    padding: wp('5%'),
  },
  header: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
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
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    marginRight: wp('2%'),
    marginBottom: hp('1%'),
  },
  selectedCategoryButton: {
    backgroundColor: '#007BFF',
  },
  categoryButtonText: {
    fontSize: wp('4%'),
    color: '#000',
  },
  selectedCategoryButtonText: {
    color: '#fff',
  },
  specificationsInput: {
    height: hp('15%'),
    borderWidth: 1,
    borderColor: '#ccc',
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
    backgroundColor: '#E0E0E0',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('10%'),
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: '#007BFF',
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
