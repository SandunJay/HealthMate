import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Colors } from '@/constants/Colors'
import { categoriesData } from '../assets/dummy'

const CategoryCard = ({ isDarkMode }) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background,
    },
    title: {
      fontSize: wp(4),
      color: isDarkMode ? Colors.dark.text : Colors.light.icon1,
      fontWeight: 'semibold',
    },
    seeAllText: {
      fontSize: wp(4),
      color: isDarkMode ? Colors.dark.icon1 : Colors.light.icon1,
    },
    categoryTitle: {
      color: isDarkMode ? Colors.dark.icon1 : Colors.light.tabIconDefault,
      fontSize: wp(3),
      fontWeight: 'medium',
    },
  })

  return (
    <View style={styles.container} className='space-y-5'>
      <View className="mx-5 flex-row justify-between items-center">
        <Text style={styles.title}>Categories</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        className='space-x-4'
        showsHorizontalScrollIndicator={false}
      >
        {categoriesData.map((cat, index) => (
          <TouchableOpacity key={index} className="flex items-center space-y-2">
            <Image
              source={cat.image} className='rounded-3xl' style={{ width: wp(20), height: wp(19) }}
            />
            <Text style={styles.categoryTitle}>{cat.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default CategoryCard