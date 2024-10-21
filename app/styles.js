import { Pressable, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    buttonsMM: {
        // Size and Content
        alignItems: "center",
        backgroundColor: '#f40070',
        height: '8%',
        width: '90%',
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,

        // Border
        borderRadius: 15,
        borderWidth: 4,
        borderColor: 'white',

        // Shadow
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    textMMButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        justifyContent: 'left',
    },
    viewMMTitle: {
        flexDirection: 'row', flexWrap: 'wrap', alignItems: "center", marginBottom: 20
    },
    viewGSTitle: {
        flexDirection: 'row', flexWrap: 'wrap', justifyContent: "center",
        alignItems: "center"
    },
    viewHTPTitle: {
        flexDirection: 'row', alignItems: 'center', marginHorizontal: '20%', marginVertical: 25
    },
    viewHTPImages: {
        flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginRight: 25
    },
    textTitle: {
        fontSize: 36,
        color: 'white',

        // Shadow
        textShadowColor: '#171717',
        textShadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.5,
        textShadowRadius: 7,
    },
    textHaha: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,

        // Shadow
        textShadowColor: '#171717',
        textShadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.5,
        textShadowRadius: 7,
    },
    textHehe: {
        fontSize: 18,
        fontStyle: 'italic',
        color: 'white',
        marginBottom: 20,

        // Shadow
        textShadowColor: '#171717',
        textShadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.5,
        textShadowRadius: 7,
    },
    textTitleLeft: {
        fontWeight: 'bold',
    },
    textTitleRight: {
        fontStyle: 'italic',
        marginLeft: 12
    },
    textTitleLeft2: {
        fontWeight: 'bold',
        marginTop: 10
    },
    textTitleRight2: {
        fontStyle: 'italic',
        marginLeft: 12,
        marginTop: 10
    },
    textMMUsername: {
        fontSize: 16,
        color: 'white',
        justifyContent: 'left',
        fontStyle: "italic",
        fontWeight: 'bold',

        // Shadow
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    icon: {
        justifyContent: 'right',
    },
    textHTP: {
        fontSize: 16,
        color: 'white',
        fontStyle: "italic",
        fontWeight: 'bold',
        marginHorizontal: 25,

        // Shadow
        textShadowColor: '#171717',
        textShadowOffset: { width: 4, height: 2 },
        shadowOpacity: 0.5,
        textShadowRadius: 7,
    },
    textHTPNotEnd: {
        marginBottom: 16,
    },
    viewRow: {
        flexDirection: 'row',
        flex: 1,
        margin: 3
    },
    cardLogin: {
        borderRadius: 20,
        borderWidth: 4,
        borderColor: 'white',
        backgroundColor: '#f40070',
        width: '80%',
    },
    cardLoginBottom: {
        opacity: 0.7,
    },
    buttonLogin: {
        // Size and Content
        backgroundColor: '#f40070',
        height: '12%',
        width: '50%',
        marginTop: 12,
        marginBottom: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,

        // Border
        borderRadius: 15,
        borderWidth: 4,
        borderColor: 'white',

        // Shadow
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    buttonGSMenu: {
        // Size and Content
        backgroundColor: '#f40070',
        height: '25%',
        width: '105%',
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,

        // Border
        borderRadius: 15,
        borderWidth: 4,
        borderColor: 'white',

        // Shadow
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    buttonsDelScore: {
        // Size and Content
        alignItems: "center",
        backgroundColor: '#f2422b',
        height: '20%',
        width: '75%',
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,

        // Border
        borderRadius: 15,
        borderWidth: 4,
        borderColor: 'white',

        // Shadow
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    buttonHS: {
        // Size and Content
        backgroundColor: '#f40070',
        height: '20%',
        width: '100%',
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,

        // Border
        borderRadius: 15,
        borderWidth: 4,
        borderColor: 'white',

        // Shadow
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    textTitle: {
        fontSize: 36,
        color: 'white',

        // Shadow
        textShadowColor: '#171717',
        textShadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.5,
        textShadowRadius: 7,
    },
    cardGame: {
        height: 100,
        borderRadius: 20,
        borderWidth: 4,
        borderColor: 'white',
        backgroundColor: '#f40070',
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
    },
    linearGradGame: {
        borderRadius: 5,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    clock: {
        height: 20,
        width: 300,
        marginVertical: 10,
        borderRadius: 20,
        borderColor: 'white',
        borderWidth: 4,

        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    linearGradButton: {
        borderRadius: 5,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    centre: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    vparent: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    txtDesc: {
        fontSize: 16,
        fontStyle: 'italic',
        marginHorizontal: 20,
        marginBottom: 30,
    },
    imgQuiz: {
        width: 600,
        height: 400,
        margin: 20,
        borderRadius: 20,
    },
    buttAnswer: {
        margin: 5,
    },
    Pressable: {
        borderColor: 'white',
        borderWidth: 3.5,
        borderRadius: 8,
        elevation: 8,
        height: 50,
        margin: 2,
        width: 50,
        shadowColor: '#171717',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },

    buttNeutral: {
        backgroundColor: 'white',
    },
    buttRight: {
        backgroundColor: 'blue',
    },
    buttWrong: {
        backgroundColor: 'red',
    },
    // LOGIN
    input: {
        height: 35,
        borderRadius: 10,
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 20,
        justifyContent: 'center'
    },

    button: {
        height: 40,
        width: 200,
    },

    // ANIMASI
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    fadingContainer: {
        padding: 20,
        backgroundColor: "powderblue"
    },
    fadingText: {
        fontSize: 28
    },
    scrollContent: {
        alignItems: 'center', // Apply layout props here
        justifyContent: 'center',
    },

    // container: {
    //     borderRadius: 20,
    //     backgroundColor: 'lightgrey',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     marginBottom: '10%',
    // },
    // txtInput: {
    //     fontSize: 16,
    //     fontWeight: 'bold',
    //     alignSelf: "flex-start",
    //     marginTop: 20,
    //     marginBottom: 10
    // },
    // inputSmall: {
    //     height: 40,
    //     borderWidth: 1,
    //     padding: 10,
    //     width: '100%'
    // },
    // inputBig: {
    //     height: 120,
    //     borderWidth: 1,
    //     padding: 10,
    //     width: '100%'
    // },
    // imgFood: {
    //     // borderRadius: 20,
    //     borderTopStartRadius: 20,
    //     borderTopEndRadius: 20,
    //     width: '100%',
    //     height: 200,
    // },
    // imgBook: {
    //     borderTopStartRadius: 20,
    //     borderTopEndRadius: 20,
    //     width: '100%',
    //     height: 300,
    // },
    // imgInput: {
    //     borderRadius: 20,
    //     width: 200,
    //     height: 400,
    //     marginVertical: 20
    // },
    imgKucing: {
        width: 300,
        height: 400,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 20,
    },

    // chipEnd: {
    //     margin: 100,
    // },

});

export { styles };