// app/(protected)/pharmacist/_layout.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './profile';
import TabBar from '@/components/navigation/TabBar';
import { Tabs } from 'expo-router';
import { Pressable, Text } from 'react-native';
import useResetStack from '@/hooks/useResetStack';

const Tab = createBottomTabNavigator();

export default function PharmacistLayout() {
    const { resetToRoot } = useResetStack();
    return (
        <Tabs
            tabBar={props => <TabBar {...props} />}
        >
            <Tabs.Screen name="index"  options={{ title: 'Home', headerShown:false }} />
            <Tabs.Screen name="records"  options={{ title: 'Records', headerShown:false,
                tabBarButton: (props) => (
                    <Pressable
                        {...props}
                        onPress={() => resetToRoot('records')}
                    >
                        <Text>Records</Text>
                    </Pressable>
                )
             }}/>
            <Tabs.Screen name="scanner"  options={{ title: 'Scanner', headerShown:false }} />
            <Tabs.Screen name="inventory" options={{ title: 'Inventory', headerShown:false }} />
            <Tabs.Screen name="profile"  options={{ title: 'Profile', headerShown:false }} />
        </Tabs>
    );
}
