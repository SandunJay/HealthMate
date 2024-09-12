import { View, Text } from 'react-native'
import React from 'react'
import Destination from '@/components/DestinationComp'
import { destinationData } from '@/assets/dummy'
import MediumCard from '@/components/MediumCard'

const Inventory = () => {
  return (
    <View className="mx-4 flex-row justify-between flex-wrap">
        {
            destinationData.map((item, index)=>{
                return(
                    <MediumCard item={item} key={index}/>
                )
            })
        }    
    </View>
  )
}

export default Inventory