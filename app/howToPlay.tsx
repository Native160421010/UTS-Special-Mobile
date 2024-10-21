import { ImageBackground, Text, View } from 'react-native';
import { styles } from './styles';
import { Image } from '@rneui/base';
import { ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

function HowToPlay() {

    // ======================== MAIN UI ========================
    return (
        <ImageBackground source={require('../assets/images/Background.png')} style={styles.centre}>
            <ScrollView>
                <Animatable.View animation="fadeInDownBig" iterationCount={1} style={styles.viewHTPTitle}>
                    <Text style={[styles.textTitle, styles.textTitleLeft]}>HOW to</Text>
                    <Text style={[styles.textTitle, styles.textTitleRight]}>PLAY</Text>
                </Animatable.View>

                <Animatable.View animation="fadeInRight" iterationCount={1}>
                    <Text style={[styles.textHTP, styles.textHTPNotEnd]}>1. A Grid of blocks will appear for 3 seconds! </Text>
                    <View style={styles.viewHTPImages}>
                        <Text style={[styles.textHTP, styles.textHTPNotEnd]}>2. Remember the blue blocks! </Text>
                        <Image
                            source={require('../assets/images/Pay Attention.png')}
                            style={{ width: 100, height: 100, borderRadius: 20, }}
                        />
                    </View>
                    <View style={styles.viewHTPImages}>
                        <Text style={[styles.textHTP, styles.textHTPNotEnd]}>3. Pattern will disappear! Click on the blocks!</Text>
                        <Image
                            source={require('../assets/images/Careful.png')}
                            style={{ width: 100, height: 100, borderRadius: 20 }}
                        />
                    </View>
                    <Text style={[styles.textHTP, styles.textHTPNotEnd]}>4. As time goes on, the grid will get bigger, be careful!</Text>
                    <Text style={styles.textHTP}>5. Click all the boxes in 30 seconds and avoid red ones!!</Text>
                    <View style={styles.viewHTPTitle}>
                        <Image
                            source={require('../assets/images/Time Closing.png')}
                            style={{ width: 100, height: 100, marginRight: 25, marginTop: 20, borderRadius: 20 }}
                        />
                        <Image
                            source={require('../assets/images/ClickRight.png')}
                            style={{ width: 100, height: 100, marginTop: 20, borderRadius: 20, }}
                        />
                    </View>
                </Animatable.View>
            </ScrollView>
        </ImageBackground>
    );
}
export default HowToPlay;