import { Pressable, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    vparent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10%'
    },
    txtTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 20,
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
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'black',
        elevation: 8,
        height: 50,
        margin: 1,
        width: 50,
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
        height: 40,
        width: 200,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        height: 40,
        width: 200,
    },
    viewRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: 'center',
        paddingRight: 50,
        margin: 3
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