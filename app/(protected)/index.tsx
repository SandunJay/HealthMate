import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { useAuth, Role } from '@/hooks/useAuth';
import WithRole from '../../components/WithRole';
import { router } from 'expo-router';

const Page = () => {
	const { authState, onLogout } = useAuth();

	const onLogoutPressed = () => {
		onLogout!();
        router.replace('/');
	};

	return (
		// <View style={styles.container}>
		// 	<Text style={styles.title}>Home</Text>
		// 	<Text style={styles.title}>Role: {authState?.role}</Text>
		// 	<Button title="Logout" onPress={onLogoutPressed} />
		// 	<View style={styles.separator} />

		// 	<WithRole role={Role.ADMIN}>
		// 		<Text>Only visible for admins</Text>
		// 	</WithRole>

		// 	<WithRole role={Role.USER}>
		// 		<Text>Only visible for users</Text>
		// 	</WithRole>
		// </View>
		<View style={styles.loadingContainer}>
		<ActivityIndicator size="large" color="#007bff" style={styles.loader} />
		<Text style={styles.loadingText}>Please be patient while the data is loaded...</Text>
		</View>
	);
};

export default Page;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center'
	},
	separator: {
		height: 1,
		marginVertical: 30,
		width: '80%'
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f8f9fa' // Optional: Light background color
	},
	loadingText: {
		fontSize: 18,
		color: '#333',
		marginTop: 20, // Spacing between the loader and text
		textAlign: 'center', // Center text alignment
		paddingHorizontal: 20 // Padding for better readability
	},
	loader: {
		marginBottom: 20 // Spacing between the loader and text
	}
});