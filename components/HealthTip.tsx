import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { cardData } from '@/assets/dummy'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { LinearGradient } from  'expo-linear-gradient'
import { HeartIcon } from 'react-native-heroicons/solid'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'

const HealthTip = ({ isDarkMode }:{isDarkMode: any}) => {
  const router = useRouter()
  const [visibleTips, setVisibleTips] = useState(4)

  const styles = StyleSheet.create({
    container: {
      backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background,
    },
    loadMoreText: {
      fontSize: wp(4),
      color: isDarkMode ? Colors.main.primary : Colors.main.gray,
      textAlign: 'center',
    },
    cardTitle: {
      fontSize: wp(4),
      color: isDarkMode ? Colors.dark.text : Colors.light.text,
      fontWeight: 'semibold',
    },
    cardDescription: {
      fontSize: wp(2.2),
      color: isDarkMode ? Colors.dark.text : Colors.light.text,
    },
  })

  const loadMore = () => {
    if (visibleTips < cardData.length) {
      setVisibleTips(visibleTips + 4)
    }
  }

  return (
    <View style={styles.container}>
      <View className="mx-4 flex-row justify-between flex-wrap">
        {cardData.slice(0, visibleTips).map((item, index) => (
          <HealthTipCard router={router} item={item} key={index} isDarkMode={isDarkMode} />
        ))}
      </View>
      {visibleTips < cardData.length && (
        <TouchableOpacity onPress={loadMore} className="mt-4">
          <Text style={styles.loadMoreText}>Load More</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const HealthTipCard = ({ item, isDarkMode }: {item:any, isDarkMode:any}) => {
  const router = useRouter()
  const [isFavourite, toggleFavourite] = useState(false)

  const handlePress = (id) => {
    console.log('Navigating to: ', `/inventory with id: ${id}`)
    router.push(`/common/${id}`)
  }

  const styles = StyleSheet.create({
    cardTitle: {
      fontSize: wp(4),
      color: isDarkMode ? Colors.dark.text : Colors.light.text,
      fontWeight: 'semibold',
    },
    cardDescription: {
      fontSize: wp(2.2),
      color: isDarkMode ? Colors.dark.text : Colors.light.text,
    },
  })

  return (
    <View>
      <TouchableOpacity
        style={{ width: wp(44), height: wp(65) }}
        className='flex justify-end relative p-4 py-6 space-y-2 mb-5'
        onPress={() => handlePress(item.id)}
      >
        <Image
          source={item.image}
          style={{ width: wp(44), height: wp(65), borderRadius: 35 }}
          className='absolute'
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={{ width: wp(44), height: hp(15), borderBottomLeftRadius: 35, borderBottomRightRadius: 35 }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          className='absolute bottom-0'
        />
        <TouchableOpacity
          onPress={() => toggleFavourite(!isFavourite)}
          style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}
          className='absolute top-1 right-3 rounded-full p-3'
        >
          <HeartIcon
            size={wp(5)}
            color={isFavourite ? Colors.light.tabIconDefault1 : Colors.main.gray}
          />
        </TouchableOpacity>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.shortDescription}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HealthTip