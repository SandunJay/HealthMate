import { Stack } from 'expo-router';

const AuthLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: false, 
                statusBarHidden: true,
            }}
        >
            <Stack.Screen
                name="login"
                options={{
                    headerShown: false,
                    statusBarHidden: true,
                }}
            />
            <Stack.Screen
                name="register"
                options={{
                    headerShown: false, 
                    statusBarHidden: true,
                }}
            />
        </Stack>
    );
};

export default AuthLayout;
