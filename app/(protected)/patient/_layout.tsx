// app/(protected)/patient/_layout.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PatientHome from './index';
import ChatMain from './chatMain';

import Profile from '../common/profile';
import PatientStack from './PatientStack';

const Tab = createBottomTabNavigator();

export default function PatientLayout() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="PatientHome" component={PatientHome}  />
      <Tab.Screen name="Chat" component={ChatMain}  />
      <Tab.Screen name="Appointments" component={PatientStack}  />
      <Tab.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}
