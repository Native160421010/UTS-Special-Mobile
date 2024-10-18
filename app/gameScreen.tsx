import React, { Component } from 'react';
import { View, Pressable } from 'react-native';
import { LinearProgress, Button, Text } from '@rneui/base';
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from './styles';

class GameScreen extends Component {

    // ======================== VARIABLES ========================
    // Timer game
    defaultTimer = 30;
    setUpTimer = 3;

    // Kolom per level
    defaultColumn = 3;

    // ======================== METHODS ========================

    generateGame(col: number) {
        const buttons = [];
        let rightAnswer = 0;
        col = col + 3;

        let disabled = {} as { [key: string]: boolean };
        let correctAnswers = {} as { [key: string]: boolean };

        for (let i = 0; i < this.defaultColumn; i++) {
            const column = [];
            for (let j = 0; j < col; j++) {
                const randomBool = Math.random() >= 0.5;
                if (randomBool) rightAnswer++;

                const key = `button-${i}-${j}`;
                correctAnswers[key] = randomBool;
                disabled[key] = true; // Disable all buttons initially

                column.push(
                    <Pressable key={key} disabled={true}
                        style={[
                            styles.Pressable,
                            randomBool ? styles.buttRight : styles.buttWrong
                        ]}
                        onPress={() => this.checkButton(randomBool, key)}
                    ></Pressable>
                );
            }

            buttons.push(
                <View key={`row-${i}`}>
                    <View style={{ flexDirection: 'row' }}>
                        {column}
                    </View>
                </View>
            );
        }
        this.setState({ setUp: true, timer: this.setUpTimer, buttons, rightAnswer, correctAnswers, disabled });
    }

    checkButton(isRight: boolean, key: string) {
        let finishState = false;
        let curLvl = this.state.level;
        let curScore = this.state.score;
        let rightAnswer = this.state.rightAnswer;

        // Disable the button immediately when clicked
        const newDisabled = { ...this.state.disabled, [key]: true };

        // Update the state to disable the button immediately
        this.setState({ disabled: newDisabled }, () => {
            console.log('State updated:', this.state.disabled);
        });

        if (isRight) {
            curScore += 100;

            // Check if all correct answers have been clicked
            if (rightAnswer === 1) {
                if (curLvl >= (this.state.levelMax - 1)) {
                    finishState = true;
                    this.setState({
                        score: curScore,
                        isFinished: finishState,
                    });
                } else {
                    curLvl += 1;
                    this.setState({
                        score: curScore,
                        level: curLvl,
                    }, () => {
                        this.generateGame(curLvl);
                    });
                }
            } else {
                rightAnswer -= 1;
                this.setState({
                    score: curScore,
                    rightAnswer: rightAnswer,
                }, () => {
                    this.regenBox();  // Re-generate boxes for the current level
                });
            }
        } else {
            finishState = true;
            this.setState({
                isFinished: finishState,
            });
        }
    }

    regenBox() {
        const buttons = [];
        const disabled = this.state.disabled;
        const correctAnswers = this.state.correctAnswers;

        // Generate rows
        for (let i = 0; i < (this.defaultColumn); i++) {
            const column = [];

            // Generate columns
            for (let j = 0; j < (this.state.level + 3); j++) {
                const key = `button-${i}-${j}`;

                // Push a Pressable button for each column
                column.push(
                    <Pressable key={key} disabled={this.state.setUp ? true : disabled[key]}
                        style={[
                            styles.Pressable,
                            disabled[key] ? (correctAnswers[key] ? styles.buttRight : styles.buttWrong) :
                                styles.buttNeutral

                        ]}
                        onPress={() => {
                            this.checkButton(correctAnswers[key], key);
                        }}
                    ></Pressable>
                );
            }

            buttons.push(
                <View key={`row-${i}`}>
                    <View style={{ flexDirection: 'row' }}>
                        {column}
                    </View>
                </View>
            );
        }

        // Reset disabledButtons and other game state
        this.setState({ buttons });
    }

    toHHMMSS(v: any) {
        const sec_num = parseInt(v, 10);
        const hours = Math.floor(sec_num / 3600);
        const minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        const seconds = sec_num - (hours * 3600) - (minutes * 60);
        let hours_str = hours.toString();
        let minutes_str = minutes.toString();
        let seconds_str = seconds.toString();
        if (hours < 10) hours_str = "0" + hours_str;
        if (minutes < 10) minutes_str = "0" + minutes_str;
        if (seconds < 10) seconds_str = "0" + seconds_str;
        return hours_str + ':' + minutes_str + ':' + seconds_str;
    }

    restart() {
        this.setState({
            timer: this.setUpTimer,
            isFinished: false,
            setUp: true,
            level: 0,
            score: 0,
            rightAnswer: 0,
            buttons: [],
        }, () => {
            this.generateGame(this.state.level);
        });
    }

    async cekLogin() {
        try {
            const value = await AsyncStorage.getItem('username');
            if (value !== null) {
                this.setState({ username: value });
            } else {
                this.setState({ username: '' });
            }
        } catch (e) {
            console.error('Error reading username from AsyncStorage', e);
            this.setState({ username: '' });
        }
    }

    async cekAllScore() {
        try {
            const value = await AsyncStorage.getItem('scoreBoard');
            if (value !== null) {
                this.setState({ topScores: JSON.parse(value) });
            } else {
                this.setState({ topScores: [] });
            }
        } catch (e) {
            console.error('Error reading Score Board from AsyncStorage', e);
        }
    }

    async updateHighScore(username: string, score: number) {
        try {
            const value = await AsyncStorage.getItem('scoreBoard');
            let scoreBoard = value ? JSON.parse(value) : [];

            // Add new score
            scoreBoard.push([username, score]);
            // Sort by highest score
            scoreBoard.sort((a: number[], b: number[]) => b[1] - a[1]);
            // Save only 3
            scoreBoard = scoreBoard.slice(0, 3);

            await AsyncStorage.setItem('scoreBoard', JSON.stringify(scoreBoard));
            console.log("High Score updated! " + username + " : " + score);

        } catch (e) {
            console.error('Error updating highscore', e);
        }
    }

    // Check when Page turns on
    componentDidMount() {
        this.cekLogin();
        this.generateGame(this.state.level);
    }

    // Check Game finished
    componentDidUpdate(prevProps: any, prevState: { isFinished: boolean; }) {
        if (this.state.isFinished && prevState.isFinished !== this.state.isFinished) {
            // Update the high score and show
            this.updateHighScore(this.state.username, this.state.score)
                .then(() => this.cekAllScore())
                .catch(e => console.error(e));
        }
    }

    updateStuff() {
        this.setState({
            setUp: false,
            disabled: {}, // Reset button states to enabled
            timer: this.defaultTimer // Set to default timer after setup
        }, () => {
            this.regenBox(); // Re-generate buttons
        });
    }


    // Clear timer when done
    componentWillUnmount() {
        clearInterval(this.state.oneSecInterval);
    }

    // ======================== STATE ========================
    state = {
        levelMax: 5,
        setUp: true,
        level: 0,
        score: 0,
        isFinished: false,
        username: '',
        topScores: [],
        buttons: [],
        rightAnswer: 0,
        correctAnswers: {} as { [key: string]: boolean },
        disabled: {} as { [key: string]: boolean },

        timer: this.setUpTimer,
        oneSecInterval: setInterval(async () => {
            if (this.state.timer === 0) {
                if (this.state.setUp === true) {
                    this.updateStuff();
                }
                else {
                    this.setState({
                        timer: this.setUpTimer,
                        level: 0,
                        isFinished: true
                    });
                    clearInterval(this.state.oneSecInterval);
                    await this.updateHighScore(this.state.username, this.state.score);
                    this.cekAllScore();
                }
            } else {
                this.setState({
                    timer: this.state.timer - 1
                });
            }
        }, 1000)
    };
    // ======================== MAIN UI ========================
    render() {
        if (this.state.isFinished) {
            const { topScores } = this.state;
            return (
                <View style={styles.vparent}>
                    <Text style={styles.txtTitle}>{this.state.username}</Text>
                    <Text style={styles.txtTitle}>Your Score:</Text>
                    <Text>{this.state.score.toString()}</Text>

                    <Button
                        color={'secondary'}
                        style={styles.buttAnswer}
                        onPress={() => this.restart()}>
                        Play Again
                    </Button>

                    <Text style={styles.txtTitle}>HIGH SCORE:</Text>

                    {topScores.map((scoreArray, index) => (
                        <View key={index}>
                            <Text>{scoreArray[0]} - {scoreArray[1]}</Text>
                        </View>
                    ))}
                </View>
            );
        } else {
            return (
                <ScrollView>
                    <View style={styles.vparent}>
                        <LinearProgress
                            animation={false}
                            value={1 - (this.state.timer / this.defaultTimer)}
                            style={{ margin: 30 }}
                            color="green"
                        />

                        <Text style={styles.txtDesc}>Count: {this.toHHMMSS(this.state.timer)}</Text>
                        <Text style={styles.txtTitle}>Level {this.state.level + 1}</Text>
                        <Text style={styles.txtDesc}>Score: {this.state.score}</Text>
                        {this.state.setUp ? <Text style={styles.txtDesc}>SET UP TIME</Text> : <Text style={styles.txtDesc}>Boxes Remaining: {this.state.rightAnswer}</Text>}

                        {/* {this.generateGame(this.defaultRow, this.state.level)} */}
                        {this.state.buttons}
                    </View>
                </ScrollView >
            );
        }
    }
}

export default GameScreen;
