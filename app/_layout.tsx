import { Stack, useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import  GlobalProvider  from '../context/GlobalProvider'; // Adjust the path as needed

const AppLayout = () => {
	const { authState } = useAuth();
	const segments = useSegments();
	const router = useRouter();

	// const user = useGlobalContext.
	useEffect(() => {
		const inAuthGroup = segments[0] === '(protected)';

    if (!authState?.authenticated && inAuthGroup) {
      router.replace('/');
    } 
    else if (authState?.authenticated && !inAuthGroup) {
        router.replace('/(protected)');
    }
	}, [authState, segments, router]);

	return (
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false, statusBarHidden:true }} />
				<Stack.Screen name="(auth)" options={{ headerShown: false}} />
				<Stack.Screen name="(protected)" options={{ headerShown: false, statusBarTranslucent:true, statusBarAnimation:'fade', statusBarStyle:'auto'}} />
				<Stack.Screen name="not-found" options={{ headerShown: false }} />
			</Stack>
	);
};

const RootLayoutNav = () => {
	return (
		<AuthProvider>
			<AppLayout />
		</AuthProvider>
	);
};

export default RootLayoutNav;