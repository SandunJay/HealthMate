import { useLocalSearchParams } from 'expo-router'
import React from 'react'

const XYZ = () => {
  const {id} = useLocalSearchParams();
  return (
    <div>XYZ: {id}</div>
  )
}

export default XYZ