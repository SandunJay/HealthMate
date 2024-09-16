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
				},
				statusBarHidden:true,
				headerShown: false
			}}
		>
		<Stack.Screen name="index" options={{ headerTitle: 'Records', headerShown:false }} />
		{/* <Stack.Screen name="new" options={{ presentation:'modal' }} /> */}
		<Stack.Screen name="newModal" options={{presentation:'modal', headerShown:false}}/>

		</Stack>
	);
}

export default ScannerLayout