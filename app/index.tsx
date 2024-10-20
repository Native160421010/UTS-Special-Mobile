import { Button, Text, View } from "react-native";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "./authContext";

export default function Index() {

  // ======================== VARIABLES ========================
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const [topScores, setTopScore] = useState<Array<[string, number]>>([]);
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

      // Get scores from Async
      const value2 = await AsyncStorage.getItem('scoreBoard');
      setTopScore(JSON.parse(value2 ?? '[]'));

    } catch (e) {
      console.error('Error reading username from AsyncStorage', e);
      setUsername('');
      logout();
    }
  };

  const doLogout = async () => {
    try {
      await AsyncStorage.removeItem('username');
      alert('Logged out');
      logout();
    } catch (e) {
      console.error('Error logging out', e);
    }
  }

  const clearTopScore = async () => {
    try {
      // Clear scores on Async
      await AsyncStorage.removeItem('scoreBoard');
      // Clear scores on index
      setTopScore([]);
      alert('Score Board cleared');
    } catch (e) {
      console.error('Error clearing score board', e);
    }
  }

  // CHECK LOGIN ON APP TURN ON, mount only not state change
  useEffect(() => {
    checkLogin();
  }, []);

  // ======================== MAIN UI ========================
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hi, {username}</Text>
      <Text>PENJELASAN GAME</Text>
      <Text>Bla bla bla bla who do you think you are</Text>

      <Button
        title="Game Screen"
        onPress={() => router.push('/gameScreen')}
      />
      <Button
        title="Highscores"
        onPress={() => router.push('/highScore')}
      />
      <Button
        title="Clear Scores"
        onPress={clearTopScore}
      />
      <Button
        title="Logout"
        onPress={doLogout}
      />

      {topScores.map((scoreArray, index) => (
        <View key={index}>
          <Text>{scoreArray[0]} - {scoreArray[1]}</Text>
        </View>
      ))}
    </View>
  );
}
