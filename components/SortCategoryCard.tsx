import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { constSortCategoryData } from '@/assets/dummy'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Colors } from '@/constants/Colors'

const SortCategoryCard = ({ isDarkMode } : {isDarkMode:any}) => {
  const [activeState, setActiveState] = useState('Popular')

  const styles = StyleSheet.create({
    container: {
      backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background,
    },
    button: {
      backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background,
    },
    activeButton: {
      backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background,
    },
    buttonText: {
      color: isDarkMode ? Colors.dark.text : Colors.light.tabIconDefault1,
    },
    activeButtonText: {
      color: isDarkMode ? Colors.dark.icon1 : Colors.light.icon1,
    },
  })

  return (
    <View style={styles.container} className='flex-row justify-around items-center mx-4 rounded-full p-2 px-4 space-x-2'>
      {constSortCategoryData.map((sort, index) => {
        let isActive = sort == activeState
        let activeButtonClass = isActive ? styles.activeButton : {}
        return (
          <TouchableOpacity
            onPress={() => { setActiveState(sort) }}
            key={index}
            style={[styles.button, activeButtonClass]}
            className={`p-3 px-4 rounded-full flex`}
          >
            <Text style={[styles.buttonText, isActive && styles.activeButtonText]} className='font-semibold'>{sort}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default SortCategoryCard