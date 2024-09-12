import React, { useState } from 'react';
import {
	Text,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	TextInput,
	TouchableOpacity,
    View
} from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { router } from 'expo-router';

const login = () => {
	const [username, setUsername] = useState('pharmacist');
	const [password, setPassword] = useState('pharmacist');
	const { onLogin } = useAuth();

	const onSignInPress = async () => {
		onLogin!(username, password);
	};

    const onRegisterPress = () => {
		router.push('/register'); // Navigate to the register screen
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.container}
		>
			<Text style={styles.header}>My Epic App</Text>
			<TextInput
				autoCapitalize="none"
				placeholder="admin"
				value={username}
				onChangeText={setUsername}
				style={styles.inputField}
			/>
			<TextInput
				placeholder="password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
				style={styles.inputField}
			/>

			<TouchableOpacity onPress={onSignInPress} style={styles.button}>
				<Text style={{ color: '#fff' }}>Sign in</Text>
			</TouchableOpacity>
            <View style={styles.footer}>
				<Text>Don't have an account?</Text>
				<TouchableOpacity onPress={onRegisterPress}>
					<Text style={styles.registerText}>Register</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		paddingHorizontal: '20%',
		justifyContent: 'center'
	},
	header: {
		fontSize: 30,
		textAlign: 'center',
		marginBottom: 40
	},
	inputField: {
		marginVertical: 4,
		height: 50,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 4,
		padding: 10
	},
	button: {
		marginVertical: 15,
		alignItems: 'center',
		backgroundColor: '#111233',
		padding: 12,
		borderRadius: 4
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 10,
	},
	registerText: {
		marginLeft: 5,
		color: '#007BFF',
	},
});
export default login;