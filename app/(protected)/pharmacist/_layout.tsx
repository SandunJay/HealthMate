// app/(protected)/pharmacist/_layout.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PharmacistHome from './index';
import Records from './records';
import Scanner from './scanner';
import Inventory from './inventory';
import Profile from '../../patient/profile';
import TabBar from '@/components/navigation/TabBar';

const Tab = createBottomTabNavigator();

export default function PharmacistLayout() {
    return (
        <Tab.Navigator
            tabBar={props => <TabBar {...props} />}
        >
            <Tab.Screen name="index" component={PharmacistHome} options={{ title: 'Home', headerShown:false }} />
            <Tab.Screen name="records" component={Records} options={{ title: 'Records', headerShown:false }} />
            <Tab.Screen name="scanner" component={Scanner} options={{ title: 'Scanner', headerShown:false }} />
            <Tab.Screen name="inventory" component={Inventory} options={{ title: 'Inventory', headerShown:false }} />
            <Tab.Screen name="profile" component={Profile} options={{ title: 'Profile', headerShown:false }} />
        </Tab.Navigator>
    );
}
