import * as React from 'react';
import { Card, Button } from "@rneui/base";
import Icon from 'react-native-vector-icons/Ionicons';
import { ImageBackground, Pressable, Text, TextInput, View } from 'react-native';
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
        <ImageBackground source={require('../assets/images/Background.png')} style={styles.centre}>
            <View style={styles.viewMMTitle}>
                <Text style={[styles.textTitle, styles.textTitleLeft]}>MEMO</Text>
                <Text style={[styles.textTitle, styles.textTitleRight]}>PATTERN</Text>
            </View>
            <Card containerStyle={styles.cardLogin}>
                <Card.Title style={styles.textMMButton}>Sign In to Play!</Card.Title>
                <Card.Divider />

                <Text style={styles.textMMButton}>Username </Text>
                <TextInput style={styles.input}
                    onChangeText={(text) => setUsername(text)} value={username} />

                <Text style={styles.textMMButton}>Password </Text>
                <TextInput secureTextEntry={true} style={styles.input}
                    onChangeText={(text) => setPassword(text)} value={password} />

                <Pressable style={styles.buttonLogin} onPress={() => { doLogin() }} >
                    <Text style={styles.textMMButton}>Login</Text>
                    <Icon
                        name="log-in-outline"
                        size={25}
                        color="white"
                        style={styles.icon}
                    />
                </Pressable>
            </Card>
        </ImageBackground>
    );
}
export default Login;