// app/(protected)/patient/_layout.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PatientHome from './index';
import Chat from './chat';
import Profile from '../common/profile';
import PatientStack from './PatientStack';

const Tab = createBottomTabNavigator();

export default function PatientLayout() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="PatientHome" component={PatientHome} options={{ title: 'Home' }} />
      <Tab.Screen name="Chat" component={Chat} options={{ title: 'Chat' }} />
      <Tab.Screen name="Appointments" component={PatientStack}  />
      <Tab.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}
