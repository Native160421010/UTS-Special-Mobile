import { ImageBackground, Pressable, Text, View } from "react-native";
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "./authContext";
import { styles } from "./styles";
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

export default function Index() {

  // ======================== VARIABLES ========================
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const { logout } = useAuth();

  // ======================== METHODS ========================
  const checkLogin = async () => {
    try {
      const value = await AsyncStorage.getItem('username');
      if (value !== null) {
        setUsername(value);
      } else {
        setUsername('');
        logout();
      }

    } catch (e) {
      console.error('Error reading username from AsyncStorage', e);
      setUsername('');
      logout();
    }
  };

  const doLogout = async () => {
    try {
      await AsyncStorage.removeItem('username');
      alert('Logged out!');
      logout();
    } catch (e) {
      console.error('Error logging out', e);
    }
  }

  // CHECK LOGIN ON APP TURN ON, mount only not state change
  useEffect(() => {
    checkLogin();
  }, []);

  const image = { uri: "https://img.freepik.com/premium-photo/electricity-water-colors-tile-background_1106493-160007.jpg" };


  // ======================== MAIN UI ========================
  return (
    <ImageBackground source={image} style={styles.centre}>
      <Animatable.View
        style={styles.centre} animation="fadeInDownBig" iterationCount={1}
      >
        <Animatable.View animation="tada" iterationCount={2}>
          <Text style={styles.textMMUsername}>Hi, {username}!</Text>
          <View style={styles.viewMMTitle}>
            <Text style={[styles.textTitle, styles.textTitleLeft]}>MEMO</Text>
            <Text style={[styles.textTitle, styles.textTitleRight]}>PATTERN</Text>
          </View>
        </Animatable.View>

        <Pressable onPress={() => router.push('/gameScreen')} style={styles.buttonsMM}>
          <Text style={styles.textMMButton}>Play</Text>
          <Icon
            name="game-controller-outline"
            size={25}
            color="white"
            style={styles.icon}
          />
        </Pressable>

        <Pressable onPress={() => router.push('/howToPlay')} style={styles.buttonsMM}>
          <Text style={styles.textMMButton}>How To Play</Text>
          <Icon
            name="bulb-outline"
            size={25}
            color="white"
            style={styles.icon}
          />
        </Pressable>

        <Pressable onPress={() => router.push('/highScore')} style={styles.buttonsMM}>
          <Text style={styles.textMMButton}>High Scores</Text>
          <Icon
            name="trophy-outline"
            size={25}
            color="white"
            style={styles.icon}
          />
        </Pressable>

        <Pressable onPress={doLogout} style={styles.buttonsMM}>
          <Text style={styles.textMMButton}>Logout</Text>
          <Icon
            name="log-out-outline"
            size={25}
            color="white"
            style={styles.icon}
          />
        </Pressable>
      </Animatable.View>
    </ImageBackground >
  );
}
