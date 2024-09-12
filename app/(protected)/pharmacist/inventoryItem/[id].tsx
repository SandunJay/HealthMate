import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

const InventoryItem = () => {
  const params = useLocalSearchParams();
  console.log('Params:', params); // Log to check if `id` is correctly passed
  const { id } = params;

  return (
    <View>
      <Text>Inventory Item: {id}</Text>
    </View>
  );
};
export default InventoryItem;