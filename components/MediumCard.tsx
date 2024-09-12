import { Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { LinearGradient } from 'expo-linear-gradient'
import { HeartIcon } from 'react-native-heroicons/solid'
import { useRouter } from 'expo-router'


const MediumCard = ({item}) => {
    const router = useRouter();
    const [isFavourite, toggleFavourite] = useState(false)
  
    const handlePress = () => {
      console.log('Navigating to: ', `/(protected)/pharmacist/inventoryItem/ with id: ${item.id}`);
      router.push(`/(protected)/pharmacist/inventoryItem/${item.id}`);
    }; 
  
    return (
      <TouchableOpacity style={{width: wp(44), height: wp(65)}}
      onPress={handlePress}
      className='flex justify-end relative p-4 py-6 space-y-2 mb-5'
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
          <HeartIcon size={wp(5)} color={isFavourite? 'red':'white'}/>
        </TouchableOpacity>
        <Text style={{fontSize: wp(4)}} className="text-white font-semibold">{item.title}</Text>
        <Text style={{fontSize: wp(2.2)}} className="text-white">{item.shortDescription}</Text>
      </TouchableOpacity>
    )
  }
  
  export default MediumCard