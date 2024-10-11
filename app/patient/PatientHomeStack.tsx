import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AppointmentHistory from './AppointmentHistory';
import Home from './index';
import TrackAppointment from './TrackAppointment';
const Stack = createStackNavigator();

function PatientHomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="index" component={Home} options={{ headerShown: false }}/>
      <Stack.Screen name="AppointmentHistory" component={AppointmentHistory} options={{ headerShown: false }}/>
      <Stack.Screen name="TrackAppointment" component={TrackAppointment} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default PatientHomeStack;
