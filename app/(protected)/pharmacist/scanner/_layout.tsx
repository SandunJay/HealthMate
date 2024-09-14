import { View, Text, Button } from 'react-native'
import React from 'react'
import { Slot, Stack, useRouter } from 'expo-router';

const ScannerLayout = () => {
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
			<Stack.Screen
				name="index"
				options={{
					headerTitle: 'scanner',
				}}
			/>
            <Stack.Screen
                name="qrmodal"
                options={{
                    presentation: 'modal',
                    headerTitle: 'QR Scanner',
                }}
            />
            <Stack.Screen
                name="nfcmodal"
                options={{
                    presentation: 'modal',
                    headerTitle: 'NFC Scanner',
                }}
            />
		</Stack>
	);
}

export default ScannerLayout