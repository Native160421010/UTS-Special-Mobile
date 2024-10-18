import * as React from 'react';
import { Card, Button } from "@rneui/base";
import { Text, TextInput, View } from 'react-native';
import { useAuth } from './authContext';
import { useState } from 'react';
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login() {

    // ======================== VARIABLES ========================
    const { login } = useAuth(); // Access login function from context
    const [username, setUsername] = useState(''); // State for username
    const [password, setPassword] = useState(''); // State for password

    // ======================== METHODS ========================
    const doLogin = async () => {
        try {
            await AsyncStorage.setItem('username', username);
            alert('Logged in as ' + username);
            login(); // Use the login function from context
        } catch (e) {
            console.error('Error saving data to AsyncStorage', e);
        }
    };

    // ======================== MAIN UI ========================
    return (
        <Card>
            <Card.Title>Silakan Login</Card.Title>
            <Card.Divider />

            <View style={styles.viewRow}>
                <Text>Username </Text>
                <TextInput style={styles.input}
                    onChangeText={(text) => setUsername(text)} value={username} />
            </View>
            <View style={styles.viewRow}>
                <Text>Password </Text>
                <TextInput secureTextEntry={true} style={styles.input}
                    onChangeText={(text) => setPassword(text)} value={password} />
            </View>
            <View style={styles.viewRow}>
                <Button style={styles.button} title="Submit"
                    onPress={() => { doLogin() }} />
            </View>

        </Card>
    );
}
export default Login;