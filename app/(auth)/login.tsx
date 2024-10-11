// import React, { useState } from 'react';
// import {
// 	Text,
// 	KeyboardAvoidingView,
// 	Platform,
// 	StyleSheet,
// 	TextInput,
// 	TouchableOpacity,
//     View
// } from 'react-native';
// import { useAuth } from '@/hooks/useAuth';
// import { router, Stack } from 'expo-router';

// const login = () => {
// 	const [username, setUsername] = useState('pharmacist');
// 	const [password, setPassword] = useState('pharmacist');
// 	const { onLogin } = useAuth();

	
// 	const onSignInPress = async () => {
// 		onLogin!(username, password);
// 	};

//     const onRegisterPress = () => {
// 		router.push('/register'); // Navigate to the register screen
// 	};

// 	return (
// 		<KeyboardAvoidingView
// 			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// 			style={styles.container}
// 		>
// 			<Stack.Screen options={{headerShown:false}}/>
// 			<Text style={styles.header}>My Epic App</Text>
// 			<TextInput
// 				autoCapitalize="none"
// 				placeholder="admin"
// 				value={username}
// 				onChangeText={setUsername}
// 				style={styles.inputField}
// 			/>
// 			<TextInput
// 				placeholder="password"
// 				value={password}
// 				onChangeText={setPassword}
// 				secureTextEntry
// 				style={styles.inputField}
// 			/>

// 			<TouchableOpacity onPress={onSignInPress} style={styles.button}>
// 				<Text style={{ color: '#fff' }}>Sign in</Text>
// 			</TouchableOpacity>
//             <View style={styles.footer}>
// 				<Text>Don't have an account?</Text>
// 				<TouchableOpacity onPress={onRegisterPress}>
// 					<Text style={styles.registerText}>Register</Text>
// 				</TouchableOpacity>
// 			</View>
// 		</KeyboardAvoidingView>
// 	);
// };

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		padding: 20,
// 		paddingHorizontal: '20%',
// 		justifyContent: 'center'
// 	},
// 	header: {
// 		fontSize: 30,
// 		textAlign: 'center',
// 		marginBottom: 40
// 	},
// 	inputField: {
// 		marginVertical: 4,
// 		height: 50,
// 		borderWidth: 1,
// 		borderColor: '#ccc',
// 		borderRadius: 4,
// 		padding: 10
// 	},
// 	button: {
// 		marginVertical: 15,
// 		alignItems: 'center',
// 		backgroundColor: '#111233',
// 		padding: 12,
// 		borderRadius: 4
// 	},
// 	footer: {
// 		flexDirection: 'row',
// 		justifyContent: 'center',
// 		marginTop: 10,
// 	},
// 	registerText: {
// 		marginLeft: 5,
// 		color: '#007BFF',
// 	},
// });
// export default login;

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '@/hooks/useAuth';
import { router, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = () => {
  const [email, setEmail] = useState('pharmacist');
  const [password, setPassword] = useState('pharmacist');
  const [role, setRole] = useState('doctor');
  const { onLogin } = useAuth();

  const onSignInPress = async () => {
    onLogin!(email, password, role);
  };

  const onRegisterPress = () => {
    router.push('/register');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Sign In</Text>
          <Text style={styles.subHeaderText}>
            Log in to access your personalized Medinest experience
          </Text>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Email Address</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={24} color="#777" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your email address..."
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <Text style={styles.label}>Password</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={24} color="#777" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your password..."
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <Text style={styles.label}>Role</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={role}
              onValueChange={(itemValue) => setRole(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Doctor" value="doctor" />
              <Picker.Item label="Pharmacist" value="pharmacist" />
              <Picker.Item label="Nurse" value="nurse" />
              <Picker.Item label="Admin" value="admin" />
            </Picker>
          </View>

          <TouchableOpacity style={styles.signInButton} onPress={onSignInPress}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-facebook" size={24} color="#3b5998" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-google" size={24} color="#db4437" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-instagram" size={24} color="#e1306c" />
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <TouchableOpacity onPress={onRegisterPress}>
              <Text style={styles.registerText}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#1e2632',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00bf8f',
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 16,
    color: '#ffffff',
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    marginTop: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  pickerContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 15,
  },
  picker: {
    height: 50,
  },
  signInButton: {
    backgroundColor: '#00bf8f',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  signInButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#777',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  footerText: {
    color: '#777',
  },
  registerText: {
    color: '#00bf8f',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  forgotPasswordText: {
    color: '#00bf8f',
    textAlign: 'center',
  },
});

export default LoginScreen;