import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

const Scanner = () => {
  const { id } = useLocalSearchParams(); 
  return (
    <View>
      <Text>Scanner: {id}</Text>
    </View>
  )
}

export default Scanner