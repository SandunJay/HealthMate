import { Stack, useRouter, useSegments, SplashScreen } from 'expo-router';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { useFonts } from "expo-font";
import GlobalProvider from "../context/GlobalProvider";

// Move font loading to RootLayoutNav to avoid conditional hooks in AppLayout
const RootLayoutNav = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  );
};

const AppLayout = () => {
  const { authState } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(protected)';

    if (!authState?.authenticated && inAuthGroup) {
      router.replace('/');
    } else if (authState?.authenticated && !inAuthGroup) {
      router.replace('/(protected)');
    }
  }, [authState, segments, router]);

  return (
	<GlobalProvider>
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(protected)" options={{ headerShown: false}} />
      <Stack.Screen name="not-found" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
	  <Stack.Screen name="patient" options={{headerShown:false}}/>
    </Stack>
	</GlobalProvider>
  );
};

export default RootLayoutNav;
