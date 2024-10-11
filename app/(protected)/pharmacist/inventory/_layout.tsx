import { View, Text, Button } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router';

const InventoryLayout = () => {
    const router = useRouter();
	return (
		<Stack
			screenOptions={{
				headerStyle: {
					backgroundColor: '#10101E'
				},
				headerTintColor: '#fff',
				headerTitleStyle: {
					fontWeight: 'bold'
				},
        statusBarHidden:true
			}}
		>
		  <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Inventory',
        }}
      />
      <Stack.Screen
        name="add"
        options={{
          presentation: 'modal', 
          headerLeft: () => <Button title="Close" onPress={() => router.back()} />, 
          headerShown: false
        }}
      />
      </Stack>
	);
}

export default InventoryLayout