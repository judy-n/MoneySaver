import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee, faLock, faStar, faUserGraduate, faUserTie, faDiceOne } from '@fortawesome/free-solid-svg-icons'
import { borderBottomColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faCoffee, faLock, faStar, faUserGraduate, faUserTie, faDiceOne)


export default function Achievements({ achievements }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Achievements</Text>
            <View style={styles.achievements}>
                {
                    achievements.map((ach, index) => {
                        return (
                            <View style={styles.achievement} key={index}>
                                <FontAwesomeIcon 
                                    style={ach.completed ? [styles.complete, {color: ach.color}] : [styles.incomplete]}
                                    icon={ach.completed ? ach.icon : "lock"}
                                    size={ 64 } 
                                />
                                <Text style={ach.completed ? styles.achievementText : [styles.achievementText, styles.incomplete]}>
                                    {ach.text}
                                </Text>
                            </View>
                        )
                    })
                }
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
    achievement: {
        width: '100%',
        padding: '1.5%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    achievementText: {
        fontSize: 16,
        fontWeight: '700',
        color: 'black',
    },
    incomplete: {
        color: 'gray'
    },
    complete: {
        color: 'black'
    }
});
