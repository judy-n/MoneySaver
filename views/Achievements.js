import React, { Component } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

export default function Achievements({ navigation }) {

    const goHome = () => {
        navigation.navigate('Total')
    }

    return (
        <View style={styles.container}>
            <Pressable style={({ pressed }) => [
                styles.button,
                {
                    backgroundColor: pressed ? 'ivory' : 'darkslategray',
                    color: !pressed ? 'ivory' : 'darkslategray'
                },
            ]} onPress={goHome}>
                <Text style={styles.text}>Back to Total</Text>
            </Pressable>
            <Text style={styles.title}>My Achievements</Text>
            <View style={styles.achievements}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
        padding: 32,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold'
    },
    achievements: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '80%',
        backgroundColor: 'lightgray',
        flexGrow: 1,
        borderRadius: 5,
        shadowColor: 'black',
        shadowRadius: 1,
        marginTop: 8,
        padding: 8,
    },
    button: {
        borderWidth: 3,
        borderColor: "darkslategray",
        borderRadius: 5,
        width: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: "ivory",
        fontFamily: "Helvetica",
        fontWeight: "bold",
        fontSize: 20,
    },
});
