import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, Pressable, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';
import { Icon } from '@mdi/react';
import { mdiNumeric1Box, mdiNumeric2Box, mdiNumeric3Box, mdiTrashCanOutline } from '@mdi/js';
import * as Animatable from 'react-native-animatable';

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

  const clearTopScore = async () => {
    try {
      // Clear scores on Async
      await AsyncStorage.removeItem('scoreBoard');
      alert('Score Board cleared!');
    } catch (e) {
      console.error('Error clearing score board', e);
    }
  }

  return (
    <ImageBackground source={require('../assets/images/Background.png')} style={styles.centre}>
      <Animatable.View animation="bounceInDown" iterationCount={1}>
        <Animatable.View animation="swing" iterationCount={2} style={styles.viewMMTitle}>
          <Text style={[styles.textTitle, styles.textTitleLeft]}>HIGH</Text>
          <Text style={[styles.textTitle, styles.textTitleRight]}>SCORE(s)</Text>
        </Animatable.View>
        {
          highScores.length > 0 ? (
            highScores.map((score, index) => (
              <Pressable key={index} style={styles.buttonHS}>
                <Icon
                  path={index === 0 ? mdiNumeric1Box : index === 1 ? mdiNumeric2Box : mdiNumeric3Box}
                  size={1}
                  color="white"
                />
                <Text style={styles.textMMButton}>{score[0]}</Text>
                <Text style={styles.textMMButton}>{score[1]}</Text>
              </Pressable>
            ))
          ) : (
            <Pressable style={styles.buttonHS}>
              <Text style={styles.textMMButton}>No High Scores... Yet!</Text>
            </Pressable>
          )
        }
        <Pressable onPress={clearTopScore} style={styles.buttonsDelScore}>
          <Text style={styles.textMMButton}>Clear Scores</Text>
          <Icon
            path={mdiTrashCanOutline}
            size={1}
            color="white"
          />
        </Pressable>
      </Animatable.View>
    </ImageBackground >
  );
};

export default HighScore;