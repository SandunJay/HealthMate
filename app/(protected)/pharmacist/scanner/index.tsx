import { View, Text, Button, Pressable } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams, useRouter } from 'expo-router';

const Scanner = () => {
  const { id } = useLocalSearchParams(); 
  const router = useRouter();
  return (
    <View style={{ padding: 20 }}>
      {/* <Button 
        title="Open QR Scanner" 
        onPress={() => router.push('/qrmodal')} 
      /> */}
      <Pressable>
        <Text onPress={() => router.push('./scanner/nfcmodal.tsx')}>
          NFC Scanner
        </Text>
      </Pressable>

    </View>
  )
}

export default Scanner

// SHOW THE NFC SCAN VIEW HERE. NOT IN A SEPERATE VIEW