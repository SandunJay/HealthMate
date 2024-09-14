import { View, Text, Button } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router';

const ScannerLayout = () => {
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
				}
			}}
		>
		<Stack.Screen name="index" options={{ headerTitle: 'Records' }} />
		</Stack>
	);
}

export default ScannerLayout