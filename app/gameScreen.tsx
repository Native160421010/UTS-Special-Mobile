import React, { Component } from "react";
import { View, Pressable, ImageBackground } from "react-native";
import { LinearProgress, Text, Card } from "@rneui/base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./styles";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';


class GameScreen extends Component {
  // ======================== VARIABLES ========================
  // Timer game
  defaultTimer = 30;
  setUpTimer = 1;

  // Kolom per level
  defaultColumn = 3;

  colorNeutral = ["#ff50a1", "#820086"];
  colorRight = ["#25c7fd", "#1c6fff"];
  colorWrong = ["#f7ab28", "#f02b2b"];

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
          <Pressable
            key={key}
            disabled={true}
            style={[
              styles.Pressable
            ]}
            onPress={() => this.checkButton(randomBool, key)}
          >
            <LinearGradient
              colors={randomBool ? this.colorRight : this.colorWrong}
              start={[0.125, 0.5]}
              style={styles.linearGradGame}
            ></LinearGradient>
            {/* <Image source={require('../assets/images/diamond_block.png')} style={{ resizeMode: "cover", width: 50, height: 50, borderRadius: 5}} /> */}
          </Pressable>
        );

      }

      buttons.push(
        <View key={`row-${i}`}>
          <View style={{ flexDirection: "row" }}>{column}</View>
        </View>
      );
    }
    this.setState({
      setUp: true,
      timer: this.setUpTimer,
      buttons,
      rightAnswer,
      correctAnswers,
      disabled,
    });
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
      console.log("State updated:", this.state.disabled);
    });

    if (isRight) {
      curScore += 100;

      // Check if all correct answers have been clicked
      if (rightAnswer === 1) {
        if (curLvl >= this.state.levelMax - 1) {
          finishState = true;

          this.setState({
            score: curScore,
            isFinished: finishState,
            gameOverText: 'CONGRATS!'
          });
        } else {
          curLvl += 1;
          this.setState(
            {
              score: curScore,
              level: curLvl,
            },
            () => {
              this.generateGame(curLvl);
            }
          );
        }
      } else {
        rightAnswer -= 1;
        this.setState(
          {
            score: curScore,
            rightAnswer: rightAnswer,
          },
          () => {
            this.regenBox(); // Re-generate boxes for the current level
          }
        );
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
    for (let i = 0; i < this.defaultColumn; i++) {
      const column = [];

      // Generate columns
      for (let j = 0; j < this.state.level + 3; j++) {
        const key = `button-${i}-${j}`;

        // Push a Pressable button for each column
        column.push(
          <Pressable
            key={key}
            disabled={this.state.setUp ? true : disabled[key]}
            style={[
              styles.Pressable,
            ]}
            onPress={() => {
              this.checkButton(correctAnswers[key], key);
            }}
          >
            <LinearGradient
              colors={disabled[key] ? correctAnswers[key] ? this.colorRight : this.colorRight : this.colorNeutral}
              start={[0.125, 0.5]}
              style={styles.linearGradGame}
            ></LinearGradient>
          </Pressable>
        );
      }

      buttons.push(
        <View key={`row-${i}`}>
          <View style={{ flexDirection: "row" }}>{column}</View>
        </View>
      );
    }

    // Reset disabledButtons and other game state
    this.setState({ buttons });
  }

  toHHMMSS(v: any) {
    const sec_num = parseInt(v, 10);
    const hours = Math.floor(sec_num / 3600);
    const minutes = Math.floor((sec_num - hours * 3600) / 60);
    const seconds = sec_num - hours * 3600 - minutes * 60;
    let hours_str = hours.toString();
    let minutes_str = minutes.toString();
    let seconds_str = seconds.toString();
    if (hours < 10) hours_str = "0" + hours_str;
    if (minutes < 10) minutes_str = "0" + minutes_str;
    if (seconds < 10) seconds_str = "0" + seconds_str;
    return hours_str + " : " + minutes_str + " : " + seconds_str;
  }

  restart() {
    this.setState(
      {
        timer: this.setUpTimer,
        isFinished: false,
        setUp: true,
        level: 0,
        score: 0,
        rightAnswer: 0,
        buttons: [],
        gameOverText: 'GAME OVER.'
      },
      () => {
        this.generateGame(this.state.level);
      }
    );
  }

  async cekLogin() {
    try {
      const value = await AsyncStorage.getItem("username");
      if (value !== null) {
        this.setState({ username: value });
      } else {
        this.setState({ username: "" });
      }
    } catch (e) {
      console.error("Error reading username from AsyncStorage", e);
      this.setState({ username: "" });
    }
  }

  async cekAllScore() {
    try {
      const value = await AsyncStorage.getItem("scoreBoard");
      if (value !== null) {
        this.setState({ topScores: JSON.parse(value) });
      } else {
        this.setState({ topScores: [] });
      }
    } catch (e) {
      console.error("Error reading Score Board from AsyncStorage", e);
    }
  }

  async updateHighScore(username: string, score: number) {
    try {
      const value = await AsyncStorage.getItem("scoreBoard");
      let scoreBoard = value ? JSON.parse(value) : [];

      // Temukan indeks user jika ada
      const userIndex = scoreBoard.findIndex(
        (element: string[]) => element[0] === username
      );

      // Jika user ditemukan dan skor baru lebih besar
      if (userIndex !== -1 && score > scoreBoard[userIndex][1]) {
        scoreBoard[userIndex][1] = score;
        console.log("Skor", username, "diperbarui menjadi", score);
      } else if (userIndex === -1) {
        // Jika user tidak ditemukan, tambahkan
        scoreBoard.push([username, score]);
        console.log("Skor baru ditambahkan:", username, score);
      }

      // Urutkan berdasarkan skor tertinggi
      scoreBoard.sort((a: number[], b: number[]) => b[1] - a[1]);
      // Ambil 3 skor tertinggi
      scoreBoard = scoreBoard.slice(0, 3);

      await AsyncStorage.setItem("scoreBoard", JSON.stringify(scoreBoard));
    } catch (error) {
      console.error("Error updating highscore", error);
    }
  }



  // Check when Page turns on
  componentDidMount() {
    this.cekLogin();
    this.generateGame(this.state.level);
  }

  // Check Game finished
  componentDidUpdate(prevProps: any, prevState: { isFinished: boolean }) {
    if (
      this.state.isFinished &&
      prevState.isFinished !== this.state.isFinished
    ) {
      // Update the high score and show
      this.updateHighScore(this.state.username, this.state.score)
        .then(() => this.cekAllScore())
        .catch((e) => console.error(e));
    }
  }

  updateStuff() {
    this.setState(
      {
        setUp: false,
        disabled: {}, // Reset button states to enabled
        timer: this.defaultTimer, // Set to default timer after setup
      },
      () => {
        this.regenBox(); // Re-generate buttons
      }
    );
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
    gameOverText: 'GAME OVER.',
    username: "",
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
        } else {
          this.setState({
            timer: this.setUpTimer,
            level: 0,
            isFinished: true,
          });
          clearInterval(this.state.oneSecInterval);
          await this.updateHighScore(this.state.username, this.state.score);
          this.cekAllScore();
        }
      } else {
        this.setState({
          timer: this.state.timer - 1,
        });
      }
    }, 1000),
  };
  // ======================== MAIN UI ========================
  render() {
    if (this.state.isFinished) {
      return (
        <ImageBackground source={require('../assets/images/Background.png')} style={styles.centre}>
          <View style={styles.vparent}>
            <Animatable.View
              style={styles.viewMMTitle}
              animation="swing"
              iterationCount={1}
            >
              <Text style={styles.textMMUsername}>Username: {this.state.username}</Text>
            </Animatable.View>

            <Animatable.View
              style={styles.viewMMTitle}
              animation="swing"
              iterationCount={1}
            >
              <Text style={[styles.textTitle, styles.textTitleLeft]}>{this.state.gameOverText}</Text>
            </Animatable.View>

            <Animatable.View
              style={styles.viewMMTitle}
              animation="swing"
              iterationCount={1}
            >
              <Text style={[styles.textTitle, styles.textTitleLeft]}>Your Score: </Text>
              <Text style={[styles.textTitle, styles.textTitleRight]}>{this.state.score.toString()}</Text>
            </Animatable.View>

            <Animatable.View
              animation="fadeInUpBig"
              iterationCount={1}
            >
              <Pressable onPress={() => this.restart()} style={styles.buttonGSMenu}>
                <Text style={styles.textMMButton}>Play Again</Text>
                <Icon
                  name="game-controller-outline"
                  size={25}
                  color="white"
                  style={styles.icon}
                />
              </Pressable>

              <Pressable onPress={() => router.push("/highScore")} style={styles.buttonGSMenu}>
                <Text style={styles.textMMButton}>Check High Scores</Text>
                <Icon
                  name="trophy-outline"
                  size={25}
                  color="white"
                  style={styles.icon}
                />
              </Pressable>

              <Pressable onPress={() => router.replace("/")} style={styles.buttonGSMenu}>
                <Text style={styles.textMMButton}>Main Menu</Text>
                <Icon
                  name="game-controller-outline"
                  size={25}
                  color="white"
                  style={styles.icon}
                />
              </Pressable>
            </Animatable.View>
          </View>
        </ImageBackground>
      );
    } else {
      return (

        <ImageBackground source={require('../assets/images/Background.png')} style={styles.centre}>
          <Animatable.View style={styles.vparent} animation="bounceIn" iterationCount={1}>
            <LinearProgress
              animation={false}
              value={this.state.timer / (this.state.setUp ? this.setUpTimer : this.defaultTimer)}
              color="#f2422b"
              style={styles.clock}
            />

            <Text style={styles.textHaha}>
              {this.toHHMMSS(this.state.timer)}
            </Text>

            <Card containerStyle={styles.cardGame}>
              <View style={styles.viewGSTitle}>
                <Text style={[styles.textTitle, styles.textTitleLeft2]}>LEVEL</Text>
                <Text style={[styles.textTitle, styles.textTitleRight2]}>{this.state.level + 1}</Text>
              </View>

              <View style={styles.viewGSTitle}>
                <Text style={styles.textHaha}>Score: </Text>
                <Text style={styles.textHehe}>{this.state.score}</Text>
              </View>
            </Card>

            {this.state.setUp ? (
              <Animatable.Text style={styles.textHaha} animation="swing" iterationCount={1}>
                PAY ATTENTION!
              </Animatable.Text>
            ) : (
              <Animatable.View animation="swing" iterationCount={1} style={styles.viewMMTitle}>
                <Text style={styles.textHaha}>Boxes Remaining: </Text>
                <Text style={styles.textHehe}>{this.state.rightAnswer}</Text>
              </Animatable.View>
            )}

            {/* {this.generateGame(this.defaultRow, this.state.level)} */}
            <Animatable.View style={styles.vparent} animation="swing" iterationCount={1}>
              {this.state.buttons}
            </Animatable.View>
          </Animatable.View>
        </ImageBackground>
      );
    }
  }
}



export default GameScreen;
