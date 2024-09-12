import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { constSortCategoryData } from '@/assets/dummy'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { theme } from '@/constants/Colors'

const SortCategoryCard = () => {
    const [activeState, setActiveState] = useState('Popular')
  return (
    <View className='flex-row justify-around items-center mx-4 bg-neutral-100 rounded-full p-2 px-4 space-x-2'>
      {
        constSortCategoryData.map((sort, index) =>{
            let isActive = sort == activeState;
            let activeButtonClass = isActive? 'bg-white shadow':'';
            return(
                <TouchableOpacity onPress={()=> {setActiveState(sort)}} key={index} className={`p-3 px-4 rounded-full flex ${activeButtonClass}`}>
                    <Text className='font-semibold' style={{fontSize: wp(4), color: isActive? theme.text: 'rgba(0,0,0,0.6)'}}>{sort}</Text>
                </TouchableOpacity>
            )
        })
      }
    </View>
  )
}

export default SortCategoryCard