import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HighScore = () => {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    const fetchHighScores = async () => {
      try {
        const storedScores = await AsyncStorage.getItem('scoreBoard');
        if (storedScores) {
          const parsedScores = JSON.parse(storedScores);
          setHighScores(parsedScores.sort((a: number[], b: number[]) => b[1] - a[1])); 
        }
      } catch (error) {
        console.error('Error fetching high scores:', error);
      }
    };
    fetchHighScores();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>High Scores</Text>
      {highScores.map((score, index) => (
        <View key={index} style={styles.scoreItem}>
          <Text>{index + 1} {" > "}</Text>
          <Text>{score[0]}: {score[1]}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scoreItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default HighScore;