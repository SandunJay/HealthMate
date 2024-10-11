import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Role, useAuth } from '@/hooks/useAuth';
import { Tabs, useRouter, Slot } from 'expo-router';
import { useEffect } from 'react';

const ProtectedLayout = () => {
	const { authState } = useAuth();
	const router = useRouter();

  useEffect(() => {
    if (!authState?.authenticated) {
      router.replace('/');
      return;
    }

    if (authState?.role) {
      switch (authState.role) {
        case 'doctor':
          router.replace('/(protected)/doctor');
          break;
        case 'pharmacist':
          router.replace('/(protected)/pharmacist');
          break;
        case 'patient':
          router.replace('/(protected)/patient');
          break;
        default:
          router.replace('/');
          break;
      }
    }
  }, [authState, router]);

  if (!authState?.authenticated || !authState?.role) {
    router.replace('/');
  }

	return (
		<Slot/>
	);
};

export default ProtectedLayout;