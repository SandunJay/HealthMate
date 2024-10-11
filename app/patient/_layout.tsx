import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PatientHome from './index';
import ChatMain from './chatMain';
import Profile from './profile';
import PatientStack from './PatientStack';
import PatientHomeStack from './PatientHomeStack';

// Import the icons you want to use
import { MaterialCommunityIcons, Ionicons, FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function PatientLayout() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Healthmate" 
        component={PatientHomeStack} 
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          )
        }} 
      />
      <Tab.Screen 
        name="Chat" 
        component={ChatMain} 
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles" color={color} size={size} />
          )
        }} 
      />
      <Tab.Screen 
        name="Appointments" 
        component={PatientStack}  
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="calendar" color={color} size={size} />
          )
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{ 
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          )
        }} 
      />
    </Tab.Navigator>
  );
}
