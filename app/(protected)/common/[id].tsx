import { cardData } from '@/assets/dummy';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

const TipScreen = () => {
  const { id } = useLocalSearchParams();
  
  // Convert the id to match the type of id in your cardData
  const tipId = typeof id === 'string' ? parseInt(id) : id;

  console.log('Retrieved id: ', tipId);

  // Find the relevant item based on the id
  const item = cardData.find((tip) => tip.id === tipId);

  // Handle if the item is not found
  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>News</Text>
      </View>
    );
  }

  return (
      <View style={styles.container}>
         <Stack.Screen options={{headerShown:false}}/>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back}>
              <Icon name="arrow-back" size={hp('3%')} color="#000" />
            </TouchableOpacity>
          <View style={{ flex: 1 }}/>
            <Text style={styles.headerText}>{item.category}</Text>
          </View>
        <ScrollView showsVerticalScrollIndicator = {false}>
          <Image
            source={item?.image}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.title}>
            {item?.title}
          </Text>
          <Text style={styles.subtitle}>
            {item?.shortDescription}
          </Text>
          <Text style={styles.subtitle}>
            {item?.longDescription}
          </Text>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9F9F9', // Set the background color
    paddingHorizontal: wp('5%'),  // Responsive padding
  },
	header: {
    marginTop: hp('2%'),
	  flexDirection: 'row',
	  justifyContent: 'space-between',
	  alignItems: 'center',
	  marginBottom: hp('3%'),
	},
	headerText: {
		fontSize: hp('2.5%'),
		fontWeight: 'bold',
		position: 'absolute', // This will make the text centered
		left: 0,
		right: 0,
		textAlign: 'center',  // Align text to center
	},
   image: {
    width: wp('100%'),   // 60% of the screen width
    height: hp('40%'),  // 40% of the screen height
    margin: hp('1%'), // Spacing between image and title
  },
  title: {
    fontSize: wp('6%'),   // Responsive font size
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',        // Black color for text
    marginBottom: hp('2%'), // Spacing between title and subtitle
  },
  subtitle: {
    fontSize: wp('4%'),   // Responsive font size
    textAlign: 'center',
    color: '#666',        // Gray color for the subtitle
  },
  errorText: {
    fontSize: wp('5%'),
    color: 'red',
  },
});

export default TipScreen;
