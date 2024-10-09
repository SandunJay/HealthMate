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
		<View style={styles.loadingContainer}>
			<ActivityIndicator size="large" color="#007bff" style={styles.loader} />
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
		backgroundColor: '#f8f9fa' 
	},
	loadingText: {
		fontSize: 18,
		color: '#333',
		marginTop: 20, 
		textAlign: 'center', 
		paddingHorizontal: 20 
	},
	loader: {
		marginBottom: 20 
	}
});