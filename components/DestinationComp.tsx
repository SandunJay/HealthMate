import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { cardData } from '@/assets/dummy'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { LinearGradient } from 'expo-linear-gradient'
import { HeartIcon } from 'react-native-heroicons/solid'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'

const HealthTip = () => {
  const router = useRouter();

  const [visibleTips, setVisibleTips] = useState(4);  

  const loadMore = () => {
    if (visibleTips < cardData.length) {
      setVisibleTips(visibleTips + 4); 
    }
  };

  return (
<View>
      <View className="mx-4 flex-row justify-between flex-wrap">
        {
          cardData.slice(0, visibleTips).map((item, index) => (
            <HealthTipCard router={router} item={item} key={index}/>
          ))
        }
      </View>
      {/* Load more button */}
      {visibleTips < cardData.length && (
        <TouchableOpacity onPress={loadMore} className="mt-4">
          <Text style={{ fontSize: wp(4), color: Colors.main.gray, textAlign: 'center' }}>
            Load More
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const HealthTipCard = ({item}) => {
  const router = useRouter();
  const [isFavourite, toggleFavourite] = useState(false)

  const handlePress = (id) => {
    console.log('Navigating to: ', `/inventory with id: ${id}`);
    router.push(`/common/${id}`);
  }; 

  return (
    <View >
    <TouchableOpacity style={{width: wp(44), height: wp(65)}}
      className='flex justify-end relative p-4 py-6 space-y-2 mb-5'
      onPress={() => handlePress(item.id)}
    >
      <Image
        source={item.image}
        style={{width: wp(44), height: wp(65), borderRadius: 35}}
        className='absolute'
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={{width: wp(44), height: hp(15), borderBottomLeftRadius: 35, borderBottomRightRadius: 35 }}
        start={{x: 0.5, y:0}}
        end={{x: 0.5, y:1}}
        className='absolute bottom-0'
      />

      <TouchableOpacity onPress={()=> toggleFavourite(!isFavourite)} style={{backgroundColor: 'rgba(255,255,255,0.4)'}} className='absolute top-1 right-3 rounded-full p-3'>
        <HeartIcon size={wp(5)} color={isFavourite? Colors.light.tabIconDefault1: Colors.main.gray}/>
      </TouchableOpacity>
      <Text style={{fontSize: wp(4)}} className="text-white font-semibold">{item.title}</Text>
      <Text style={{fontSize: wp(2.2)}} className="text-white">{item.shortDescription}</Text>
    </TouchableOpacity>
    </View>
  )
}

export default HealthTip