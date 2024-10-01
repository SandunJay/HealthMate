import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Chat from './chat';
import DoctorList from './doctorList';

const Stack = createStackNavigator();

const ChatMain = () => {
  return (
    <Stack.Navigator initialRouteName="DoctorList">
      <Stack.Screen name="DoctorList" component={DoctorList} options={{ title: 'Available Doctors' }} />
      <Stack.Screen name="Chat" component={Chat} options={({ route }) => ({ title: `Chat with ${route.params.doctorName}` })} />
    </Stack.Navigator>
  );
};

export default ChatMain;
