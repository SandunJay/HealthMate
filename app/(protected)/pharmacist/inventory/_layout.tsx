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
          // Optionally, you can add another button to the header
          // headerRight: () => <Button title="Open" onPress={() => router.push('/pharmacist/inventory/add')} />
        }}
      />
      <Stack.Screen
        name="add"
        options={{
          presentation: 'modal', 
          headerLeft: () => <Button title="Close" onPress={() => router.back()} />, // Close button to dismiss modal
        }}
      />
            </Stack>
	);
}

export default InventoryLayout